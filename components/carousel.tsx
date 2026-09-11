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

  useEffect(() => {
    if (!autoScroll) return;
    const el = track.current;
    if (!el) return;
    const measure = () => {
      const items = flexItems(el);
      const perCopy = items.length / copies;
      const first = items[0];
      const second = items[perCopy];
      if (!first || !second) return;
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
  }, [autoScroll, copies]);

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
    if (!el || !autoScroll) return;
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
  }, [autoScroll, copies]);

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
        role="group"
        aria-label={label}
        tabIndex={0}
        className={cn(
          'flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          autoScroll ? 'overscroll-x-contain' : 'snap-x snap-mandatory scroll-smooth',
          trackClassName
        )}
      >
        {children}
        {/* Repeats make the wrap seamless; hidden from assistive tech so the
            rail reads as its real contents once, not once per copy. */}
        {autoScroll &&
          Array.from({ length: copies - 1 }, (_, i) => (
            <div key={i} className="contents" aria-hidden>
              {children}
            </div>
          ))}
      </div>

      {/* Both ends at once means the content already fits, so there is nowhere
          to page — show no affordance rather than two dead arrows. */}
      {!(atStart && atEnd && !autoScroll) && (
        <>
          <Arrow
            side="left"
            arrow={arrow}
            disabled={!autoScroll && atStart}
            onClick={() => page(-1)}
            onHold={pause}
            onRelease={resume}
            className={arrowClassName}
            label={`${label}: previous`}
          />
          <Arrow
            side="right"
            arrow={arrow}
            disabled={!autoScroll && atEnd}
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
        'absolute top-1/2 z-10 grid -translate-y-1/2 place-items-center p-[calc(12*var(--k))]',
        'transition-[opacity,scale] duration-[80ms] ease-out',
        'hover:opacity-50 active:opacity-100 motion-safe:active:scale-[0.85]',
        // A disabled arrow takes no pointer events, so the states above cannot
        // fight this.
        'disabled:pointer-events-none disabled:opacity-25',
        side === 'left' ? 'left-0' : 'right-0',
        className
      )}
    >
      <Art name={`${arrow}-${side}`} />
    </button>
  );
}
