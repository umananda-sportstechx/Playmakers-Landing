import { FigmaImage } from '@/components/figma-image';
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
      className="noise relative isolate flex min-h-[693px] flex-col items-center justify-center overflow-hidden bg-hero px-4 text-center"
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

      {/* eslint-disable-next-line @next/next/no-img-element -- exported vector */}
      <img
        src="/vectors/wordmark-final.svg"
        alt="Playmakers"
        width={432}
        height={76}
        className="block w-[min(432px,70vw)]"
      />

      <h2 className="mt-[38px] max-w-[1128px] font-display text-headline font-light leading-[1.03] text-white uppercase">
        <Lines text={finalHero.headline} />
      </h2>

      <p className="mt-[26px] max-w-[560px] font-sans text-lead-lg font-medium leading-[1.46] text-white/80">
        <Lines text={finalHero.lead} />
      </p>

      <a
        href="#apply"
        className="mt-[46px] grid h-[54px] min-w-[356px] place-items-center rounded-full bg-accent px-8 font-label text-cta font-medium tracking-[0.1em] text-accent-fg shadow-cta transition-transform motion-safe:hover:scale-[1.02]"
      >
        {finalHero.cta}
      </a>
    </section>
  );
}
