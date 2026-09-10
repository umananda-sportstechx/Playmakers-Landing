'use client';

import { useState, type CSSProperties } from 'react';
import { Art } from '@/components/art';
import Image from 'next/image';
import { cssFilter } from '@/components/figma-image';
import { Lines } from '@/components/lines';
import { src } from '@/lib/assets';
import { cn } from '@/lib/utils';
import type { Offer } from '@/lib/content';

/**
 * The stacked card deck in Membership Offers.
 *
 * This is deliberately NOT the Carousel: nothing scrolls. Three cards sit on
 * top of each other and swap depth.
 *
 * The artboard's three cards measure out as
 *   card 1  1040x643 @ x78  y1922
 *   card 2  1040x613 @ x233 y1937
 *   card 3  1040x583 @ x388 y1952
 * — exactly linear, +155x / +15y / -30h per step back. So there are no
 * per-card constants: one formula driven by a slot index does all three, which
 * is also what makes an arbitrary number of cards work later.
 *
 * Sizes are in artboard units multiplied by --k (set on the rig from a
 * container query), so the whole composition scales in proportion instead of
 * each dimension drifting independently. Below lg the deck un-stacks into a
 * plain vertical list and the mechanism goes away entirely.
 */
export function MembershipDeck({ cards }: { cards: Offer[] }) {
  const [front, setFront] = useState(0);
  const slotOf = (i: number) => (i - front + cards.length) % cards.length;
  const step = (dir: 1 | -1) => setFront((f) => (f + dir + cards.length) % cards.length);

  return (
    <div>
      <div className="deck-rig relative lg:h-[calc(643*var(--k))]">
        {/* Stacked at lg and up; a plain list below it. */}
        <div className="flex flex-col gap-8 lg:block">
          {cards.map((card, i) => {
            const slot = slotOf(i);
            return (
              <article
                key={card.n}
                style={{ '--slot': slot } as CSSProperties}
                className={cn(
                  'deck-card noise relative isolate overflow-hidden rounded-[calc(20*var(--k))] shadow-card inset-shadow-glow',
                  'lg:absolute lg:top-0 lg:left-0'
                )}
                // Only the front card is reachable; the two behind show nothing
                // but their tag strip, so their content would be noise to a
                // screen reader, and their links must not be tabbable.
                aria-hidden={slot !== 0}
                inert={slot !== 0}
              >
                {/* The card's colour is exported artwork, not a CSS gradient. */}
                {/* eslint-disable-next-line @next/next/no-img-element -- exported vector */}
                <img
                  src={`/vectors/card-offer-${card.n}-gradient.svg`}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 -z-10 size-full object-cover"
                />

                {/* Photo, right-hand third of the card. Front card only — it is
                    covered on the others. */}
                {slot === 0 && (
                  <div
                    className="absolute inset-y-0 right-0 -z-10 hidden w-[calc(434*var(--k))] opacity-[0.61] lg:block"
                    // SOFT_LIGHT on the artboard, at 0.61. Without the blend the
                    // photo sits on top of the card as a hard rectangle instead
                    // of sinking into the gradient behind it.
                    style={{ mixBlendMode: 'soft-light' }}
                  >
                    <Image
                      src={src('offer-card-photo')}
                      alt=""
                      fill
                      sizes="434px"
                      className="object-cover"
                      style={{ filter: cssFilter({ exposure: 0.3, contrast: -0.25, saturation: -1 }) }}
                    />
                  </div>
                )}

                <div className="flex h-full">
                  <div className="min-w-0 flex-1 p-[calc(28*var(--k))] lg:w-[calc(544*var(--k))] lg:flex-none lg:p-[calc(66*var(--k))] lg:pl-[calc(76*var(--k))]">
                    <h3 className="font-display text-offer-title leading-[0.96] tracking-[0.1em] text-white uppercase">
                      <Lines text={card.title} />
                    </h3>

                    <p className="mt-[calc(22*var(--k))] font-sans text-body leading-[1.72] text-white">
                      <strong className="font-semibold">{card.leadIn}</strong>
                      {card.body}
                    </p>

                    <ul className="mt-[calc(30*var(--k))] space-y-[calc(30*var(--k))]">
                      {card.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-[calc(23*var(--k))]">
                          <Art name="icon-bullet" className="mt-[calc(4*var(--k))] shrink-0" />
                          <span className="font-label text-bullet leading-[1.27] text-white">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tag strip — the only part of a back card that shows. */}
                  <div className="ml-auto hidden shrink-0 flex-col items-center gap-[calc(34*var(--k))] p-[calc(24*var(--k))] lg:flex">
                    <span className="grid size-[calc(52*var(--k))] shrink-0 place-items-center rounded-full border-2 border-white font-label text-[calc(28*var(--k))] tracking-[0.1em] text-white">
                      {card.n}
                    </span>
                    <span
                      className="font-label text-micro leading-[1.29] tracking-[0.15em] whitespace-nowrap text-white uppercase"
                      style={{ writingMode: 'vertical-rl' }}
                    >
                      {card.tag}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Controls — hidden below lg, where every card is already visible. */}
      <div className="mt-[calc(52*var(--k))] hidden items-center justify-center gap-[calc(30*var(--k))] lg:flex">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous offer"
          className="p-[calc(12*var(--k))] transition-opacity hover:opacity-50 motion-safe:active:scale-[0.85]"
        >
          <Art name="chevron-offers-left" />
        </button>

        <ol className="flex items-center gap-[calc(52*var(--k))]">
          {cards.map((card, i) => (
            <li key={card.n}>
              <button
                type="button"
                onClick={() => setFront(i)}
                aria-label={`Show ${card.tag}`}
                aria-current={slotOf(i) === 0}
                className={cn(
                  'font-label text-[max(15px,calc(18*var(--k)))] tracking-[0.1em] transition-colors',
                  slotOf(i) === 0 ? 'text-[#4b4b4b]' : 'text-[#8a8a8a] hover:text-[#4b4b4b]'
                )}
              >
                {card.n}
              </button>
            </li>
          ))}
        </ol>

        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next offer"
          className="p-[calc(12*var(--k))] transition-opacity hover:opacity-50 motion-safe:active:scale-[0.85]"
        >
          <Art name="chevron-offers-right" />
        </button>
      </div>
    </div>
  );
}
