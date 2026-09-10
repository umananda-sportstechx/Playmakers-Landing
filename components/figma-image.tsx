import Image from 'next/image';
import type { CSSProperties } from 'react';

/**
 * An image placed the way Figma places it.
 *
 * A Figma IMAGE fill is not just a src. It carries two things that are easy to
 * miss in the REST payload and very visible when you skip them:
 *
 *   filters        exposure / contrast / saturation, applied to the pixels.
 *                  The Team background is `saturation: -1, exposure: -0.62` —
 *                  drop it and a photograph of green stadium seats stays green
 *                  where the design shows a grey-navy field.
 *
 *   imageTransform an affine crop matrix, [[sx, 0, tx], [0, sy, ty]], in
 *                  normalised image space. The Final Hero background is a tall
 *                  portrait photo with sy = 0.305 — Figma shows a horizontal
 *                  slice a third of the way down. `object-fit: cover` picks a
 *                  different slice entirely.
 *
 * Rather than reproduce that arithmetic at four call sites, it lives here.
 *
 * Figma's exposure is in stops, so the brightness multiplier is 2^exposure.
 * Its saturation and contrast run -1..1 around 0, where CSS wants 0..2 around 1.
 */
export type FigmaFill = {
  /** Figma `fills[].filters` */
  exposure?: number;
  contrast?: number;
  saturation?: number;
  /** Figma `fills[].imageTransform` */
  transform?: [[number, number, number], [number, number, number]];
  /** Figma `fills[].opacity` */
  fillOpacity?: number;
};

export function cssFilter({ exposure, contrast, saturation }: FigmaFill): string | undefined {
  const parts: string[] = [];
  if (saturation != null) parts.push(`saturate(${(1 + saturation).toFixed(3)})`);
  if (contrast != null) parts.push(`contrast(${(1 + contrast).toFixed(3)})`);
  if (exposure != null) parts.push(`brightness(${Math.pow(2, exposure).toFixed(3)})`);
  return parts.length ? parts.join(' ') : undefined;
}

/**
 * Turn Figma's crop matrix into the box that shows exactly that sub-rectangle.
 *
 * This goes on a wrapper, not on the image: next/image with `fill` rejects a
 * style.width outright ("Images with fill always use width 100%"), so the
 * oversize-and-offset has to happen one level up. The enclosing section is
 * `overflow-hidden`, which is what crops it back to the visible window.
 */
function cropBox(t: FigmaFill['transform']): CSSProperties {
  if (!t) return { inset: 0 };
  const [[sx, , tx], [, sy, ty]] = t;
  return {
    width: `${(100 / sx).toFixed(3)}%`,
    height: `${(100 / sy).toFixed(3)}%`,
    left: `${((-tx / sx) * 100).toFixed(3)}%`,
    top: `${((-ty / sy) * 100).toFixed(3)}%`,
  };
}

export function FigmaImage({
  src,
  alt = '',
  fill: fillSpec,
  className,
  sizes = '100vw',
  priority,
}: {
  src: string;
  alt?: string;
  fill: FigmaFill;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        ...cropBox(fillSpec.transform),
        filter: cssFilter(fillSpec),
        opacity: fillSpec.fillOpacity,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        // A cropped fill is stretched to its box in Figma, not letterboxed.
        style={{ objectFit: fillSpec.transform ? 'fill' : 'cover' }}
      />
    </div>
  );
}
