import { nav } from '@/lib/content';

/**
 * Overlays the hero (y85 inside the 1004-tall Intro Hero), so it is absolute
 * here — one of the few places the artboard's absolute positioning survives
 * into the build.
 *
 * Both pills are glass over the hero photograph, not solid fills: the links sit
 * on white at 10%, the LOG IN button on the accent at 5% with a 28px backdrop
 * blur. Flattening either to an opaque colour is the easy mistake and it kills
 * the whole effect.
 */
export function NavBar() {
  return (
    <header className="absolute inset-x-0 top-[85px] z-50">
      <div className="container-page flex items-center justify-between gap-6">
        <a href="#" aria-label="Playmakers — home">
          {/* eslint-disable-next-line @next/next/no-img-element -- exported vector; next/image does not optimise SVG */}
          <img src="/vectors/mark-p.svg" alt="" width={37} height={44} className="block h-11 w-auto" />
        </a>

        <div className="flex items-center gap-6">
          <nav
            aria-label="Primary"
            className="hidden h-[58px] items-center gap-[36px] rounded-full border-[1.5px] border-white/100 bg-white/10 px-[35px] shadow-nav backdrop-blur-sm lg:flex"
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
            className="grid h-[58px] place-items-center rounded-full border-[1.5px] border-accent bg-accent/5 px-[15px] font-label text-label font-medium tracking-[0.1em] text-accent backdrop-blur-[28px] transition-colors hover:bg-accent/15"
          >
            {nav.cta.label}
          </a>
        </div>
      </div>
    </header>
  );
}
