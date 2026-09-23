import { Rise } from '@/components/rise';
import { IntroHero } from '@/components/sections/intro-hero';
import { TrustedBy } from '@/components/sections/trusted-by';
import { MembershipOffers } from '@/components/sections/membership-offers';
import { Testimonials } from '@/components/sections/testimonials';
import { Quote } from '@/components/sections/quote';
import { HowToJoin } from '@/components/sections/how-to-join';
import { Team } from '@/components/sections/team';
import { Faq } from '@/components/sections/faq';
import { FinalHero } from '@/components/sections/final-hero';
import { Footer } from '@/components/sections/footer';
import { siteContent } from '@/lib/site-content';
import { team, testimonials, trustedBy, type Member, type Story, type TrustedMember } from '@/lib/content';

/** Section order and spacing follow the Figma frame "Lightmode", top to bottom. */
export default async function Home() {
  /* Member photos, team photos and testimonials come from the admin panel
     (Site assets -> Playmakers). siteContent() swallows every failure, so an
     empty result leaves each section on the content decoded from the .fig. */
  const cms = await siteContent();

  const members: TrustedMember[] = cms.gallery?.length
    ? cms.gallery.map((it) => ({
        name: it.title ?? '',
        role: it.subtitle ?? '',
        photo: it.url ?? '',
        logo: it.logoUrl,
      }))
    : trustedBy.members;

  const teamMembers: Member[] = cms.team?.length
    ? cms.team.map((it) => ({
        name: it.title ?? '',
        role: it.subtitle ?? '',
        bio: it.body ?? '',
        photo: it.url ?? '',
        // Uploads are graded before upload; the artboard's per-photo Figma
        // colour adjustments apply to the placeholders only.
        fill: {},
      }))
    : team.members;

  const stories: Story[] = cms.testimonials?.length
    ? cms.testimonials.map((it) => ({
        // Admins type a plain message; the design's curly quotes go on here.
        quote: quoted(it.body ?? ''),
        name: it.title ?? '',
        role: it.subtitle ?? '',
        photo: it.url,
      }))
    : testimonials.items;

  return (
    <>
      <Rise />
      <main>
        <IntroHero />
        <div data-rise>
          <TrustedBy members={members} isPlaceholder={!cms.gallery?.length} />
        </div>
        <div data-rise>
          <MembershipOffers />
        </div>
        <div data-rise>
          <Testimonials items={stories} />
        </div>
        <div data-rise>
          <Quote />
        </div>
        <div data-rise>
          <HowToJoin />
        </div>
        <div data-rise>
          <Team members={teamMembers} />
        </div>
        <div data-rise>
          <Faq />
        </div>
        <div data-rise>
          <FinalHero />
        </div>
      </main>
      <Footer />
    </>
  );
}

/** The artboard's quotes carry their own curly marks; CMS messages do not. */
function quoted(text: string): string {
  const t = text.trim();
  if (!t) return '';
  return /^[“"]/.test(t) ? t : `“${t}”`;
}
