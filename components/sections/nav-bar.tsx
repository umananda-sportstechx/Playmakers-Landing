import { nav } from '@/lib/content';
import { Art } from '@/components/art';

/**
 * Overlays the hero, so it is absolute here — one of the few places the
 * artboard's absolute positioning survives into the build.
 *
 * Deliberately NOT in .container-page. That container caps at the 1512 artboard
 * and centres, which is right for the body copy but wrong for a nav: on a 1920
 * screen it put 204px of dead space either side of the bar before its own 78px
 * gutter even started, so the mark floated 282px in from the corner. The bar is
 * full-bleed instead and insets by the artboard's own 107, which lands exactly
 * on the design at 1512 and keeps hugging the edges above it.
 *
 * The top offset is 48 rather than the artboard's 85 — asked for directly; the
 * artboard value reads as too much air once the bar is no longer boxed in.
 *
 * Both pills are glass over the hero photograph, not solid fills: the links sit
 * on white at 10%, the LOG IN button on the accent at 5% with a 28px backdrop
 * blur. Flattening either to an opaque colour is the easy mistake and it kills
 * the whole effect.
 */
export function NavBar() {
  return (
    <header className="absolute inset-x-0 top-[calc(48*var(--k))] z-50 px-[calc(107*var(--k))]">
      <div className="flex items-center justify-between gap-[calc(24*var(--k))]">
        <a href="#" aria-label="Playmakers — home">
          <Art name="mark-p" />
        </a>

        <div className="flex items-center gap-[calc(24*var(--k))]">
          <nav
            aria-label="Primary"
            className="hidden h-[calc(58*var(--k))] items-center gap-[calc(36*var(--k))] rounded-full border-[1.5px] border-white/100 bg-white/10 px-[calc(35*var(--k))] shadow-nav backdrop-blur-sm lg:flex"
          >
            {nav.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-label text-label font-medium tracking-[0.1em] text-white transition-opacity hover:opacity-70"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href={nav.cta.href}
            className="grid h-[calc(58*var(--k))] place-items-center rounded-full border-[1.5px] border-accent bg-accent/5 px-[calc(15*var(--k))] font-label text-label font-medium tracking-[0.1em] text-accent backdrop-blur-[28px] transition-colors hover:bg-accent/15"
          >
            {nav.cta.label}
          </a>
        </div>
      </div>
    </header>
  );
}
