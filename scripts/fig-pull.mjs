// Pull artwork out of the Playmakers Figma file over the REST API.
//
// Figma's MCP server is unusable on this account (View seat quota), so REST is the
// only route in. It is also the better one here: raw node geometry plus batch export.
//
//   npm run design          export every asset in the tables below into public/
//   npm run design:list     print every exportable node, to fill the tables from
//   npm run design:check    assert the tables still resolve against the file
//   npm run design:screens  re-render the per-section reference PNGs
//
// The tables key on node id, not layer path. 20-odd layers in this file are all named
// "Vector", so paths are ambiguous; ids are unique and survive renames. They do not
// survive a layer being deleted and redrawn, which is what --check exists to catch.

import { mkdir, writeFile, readFile, readdir, unlink, stat } from 'node:fs/promises';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const KEY = process.env.FIGMA_FILE_KEY ?? '3DBVbyeTU2WLaPJCYTeXZx';
const TOKEN = process.env.FIGMA_TOKEN;

// ── what to export ────────────────────────────────────────────────────────────
// Vectors → public/vectors/<name>.svg. Shapes that repeat in the design (the FAQ
// plus x12, the step-card gradient x4) are exported once and reused in markup.
const VECTORS = [
  ['mark-p', '9071:419'], //  37x44  nav
  ['wordmark-hero', '9071:412'], // 628x82
  ['wordmark-final', '9071:127'], // 432x76
  ['wordmark-footer', '9073:1261'], // 230x31  dark
  ['chevron-trusted-left', '9071:343'], //  16x37
  ['chevron-trusted-right', '9071:344'],
  ['chevron-offers-left', '9072:1118'], //  16x36
  ['chevron-offers-right', '9072:1120'],
  ['chevron-testimonial-left', '9072:1161'], //   9x20
  ['chevron-testimonial-right', '9072:1162'],
  ['icon-mail', '9071:71'], //  17x13
  ['icon-pin', '9071:74'], //  15x19
  ['icon-linkedin', '9071:98'], //  18x18
  ['icon-youtube', '9071:101'], //  18x12
  ['icon-instagram', '9071:104'], //  18x18
  ['icon-x', '9071:107'], //  18x16
  ['icon-plus', '9071:133'], //  20x20  FAQ, x12
  ['icon-bullet', '9072:545'], //  22x22  offer cards, x9
  ['circle-52', '9072:1067'], //  52x52  offer card numerals
  ['circle-35', '9072:1181'], //  35x35  step card numerals
  ['logo-bcg', '9071:351'], //  56x23  on member photos, x5
  ['card-gradient-step', '9072:1169'], // 301x360 step card, x4
  ['card-offer-1-base', '9072:481'], // 1040x643
  ['card-offer-1-gradient', '9071:259'],
  ['card-offer-2-base', '9072:559'], // 1040x613
  ['card-offer-2-gradient', '9072:586'],
  ['card-offer-3-base', '9072:535'], // 1040x583
  ['card-offer-3-gradient', '9072:588'],
];

// Rasters → public/images/<name>.<ext>. Keyed on the node whose fill carries the
// imageRef; the ref itself is an opaque hash resolved at run time.
const IMAGES = [
  ['hero-bg', '9071:398'], // 2730x1536
  ['final-hero-bg', '9073:1267'], // 1513x693
  ['team-bg', '9073:1353'], // 1513x1005 stadium seats
  ['offer-card-photo', '9072:1073'], //  434x642
  ['testimonial-avatar', '9072:1146'], //   72x72
  ['member-1', '9071:349'], //  210x232 trusted-by rail
  ['member-2', '9071:356'],
  ['member-3', '9071:363'],
  ['member-4', '9071:370'],
  ['member-5', '9071:377'],
  ['team-1', '9073:1273'], //  254x248 Rohn   (top-left)
  ['team-2', '9073:1341'], //          Thomas (top-right)
  ['team-3', '9073:1344'], //          Katy   (bottom-left)
  ['team-4', '9073:1347'], //          Mitch  (bottom-right)
];

// Section frames, for the --screens reference renders.
const SECTIONS = [
  ['00-intro-hero', '9071:57'],
  ['01-nav-bar', '9071:111'],
  ['02-trusted-by', '9071:128'],
  ['03-membership-offers', '9071:180'],
  ['04-testimonials', '9071:220'],
  ['05-quote', '9072:1215'],
  ['06-how-to-join', '9072:1142'],
  ['07-team', '9071:255'],
  ['08-faq', '9071:339'],
  ['09-final-hero', '9071:389'],
  ['10-footer', '9071:417'],
];

// ── plumbing ──────────────────────────────────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Longest we will ever sit waiting on a 429 before giving up and saying so.
const MAX_BACKOFF_MS = 90_000;

/**
 * Figma rate-limits each endpoint separately, and the render endpoint
 * (/v1/images) has a hard quota that a full export can exhaust for a long time.
 * Its Retry-After is not the "few seconds" the header usually implies — this
 * project has been handed 397357 (4.6 days). So the wait is capped: a retry
 * beyond the cap is not a retry, it is a hang, and the caller needs to hear
 * about it rather than watch a silent process for an hour.
 */
const api = async (path, attempt = 0) => {
  if (!TOKEN) throw new Error('FIGMA_TOKEN missing - run via npm, which loads .env.local');
  const r = await fetch(`https://api.figma.com${path}`, { headers: { 'X-Figma-Token': TOKEN } });
  if (r.status === 429 || r.status >= 500) {
    const asked = Number(r.headers.get('retry-after')) * 1000 || 20_000 * 2 ** attempt;
    if (asked > MAX_BACKOFF_MS || attempt >= 5) {
      const mins = Math.round(asked / 60_000);
      throw new Error(
        `${path} -> ${r.status}, and Figma wants ${mins} minute(s) before the next try.\n` +
          `  That is a quota lockout, not a blip. Options: wait it out, or take the\n` +
          `  offline route - a .fig local copy decodes with no API at all.`
      );
    }
    console.log(`  ${r.status} - waiting ${Math.round(asked / 1000)}s`);
    await sleep(asked);
    return api(path, attempt + 1);
  }
  const j = await r.json();
  // A viewer on an export-protected file gets 403 "File not exportable" here. That is a
  // permission on the Figma file itself; no token change fixes it, the owner must.
  if (!r.ok) throw new Error(`${path} -> ${r.status} ${j.err ?? j.message ?? ''}`);
  return j;
};

const chunk = (a, n) =>
  Array.from({ length: Math.ceil(a.length / n) }, (_, i) => a.slice(i * n, i * n + n));

const grab = async (url, to) => {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`download ${to} -> ${r.status}`);
  await writeFile(to, Buffer.from(await r.arrayBuffer()));
};

// Figma hands back the originals, and some are absurd for the size they render
// at — the offer-card photo arrives as a 14MB 2602x4096 PNG to be drawn 434px
// wide. next/image would resize that per request, but the file still lands in
// git forever, so it gets recompressed once, here.
//
// The cap is generous (2x the largest box any of these fill) to leave room for
// retina and for the crops, which sample a sub-rectangle of the source.
const MAX_EDGE = 3200;
const RECOMPRESS_OVER = 400 * 1024;

const shrink = async (file, box) => {
  const { size } = await stat(file);
  if (size < RECOMPRESS_OVER) return { bytes: size };
  let sharp;
  try {
    ({ default: sharp } = await import('sharp'));
  } catch {
    console.log('  (sharp unavailable - keeping originals)');
    return { bytes: size };
  }
  const webp = file.replace(/\.(png|jpg|jpeg|gif)$/i, '.webp');
  // Never upscale, and never go below what the layout actually draws.
  const edge = Math.min(MAX_EDGE, Math.max(box.w, box.h) * 2 || MAX_EDGE);
  await sharp(file)
    .resize({ width: edge, height: edge, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(webp);
  const after = (await stat(webp)).size;
  if (after >= size) {
    await unlink(webp);
    return { bytes: size };
  }
  await unlink(file);
  return { file: webp, bytes: after, originalBytes: size };
};

/** Walk the document, flagging everything inside a hidden subtree. */
const walk = (node, fn, hidden = false) => {
  const off = hidden || node.visible === false;
  fn(node, off);
  for (const c of node.children ?? []) walk(c, fn, off);
};

/**
 * The file JSON is cached at design/file.json and committed.
 *
 * Not an optimisation: Figma's rate limits on this token are per-endpoint and
 * can run to *days* (we have seen `retry-after: 397357`, i.e. 4.6 days, on the
 * render endpoint). Re-fetching a document that changes once a fortnight is not
 * worth spending that budget on, so the cache is the default and the network is
 * opt-in with --refresh.
 */
const loadTree = async ({ refresh = process.argv.includes('--refresh') } = {}) => {
  const cachePath = join(ROOT, 'design/file.json');
  let file;
  if (!refresh) {
    try {
      file = JSON.parse(await readFile(cachePath, 'utf8'));
    } catch {
      /* no cache yet — fall through and fetch */
    }
  }
  if (!file) {
    file = await api(`/v1/files/${KEY}`);
    await mkdir(dirname(cachePath), { recursive: true });
    await writeFile(cachePath, JSON.stringify(file) + '\n');
  }
  const byId = new Map();
  walk(file.document, (n, off) => byId.set(n.id, { node: n, hidden: off }));
  return { file, byId };
};

// Figma renders asynchronously: a batch can come back err:null with individual ids
// mapped to null. Those are not failures, just "not ready yet" - ask again.
const renderBatch = async (ids, query) => {
  const out = {};
  let todo = ids;
  for (let attempt = 0; attempt < 4 && todo.length; attempt++) {
    const pending = [];
    for (const ids20 of chunk(todo, 20)) {
      const { images } = await api(`/v1/images/${KEY}?ids=${ids20.join(',')}&${query}`);
      for (const id of ids20) images?.[id] ? (out[id] = images[id]) : pending.push(id);
    }
    todo = pending;
    if (todo.length) await sleep(1500 * (attempt + 1));
  }
  if (todo.length) throw new Error(`Figma never rendered: ${todo.join(', ')}`);
  return out;
};

// ── SVG generation from path geometry ─────────────────────────────────────────
//
// The obvious way to get an SVG out of Figma is GET /v1/images?format=svg. We do
// not use it, because that render endpoint shares a quota with GET /v1/files
// which this project has already exhausted once — Figma answered with
// `Retry-After: 397357`, i.e. 4.6 days, and there is no way to ask nicely.
//
// GET /v1/files/:key/nodes?geometry=paths is metered separately and hands back
// the same artwork as raw SVG path data plus the node's fills, so the SVG can
// simply be assembled here. That removes the render endpoint from the critical
// path entirely: no quota to exhaust, no waiting on Figma's renderer, and the
// output is deterministic rather than whatever the renderer felt like emitting.

const hex = (c) =>
  '#' + [c.r, c.g, c.b].map((v) => Math.round(v * 255).toString(16).padStart(2, '0')).join('');

/** Figma paints one node's fill/stroke; returns { paint, defs } for the SVG. */
const paintOf = (paint, id) => {
  if (!paint || paint.visible === false) return null;
  if (paint.type === 'SOLID') {
    const a = (paint.color.a ?? 1) * (paint.opacity ?? 1);
    return { ref: hex(paint.color), opacity: a, defs: '' };
  }
  if (paint.type?.startsWith('GRADIENT')) {
    // Handle positions are normalised to the node's bounding box, which is
    // exactly what objectBoundingBox units mean in SVG.
    const [p0, p1] = paint.gradientHandlePositions ?? [];
    if (!p0 || !p1) return null;
    const stops = (paint.gradientStops ?? [])
      .map(
        (s) =>
          `<stop offset="${s.position.toFixed(4)}" stop-color="${hex(s.color)}"` +
          ` stop-opacity="${((s.color.a ?? 1) * (paint.opacity ?? 1)).toFixed(4)}"/>`
      )
      .join('');
    const defs =
      `<linearGradient id="${id}" x1="${p0.x.toFixed(4)}" y1="${p0.y.toFixed(4)}"` +
      ` x2="${p1.x.toFixed(4)}" y2="${p1.y.toFixed(4)}">${stops}</linearGradient>`;
    return { ref: `url(#${id})`, opacity: 1, defs };
  }
  return null; // IMAGE fills are handled by the raster pass, not here
};

const svgFor = (node, name) => {
  const b = node.absoluteBoundingBox;
  const w = Math.round(b.width);
  const h = Math.round(b.height);
  const defs = [];
  const body = [];

  const emit = (geoms, paints, kind) => {
    (geoms ?? []).forEach((g, i) => {
      // Figma repeats the whole paint list per geometry when it has one paint
      // and many subpaths, so index defensively rather than assuming a pairing.
      const paint = paints?.[Math.min(i, (paints?.length ?? 1) - 1)];
      const p = paintOf(paint, `${name}-${kind}-${i}`);
      if (!p) return;
      if (p.defs) defs.push(p.defs);
      const rule = g.windingRule === 'EVENODD' ? ' fill-rule="evenodd"' : '';
      const op = p.opacity < 1 ? ` fill-opacity="${p.opacity.toFixed(4)}"` : '';
      body.push(`<path d="${g.path}" fill="${p.ref}"${rule}${op}/>`);
    });
  };

  emit(node.fillGeometry, node.fills, 'f');
  // A stroke's geometry is already outlined by Figma, so it is filled, not stroked.
  emit(node.strokeGeometry, node.strokes, 's');

  const opacity = node.opacity != null && node.opacity < 1 ? ` opacity="${node.opacity}"` : '';
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"` +
    ` viewBox="0 0 ${w} ${h}" fill="none"${opacity}>` +
    (defs.length ? `<defs>${defs.join('')}</defs>` : '') +
    body.join('') +
    `</svg>\n`
  );
};

const exportVectors = async () => {
  await mkdir(join(ROOT, 'public/vectors'), { recursive: true });
  const manifest = await readManifest();
  const ids = VECTORS.map(([, id]) => id);
  const nodes = {};
  for (const ids10 of chunk(ids, 10)) {
    const r = await api(
      `/v1/files/${KEY}/nodes?ids=${ids10.join(',')}&geometry=paths`
    );
    Object.assign(nodes, r.nodes);
  }
  for (const [name, id] of VECTORS) {
    const node = nodes[id]?.document;
    if (!node) throw new Error(`${name}: node ${id} missing from the nodes response`);
    const svg = svgFor(node, name);
    await writeFile(join(ROOT, `public/vectors/${name}.svg`), svg);
    const b = node.absoluteBoundingBox;
    manifest[name] = {
      file: `/vectors/${name}.svg`,
      node: id,
      w: Math.round(b.width),
      h: Math.round(b.height),
    };
    console.log(`  ${name}.svg  ${svg.length}b`);
  }
  await writeManifest(manifest);
  console.log(`${VECTORS.length} vectors -> public/vectors/`);
};

// ── modes ─────────────────────────────────────────────────────────────────────
const list = async () => {
  const { byId } = await loadTree();
  const rows = [];
  for (const [id, { node: n, hidden }] of byId) {
    if (hidden) continue;
    const b = n.absoluteBoundingBox;
    const img = (n.fills ?? []).find((f) => f.type === 'IMAGE' && f.visible !== false);
    const vec = ['VECTOR', 'BOOLEAN_OPERATION', 'ELLIPSE', 'STAR', 'REGULAR_POLYGON'].includes(n.type);
    if (b && b.width > 1 && b.height > 1 && (vec || img)) {
      const size = `${Math.round(b.width)}x${Math.round(b.height)}`;
      rows.push(`${img ? 'IMAGE ' : 'VECTOR'}  ${id.padEnd(11)} ${size.padEnd(11)} ${n.name}`);
    }
  }
  console.log(rows.join('\n'));
  console.log(`\n${rows.length} exportable nodes (hidden subtrees excluded)`);
};

const check = async () => {
  const { byId } = await loadTree();
  let bad = 0;
  for (const [name, id] of [...VECTORS, ...IMAGES, ...SECTIONS]) {
    const hit = byId.get(id);
    if (!hit) {
      console.error(`x ${name}: node ${id} is gone from the file`);
      bad++;
    } else if (hit.hidden) {
      console.error(`x ${name}: node ${id} is now hidden`);
      bad++;
    }
  }
  // The switched-off layers must stay switched off - shipping the FIFA/BCG partner row
  // would put logos on the page that the design deliberately turned off.
  const hidden = [...byId.values()].filter((v) => v.node.visible === false);
  console.log(`${hidden.length} hidden layers: ${hidden.map((h) => h.node.name).join(', ')}`);
  if (!hidden.some((h) => h.node.name === 'Trust Partners')) {
    console.error('x "Trust Partners" is no longer hidden - check with the designer before shipping it');
    bad++;
  }
  console.log(bad ? `\n${bad} problem(s)` : '\nok - every table entry resolves');
  if (bad) process.exitCode = 1;
};

const screens = async () => {
  await mkdir(join(ROOT, 'design/ref'), { recursive: true });
  const urls = await renderBatch(SECTIONS.map(([, id]) => id), 'format=png&scale=1');
  for (const [name, id] of SECTIONS) await grab(urls[id], join(ROOT, `design/ref/${name}.png`));
  console.log(`${SECTIONS.length} reference renders -> design/ref/`);
};

const readManifest = async () => {
  try {
    return JSON.parse(await readFile(join(ROOT, 'design/assets.json'), 'utf8'));
  } catch {
    return {};
  }
};

const writeManifest = async (manifest) =>
  writeFile(join(ROOT, 'design/assets.json'), JSON.stringify(manifest, null, 2) + '\n');

/** Rasters only. A separate endpoint from the renders, with its own quota - so
 *  this still works when /v1/images is locked out. */
const exportImages = async () => {
  const { byId } = await loadTree();
  const manifest = await readManifest();
  await mkdir(join(ROOT, 'public/images'), { recursive: true });
  const { meta } = await api(`/v1/files/${KEY}/images`);
  const EXT = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/gif': 'gif' };
  for (const [name, id] of IMAGES) {
    const node = byId.get(id).node;
    const ref = (node.fills ?? []).find((f) => f.type === 'IMAGE')?.imageRef;
    const url = meta.images[ref];
    if (!url) throw new Error(`${name}: no image URL for ref ${ref}`);
    const head = await fetch(url, { method: 'HEAD' });
    const ext = EXT[head.headers.get('content-type')] ?? 'png';
    let file = `images/${name}.${ext}`;
    const path = join(ROOT, 'public', file);
    await grab(url, path);
    const b = node.absoluteBoundingBox;
    const box = { w: Math.round(b.width), h: Math.round(b.height) };
    const out = await shrink(path, box);
    if (out.file) file = `images/${basename(out.file)}`;
    manifest[name] = { file: `/${file}`, node: id, ref, ...box, bytes: out.bytes, originalBytes: out.originalBytes };
    const saved = out.originalBytes ? ` (${Math.round(out.originalBytes / 1024)}k -> ${Math.round(out.bytes / 1024)}k)` : '';
    console.log(`  ${file.replace('images/', '')}${saved}`);
  }
  await writeManifest(manifest);
  console.log(`${IMAGES.length} images -> public/images/`);
};

const exportAll = async () => {
  await exportVectors();
  await exportImages();

  // Drop anything an earlier run left behind, so a renamed asset cannot linger.
  const manifest = await readManifest();
  const keep = new Set(Object.values(manifest).map((m) => m.file.slice(1)));
  for (const dir of ['vectors', 'images']) {
    for (const f of await readdir(join(ROOT, 'public', dir))) {
      if (!keep.has(`${dir}/${f}`)) {
        await unlink(join(ROOT, 'public', dir, f));
        console.log(`pruned ${dir}/${f}`);
      }
    }
  }
  console.log('design/assets.json written');
};

const MODES = {
  '--list': list,
  '--check': check,
  '--screens': screens,
  '--images': exportImages,
  '--vectors': exportVectors,
};
await (MODES[process.argv[2]] ?? exportAll)();
