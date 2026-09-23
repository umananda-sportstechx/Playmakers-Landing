import type { Metadata } from 'next';
import { LegalDocument } from '@/components/legal-document';
import { Footer } from '@/components/sections/footer';
import { Rise } from '@/components/rise';
import { termsOfMembership } from '@/lib/legal';

export const metadata: Metadata = {
  // Bare title: the root layout supplies the ' — Playmakers' template.
  title: 'Terms of Membership',
  description:
    'The terms governing membership of Playmakers, the by-invitation network for sports tech founders and CEOs.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of Membership — Playmakers',
    description:
      'The terms governing membership of Playmakers, the by-invitation network for sports tech founders and CEOs.',
    url: '/terms',
  },
};

export default function TermsPage() {
  return (
    <>
      <main>
        <LegalDocument doc={termsOfMembership} />
      </main>
      <Footer />
      <Rise />
    </>
  );
}
