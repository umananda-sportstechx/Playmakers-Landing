import Image from 'next/image';
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
      className="noise bg-band py-[104px]"
      style={{ '--noise-alpha': 0.1 } as React.CSSProperties}
    >
      <div className="container-page">
        <h2 className="text-center font-display text-section leading-[1.25] text-olive uppercase">
          {trustedBy.title}
        </h2>
        <p className="mx-auto mt-[10px] max-w-[900px] text-center font-sans text-lead font-medium leading-[1.48] text-stone">
          <Lines text={trustedBy.lead} />
        </p>

        <Carousel
          label="Members"
          arrow={{ src: '/vectors/chevron-trusted', w: 16, h: 37 }}
          className="mt-[56px] px-[52px]"
          trackClassName="gap-[74px]"
        >
          {trustedBy.members.map((m, i) => (
            <article key={i} className="w-[210px] shrink-0 snap-start text-center">
              <div className="relative h-[232px] w-[210px] overflow-hidden rounded-[6px]">
                <Image src={src(m.photo)} alt={m.name} fill sizes="210px" className="object-cover" />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-[72px] bg-linear-to-b from-[#454545]/0 to-[#232529]"
                />
                {/* eslint-disable-next-line @next/next/no-img-element -- exported vector */}
                <img
                  src="/vectors/logo-bcg.svg"
                  alt=""
                  width={56}
                  height={23}
                  className="absolute bottom-[18px] left-1/2 -translate-x-1/2"
                />
              </div>

              <p className="mt-[15px] font-display text-[18px] font-medium leading-[1.2] text-[#232529]">
                {m.name}
              </p>
              <p className="font-label text-[11px] leading-[1.5] text-[#232529]">{m.role}</p>
            </article>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
