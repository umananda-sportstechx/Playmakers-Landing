import { Lines } from '@/components/lines';
import { Art } from '@/components/art';
import { howToJoin } from '@/lib/content';

/**
 * How to join — 1513x857 on warm cream, four 301x360 dark step cards.
 *
 * Each card is a white rounded base with an exported gradient artwork laid over
 * it, per the house rule that design artwork is placed, not rebuilt in CSS. The
 * green inner glow (INNER_SHADOW, rgba(75,175,142,0.18) at 24px) is the card's
 * own effect and is easy to miss — without it the cards read flat.
 *
 * The dashed verticals between cards are separate LINE nodes in the design,
 * drawn shorter than the cards; here they are the grid's own dividers so they
 * disappear correctly when the row reflows.
 */
export function HowToJoin() {
  return (
    <section
      className="noise bg-band-warm py-[calc(120*var(--k))]"
      style={{ '--noise-alpha': 0.12 } as React.CSSProperties}
    >
      <div className="container-page">
        <h2 className="text-center font-display text-section leading-[1.25] tracking-[0.05em] text-heading uppercase">
          {howToJoin.title}
        </h2>

        <ol className="steps-row mt-[calc(110*var(--k))] grid gap-x-[calc(50*var(--k))] gap-y-[calc(50*var(--k))] sm:grid-cols-2 xl:grid-cols-4">
          {howToJoin.steps.map((step) => (
            <li
              key={step.n}
              className="relative xl:before:absolute xl:before:-left-[calc(25*var(--k))] xl:before:top-[calc(41*var(--k))] xl:before:bottom-[calc(41*var(--k))] xl:before:border-l xl:before:border-dashed xl:before:border-black/40 xl:first:before:hidden"
            >
              <article
                className="step-card noise relative isolate flex h-full flex-col overflow-hidden rounded-[calc(20*var(--k))] p-[calc(25*var(--k))] inset-shadow-glow"
                style={{ '--noise-alpha': 0.22 } as React.CSSProperties}
              >
                {/* The card's colour is exported artwork, not a CSS gradient. */}
                <Art name="card-gradient-step" fill className="absolute inset-0 -z-10" />

                <div className="flex items-start gap-[calc(12*var(--k))]">
                  <span className="grid size-[calc(35*var(--k))] shrink-0 place-items-center rounded-full border-[1.5px] border-white/90 font-label text-[max(16px,calc(21*var(--k)))] tracking-[0.1em] text-white">
                    {step.n}
                  </span>
                  <span className="mt-[calc(9*var(--k))] border-b border-dashed border-white pb-[calc(3*var(--k))] font-label text-eyebrow leading-[1.3] tracking-[0.1em] text-white uppercase">
                    {step.eyebrow}
                  </span>
                </div>

                <h3 className="mt-[calc(26*var(--k))] font-display text-step-title leading-[1.05] text-white uppercase">
                  <Lines text={step.title} />
                </h3>

                <p className="mt-[calc(22*var(--k))] font-sans text-body-sm leading-[1.56] text-white">
                  {step.body}
                </p>
              </article>
            </li>
          ))}
        </ol>

        <div className="mt-[calc(80*var(--k))] flex justify-center">
          <a
            href="#apply"
            className="grid h-[calc(54*var(--k))] min-w-[calc(244*var(--k))] place-items-center rounded-full bg-accent px-[calc(32*var(--k))] font-label text-cta font-medium tracking-[0.1em] text-accent-fg shadow-cta transition-transform motion-safe:hover:scale-[1.02]"
          >
            {howToJoin.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
