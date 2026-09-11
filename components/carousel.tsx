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

    el.scrollLeft = 1;
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
      if (paused.current) {
        pos = el.scrollLeft; // pick up wherever the arrows or a drag left it
      } else {
        const half = el.scrollWidth / 2;
        pos += dir * DRIFT_PX_PER_SEC * dt;
        if (pos <= 0) pos += half;
        else if (pos >= half) pos -= half;
        el.scrollLeft = pos;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoScroll]);

  /**
   * Move by whole cards, not by a fraction of the viewport.
   *
   * Paging by `clientWidth * 0.8` leaves a different card part-visible at every
   * screen size and drifts out of step with the snap points; measuring the first
   * two children gives the real card pitch including the gap.
   */
  const page = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const kids = el.children;
    const a = kids[0] as HTMLElement | undefined;
    const b = kids[1] as HTMLElement | undefined;
    const pitch = a && b ? b.offsetLeft - a.offsetLeft : a ? a.offsetWidth : el.clientWidth;
    // As many whole cards as the viewport holds, at least one.
    const step = Math.max(1, Math.floor(el.clientWidth / pitch)) * pitch;

    paused.current = true;
    if (resumeAt.current) window.clearTimeout(resumeAt.current);

    if (autoScroll) {
      // The rail carries two copies, so jumping by exactly one is invisible and
      // keeps the arrows working at either end of the loop.
      const half = el.scrollWidth / 2;
      if (el.scrollLeft + dir * step < 0) el.scrollLeft += half;
      else if (el.scrollLeft + dir * step > el.scrollWidth - el.clientWidth) el.scrollLeft -= half;
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
        {/* Second pass makes the wrap seamless; hidden from assistive tech. */}
        {autoScroll && (
          <div className="contents" aria-hidden>
            {children}
          </div>
        )}
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
