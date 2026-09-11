import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * This design's type ramp and palette are both custom `text-*` utilities
 * (`text-section` is a size, `text-heading` is a colour). tailwind-merge has no
 * way to tell them apart on its own, so it treats them as one group and keeps
 * only the last — which silently drops font sizes wherever a colour is also
 * applied. Registering the names here keeps both.
 *
 * Anything added to the --text-* or --color-* blocks in globals.css must be
 * listed here too, in the same commit.
 */
const FONT_SIZES = [
  'headline',
  'quote',
  'section',
  'offer-title',
  'attrib',
  'card-title',
  'step-title',
  'lead-lg',
  'quote-sm',
  'lead',
  'cta',
  'body',
  'body-sm',
  'col-head',
  'label',
  'bullet',
  'micro',
  'eyebrow',
];

const COLORS = [
  'page',
  'hero',
  'band',
  'band-warm',
  'fg',
  'fg-muted',
  'heading',
  'accent',
  'accent-fg',
  'navy',
  'pink',
  'ink',
  'olive',
  'stone',
  'line',
  'rule-2',
];

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: FONT_SIZES }],
      'text-color': [{ text: COLORS }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
