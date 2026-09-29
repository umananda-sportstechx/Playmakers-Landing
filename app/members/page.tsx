import type { Metadata } from 'next';
import { MemberDirectory } from '@/components/sections/member-directory';
import { Footer } from '@/components/sections/footer';
import { Rise } from '@/components/rise';

export const metadata: Metadata = {
  // Bare title: the root layout supplies the ' — Playmakers' template.
  title: 'Members',
  description:
    'The Playmakers member directory — the sports tech founders and CEOs in the network, and the companies they run.',
  alternates: { canonical: '/members' },
  openGraph: {
    title: 'Members — Playmakers',
    description:
      'The Playmakers member directory — the sports tech founders and CEOs in the network, and the companies they run.',
    url: '/members',
  },
};

export default function MembersPage() {
  return (
    <>
      <main>
        <MemberDirectory />
      </main>
      <Footer />
      <Rise />
    </>
  );
}
