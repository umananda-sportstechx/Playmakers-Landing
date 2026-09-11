import { footer } from '@/lib/content';
import { Art } from '@/components/art';

/**
 * Footer — 1513x567 on white.
 *
 * The artboard's "Cloud grid" is four 2px #bababa rules, not two: horizontals
 * above and below the block, and two verticals between the link columns. The
 * verticals were missing entirely, which is why the columns read as floating.
 *
 * Those rules also define the column widths. The grid block runs x73..x1458 and
 * the verticals land at x868 and x1162, so the three cells are 795 / 294 / 296 —
 * 57.40% / 21.23% / 21.37%. The left cell is far wider than an even split, which
 * is why a `451px 1fr 1fr` grid put both link columns too far left.
 *
 * The artboard also has an empty "Column 2" frame at x622 left over from an
 * earlier layout. It holds nothing and is not built; the left cell simply
 * spans it.
 */
export function Footer() {
  return (
    <footer className="bg-page pt-[calc(71*var(--k))] pb-[calc(52*var(--k))] text-ink">
      <div className="container-page">
        <div className="border-y-2 border-rule-2 pt-[calc(53*var(--k))] pb-[calc(67*var(--k))]">
          <div className="grid gap-y-[calc(48*var(--k))] lg:grid-cols-[57.40%_21.23%_21.37%] lg:gap-y-0">
            {/* Left cell — mark, blurb, contact */}
            <div>
              <Art name="wordmark-footer" alt="Playmakers" />

              <p className="mt-[calc(28*var(--k))] max-w-[calc(451*var(--k))] font-sans text-body leading-[1.78]">
                {footer.description}
              </p>

              <ul className="mt-[calc(28*var(--k))]">
                <li className="flex items-center gap-[calc(13*var(--k))]">
                  <Art name="icon-mail" />
                  <a href={`mailto:${footer.email}`} className="font-sans text-body-sm leading-[2] hover:underline">
                    {footer.email}
                  </a>
                </li>
                <li className="flex items-center gap-[calc(13*var(--k))]">
                  <Art name="icon-pin" />
                  <span className="font-sans text-body-sm leading-[2]">{footer.location}</span>
                </li>
              </ul>
            </div>

            {/* Middle cell — quick links */}
            {footer.columns.map((col) => (
              <nav key={col.heading} className="footer-cell" aria-label={col.heading}>
                <h2 className="font-bebas text-col-head leading-[1.45] tracking-[0.1em] text-black uppercase">
                  {col.heading}
                </h2>
                <ul className="mt-[calc(21*var(--k))]">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="font-sans text-body leading-[1.78] hover:underline">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            {/* Right cell — social */}
            <nav className="footer-cell" aria-label="Connect">
              <h2 className="font-bebas text-col-head leading-[1.45] tracking-[0.1em] text-black uppercase">
                CONNECT
              </h2>
              <ul className="mt-[calc(21*var(--k))]">
                {footer.social.map((s) => (
                  <li key={s.label}>
                    <a
                      href="#"
                      className="flex items-center gap-[calc(15*var(--k))] font-sans text-body leading-[1.78] hover:underline"
                    >
                      <Art name={s.icon} />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-[calc(22*var(--k))] flex flex-col gap-[calc(8*var(--k))] font-label text-[max(12px,calc(13*var(--k)))] leading-[2.46] lg:flex-row lg:justify-between">
          <p>{footer.legal}</p>
          <p>{footer.meta}</p>
        </div>
      </div>
    </footer>
  );
}
