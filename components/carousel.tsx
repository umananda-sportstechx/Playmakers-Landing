'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Art } from '@/components/art';
import { cn } from '@/lib/utils';

/**
 * Horizontal scroller with arrow controls and an optional continuous drift.
 *
 * Native overflow scrolling does the work — touch, trackpad and keyboard all
 * come free, so there is no carousel dependency here and no wheel/drag handling
 * to reimplement.
 *
 * With `autoScroll` the children are rendered twice and the scroll position
 * wraps at the halfway mark, which is what makes the loop seamless. Snap is off
 * in that mode: it would keep yanking the track back to a card edge mid-drift.
 * The drift pauses on hover and on focus so it cannot fight someone reading or
 * tabbing through, and never starts at all under prefers-reduced-motion.
 */
const DRIFT_PX_PER_SEC = 24;

/**
 * The track's real flex items.
 *
 * The looping copies are wrapped in `display: contents` elements, which have no
 * box of their own — their children are the flex items. So `track.children`
 * returns wrappers with an offsetLeft of 0 and every measurement taken from it
 * is wrong.
 */
function flexItems(track: HTMLElement): HTMLElement[] {
  const out: HTMLElement[] = [];
  for (const child of Array.from(track.children) as HTMLElement[]) {
    if (getComputedStyle(child).display === 'contents') {
      out.push(...(Array.from(child.children) as HTMLElement[]));
    } else {
      out.push(child);
    }
  }
  return out;
}

export function Carousel({
  children,
  className,
  trackClassName,
  arrowClassName,
  arrow,
  label,
  autoScroll,
  alwaysShowArrows,
  alwaysLoop,
}: {
  children: React.ReactNode;
  className?: string;
  trackClassName?: string;
  arrowClassName?: string;
  /** Asset-name stem of the exported chevron pair, e.g. 'chevron-trusted'. */
  arrow: string;
  label: string;
  /** Drift the rail continuously. 'rtl' moves cards leftward, 'ltr' rightward. */
  autoScroll?: 'ltr' | 'rtl';
  /**
   * Keep the arrows on screen even when everything already fits.
   *
   * Off by default: two arrows that cannot move anything are worse than none.
   * On where the design draws them as part of the composition and the rail is
   * expected to fill up — the testimonials, which ship with two placeholder
   * quotes but will not stay that way.
   */
  alwaysShowArrows?: boolean;
  /**
   * Drift even when the cards already fit.
   *
   * For the built-in placeholder set, which IS the designed full rail: a wide
   * screen where its five cards happen to fit should still move. Uploaded cards
   * get the opposite treatment - see `fits`.
   */
  alwaysLoop?: boolean;
}) {
  const track = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const resumeAt = useRef<number | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  /**
   * How many times the children are repeated, and the width of one repeat.
   *
   * Two copies is not always enough. The loop wraps by exactly one copy, so that
   * wrap point has to be *reachable*: `scrollWidth - clientWidth >= copyWidth`.
   * With five 210px cards on a wide screen one copy is 1383px while the track
   * only scrolls 1215px, so the rail drifted to the end and stopped. Repeating
   * until a copy fits inside the scrollable range fixes it, and on a narrow
   * screen it stays at two.
   */
  const [copies, setCopies] = useState(2);
  const copyWidth = useRef(0);
  /**
   * The real cards already fit the rail, so there is nothing to scroll to.
   *
   * Without this the repeat logic below happily tiled a single card eight times
   * to manufacture something to loop — a CMS gallery with one partner in it
   * rendered as a wall of the same face. When everything is visible the rail
   * should just show it, centred, and stay still.
   */
  const [fits, setFits] = useState(false);
  const looping = Boolean(autoScroll) && (alwaysLoop || !fits);

  useEffect(() => {
    if (!autoScroll) return;
    const el = track.current;
    if (!el) return;
    const measure = () => {
      const items = flexItems(el);
      if (items.length === 0) return;
      const perCopy = Math.max(1, Math.round(items.length / copies));
      const first = items[0];
      const lastOfCopy = items[perCopy - 1];
      if (!first || !lastOfCopy) return;

      // One copy's visible width, with no trailing gap. Measured from the copy
      // itself rather than from the pitch, so it still works once we have
      // collapsed to a single copy and there is no second one to measure to.
      const contentW = lastOfCopy.offsetLeft + lastOfCopy.offsetWidth - first.offsetLeft;
      const fitsNow = contentW <= el.clientWidth + 1;
      setFits(fitsNow);
      // Collapsing to one copy is what makes a fitting rail static. With
      // alwaysLoop the rail still has to wrap, so it needs its copies.
      if (fitsNow && !alwaysLoop) {
        if (copies !== 1) setCopies(1);
        return;
      }

      const second = items[perCopy];
      if (!second) {
        if (copies < 2) setCopies(2);
        return;
      }
      // The distance from one copy's first card to the next copy's first card.
      //
      // NOT scrollWidth / copies: the final copy has no trailing gap, so that
      // average is one gap short of the true repeat — 1395 against 1420 here —
      // and the rail slips by the difference on every single wrap.
      const w = second.offsetLeft - first.offsetLeft;
      if (!w) return;
      copyWidth.current = w;
      const needed = Math.max(2, Math.ceil(el.clientWidth / w) + 1);
      if (needed !== copies) setCopies(needed);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [autoScroll, copies, alwaysLoop]);

  const sync = useCallback(() => {
    const el = track.current;
    if (!el || autoScroll) return; // a looping rail has no start or end
    setAtStart(el.scrollLeft <= 1);
    // 1px of slack: sub-pixel widths otherwise leave the end permanently unreached.
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, [autoScroll]);

  useEffect(() => {
    sync();
    const el = track.current;
    if (!el) return;
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, [sync]);

  useEffect(() => {
    const el = track.current;
    if (!el || !looping) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dir = autoScroll === 'ltr' ? -1 : 1;
    let raf = 0;
    let last = performance.now();
    // The position is accumulated here rather than read back from scrollLeft
    // each frame. At 24px/s a frame advances 0.4px and the browser rounds the
    // stored offset, so reading it back re-quantises to the same integer every
    // frame and the rail never moves at all.
    let pos = el.scrollLeft;

    const tick = (now: number) => {
      const dt = Math.min(now - last, 100) / 1000; // clamp after a background tab
      last = now;
      const copy = copyWidth.current;
      if (!copy) { raf = requestAnimationFrame(tick); return; }
      if (paused.current) {
        // Pick up wherever the arrows or a drag left it. Deliberately no
        // folding here: writing scrollLeft would cancel an arrow's smooth
        // scroll mid-flight.
        pos = el.scrollLeft;
      } else {
        // An arrow press is allowed to run past the end of a copy; fold it back
        // under on the first frame after it settles. The jump is exactly one
        // copy, so it is invisible.
        if (pos >= copy) pos -= copy;
        else if (pos < 0) pos += copy;
        pos += dir * DRIFT_PX_PER_SEC * dt;
        if (pos <= 0) pos += copy;
        else if (pos >= copy) pos -= copy;
        el.scrollLeft = pos;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [looping, copies]);

  /**
   * One card per press.
   *
   * The distance is measured from the first two children rather than assumed,
   * so it is the real pitch including the gap and stays correct as --k scales
   * the cards with the viewport. Paging by a fraction of the track width (or by
   * a screenful of cards) moves the whole rail at once, which loses the reader's
   * place entirely.
   */
  const page = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const [a, b] = flexItems(el);
    const step = a && b ? b.offsetLeft - a.offsetLeft : a ? a.offsetWidth : el.clientWidth;

    paused.current = true;
    if (resumeAt.current) window.clearTimeout(resumeAt.current);

    if (autoScroll && el.scrollLeft + dir * step < 0) {
      // Stepping back off the front: re-enter one copy further along first, so
      // there is room to scroll into. Only this direction needs the jump —
      // going forward simply continues into the next copy, and the drift loop
      // folds the position back under one copy once the scroll settles.
      //
      // Pre-jumping forward as well was the bug behind "one press moves the
      // whole rail": subtracting a copy from a position smaller than a copy
      // gives a negative scrollLeft, the browser clamps it to 0, and the press
      // lands most of a screen backwards.
      el.scrollLeft += copyWidth.current;
    }
    el.scrollBy({ left: dir * step, behavior: 'smooth' });

    resumeAt.current = window.setTimeout(() => {
      paused.current = false;
    }, 900);
  };

  const pause = useCallback(() => {
    paused.current = true;
  }, []);
  const resume = useCallback(() => {
    paused.current = false;
  }, []);

  useEffect(
    () => () => {
      if (resumeAt.current) window.clearTimeout(resumeAt.current);
    },
    []
  );

  return (
    <div className={cn('relative', className)}>
      <div
        ref={track}
        onScroll={sync}
        onPointerEnter={pause}
        onPointerLeave={resume}
        onFocusCapture={pause}
        onBlurCapture={resume}
        // Touch does not reliably fire pointerleave, so a drifting rail could
        // stay paused forever after one tap. Pause on touch start and resume
        // when the finger lifts or the gesture is cancelled.
        onTouchStart={pause}
        onTouchEnd={resume}
        onTouchCancel={resume}
        role="group"
        aria-label={label}
        tabIndex={0}
        className={cn(
          'flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          looping ? 'overscroll-x-contain' : 'snap-x snap-mandatory scroll-smooth',
          // Everything is visible: centre it instead of leaving the cards
          // hugging the left edge with dead space beside them.
          fits && !alwaysLoop && 'justify-center',
          trackClassName
        )}
      >
        {children}
        {/* Repeats make the wrap seamless; hidden from assistive tech so the
            rail reads as its real contents once, not once per copy. */}
        {looping &&
          Array.from({ length: copies - 1 }, (_, i) => (
            <div key={i} className="contents" aria-hidden>
              {children}
            </div>
          ))}
      </div>

      {/* Both ends at once means the content already fits, so there is nowhere
          to page — show no affordance rather than two dead arrows, unless the
          caller wants them held in place. */}
      {(alwaysShowArrows || !(atStart && atEnd && !looping)) && (
        <>
          <Arrow
            side="left"
            arrow={arrow}
            disabled={!looping && atStart}
            onClick={() => page(-1)}
            onHold={pause}
            onRelease={resume}
            className={arrowClassName}
            label={`${label}: previous`}
          />
          <Arrow
            side="right"
            arrow={arrow}
            disabled={!looping && atEnd}
            onClick={() => page(1)}
            onHold={pause}
            onRelease={resume}
            className={arrowClassName}
            label={`${label}: next`}
          />
        </>
      )}
    </div>
  );
}

function Arrow({
  side,
  arrow,
  disabled,
  onClick,
  onHold,
  onRelease,
  className,
  label,
}: {
  side: 'left' | 'right';
  arrow: string;
  disabled: boolean;
  onClick: () => void;
  onHold: () => void;
  onRelease: () => void;
  className?: string;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      onPointerEnter={onHold}
      onPointerLeave={onRelease}
      onFocus={onHold}
      onBlur={onRelease}
      disabled={disabled}
      aria-label={label}
      className={cn(
        // A 44px minimum box around the glyph. At --k's floor the artboard's
        // own 12 padding around a 16px chevron gives a ~17px tap target, which
        // is half the accessible minimum on the device most likely to use it.
        'absolute top-1/2 z-10 grid size-[44px] -translate-y-1/2 place-items-center lg:size-auto lg:p-[calc(12*var(--k))]',
        'transition-[opacity,scale] duration-[80ms] ease-out',
        'hover:opacity-50 active:opacity-100 motion-safe:active:scale-[0.85]',
        // A disabled arrow takes no pointer events, so the states above cannot
        // fight this. 40% rather than 25: where the arrows are held on screen
        // as part of the composition, 25% reads as a rendering fault rather
        // than as an end-of-rail state.
        'disabled:pointer-events-none disabled:opacity-40',
        side === 'left' ? 'left-0' : 'right-0',
        className
      )}
    >
      <Art name={`${arrow}-${side}`} />
    </button>
  );
}
