'use client';

import { useState, type CSSProperties } from 'react';
import Image from 'next/image';
import { Art } from '@/components/art';
import { cssFilter } from '@/components/figma-image';
import { Lines } from '@/components/lines';
import { src } from '@/lib/assets';
import { cn } from '@/lib/utils';
import type { Offer } from '@/lib/content';

/**
 * The stacked card deck in Membership Offers.
 *
 * Not the Carousel: nothing scrolls. Three cards sit on top of each other and
 * swap depth. The artboard's three measure out as
 *   card 1  1040x643 @ x78  y1922
 *   card 2  1040x613 @ x233 y1937
 *   card 3  1040x583 @ x388 y1952
 * — exactly linear, +155x / +15y / -30h per step back, so one formula driven by
 * a slot index does all three.
 *
 * Every number below is an artboard pixel through --k. Positions inside a card
 * are measured from its own origin (78, 1922):
 *   details   76 left, 66 top          photo     606 left, 434x642
 *   title     Teko 400/56, ls 0.1em    body      +131, Inter 400/18, lh 31
 *   points    +331, 68 apart           tag       910 left, 73 top
 *
 * The card is TWO stacked artworks, not one. "Item card" is an opaque white
 * base and "Gradient colouring" sits on it — and that gradient is only 88%
 * opaque at one end, so painting it alone lets the cards behind show straight
 * through. That was why the deck looked translucent and the text appeared
 * doubled: it was the card behind bleeding through the front one.
 */
export function MembershipDeck({ cards }: { cards: Offer[] }) {
  const [front, setFront] = useState(0);
  const slotOf = (i: number) => (i - front + cards.length) % cards.length;
  const step = (dir: 1 | -1) => setFront((f) => (f + dir + cards.length) % cards.length);

  return (
    <div className="deck-rig relative">
      {/* Stacked at lg and up; a plain list below it. */}
      <div className="flex flex-col gap-[calc(32*var(--k))] lg:block">
        {cards.map((card, i) => {
          const slot = slotOf(i);
          const isFront = slot === 0;
          return (
            <article
              key={card.n}
              style={{ '--slot': slot, '--noise-alpha': 0.18 } as CSSProperties}
              className={cn(
                'deck-card noise relative isolate overflow-hidden rounded-[calc(20*var(--k))] shadow-card inset-shadow-glow',
                // The front card stays in flow so the rig takes its height;
                // the others stack behind it.
                isFront ? 'lg:relative' : 'lg:absolute lg:top-0 lg:left-0'
              )}
            >
              {/* Opaque base first, then the colour over it. */}
              <Art name={`card-offer-${card.n}-base`} fill className="absolute inset-0 -z-20" />
              <Art name={`card-offer-${card.n}-gradient`} fill className="absolute inset-0 -z-10" />

              {/* Photo fills the right 434 of the card. Front card only — it is
                  covered on the others. */}
              {isFront && (
                <div
                  className="absolute inset-y-0 right-0 -z-10 hidden w-[calc(434*var(--k))] opacity-[0.61] lg:block"
                  // SOFT_LIGHT at 0.61 on the artboard. Without the blend the
                  // photo sits on the card as a hard rectangle instead of
                  // sinking into the gradient behind it.
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

              {/* inert sits on the copy, not the card. On the card it also
                  killed pointer events, so a card behind could not be clicked
                  to bring it forward. */}
              <div className="p-[calc(32*var(--k))] lg:p-0" aria-hidden={!isFront} inert={!isFront}>
                <div className="lg:w-[calc(544*var(--k))] lg:pt-[calc(66*var(--k))] lg:pl-[calc(76*var(--k))]">
                  <h3 className="font-display text-offer-title leading-[0.96] tracking-[0.1em] text-white uppercase">
                    <Lines text={card.title} />
                  </h3>

                  <p className="mt-[calc(31*var(--k))] font-sans text-body leading-[1.72] text-white">
                    <strong className="font-semibold">{card.leadIn}</strong>
                    {card.body}
                  </p>

                  <ul className="mt-[calc(31*var(--k))] space-y-[calc(30*var(--k))]">
                    {card.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-[calc(21*var(--k))]">
                        {/* A white tick on a 34px pink disc, not a bare tick. */}
                        <span className="grid size-[calc(34*var(--k))] shrink-0 place-items-center rounded-full bg-accent">
                          <Art name="icon-bullet" />
                        </span>
                        <span className="max-w-[calc(484*var(--k))] font-label text-bullet leading-[1.27] text-white">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tag strip — the only part of a card behind that shows. */}
              <div
                aria-hidden
                className="absolute top-[calc(73*var(--k))] right-[calc(78*var(--k))] hidden w-[calc(52*var(--k))] flex-col items-center lg:flex"
              >
                <span className="relative grid size-[calc(52*var(--k))] place-items-center">
                  <Art name="circle-52" className="absolute inset-0" />
                  <span className="relative font-label text-[calc(28*var(--k))] leading-none tracking-[0.1em] text-white">
                    {card.n}
                  </span>
                </span>

                <span className="mt-[calc(34*var(--k))] flex items-start gap-[calc(13*var(--k))]">
                  <span aria-hidden className="h-[calc(331*var(--k))] w-px bg-white/60" />
                  <span
                    className="font-label text-micro leading-none tracking-[0.15em] whitespace-nowrap text-white uppercase"
                    style={{ writingMode: 'vertical-rl' }}
                  >
                    {card.tag}
                  </span>
                </span>
              </div>
              {/* A card behind is its own control: click anywhere on the part
                  of it you can see to bring it forward. A real button, so it is
                  reachable by keyboard and announced with the card's subject
                  rather than being a click handler on a div. */}
              {!isFront && (
                <button
                  type="button"
                  onClick={() => setFront(i)}
                  aria-label={`Show ${card.tag}`}
                  className="absolute inset-0 z-20 hidden cursor-pointer lg:block"
                />
              )}
            </article>
          );
        })}
      </div>

      {/* Arrows sit beside the deck, vertically centred on it — x27 and x1459 on
          the artboard, against a deck that runs x78..x1428. Hidden below lg,
          where every card is already visible in a list. */}
      <DeckArrow side="left" onClick={() => step(-1)} />
      <DeckArrow side="right" onClick={() => step(1)} />
    </div>
  );
}

function DeckArrow({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === 'left' ? 'Previous offer' : 'Next offer'}
      className={cn(
        'absolute top-[calc(321*var(--k))] z-10 hidden -translate-y-1/2 p-[calc(12*var(--k))] lg:block',
        'transition-[opacity,scale] duration-[80ms] ease-out',
        'hover:opacity-50 active:opacity-100 motion-safe:active:scale-[0.85]',
        // 40px of clear air between the chevron and the card on both sides.
        // The button is 12 + 16 glyph + 12 = 40 wide, so the offset is 68: at
        // the artboard's own -51/-31 the right-hand button actually overlapped
        // the deck by 9px.
        side === 'left' ? 'left-[calc(-68*var(--k))]' : 'right-[calc(-68*var(--k))]'
      )}
    >
      <Art name={`chevron-offers-${side}`} />
    </button>
  );
}
