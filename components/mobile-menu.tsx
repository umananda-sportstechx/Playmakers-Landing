'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Art } from '@/components/art';
import { nav } from '@/lib/content';
import { cn } from '@/lib/utils';

/**
 * The mobile drawer, ported from the sibling landing site.
 *
 * The page itself slides right and the drawer sits behind it — it is not an
 * overlay that slides in over the top.
 */
type MenuState = {
  open: boolean;
  toggle: () => void;
  close: () => void;
  /**
   * Scroll offset captured when the drawer opened.
   *
   * The shell is translated while the drawer is out, and a transformed ancestor
   * becomes the containing block for `fixed` descendants — so the fixed nav
   * inside it stops resolving against the viewport and lands at the top of the
   * *document*, scrolling away and taking the close button with it. Anchoring
   * the bar to this offset keeps it at the visible top while it slides with the
   * page.
   */
  lockedY: number;
};

const MobileMenuContext = createContext<MenuState | null>(null);

export function useMobileMenu() {
  const ctx = useContext(MobileMenuContext);
  if (!ctx) throw new Error('useMobileMenu must be used inside <MobileMenuProvider>');
  return ctx;
}

export function MobileMenuProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [lockedY, setLockedY] = useState(0);

  const close = useCallback(() => setOpen(false), []);
  // Captured in the handler, not an effect, so it is read before the scroll
  // lock below takes hold and freezes the value at 0.
  const toggle = useCallback(() => {
    setLockedY(window.scrollY);
    setOpen((v) => !v);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    // The slid page is still full width, so it overhangs the document by the
    // shift. BOTH elements get clipped: locking the body alone leaves the html
    // element scrollable sideways.
    const prevBody = document.body.style.overflow;
    const prevRoot = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevRoot;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  const value = useMemo(() => ({ open, toggle, close, lockedY }), [open, toggle, close, lockedY]);
  return <MobileMenuContext.Provider value={value}>{children}</MobileMenuContext.Provider>;
}

/** The nav's round hamburger. Sits on the hero photograph, so it is glass too. */
export function MobileMenuButton({ className }: { className?: string }) {
  const { open, toggle } = useMobileMenu();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={open ? 'Close menu' : 'Open menu'}
      className={cn(
        // 44px, not the artboard's 38: this is the primary control on a phone
        // and 38 is under the 44 minimum for a touch target.
        'grid size-[44px] shrink-0 place-items-center rounded-full border-[1.5px]',
        'transition-colors duration-[80ms] ease-out',
        open
          ? 'border-white bg-white text-navy'
          : 'border-white/70 bg-white/10 text-white backdrop-blur-sm active:bg-white/20',
        className
      )}
    >
      {open ? (
        <svg viewBox="0 0 24 24" aria-hidden className="size-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path d="M6 6 18 18M18 6 6 18" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden className="size-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path d="M3 6h18M3 12h18M3 18h10" />
        </svg>
      )}
    </button>
  );
}

/** The drawer itself — rendered behind the page, revealed by the slide. */
export function MobileMenuPanel() {
  const { open, close } = useMobileMenu();
  return (
    <>
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={cn(
          'fixed inset-y-0 left-0 z-10 w-[min(87.3%,351px)] lg:hidden',
          // The page does the pushing; the panel travels a short way with it so
          // it arrives rather than being uncovered fully formed.
          //
          // `translate`, not `transform`: Tailwind v4 emits translate-x-* to the
          // translate property, so naming transform here animates nothing and
          // the panel snaps into place.
          'transition-[translate,opacity] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
          open ? 'translate-x-0 opacity-100' : 'pointer-events-none -translate-x-8 opacity-0'
        )}
      >
        {/* Grain lives on this inner box: the `noise` utility sets
            position: relative, which would undo the fixed panel above it. */}
        <div
          className="noise h-full overflow-y-auto bg-hero px-[30px] py-[26px]"
          style={{ '--noise-alpha': 0.16 } as React.CSSProperties}
        >
          <Art name="mark-p" />

          <nav aria-label="Mobile" className="mt-[56px] flex flex-col gap-[2px]">
            {nav.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={close}
                tabIndex={open ? undefined : -1}
                className="block py-[14px] font-label text-[18px] leading-none font-medium tracking-[0.1em] text-white transition-opacity duration-[80ms] ease-out hover:opacity-70 active:opacity-50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={nav.cta.href}
            onClick={close}
            tabIndex={open ? undefined : -1}
            // Width pinned to the REVEAL, not the panel. The panel is wider than
            // the page slides (340 against 275 at 390px) so that the shell's
            // 41px rounded corner has something behind it — which means the
            // right ~65px of the panel sits underneath the page. The links are
            // left-aligned so they never notice; a full-width centred pill gets
            // its end cut off and its label thrown off-centre.
            className="mt-[40px] grid h-[52px] w-[calc(min(70.4vw,283px)-60px)] place-items-center rounded-full border-[1.5px] border-accent bg-accent/5 font-label text-[16px] font-medium tracking-[0.1em] text-accent"
          >
            {nav.cta.label}
          </a>
        </div>
      </div>

      {/* The shell's own rounded corner belongs to the top of the *document*, so
          it scrolls out of view and the page reads square once you have moved
          down. This repaints the same 41 corner at the viewport's edge instead.
          It has to be a sibling of the shell: inside it, `fixed` would resolve
          against the transform. */}
      <span
        aria-hidden
        className={cn(
          'corner-notch pointer-events-none fixed top-0 left-[min(70.4%,283px)] z-30 size-[41px] transition-opacity duration-[420ms] motion-reduce:transition-none lg:hidden',
          open ? 'opacity-100' : 'opacity-0'
        )}
      >
        <span
          className="noise block size-full bg-hero"
          style={{ '--noise-alpha': 0.16 } as React.CSSProperties}
        />
      </span>
    </>
  );
}

/**
 * Wraps the page content and performs the slide.
 *
 * `nav` is taken separately from `children` so the page can be dimmed behind
 * the bar while the bar itself stays crisp. Note the transform's side effect:
 * while it is applied this element becomes the containing block for any
 * `position: fixed` descendant, which is why NavBar switches to `absolute` at
 * the captured scroll offset while the drawer is out.
 */
export function MobileMenuShell({ nav, children }: { nav: React.ReactNode; children: React.ReactNode }) {
  const { open, close } = useMobileMenu();
  return (
    <div
      className={cn(
        // page-rig lives here, not on an inner wrapper: the nav is a child of
        // this shell, and outside .page-rig every calc(N * var(--k)) in it
        // falls back to the :root 1px and the bar stops scaling.
        'page-rig relative z-20 min-h-dvh bg-page',
        'transition-[translate,border-radius,box-shadow] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
        open &&
          'translate-x-[min(70.4%,283px)] overflow-hidden rounded-tl-[41px] border-l-2 border-[#bebebe]/40 shadow-[-11px_0_42.2px_rgb(0_0_0/0.13)]'
      )}
    >
      {nav}

      <div
        className={cn(
          'transition-[opacity,filter] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
          open && 'opacity-[0.87] blur-[2px]'
        )}
      >
        {children}
      </div>

      {/* Click-away target, only while the drawer is out. Below the nav so the
          close button stays clickable. */}
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={close}
          className="absolute inset-0 z-40 cursor-pointer bg-transparent lg:hidden"
        />
      )}
    </div>
  );
}
