import Image from 'next/image';
import { Carousel } from '@/components/carousel';
import { src } from '@/lib/assets';
import { testimonials } from '@/lib/content';

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
export function Testimonials() {
  return (
    <section className="bg-page py-[calc(98*var(--k))]">
      <div className="container-page">
        <p className="text-center font-label text-label leading-[1.25] tracking-[0.1em] text-black uppercase">
          {testimonials.eyebrow}
        </p>

        <Carousel
          label="Testimonials"
          arrow="chevron-testimonial"
          className="mt-[calc(73*var(--k))]"
          trackClassName="gap-[calc(130*var(--k))]"
          arrowClassName="text-black"
        >
          {testimonials.items.map((t, i) => (
            <figure
              key={i}
              className="w-full shrink-0 snap-start text-center lg:w-[calc((100%-130*var(--k))/2)]"
            >
              <blockquote className="mx-auto max-w-[calc(563*var(--k))] font-sans text-quote-sm leading-[1.42] text-black">
                {t.quote}
              </blockquote>

              <figcaption className="mt-[calc(29*var(--k))] flex items-center justify-center gap-[calc(17*var(--k))]">
                <Image
                  src={src('testimonial-avatar')}
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
                  <p className="font-label text-[max(10px,calc(11*var(--k)))] leading-[1.5] text-black">
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
