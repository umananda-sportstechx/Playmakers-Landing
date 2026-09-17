import Image from 'next/image';
import { Carousel } from '@/components/carousel';
import { src } from '@/lib/assets';
import { testimonials, type Story } from '@/lib/content';

/**
 * Testimonials — 1434x284, transparent over the page white.
 *
 * Two stories side by side on the artboard (x140 w540, x810 w563), so the pair
 * is a 2-up with a 130 gutter, and the arrows sit right out at the section edges
 * (x34 and x1459) rather than beside the text.
 *
 * The widths matter more than they look. At `w-1/2` plus a gap the two items
 * come to 100% + the gap, which leaves the rail a sliver of scroll — just
 * enough to keep the arrows enabled with nothing to page to, which reads as a
 * broken carousel. Sizing each item to `(100% - gutter) / 2` makes two items
 * exactly fill the rail, so the arrows take themselves away until there is a
 * third story to scroll to.
 */
export function Testimonials({ items = testimonials.items }: { items?: Story[] }) {
  return (
    <section className="bg-page py-[calc(98*var(--k))]">
      <div className="container-page">
        <p className="text-center font-label text-label leading-[1.25] tracking-[0.1em] text-black uppercase">
          {testimonials.eyebrow}
        </p>

        <Carousel
          label="Testimonials"
          arrow="chevron-testimonial"
          // Full-bleed below lg — same negative-margin breakout as the members
          // rail. The lg padding is room for the arrows, which are absolute at
          // the rail's edges; without it they sit on top of the first lines of
          // the quote.
          className="mt-[calc(73*var(--k))] -mx-(--page-inset) lg:mx-0 lg:px-[calc(52*var(--k))]"
          // Unlike the members rail this one SNAPS and is one-up, so a flush
          // edge would put quote text against the glass. The track bleeds and
          // then puts the gutter back as its own padding.
          //
          // scroll-px matters as much as px: snap-start aligns to the scroll
          // port's edge, not the padding box, so without it every quote parks
          // one gutter to the left of where it was padded to.
          //
          // overscroll-x-contain because a full-bleed swipe rail sitting at
          // scrollLeft 0 otherwise hands the gesture to the browser's
          // back-navigation. The members rail gets this from the autoScroll
          // branch in Carousel; this one does not.
          trackClassName="gap-[16px] overscroll-x-contain px-(--page-inset) scroll-px-(--page-inset) lg:gap-[calc(130*var(--k))] lg:px-0 lg:scroll-px-0"
          // Hidden below lg, matching the sibling site. The peeking next quote
          // (see the card width) is what replaces them as the swipe affordance.
          arrowClassName="hidden text-black lg:grid"
          alwaysShowArrows
        >
          {items.map((t, i) => (
            <figure
              key={i}
              // Deliberately narrower than the track's content box below lg, so
              // ~40px of the next quote shows past the right edge. With the
              // arrows hidden and pagination numbers rejected, that peek is the
              // only thing telling a reader there is more than one story.
              className="w-[calc(100%-44px)] shrink-0 snap-start text-center lg:w-[calc((100%-130*var(--k))/2)]"
            >
              <blockquote className="mx-auto lg:max-w-[calc(563*var(--k))] font-sans text-quote-sm leading-[1.42] text-black">
                {t.quote}
              </blockquote>

              <figcaption className="mt-[calc(29*var(--k))] flex items-center justify-center gap-[calc(17*var(--k))]">
                <Image
                  // Per-item photo when the admin supplied one, otherwise the
                  // artboard's avatar — this design always draws a face.
                  src={src(t.photo || '', 'testimonial-avatar')}
                  alt=""
                  width={72}
                  height={72}
                  className="size-[calc(72*var(--k))] shrink-0 rounded-full object-cover"
                />
                <div className="text-left">
                  {/* Teko 300/22 over Space Grotesk 400/11 — the node's base
                      style is Space Mono, but every visible character is
                      overridden to one of these two. */}
                  <p className="font-display text-[max(16px,calc(22*var(--k)))] font-light leading-[1.2] text-black">
                    {t.name}
                  </p>
                  <p className="font-label text-[max(12px,calc(11*var(--k)))] leading-[1.5] text-black">
                    {t.role}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
