import Image from 'next/image';
import { Art } from '@/components/art';
import { Carousel } from '@/components/carousel';
import { Lines } from '@/components/lines';
import { src } from '@/lib/assets';
import { trustedBy, type TrustedMember } from '@/lib/content';

/**
 * Trusted by — 1513x688 on cream, a rail of 210x232 member photos.
 *
 * Each photo carries a bottom gradient mask (transparent → #232529) with a
 * partner logo sitting on it, then the name and role below.
 *
 * Two dashed "Breaker" lines inside this section are switched off in the
 * design and are not built.
 */
export function TrustedBy({
  members = trustedBy.members,
  isPlaceholder = true,
}: {
  members?: TrustedMember[];
  /** No CMS cards uploaded yet, so the rail is the designed placeholder set. */
  isPlaceholder?: boolean;
}) {
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
          alwaysLoop={isPlaceholder}
          // Full-bleed below lg, by the sibling site's method: a negative margin
          // equal to the container's own padding, on a child of container-page.
          // Not w-screen or 100vw — those overshoot by the scrollbar width and
          // put the page into horizontal overflow.
          //
          // The 52 padding exists ONLY to clear the arrows, which are absolute
          // at the rail's edges; with the arrows gone below lg it is the one
          // thing left holding the cards off the edge, so it goes lg-only too.
          className="mt-[calc(56*var(--k))] -mx-(--page-inset) lg:mx-0 lg:px-[calc(52*var(--k))]"
          trackClassName="gap-[12px] lg:gap-[calc(74*var(--k))]"
          // `lg:grid`, not `lg:block`: the arrow's own base class is
          // `grid place-items-center`, and restoring it as a block would
          // un-center the chevron inside its 44px tap box.
          arrowClassName="hidden lg:grid"
        >
          {/* 210 artboard px is an 88px stamp once --k floors at 0.42, so the
              card width carries a floor of its own and the photo follows by
              aspect-ratio rather than a second frozen length. */}
          {members.map((m, i) => (
            <article key={i} className="w-[max(160px,calc(210*var(--k)))] shrink-0 snap-start text-center">
              <div className="relative aspect-[210/232] w-full overflow-hidden rounded-[max(6px,calc(6*var(--k)))]">
                <Image src={src(m.photo, 'member-1')} alt={m.name} fill sizes="210px" className="object-cover" />
                {/* A flat dim across the whole photo. The logos that go over
                    these are white, and a headshot can be light enough to
                    swallow one — the gradient below only darkens the bottom
                    strip, which is not enough once a real mark is wider than
                    the flattened vector it replaced. Ordered before the logo so
                    it never dims the mark itself. */}
                <div aria-hidden className="absolute inset-0 bg-black/30" />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-[calc(72*var(--k))] bg-linear-to-b from-[#454545]/0 to-[#232529]"
                />
                {/* The company mark at the middle bottom of the photo. An
                    uploaded logo replaces the artboard's flattened BCG vector. */}
                {m.logo ? (
                  <Image
                    src={src(m.logo)}
                    alt=""
                    width={160}
                    height={48}
                    className="absolute bottom-[calc(18*var(--k))] left-1/2 h-auto max-h-[max(24px,calc(36*var(--k)))] w-auto max-w-[40%] -translate-x-1/2 object-contain"
                  />
                ) : (
                  <Art name="logo-bcg" className="absolute bottom-[calc(18*var(--k))] left-1/2 -translate-x-1/2" />
                )}
              </div>

              {/* Both up 2pt on the artboard's 18/11, floors with them. */}
              <p className="mt-[calc(15*var(--k))] font-display text-[max(17px,calc(20*var(--k)))] font-medium leading-[1.2] text-[#232529]">
                {m.name}
              </p>
              <p className="font-label text-[max(14px,calc(13*var(--k)))] leading-[1.5] text-[#232529]">{m.role}</p>
            </article>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
