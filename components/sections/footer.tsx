import { footer } from '@/lib/content';

/**
 * Footer — 1513x567 on white.
 *
 * The "Cloud grid" is a set of 2px solid #bababa rules, one above and one below
 * the column block plus two verticals between the link columns. Unlike every
 * other divider in this design they are solid, not dashed.
 */
export function Footer() {
  return (
    <footer className="bg-page pt-[71px] pb-[52px] text-ink">
      <div className="container-page">
        <div className="border-y-2 border-rule-2 py-[53px]">
          <div className="grid gap-12 lg:grid-cols-[451px_1fr_1fr] lg:gap-[100px]">
            {/* Column 1 — mark, blurb, contact */}
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element -- exported vector */}
              <img src="/vectors/wordmark-footer.svg" alt="Playmakers" width={230} height={31} className="block" />

              <p className="mt-[28px] font-sans text-body leading-[1.78]">{footer.description}</p>

              <ul className="mt-[15px] space-y-[1px]">
                <li className="flex items-center gap-[13px]">
                  {/* eslint-disable-next-line @next/next/no-img-element -- exported vector */}
                  <img src="/vectors/icon-mail.svg" alt="" width={17} height={13} />
                  <a href={`mailto:${footer.email}`} className="font-sans text-body-sm leading-[2] hover:underline">
                    {footer.email}
                  </a>
                </li>
                <li className="flex items-center gap-[13px]">
                  {/* eslint-disable-next-line @next/next/no-img-element -- exported vector */}
                  <img src="/vectors/icon-pin.svg" alt="" width={15} height={19} />
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
                <ul className="mt-[21px]">
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
              <ul className="mt-[21px]">
                {footer.social.map((s) => (
                  <li key={s.label}>
                    <a href="#" className="flex items-center gap-[15px] font-sans text-body leading-[1.78] hover:underline">
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

        <div className="mt-[23px] flex flex-col gap-2 font-label text-[13px] leading-[2.46] lg:flex-row lg:justify-between">
          <p>{footer.legal}</p>
          <p>{footer.meta}</p>
        </div>
      </div>
    </footer>
  );
}
