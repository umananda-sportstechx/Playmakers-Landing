import { footer } from '@/lib/content';
import { Art } from '@/components/art';

/**
 * Footer — 1513x567 on white.
 *
 * The "Cloud grid" is a set of 2px solid #bababa rules, one above and one below
 * the column block plus two verticals between the link columns. Unlike every
 * other divider in this design they are solid, not dashed.
 */
export function Footer() {
  return (
    <footer className="bg-page pt-[calc(71*var(--k))] pb-[calc(52*var(--k))] text-ink">
      <div className="container-page">
        <div className="border-y-2 border-rule-2 py-[calc(53*var(--k))]">
          <div className="grid gap-12 lg:grid-cols-[calc(451*var(--k))_1fr_1fr] lg:gap-[calc(100*var(--k))]">
            {/* Column 1 — mark, blurb, contact */}
            <div>
              <Art name="wordmark-footer" alt="Playmakers" />

              <p className="mt-[calc(28*var(--k))] font-sans text-body leading-[1.78]">{footer.description}</p>

              <ul className="mt-[calc(15*var(--k))] space-y-[calc(1*var(--k))]">
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

            {/* Column 3 — quick links. (The artboard's "Column 2" is an empty
                frame left over from an earlier layout, so it is not built.) */}
            {footer.columns.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <h2 className="font-bebas text-col-head leading-[1.45] tracking-[0.1em] text-black">
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

            {/* Column 4 — social */}
            <nav aria-label="Connect">
              <h2 className="font-bebas text-col-head leading-[1.45] tracking-[0.1em] text-black">CONNECT</h2>
              <ul className="mt-[calc(21*var(--k))]">
                {footer.social.map((s) => (
                  <li key={s.label}>
                    <a href="#" className="flex items-center gap-[calc(15*var(--k))] font-sans text-body leading-[1.78] hover:underline">
                      {/* eslint-disable-next-line @next/next/no-img-element -- exported vector */}
                      <img src={s.icon} alt="" width={s.w} height={s.h} />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-[calc(23*var(--k))] flex flex-col gap-[calc(8*var(--k))] font-label text-[max(12px,calc(13*var(--k)))] leading-[2.46] lg:flex-row lg:justify-between">
          <p>{footer.legal}</p>
          <p>{footer.meta}</p>
        </div>
      </div>
    </footer>
  );
}
