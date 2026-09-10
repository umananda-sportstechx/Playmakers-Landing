'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Horizontal scroller with arrow controls.
 *
 * Scroll-snap does the work; the arrows page by roughly one viewport. No
 * carousel dependency — native overflow scrolling already gives touch,
 * trackpad and keyboard behaviour for free.
 *
 * Adapted from the sibling landing site's version with the auto-drift half
 * removed: nothing on this page marquees, and that code carried a rAF loop, a
 * duplicated child pass and a pause/resume protocol that would all be dead
 * weight here. The arrows are the design's own exported chevrons rather than an
 * icon library, so this component pulls in no dependency at all.
 */
export function Carousel({
  children,
  className,
  trackClassName,
  arrowClassName,
  arrow,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  trackClassName?: string;
  arrowClassName?: string;
  /** Exported chevron pair, e.g. { src: '/vectors/chevron-trusted', w: 16, h: 37 } */
  arrow: { src: string; w: number; h: number };
  label: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const sync = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    // 1px of slack: sub-pixel widths otherwise leave the end permanently unreached.
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    sync();
    const el = track.current;
    if (!el) return;
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, [sync]);

  const page = (dir: 1 | -1) => {
    track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <div className={cn('relative', className)}>
      <div
        ref={track}
        onScroll={sync}
        role="group"
        aria-label={label}
        tabIndex={0}
        className={cn(
          'flex snap-x snap-mandatory scroll-smooth overflow-x-auto',
          '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          trackClassName
        )}
      >
        {children}
      </div>

      {/* Both ends at once means the content already fits, so there is nowhere
          to page — show no affordance rather than two dead arrows. */}
      {!(atStart && atEnd) && (
        <>
          <Arrow
            side="left"
            arrow={arrow}
            disabled={atStart}
            onClick={() => page(-1)}
            className={arrowClassName}
            label={`${label}: previous`}
          />
          <Arrow
            side="right"
            arrow={arrow}
            disabled={atEnd}
            onClick={() => page(1)}
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
  className,
  label,
}: {
  side: 'left' | 'right';
  arrow: { src: string; w: number; h: number };
  disabled: boolean;
  onClick: () => void;
  className?: string;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        'absolute top-1/2 z-10 grid -translate-y-1/2 place-items-center p-3',
        'transition-[opacity,scale] duration-[80ms] ease-out',
        'hover:opacity-50 active:opacity-100 motion-safe:active:scale-[0.85]',
        // A disabled arrow takes no pointer events, so the states above cannot
        // fight this.
        'disabled:pointer-events-none disabled:opacity-25',
        side === 'left' ? 'left-0' : 'right-0',
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- next/image does
          not optimise SVG, so it is pure overhead for an exported vector. */}
      <img
        src={`${arrow.src}-${side}.svg`}
        alt=""
        width={arrow.w}
        height={arrow.h}
        className="block"
      />
    </button>
  );
}
