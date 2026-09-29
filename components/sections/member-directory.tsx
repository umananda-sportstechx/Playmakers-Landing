import { memberDirectory, type DirectoryMember } from '@/lib/members';

/**
 * The member directory — the list that lives on joinplaymakers.co today,
 * rebuilt in this site's theme.
 *
 * White cards on the navy field, the same treatment the Team section uses, so
 * the page reads as part of the site rather than a ported page. Two up from lg;
 * one column below that, because the blurb is ~200 characters and a half-width
 * card at 768 leaves about five words a line.
 *
 * No photographs: the source directory has none, and the card is built around
 * that rather than leaving a gap where one would go.
 */
export function MemberDirectory() {
  return (
    <section id="members" className="bg-hero pt-[calc(190*var(--k))] pb-[calc(150*var(--k))]">
      <div className="container-page">
        <h1 className="text-center font-display text-section leading-[1.25] tracking-[0.05em] text-white uppercase">
          {memberDirectory.title}
        </h1>
        <p className="mx-auto mt-[calc(18*var(--k))] max-w-[calc(760*var(--k))] text-center font-sans text-lead font-medium leading-[1.48] text-white/80">
          {memberDirectory.lead}
        </p>

        <ul className="mt-[calc(90*var(--k))] grid gap-[calc(28*var(--k))] lg:grid-cols-2">
          {memberDirectory.members.map((m) => (
            <li key={m.name}>
              <MemberCard member={m} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function MemberCard({ member: m }: { member: DirectoryMember }) {
  return (
    <article className="flex h-full flex-col rounded-[calc(16*var(--k))] bg-white p-[calc(32*var(--k))]">
      <h2 className="font-display text-[calc(28*var(--k))] leading-[1.15] tracking-[0.04em] text-navy uppercase">
        {m.name}
      </h2>

      <p className="mt-[calc(10*var(--k))] font-label text-label font-medium tracking-[0.1em] text-accent uppercase">
        {m.role}
      </p>
      <p className="mt-[calc(4*var(--k))] font-sans text-[calc(17*var(--k))] font-semibold text-navy">
        {m.company}
      </p>

      {/* mt-auto so the links sit on the card's floor whatever the blurb's
          length — the two cards in a row are the same height and a ragged link
          row is the first thing the eye picks up. */}
      <p className="mt-[calc(14*var(--k))] font-sans text-[calc(15*var(--k))] leading-[1.55] text-navy/70">
        {m.blurb}
      </p>

      <div className="mt-auto flex gap-[calc(20*var(--k))] pt-[calc(22*var(--k))]">
        {m.linkedin && <CardLink href={m.linkedin}>LinkedIn</CardLink>}
        {m.website && <CardLink href={m.website}>Website</CardLink>}
      </div>
    </article>
  );
}

function CardLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-label text-label font-medium tracking-[0.1em] text-navy uppercase underline-offset-4 transition-opacity hover:underline hover:opacity-70"
    >
      {children}
    </a>
  );
}
