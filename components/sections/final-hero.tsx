import { FigmaImage } from '@/components/figma-image';
import { Art } from '@/components/art';
import { Lines } from '@/components/lines';
import { src } from '@/lib/assets';
import { finalHero } from '@/lib/content';

/**
 * Final Hero — 1512x693. Same construction as the intro hero (cover photo, navy
 * wash, wordmark, headline, pink pill) at roughly two-thirds the height.
 *
 * The artboard's own "Gradient Overlay" layer here is switched off, as is its
 * "BG Detail" rig, so the scrim below is the section's only tint. Without some
 * wash the white headline sits on a bright locker-room wall and stops being
 * readable, which is presumably why the flat navy background is left visible
 * through the photograph's edges.
 */
export function FinalHero() {
  return (
    <section
      id="apply"
      className="noise relative isolate flex min-h-[max(440px,calc(693*var(--k)))] flex-col items-center justify-center overflow-hidden bg-hero px-[calc(16*var(--k))] text-center"
      style={{ '--noise-alpha': 0.16 } as React.CSSProperties}
    >
      {/* The source is a tall portrait shot; the artboard's crop shows a
          horizontal slice of it (sy = 0.305), which object-fit could not pick. */}
      <FigmaImage
        src={src('final-hero-bg')}
        className="-z-10"
        fill={{
          exposure: -0.33,
          saturation: 0.4,
          transform: [
            [1, 0, 0],
            [0, 0.30528947710990906, 0.32554885745048523],
          ],
        }}
      />
      {/* This section carries TWO layers named "Gradient Overlay"; the second
          (at 0.68) is switched off, this one is not. Worth stating because a
          hidden-layer audit that matches on name alone concludes there is no
          scrim here at all — and the raw photograph is a pale beige locker
          room, so without this the white headline vanishes. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'linear-gradient(to bottom,' +
            ' rgb(17 17 51 / 1) 0%,' +
            ' rgb(17 17 51 / 0.4) 45%,' +
            ' rgb(17 17 51 / 0.4) 60%,' +
            ' rgb(17 17 51 / 1) 100%)',
        }}
      />

      <Art name="wordmark-final" alt="Playmakers" />

      <h2 className="mt-[calc(38*var(--k))] max-w-[calc(1128*var(--k))] font-display text-headline font-light leading-[1.03] text-white uppercase">
        <Lines text={finalHero.headline} />
      </h2>

      <p className="mt-[calc(26*var(--k))] lg:max-w-[calc(560*var(--k))] font-sans text-lead-lg font-medium leading-[1.46] text-white/80">
        <Lines text={finalHero.lead} />
      </p>

      <a
        href="#apply"
        className="mt-[calc(46*var(--k))] grid h-[calc(54*var(--k))] min-w-[calc(356*var(--k))] place-items-center rounded-full bg-accent px-[calc(32*var(--k))] font-label text-cta font-medium tracking-[0.1em] text-accent-fg shadow-cta transition-transform motion-safe:hover:scale-[1.02]"
      >
        {finalHero.cta}
      </a>
    </section>
  );
}
