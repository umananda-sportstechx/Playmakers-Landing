import { Lines } from '@/components/lines';
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
      className="noise bg-band-warm py-[120px]"
      style={{ '--noise-alpha': 0.12 } as React.CSSProperties}
    >
      <div className="container-page">
        <h2 className="text-center font-display text-section leading-[1.25] tracking-[0.05em] text-heading uppercase">
          {howToJoin.title}
        </h2>

        <ol className="mt-[110px] grid gap-x-[50px] gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {howToJoin.steps.map((step) => (
            <li
              key={step.n}
              className="relative lg:before:absolute lg:before:-left-[25px] lg:before:top-[41px] lg:before:bottom-[41px] lg:before:border-l lg:before:border-dashed lg:before:border-black/40 lg:first:before:hidden"
            >
              <article
                className="noise relative isolate flex h-full min-h-[360px] flex-col overflow-hidden rounded-[20px] p-[25px] inset-shadow-glow"
                style={{ '--noise-alpha': 0.22 } as React.CSSProperties}
              >
                {/* The card's colour is exported artwork, not a CSS gradient. */}
                {/* eslint-disable-next-line @next/next/no-img-element -- exported vector */}
                <img
                  src="/vectors/card-gradient-step.svg"
                  alt=""
                  aria-hidden
                  className="absolute inset-0 -z-10 size-full object-cover"
                />

                <div className="flex items-start gap-[12px]">
                  <span className="grid size-[35px] shrink-0 place-items-center rounded-full border-[1.5px] border-white/90 font-label text-[21px] tracking-[0.1em] text-white">
                    {step.n}
                  </span>
                  <span className="mt-[9px] border-b border-dashed border-white pb-[3px] font-label text-eyebrow leading-[1.3] tracking-[0.1em] text-white uppercase">
                    {step.eyebrow}
                  </span>
                </div>

                <h3 className="mt-[26px] font-display text-step-title leading-[1.05] text-white uppercase">
                  <Lines text={step.title} />
                </h3>

                <p className="mt-[22px] font-sans text-body-sm leading-[1.56] text-white">
                  {step.body}
                </p>
              </article>
            </li>
          ))}
        </ol>

        <div className="mt-[80px] flex justify-center">
          <a
            href="#apply"
            className="grid h-[54px] min-w-[244px] place-items-center rounded-full bg-accent px-8 font-label text-cta font-medium tracking-[0.1em] text-accent-fg shadow-cta transition-transform motion-safe:hover:scale-[1.02]"
          >
            {howToJoin.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
