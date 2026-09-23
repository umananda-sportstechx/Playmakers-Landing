import type { LegalDoc } from '@/lib/legal';

/**
 * Renders a structured legal document in the site's own voice.
 *
 * The page opens on a navy band, the way every other page here opens on the
 * hero, then drops to white for the body. That is not only rhythm: the nav bar
 * is drawn for a dark ground — white links in a white-bordered capsule — so a
 * page that started white would have an invisible header.
 *
 * Padding carries px floors: --k bottoms out at 0.42 on a phone, and an
 * unfloored 150 units would put the kicker under the nav bar.
 *
 * Type uses the site's own `--k` scale. That is safe here because the shell
 * puts every route inside `.page-rig`, and because `--k` clamps at 1px, so the
 * ramp stops growing at the 1512 artboard rather than running away on a wide
 * screen. The reading column is capped separately.
 */
export function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <article>
      {/* ---------- navy header band ---------- */}
      <header className="noise bg-hero pt-[max(112px,calc(150*var(--k)))] pb-[max(56px,calc(84*var(--k)))]">
        <div className="container-page">
          <div className="mx-auto max-w-[820px]">
            {doc.kicker && (
              <p className="tracked font-label text-eyebrow text-accent uppercase">{doc.kicker}</p>
            )}
            <h1 className="tracked-tight mt-[calc(14*var(--k))] font-display text-section leading-[1.05] text-white uppercase">
              {doc.title}
            </h1>
            {doc.preamble.length > 0 && (
              <div className="mt-[calc(28*var(--k))] flex flex-col gap-[calc(14*var(--k))]">
                {doc.preamble.map((block, i) => (
                  <p key={i} className="font-sans text-body leading-[1.72] text-white/70">
                    {block.kind === 'p' && block.label && (
                      <strong className="font-medium text-white">
                        {block.label}
                        {block.text ? ' ' : ''}
                      </strong>
                    )}
                    {block.kind === 'p' ? block.text : ''}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ---------- white body ---------- */}
      <div className="bg-page py-[calc(96*var(--k))]">
        <div className="container-page">
          <div className="mx-auto flex max-w-[820px] flex-col gap-[calc(40*var(--k))]">
            {doc.sections.map((section, i) => (
              <section key={`${section.heading}-${i}`}>
                {section.level === 2 ? (
                  <h2 className="tracked-tight border-t border-line pt-[calc(26*var(--k))] font-display text-card-title leading-[1.2] text-heading uppercase">
                    {section.heading}
                  </h2>
                ) : (
                  <h3 className="font-sans text-lead leading-[1.4] font-semibold text-heading">
                    {section.heading}
                  </h3>
                )}

                <div className="mt-[calc(16*var(--k))] flex flex-col gap-[calc(16*var(--k))]">
                  {section.blocks.map((block, j) =>
                    block.kind === 'list' ? (
                      <ul key={j} className="flex flex-col gap-[calc(11*var(--k))]">
                        {block.items.map((item, k) => (
                          <li
                            key={k}
                            className="relative pl-[calc(26*var(--k))] font-sans text-body leading-[1.72] text-fg-muted"
                          >
                            {/* The square bullet the membership cards use. */}
                            <span
                              aria-hidden
                              className="absolute top-[0.66em] left-0 size-[7px] border border-[#88413d]"
                            />
                            {item.label && (
                              <strong className="font-medium text-heading">
                                {item.label}
                                {item.text ? ' ' : ''}
                              </strong>
                            )}
                            {item.text}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p key={j} className="font-sans text-body leading-[1.72] text-fg-muted">
                        {block.label && (
                          <strong className="font-medium text-heading">
                            {block.label}
                            {block.text ? ' ' : ''}
                          </strong>
                        )}
                        {block.text}
                      </p>
                    )
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
