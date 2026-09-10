import Image from 'next/image';
import { Carousel } from '@/components/carousel';
import { src } from '@/lib/assets';
import { testimonials } from '@/lib/content';

/**
 * Testimonials — 1434x284, transparent over the page white. Two quotes side by
 * side; the carousel drops its arrows on its own once both fit.
 */
export function Testimonials() {
  return (
    <section className="bg-page py-[calc(98*var(--k))]">
      <div className="container-page">
        <p className="text-center font-label text-label font-medium leading-[1.25] tracking-[0.1em] text-[#4b4b4b] uppercase">
          {testimonials.eyebrow}
        </p>

        <Carousel
          label="Testimonials"
          arrow="chevron-testimonial"
          className="mt-[calc(52*var(--k))] px-[calc(52*var(--k))]"
          trackClassName="gap-[calc(40*var(--k))]"
        >
          {testimonials.items.map((t, i) => (
            <figure key={i} className="w-full shrink-0 snap-start px-[calc(16*var(--k))] text-center lg:w-1/2">
              <blockquote className="mx-auto max-w-[calc(520*var(--k))] font-sans text-lead-lg leading-[1.35] text-black">
                {t.quote}
              </blockquote>

              <figcaption className="mt-[calc(38*var(--k))] flex items-center justify-center gap-[calc(16*var(--k))]">
                <Image
                  src={src('testimonial-avatar')}
                  alt=""
                  width={72}
                  height={72}
                  className="size-[calc(72*var(--k))] rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-display text-[max(15px,calc(18*var(--k)))] font-medium leading-[1.2] text-black">{t.name}</p>
                  <p className="font-label text-[max(10px,calc(11*var(--k)))] leading-[1.5] text-black">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
