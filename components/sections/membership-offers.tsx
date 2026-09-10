import { MembershipDeck } from '@/components/membership-deck';
import { offers } from '@/lib/content';

/** Membership Offers — 1448x938, transparent over the page white. */
export function MembershipOffers() {
  return (
    <section id="membership" className="bg-page pt-[62px] pb-[98px]">
      <div className="container-page">
        <h2 className="font-label text-body-sm leading-[1.3] tracking-[0.1em] text-black uppercase">
          {offers.eyebrow}
        </h2>

        <div className="mt-[54px]">
          <MembershipDeck cards={offers.cards} />
        </div>
      </div>
    </section>
  );
}
