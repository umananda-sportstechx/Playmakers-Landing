'use client';

import { useSyncExternalStore } from 'react';
import { Art } from '@/components/art';
import { MobileMenuButton, useMobileMenu } from '@/components/mobile-menu';
import { nav } from '@/lib/content';
import { cn } from '@/lib/utils';

/**
 * The bar's resting gap above the page, in artboard pixels.
 *
 * Applied as a `translate`, never as `top` — see the transition note below.
 */
const NAV_REST = 'translate-y-[calc(48*var(--k))]';

const subscribe = (onChange: () => void) => {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
};

/**
 * True once the page has scrolled past the bar's own inset.
 *
 * A dead band rather than a single threshold: the sibling site docks on
 * `scrollY > 16` and undocks on the same number, so parking exactly there makes
 * the bar flicker between states on every sub-pixel scroll. Docking at 24 and
 * releasing at 8 gives it somewhere to settle.
 */
let docked = false;
const isScrolled = () => {
  const y = window.scrollY;
  if (y > 24) docked = true;
  else if (y < 8) docked = false;
  return docked;
};

/**
 * Fixed, and rendered once at page level rather than inside the hero.
 *
 * It used to be `absolute` inside IntroHero, which meant it scrolled away with
 * the hero and never came back, and its z-50 was trapped in the hero's
 * `isolate` stacking context.
 *
 * Two values diverge from the artboard, both asked for directly: the resting
 * top offset is 48 rather than 85, and the LOG IN capsule is padded 30 rather
 * than 15 (browser Space Grotesk sets the label ~19px narrower than Figma does,
 * so the artboard's own 15 came out visibly tighter than the design reads).
 *
 * Both pills are glass over the hero photograph, not solid fills. Flattening
 * either to an opaque colour is the easy mistake and it kills the effect.
 */
export function NavBar() {
  const { open: drawerOpen, lockedY } = useMobileMenu();
  const scrolled = useSyncExternalStore(
    subscribe,
    isScrolled,
    () => false // the server cannot know the scroll position
  );

  return (
    <header
      // While the drawer is out its shell is transformed, and a transformed
      // ancestor becomes the containing block for `fixed` children — a fixed
      // bar would then pin to the top of the *document* and scroll away,
      // taking the close button with it. Anchor to the captured offset.
      style={drawerOpen ? { top: lockedY } : undefined}
      className={cn(
        'inset-x-0 z-50',
        // background-IMAGE, not background-color: the scrim is a gradient, so
        // naming background-color (as the sibling site does) transitions
        // nothing and the glass snaps in. No box-shadow here either — the
        // docked band deliberately has neither rule nor shadow, because the
        // fade is what ends it.
        // The dock rides on `translate`, not `top`, and `top` is deliberately
        // NOT in this list. `top` is what anchors the bar when the drawer
        // switches it to `absolute`, and that value is the scroll offset —
        // transitioning it means opening the drawer sends the bar gliding
        // thousands of pixels down the page over 300ms. Measured at 663px into
        // a 2161px flight. (The sibling site has the same list and the same
        // bug; its pages are just short enough to hide it.)
        'transition-[translate,padding,background-image,backdrop-filter] duration-300',
        drawerOpen ? 'absolute' : 'fixed',
        'top-0',
        // The docked glass is suppressed while the drawer is out, or it paints
        // a translucent strip across the top of the slid page.
        scrolled && !drawerOpen
          ? 'translate-y-0 bg-linear-to-b from-[var(--nav-scrim-from)] to-[var(--nav-scrim-to)] py-[calc(12*var(--k))] backdrop-blur-[11.6px]'
          : NAV_REST
      )}
    >
      <div className="container-page flex items-center justify-between gap-[calc(24*var(--k))]">
        <div className="flex items-center gap-[calc(16*var(--k))]">
          {/* Below lg the links live in the drawer, so this is the only way in
              — and the only way out: it flips to an X, so it must NOT be faded
              while the drawer is open. The click-away overlay behind the page
              and Escape are both invisible affordances on a phone. */}
          <MobileMenuButton className="lg:hidden" />

          <a
            href="/#top"
            aria-label="Playmakers — back to top"
            className="grid min-h-[44px] min-w-[44px] place-items-center lg:min-h-0 lg:min-w-0"
          >
            <Art name="mark-p" />
          </a>
        </div>

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
            className={cn(
              'grid h-[calc(58*var(--k))] min-h-[44px] place-items-center rounded-full border-[1.5px] border-accent bg-accent/5 px-[calc(30*var(--k))]',
              'font-label text-label font-medium tracking-[0.1em] text-accent backdrop-blur-[28px] transition-colors hover:bg-accent/15',
              // On a phone the drawer already carries it; two copies of the
              // same control either side of the slide reads as a duplicate.
              drawerOpen && 'opacity-0'
            )}
          >
            {nav.cta.label}
          </a>
        </div>
      </div>
    </header>
  );
}
