import { Bebas_Neue, Inter, Space_Grotesk, Teko } from 'next/font/google';

/**
 * The design uses four families. Counts are visible (non-whitespace) characters
 * across every text node in the Figma file:
 *
 *   Inter          2952   body copy
 *   Space Grotesk  1132   eyebrows, labels, buttons, vertical card tags
 *   Teko            597   all display headings
 *   Bebas Neue       17   two footer column heads, and nothing else
 *
 * The file also references **New Frank**, **Space Mono** and **CommitMono**, but a
 * per-character audit found New Frank and Space Mono applied to zero visible
 * characters — they sit on a single space in the Trusted-by caption and on an
 * otherwise-overridden base style. CommitMono covers 23 characters on one card
 * whose six siblings all use Space Grotesk, so it reads as a slip rather than
 * intent. None of the three are loaded here; adding them would cost three font
 * downloads to render nothing. See app/globals.css for where each family lands.
 *
 * All four are variable fonts except Bebas Neue, so only Bebas takes a `weight`.
 * Passing `weight` to a variable font pins it to static instances and downloads
 * more than the single variable file.
 */

export const teko = Teko({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-teko',
});

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bebas-neue',
});
