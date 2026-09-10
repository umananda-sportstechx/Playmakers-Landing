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
    <section className="bg-page py-[98px]">
      <div className="container-page">
        <p className="text-center font-label text-label font-medium leading-[1.25] tracking-[0.1em] text-[#4b4b4b] uppercase">
          {testimonials.eyebrow}
        </p>

        <Carousel
          label="Testimonials"
          arrow={{ src: '/vectors/chevron-testimonial', w: 9, h: 20 }}
          className="mt-[52px] px-[52px]"
          trackClassName="gap-[40px]"
        >
          {testimonials.items.map((t, i) => (
            <figure key={i} className="w-full shrink-0 snap-start px-4 text-center lg:w-1/2">
              <blockquote className="mx-auto max-w-[520px] font-sans text-lead-lg leading-[1.35] text-black">
                {t.quote}
              </blockquote>

              <figcaption className="mt-[38px] flex items-center justify-center gap-[16px]">
                <Image
                  src={src('testimonial-avatar')}
                  alt=""
                  width={72}
                  height={72}
                  className="size-[72px] rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-display text-[18px] font-medium leading-[1.2] text-black">{t.name}</p>
                  <p className="font-label text-[11px] leading-[1.5] text-black">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
