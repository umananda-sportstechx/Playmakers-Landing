import Image from 'next/image';
import { Art } from '@/components/art';
import { Carousel } from '@/components/carousel';
import { Lines } from '@/components/lines';
import { src } from '@/lib/assets';
import { trustedBy } from '@/lib/content';

/**
 * Trusted by — 1513x688 on cream, a rail of 210x232 member photos.
 *
 * Each photo carries a bottom gradient mask (transparent → #232529) with a
 * partner logo sitting on it, then the name and role below.
 *
 * Two dashed "Breaker" lines inside this section are switched off in the
 * design and are not built.
 */
export function TrustedBy() {
  return (
    <section
      className="noise bg-band py-[calc(104*var(--k))]"
      style={{ '--noise-alpha': 0.1 } as React.CSSProperties}
    >
      <div className="container-page">
        <h2 className="text-center font-display text-section leading-[1.25] text-olive uppercase">
          {trustedBy.title}
        </h2>
        <p className="mx-auto mt-[calc(10*var(--k))] lg:max-w-[calc(900*var(--k))] text-center font-sans text-lead font-medium leading-[1.48] text-stone">
          <Lines text={trustedBy.lead} />
        </p>

        <Carousel
          label="Members"
          arrow="chevron-trusted"
          autoScroll="rtl"
          className="mt-[calc(56*var(--k))] px-[calc(52*var(--k))]"
          trackClassName="gap-[calc(74*var(--k))]"
        >
          {/* 210 artboard px is an 88px stamp once --k floors at 0.42, so the
              card width carries a floor of its own and the photo follows by
              aspect-ratio rather than a second frozen length. */}
          {trustedBy.members.map((m, i) => (
            <article key={i} className="w-[max(160px,calc(210*var(--k)))] shrink-0 snap-start text-center">
              <div className="relative aspect-[210/232] w-full overflow-hidden rounded-[max(6px,calc(6*var(--k)))]">
                <Image src={src(m.photo)} alt={m.name} fill sizes="210px" className="object-cover" />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-[calc(72*var(--k))] bg-linear-to-b from-[#454545]/0 to-[#232529]"
                />
                <Art name="logo-bcg" className="absolute bottom-[calc(18*var(--k))] left-1/2 -translate-x-1/2" />
              </div>

              <p className="mt-[calc(15*var(--k))] font-display text-[max(15px,calc(18*var(--k)))] font-medium leading-[1.2] text-[#232529]">
                {m.name}
              </p>
              <p className="font-label text-[max(12px,calc(11*var(--k)))] leading-[1.5] text-[#232529]">{m.role}</p>
            </article>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
