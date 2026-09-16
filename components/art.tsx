import { asset } from '@/lib/assets';
import { cn } from '@/lib/utils';

/**
 * A piece of exported Figma artwork, drawn at its artboard size through --k.
 *
 * Two jobs, both of which were being done by hand and drifting:
 *
 * The size comes from design/assets.json, which the export writes from the
 * node's own bounding box — so a wordmark cannot end up at a width nobody
 * checked against Figma, and a redraw that changes its proportions updates
 * everything at once.
 *
 * The rendered size runs through --k like every other dimension on the page,
 * while width/height stay the true pixel values so the browser can reserve the
 * right box before the file loads. A plain <img width={230}> renders at a fixed
 * 230px no matter the viewport, which is exactly the "hard fixed" problem.
 *
 * next/image is deliberately not used: it does not optimise SVG, so it would add
 * a wrapper and a srcset for no benefit.
 */
export function Art({
  name,
  alt = '',
  className,
  fill,
  min,
}: {
  name: string;
  alt?: string;
  className?: string;
  /**
   * Smallest rendered width, in real pixels. Height follows by the artwork's
   * own ratio.
   *
   * --k floors at 0.42, so artwork with no floor of its own draws at 42% on
   * every phone — which turned the footer's 24px icons into 10px smudges and
   * its wordmark into a 97px stamp. Opt-in, because the floor is only right
   * where the artwork is an icon or a mark; a full-width illustration wants to
   * keep scaling all the way down.
   */
  min?: number;
  /**
   * Stretch to the parent instead of drawing at artboard size. For the card
   * backgrounds, whose artwork is a 301x360 rectangle in Figma but has to cover
   * whatever the card actually becomes once the row reflows.
   */
  fill?: boolean;
}) {
  const { file, w, h } = asset(name);
  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG; next/image does not optimise it
    <img
      src={file}
      alt={alt}
      width={w}
      height={h}
      className={cn('block', fill && 'size-full object-cover', className)}
      style={
        fill
          ? undefined
          : {
              width: min ? `max(${min}px, calc(${w} * var(--k)))` : `calc(${w} * var(--k))`,
              height: min
                ? `max(${((min * h) / w).toFixed(2)}px, calc(${h} * var(--k)))`
                : `calc(${h} * var(--k))`,
            }
      }
    />
  );
}
