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

/** Section order and spacing follow the Figma frame "Lightmode", top to bottom. */
export default function Home() {
  return (
    <>
      <Rise />
      <main>
        <IntroHero />
        <div data-rise>
          <TrustedBy />
        </div>
        <div data-rise>
          <MembershipOffers />
        </div>
        <div data-rise>
          <Testimonials />
        </div>
        <div data-rise>
          <Quote />
        </div>
        <div data-rise>
          <HowToJoin />
        </div>
        <div data-rise>
          <Team />
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
