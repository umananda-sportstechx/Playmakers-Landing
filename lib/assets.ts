import manifest from '@/design/assets.json';

/**
 * Look up an exported asset by its name in scripts/fig-pull.mjs.
 *
 * Worth the indirection because the file extension is not knowable up front:
 * the export writes whatever Figma stored (png/jpg), then recompresses anything
 * large to .webp — so `hero-bg` is a .webp while `team-4` stays a .png, purely
 * on a size threshold. Hardcoding those in components means a silent 404 the
 * next time an image crosses the threshold.
 */
type Asset = { file: string; w: number; h: number };

const assets = manifest as Record<string, Asset>;

export function asset(name: string): Asset {
  const hit = assets[name];
  if (!hit) throw new Error(`unknown asset "${name}" - run npm run design`);
  return hit;
}

/**
 * Just the public path, for the common case.
 *
 * An absolute http(s) URL passes straight through: CMS images (admin panel ->
 * Site assets) are runtime URLs with no manifest entry, and every component
 * already routes its image through here, so this is the only place that has to
 * know the difference. Remote hosts must also be in next.config.ts's
 * images.remotePatterns or next/image rejects them.
 */
export const src = (name: string, fallback?: string): string => {
  if (/^https?:\/\//.test(name)) return name;
  // A blank name is what a CMS row with no image collapses to. asset() throws
  // on an unknown name, and every caller here is a Server Component, so an
  // unguarded '' took the whole page down with a 500 instead of degrading.
  if (!name) {
    if (fallback) return src(fallback);
    throw new Error('src() called with an empty asset name - pass a fallback');
  }
  return asset(name).file;
};
