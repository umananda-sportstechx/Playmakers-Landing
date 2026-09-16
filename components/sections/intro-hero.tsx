import Image from 'next/image';
import { Art } from '@/components/art';
import { Lines } from '@/components/lines';
import { src } from '@/lib/assets';
import { hero } from '@/lib/content';

/**
 * Intro Hero — 1512x1004 on the artboard.
 *
 * The height is also capped to the viewport: 1004 artboard pixels is taller than
 * a 1080p laptop's usable height once browser chrome is taken off, and a hero
 * whose call to action sits below the fold on the most common desktop size is
 * not doing its job.
 *
 * The photograph is drawn 2730x1536 and bled well past the frame, so it is a
 * cover fill rather than a sized image. Over it sits a four-stop vertical
 * gradient of the page navy (0.80 → 0.40 → 0.40 → 1.00), which is what keeps
 * the headline legible against the busy middle of the shot.
 *
 * The nav bar is NOT here any more. It used to be an absolute child of this
 * section, which meant it scrolled away with the hero and never came back, and
 * its z-index was trapped in this section's `isolate` stacking context. It is
 * fixed at page level now, in app/layout.tsx.
 *
 * Not built: the "Trust Partners" logo row (FIFA / Juventus / BCG / GSIC / …)
 * and a "BG Detail" rig of green gradient squares. Both are switched off in the
 * design — see scripts/fig-pull.mjs --check, which fails the build if that
 * changes without anyone noticing.
 */
export function IntroHero() {
  return (
    <section
      className="noise relative isolate flex min-h-[min(100svh,max(560px,calc(1004*var(--k))))] flex-col items-center justify-center overflow-hidden bg-hero px-[calc(16*var(--k))] text-center"
      style={{ '--noise-alpha': 0.16 } as React.CSSProperties}
    >
      {/* 0.41 fill-opacity on the artboard, over the frame's navy. */}
      <Image
        src={src('hero-bg')}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover opacity-[0.41]"
      />
      {/* The artboard's scrim is a four-stop gradient whose handles span only
          y 0.332 → 0.883 of the frame, not the whole height — so the 0.80 top
          stop holds flat over the first third and the 1.00 bottom stop over the
          last eighth. Those percentages below are that mapping worked out; a
          plain from/via/to ramp lightens the middle far too early. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'linear-gradient(to bottom,' +
            ' rgb(17 17 51 / 0.8) 0%,' +
            ' rgb(17 17 51 / 0.8) 33.17%,' +
            ' rgb(17 17 51 / 0.4) 43.27%,' +
            ' rgb(17 17 51 / 0.4) 71.80%,' +
            ' rgb(17 17 51 / 1) 88.35%)',
        }}
      />

      <div className="flex w-full max-w-[calc(1128*var(--k))] flex-col items-center">
        <Art name="wordmark-hero" alt="Playmakers" />

        <h1 className="mt-[calc(41*var(--k))] font-display text-headline font-light leading-[1.03] text-white">
          <Lines text={hero.headline} />
        </h1>

        <a
          href="#apply"
          className="mt-[calc(46*var(--k))] grid h-[calc(54*var(--k))] min-w-[calc(304*var(--k))] place-items-center rounded-full bg-accent px-[calc(32*var(--k))] font-label text-cta font-medium tracking-[0.1em] text-accent-fg shadow-cta transition-transform motion-safe:hover:scale-[1.02]"
        >
          {hero.cta}
        </a>
      </div>
    </section>
  );
}
