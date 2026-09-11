/**
 * Every string on the page, lifted from the Figma file verbatim.
 *
 * Two things to know before editing:
 *
 * 1. ` ` (LINE SEPARATOR) marks a line break the designer set by hand. It is
 *    stored as an escape rather than the raw character on purpose — raw U+2028 is
 *    invisible in an editor and some editors strip it silently on save, which shows
 *    up much later as a headline wrapping in the wrong place. Render these through
 *    `lines()` in components/lines.tsx; browsers collapse U+2028 as ordinary
 *    whitespace, so `white-space: pre-line` will not do it for you.
 *
 * 2. Much of this copy is unfinished in the design, and is reproduced as-drawn
 *    rather than invented. Each such spot is marked FIXME with what is wrong. The
 *    open list went to the designer; see the plan file.
 */

import type { FigmaFill } from '@/components/figma-image';

export type Step = {
  n: string;
  eyebrow: string;
  title: string;
  body: string;
};

export type Member = {
  name: string;
  role: string;
  bio: string;
  /** Asset name from design/assets.json, resolved via lib/assets. */
  photo: string;
  /** Colour adjustments carried by the photo's fill in Figma, if any. */
  fill: FigmaFill;
};

export type Offer = {
  n: string;
  tag: string;
  title: string;
  leadIn: string;
  body: string;
  bullets: string[];
};

export const nav = {
  // FIXME(design): reads "EXPLORE¬ MEMBERSHIP" in Figma. U+00AC is a stray
  // line-break marker, not copy — dropped here.
  links: [
    { label: 'EXPLORE MEMBERSHIP', href: '#membership' },
    { label: 'ABOUT US', href: '#team' },
    { label: 'FAQ', href: '#faq' },
  ],
  cta: { label: 'LOG IN', href: '#login' },
};

export const hero = {
  headline: "WHERE SPORTS TECH'S BEST BUILD  SMARTER, FASTER, TOGETHER.",
  cta: 'BECOME A MEMBER',
};

export const trustedBy = {
  title: 'Accelerate your Growth Alongside Elite Operators at Your Level.',
  lead: 'Playmakers is a by-invitation private network for high growth sports tech founders  and CEOs. Your peers. Your confidants. Your advantage.',
  // FIXME(design): all seven cards carry the same placeholder person, and the
  // caption typography drifts across them (Teko 300/22 on 1-2, Teko 500/18 on
  // 3-7, the role on card 7 is CommitMono where the rest are Space Grotesk).
  // Normalised to the majority styling here.
  members: Array.from({ length: 5 }, (_, i) => ({
    name: 'Alexander Janssen',
    role: 'CEO, Dutch SportsTech Fund',
    photo: `member-${i + 1}`,
  })),
};

export const offers = {
  // Teko 400/55 centred section head on the artboard, same as the others.
  title: 'What Membership Offers',
  // FIXME(design): cards 2 and 3 were never given their own copy. Card 2 still
  // repeats card 1's title, card 3's title is literally "¬", and all three share
  // one body and one bullet list. Their real subjects survive only in the
  // vertical tags, which is what `tag` holds.
  cards: [
    {
      n: '1',
      tag: 'YOUR PERSONAL BOARD OF ADVISORS',
      title: 'YOUR PERSONAL  BOARD OF ADVISORS',
      leadIn: 'Founder-to-Founder Advisory Board',
      body: ' confidential, professionally facilitated monthly core group sessions (9x/year) between 6-9 Playmakers members, providing the real-world strategic guidance of a high-caliber advisory board without the six-figure cost or time drain.',
      bullets: [
        "Skip costly trial-and-error by learning from other founders who've been there",
        'Scale faster with advice from leaders who have navigated complex growth',
        'Stay mentally resilient with a circle that understands your journey',
      ],
    },
    {
      n: '2',
      tag: 'INSIDER SPORTS INDUSTRY NETWORK',
      title: 'YOUR PERSONAL  BOARD OF ADVISORS',
      leadIn: 'Founder-to-Founder Advisory Board',
      body: ' confidential, professionally facilitated monthly core group sessions (9x/year) between 6-9 Playmakers members, providing the real-world strategic guidance of a high-caliber advisory board without the six-figure cost or time drain.',
      bullets: [
        "Skip costly trial-and-error by learning from other founders who've been there",
        'Scale faster with advice from leaders  who have navigated complex growth',
        'Stay mentally resilient with a circle that understands your journey',
      ],
    },
    {
      n: '3',
      tag: 'SPORTS TECH INTELLIGENCE',
      // The artboard leaves this as a literal "¬". Titled from the card's own
      // vertical tag, which is the only place its subject is stated.
      title: 'SPORTS TECH  INTELLIGENCE',
      leadIn: 'Founder-to-Founder Advisory Board',
      body: ' confidential, professionally facilitated monthly core group sessions (9x/year) between 6-9 Playmakers members, providing the real-world strategic guidance of a high-caliber advisory board without the six-figure cost or time drain.',
      bullets: [
        "Skip costly trial-and-error by learning from other founders who've been there",
        'Scale faster with advice from leaders  who have navigated complex growth',
        'Stay mentally resilient with a circle that understands your journey',
      ],
    },
  ] satisfies Offer[],
};

export const testimonials = {
  eyebrow: 'PLAYMAKERS TESTIMONIALS',
  /**
   * FIXME(design): the artboard has two cards carrying the same placeholder
   * quote and person. The first two below are that, verbatim.
   *
   * FIXME(placeholder): the remaining four are INVENTED — written only so the
   * rail has something to page through while the real quotes are collected.
   * The names are not real people and none of this is a real endorsement, so
   * delete the lot before this goes anywhere public. They are deliberately all
   * different so it is obvious which card you are looking at while testing.
   */
  items: [
    {
      quote: '“We walked into our raise knowing the market cold. That confidence changed every conversation.”',
      name: 'Alexander Janssen',
      role: 'CEO, Dutch SportsTech Fund',
    },
    {
      quote: '“We walked into our raise knowing the market cold. That confidence changed every conversation.”',
      name: 'Alexander Janssen',
      role: 'CEO, Dutch SportsTech Fund',
    },
    {
      quote: '“Two of my core group had solved the exact problem I was stuck on. That call saved us a quarter.”',
      name: 'Placeholder Two',
      role: 'Founder, Placeholder Analytics',
    },
    {
      quote: '“The introductions were the opposite of networking. Every one of them went somewhere.”',
      name: 'Placeholder Three',
      role: 'CEO, Placeholder Performance',
    },
    {
      quote: '“I stopped guessing what good looked like at our stage. I could just ask someone who had been there.”',
      name: 'Placeholder Four',
      role: 'Co-Founder, Placeholder Labs',
    },
    {
      quote: '“It is the only room where I can say the quiet part out loud and get a straight answer back.”',
      name: 'Placeholder Five',
      role: 'Managing Director, Placeholder Ventures',
    },
  ],
};

export const quote = {
  text: "“It's good to learn from your mistakes.  It's better to learn from other people's mistakes.”",
  attribution: '— Warren Buffett',
};

export const howToJoin = {
  title: 'How to Join the Network',
  cta: 'APPLY NOW',
  steps: [
    {
      n: '1',
      eyebrow: 'Founder Eligibility Criteria',
      title: 'Apply For  Membership',
      body: 'All members must be the founder or CEO of a sports tech startup doing at least €1M in revenue or having raised €3M+ in funding or have had above a €5M company exit.',
    },
    {
      n: '2',
      eyebrow: 'Founder Alignment CHAT',
      title: 'Take an  interview call',
      body: 'If you look like a fit “on paper,” we set up a vetting call. This isn’t a sales pitch - it’s a conversation to hear how you think, what you’re building,  and your energy.',
    },
    {
      n: '3',
      eyebrow: 'Invitation & Onboarding',
      title: 'Receive an  invitation to join',
      body: 'If you meet our criteria for membership, you’ll get the invite and are admitted as a Playmakers member, with new spots opening up at the beginning of every quarter.',
    },
    {
      n: '4',
      eyebrow: 'Community & Peer Placement',
      title: 'Become part of  the community',
      body: 'Once you’ve paid your dues, you’ll get immediate access to our digital community and get placed into your core group within 60 days of joining (it’s curated and can’t be rushed).',
    },
  ] satisfies Step[],
};

export const team = {
  title: 'Meet Our Team',
  lead: 'Playmakers is a by-invitation private network for high growth sports tech founders  and CEOs. Your peers. Your confidants. Your advantage.',
  members: [
    {
      name: 'ROHN MALHOTRA',
      role: 'NETWORK INTELLIGENCE',
      bio: 'Co-Founder & Managing Director at SportsTechX, the leading sports innovation intelligence platform, exited founder and Investment Director at Match Ventures.',
      photo: 'team-1',
      fill: { saturation: 0.09 },
    },
    {
      name: 'THOMAS PREISS',
      role: 'Community & Operations',
      bio: 'Serial entrepreneur and community builder in sports, Co-Founder of Common Goal with deep expertise in building and operating high-impact membership networks.',
      photo: 'team-2',
      fill: {},
    },
    {
      name: 'KATY TROST',
      role: 'Core Groups Coach',
      bio: 'Executive coach and advisor with over a decade of experience in coaching technology startup founders to become exceptional CEOs  and growth-stage leaders.',
      photo: 'team-3',
      fill: {},
    },
    {
      name: 'MITCH HEATH',
      role: 'Core Groups Coach',
      bio: 'Co-Founder and Chief Growth Officer at Teamworks with a track-record of scaling the ‘Operating System for Sports’ from inception in 2006 to unicorn status company.',
      photo: 'team-4',
      fill: { exposure: 0.1, saturation: -0.24 },
    },
  ] satisfies Member[],
};

/**
 * The artboard draws every row collapsed, so it contains no answers at all.
 *
 * Where the rest of the design states a fact, the answer below is taken from it
 * and is accurate: the eligibility criteria come from How-to-Join step 1, the
 * 9x/year core group sessions and the 6-9 group size from the offer card, the
 * quarterly intake from step 3, the 60-day placement from step 4. Those are
 * marked `derived`.
 *
 * The rest are marked `draft` and are INVENTED — written so the accordion has
 * something to open while the real copy is collected. They are plausible, which
 * makes them dangerous: they read as fact and are not. Get them replaced before
 * this is public.
 *
 * The cost answer deliberately quotes no number. Do not let one be guessed into
 * it — an invented price on a real membership page is the one mistake here that
 * could actually cost somebody something.
 */
export const faq = {
  title: 'Frequently Asked Questions',
  items: [
    {
      q: "What's included in Playmakers membership?",
      // derived: the three offer cards
      a: 'Three things. A confidential core group of 6-9 founders that meets nine times a year with professional facilitation; an insider network across the sports industry; and the sports tech intelligence that comes out of both.',
    },
    {
      q: 'How much does it cost?',
      // draft — and no figure, deliberately. See the note above.
      a: 'Pricing is shared on the alignment call, once we both know the fit is right.',
    },
    {
      q: 'What are the requirements to join?',
      // derived: How-to-Join step 1, verbatim criteria
      a: 'Every member is the founder or CEO of a sports tech startup doing at least €1M in revenue, or having raised €3M+ in funding, or with a company exit above €5M behind them.',
    },
    {
      q: 'How much time commitment does Playmakers take?',
      // derived: 9x/year sessions from the offer card
      a: 'Nine core group sessions a year, roughly monthly. Everything else — the network, the introductions, the intelligence — you use at whatever pace suits you.',
    },
    {
      q: 'Who else is in the network?',
      // derived in part: "by-invitation private network for high growth sports tech founders and CEOs"
      a: 'Founders and CEOs of high growth sports tech companies, admitted by invitation against the same criteria you would be.',
    },
    {
      q: "What's the acceptance rate?",
      // draft
      a: 'We do not publish a number. Spots open at the beginning of each quarter and the cap is set by how many core groups we can facilitate properly, not by demand.',
    },
    {
      q: 'How long is the membership?',
      // draft
      a: 'Membership runs annually and renews by choice, not by default.',
    },
    {
      q: 'Is Playmakers a digital network or do you meet in person?',
      // derived in part: "immediate access to our digital community" (step 4)
      a: 'Both. The community and the core group sessions run digitally, which is what makes a network this senior possible across markets.',
    },
    {
      q: 'Who will be in my core group?',
      // derived: 6-9 members, curated, placed within 60 days (offer card + step 4)
      a: 'Six to nine members at a comparable stage, curated rather than assigned. Placement happens within 60 days of joining — it is deliberate and cannot be rushed.',
    },
    {
      q: "What if I don't connect well with my core group?",
      // draft
      a: 'Tell us and we will move you. A group that does not fit is worth nothing to you and nothing to the other members in it.',
    },
    {
      q: 'How do the curated introductions work? Can you help me connect with investors or potential clients?',
      // draft
      a: 'Introductions are made on request and only where there is a real reason for both sides to meet. We would rather make five that matter than fifty that do not.',
    },
    {
      q: 'How is Playmakers different from other founder communities like Hampton, YPO, Vistage or EO?',
      // draft
      a: 'Those are cross-industry. This one is not — every member is building in sports tech, so the context is shared before anyone starts talking.',
    },
  ],
};

export const finalHero = {
  headline: 'THE FUTURE OF SPORT IS BUILT TOGETHER',
  lead: 'Join the premier network of leaders shaping  the future of sport.',
  cta: 'APPLY FOR MEMBERSHIP',
};

export const footer = {
  // FIXME(design): lorem ipsum in the file.
  description:
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam.',
  email: 'hello@playmakers.com',
  location: 'Berlin, Germany',
  columns: [
    {
      heading: 'Quick Links',
      links: [
        'Explore Membership',
        'How to Join',
        'About us',
        'FAQ',
        'Terms of membership',
      ],
    },
  ],
  // Asset names; <Art> resolves the path and size from design/assets.json.
  social: [
    { label: 'LinkedIn', icon: 'icon-linkedin' },
    { label: 'Youtube', icon: 'icon-youtube' },
    { label: 'Instagram', icon: 'icon-instagram' },
    { label: 'X', icon: 'icon-x' },
  ],
  legal: '© 2026 SportsTechX GmbH. All rights reserved.',
  meta: 'Privacy · Imprint · The Inner Circle of Sports Tech',
};
