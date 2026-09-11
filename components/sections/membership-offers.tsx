import { MembershipDeck } from '@/components/membership-deck';
import { offers } from '@/lib/content';

/**
 * Membership Offers — 1448x938, transparent over the page white.
 *
 * The heading is a centred Teko 400/55 section head like every other section's,
 * at #2e2e2e — not the small tracked-out label it was built as. The artboard's
 * own render makes it look like an eyebrow because the group's bounds are blown
 * out by a "Points" frame that is 5409px wide, so the whole section renders
 * shrunk into a corner. The node itself says otherwise.
 */
export function MembershipOffers() {
  return (
    <section id="membership" className="bg-page pt-[calc(109*var(--k))] pb-[calc(98*var(--k))]">
      <div className="container-page">
        <h2 className="text-center font-display text-section leading-[1.25] tracking-[0.05em] text-[#2e2e2e] uppercase">
          {offers.title}
        </h2>

        <div className="mt-[calc(40*var(--k))]">
          <MembershipDeck cards={offers.cards} />
        </div>
      </div>
    </section>
  );
}
