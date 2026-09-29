import Image from 'next/image';
import { memberDirectory, type DirectoryMember } from '@/lib/members';

/**
 * The member directory — the list that lives on joinplaymakers.co today,
 * rebuilt in this site's theme.
 *
 * White cards on the navy field, the same treatment the Team section uses, so
 * the page reads as part of the site rather than a ported page.
 *
 * Three up from xl, two from md. The earlier two-up-only grid gave each card
 * half of a 1440 and the result was a wall of very large cards; the blurb runs
 * to about 200 characters, and three columns puts that at roughly eight lines
 * of a comfortable measure instead of four of a very long one.
 *
 * The portrait is square and cropped from the centre, which is exactly how the
 * source page shows it. The files behind it are a mixed bag — 400 square up to
 * 996x440 — so a fixed square box is the only crop that holds a face in every
 * one of them.
 *
 * Every size here is max(floor, calc(n * var(--k))), the same shape the type
 * tokens in globals.css use. --k is the artboard scale, about 0.26 at 390px, so
 * a bare calc() collapses a 23px name to 6px on a phone while the tokened role
 * beside it holds its 14px floor and ends up the larger of the two.
 */
export function MemberDirectory() {
  return (
    <section
      id="members"
      className="bg-hero pt-[max(120px,calc(190*var(--k)))] pb-[max(80px,calc(150*var(--k)))]"
    >
      <div className="container-page">
        <h1 className="text-center font-display text-section leading-tight tracking-[0.05em] text-white uppercase">
          {memberDirectory.title}
        </h1>
        <p className="mx-auto mt-[max(14px,calc(18*var(--k)))] max-w-[calc(760*var(--k))] text-center font-sans text-lead font-medium leading-[1.48] text-white/80">
          {memberDirectory.lead}
        </p>

        <ul className="mt-[max(40px,calc(72*var(--k)))] grid gap-[max(16px,calc(24*var(--k)))] md:grid-cols-2 xl:grid-cols-3">
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
    <article className="flex h-full flex-col overflow-hidden rounded-[calc(14*var(--k))] bg-white">
      <div className="relative aspect-square w-full bg-[#e6e7e3]">
        <Image
          src={m.photo}
          alt={m.name}
          fill
          /* A third of the page at xl, half at md, the whole of it below. */
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 90vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-[max(20px,calc(26*var(--k)))]">
        <h2 className="font-display text-[max(21px,calc(27*var(--k)))] leading-[1.1] tracking-[0.03em] text-navy uppercase">
          {m.name}
        </h2>

        <p className="mt-[max(6px,calc(8*var(--k)))] font-label text-label font-medium tracking-[0.1em] text-navy/55 uppercase">
          {m.role}
        </p>
        <p className="mt-0.5 font-sans text-body-sm font-semibold text-accent">{m.company}</p>

        <p className="mt-[max(10px,calc(12*var(--k)))] font-sans text-[max(13px,calc(15*var(--k)))] leading-[1.55] text-navy/70">
          {m.blurb}
        </p>

        {/* mt-auto so the links sit on the card's floor whatever the blurb's
            length — the cards in a row are the same height and a ragged link
            row is the first thing the eye picks up. */}
        <div className="mt-auto flex gap-[max(8px,calc(10*var(--k)))] pt-[max(16px,calc(20*var(--k)))]">
          {m.linkedin && <CardLink href={m.linkedin}>LinkedIn</CardLink>}
          {m.website && <CardLink href={m.website}>Website</CardLink>}
        </div>
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
      className="rounded-full bg-navy/6 px-[max(12px,calc(14*var(--k)))] py-[max(6px,calc(7*var(--k)))] font-label text-label font-medium tracking-[0.1em] text-navy uppercase transition-colors hover:bg-navy/12"
    >
      {children}
    </a>
  );
}
