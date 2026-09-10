import { MembershipDeck } from '@/components/membership-deck';
import { offers } from '@/lib/content';

/** Membership Offers — 1448x938, transparent over the page white. */
export function MembershipOffers() {
  return (
    <section id="membership" className="bg-page pt-[calc(62*var(--k))] pb-[calc(98*var(--k))]">
      <div className="container-page">
        <h2 className="font-label text-body-sm leading-[1.3] tracking-[0.1em] text-black uppercase">
          {offers.eyebrow}
        </h2>

        <div className="mt-[calc(54*var(--k))]">
          <MembershipDeck cards={offers.cards} />
        </div>
      </div>
    </section>
  );
}
