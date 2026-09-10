import Image from 'next/image';
import { FigmaImage, cssFilter } from '@/components/figma-image';
import { Lines } from '@/components/lines';
import { src } from '@/lib/assets';
import { team } from '@/lib/content';

/**
 * Team — 1513x1005, a stadium photograph under a navy wash, four 674x248 white
 * cards in a 2x2. Each card is a 254-wide photo butted against a text block.
 *
 * The artboard's "BG Detail" green-square rig is switched off and not built.
 */
export function Team() {
  return (
    <section id="team" className="relative isolate overflow-hidden bg-hero py-[calc(108*var(--k))]">
      {/* fills[0] on the artboard: 45% opacity, exposure -0.62, saturation -1,
          plus a crop. The desaturation is what turns green stadium seats into
          the grey-navy field the design shows. */}
      <FigmaImage
        src={src('team-bg')}
        className="-z-10"
        fill={{
          fillOpacity: 0.45,
          exposure: -0.62,
          saturation: -1,
          transform: [
            [0.727753758430481, 0, 0.11303510516881943],
            [0, 0.7471317648887634, 0.20969663560390472],
          ],
        }}
      />
      {/* Four stops off the artboard: clear over the top 45% so the seats read,
          then down to solid navy at the foot of the section. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'linear-gradient(to bottom,' +
            ' rgb(17 17 51 / 0) 0%,' +
            ' rgb(17 17 51 / 0) 45%,' +
            ' rgb(17 17 51 / 0.4) 60%,' +
            ' rgb(17 17 51 / 1) 100%)',
        }}
      />

      <div className="container-page">
        <h2 className="text-center font-display text-section leading-[1.25] tracking-[0.05em] text-white uppercase">
          {team.title}
        </h2>
        <p className="mx-auto mt-[calc(18*var(--k))] max-w-[calc(900*var(--k))] text-center font-sans text-lead font-medium leading-[1.48] text-white">
          <Lines text={team.lead} />
        </p>

        <ul className="mt-[calc(115*var(--k))] grid gap-[calc(36*var(--k))] lg:grid-cols-2">
          {team.members.map((m) => (
            <li key={m.name}>
              <article className="flex h-full overflow-hidden rounded-[calc(16*var(--k))] border-[1.5px] border-white bg-white">
                <div className="relative w-[calc(254*var(--k))] shrink-0 self-stretch">
                  <Image
                    src={src(m.photo)}
                    alt={m.name}
                    fill
                    sizes="254px"
                    className="object-cover"
                    style={{ filter: cssFilter(m.fill) }}
                  />
                </div>

                <div className="min-w-0 flex-1 px-[calc(38*var(--k))] py-[calc(23*var(--k))]">
                  <p className="inline-block border-b border-dashed border-black/70 pb-[calc(6*var(--k))] font-label text-body-sm leading-[1.3] tracking-[0.1em] text-[#88413d] uppercase">
                    {m.role}
                  </p>
                  <h3 className="mt-[calc(24*var(--k))] font-display text-card-title leading-[1.05] text-black uppercase">
                    {m.name}
                  </h3>
                  <p className="mt-[calc(8*var(--k))] font-sans text-[max(13px,calc(14*var(--k)))] font-medium leading-[1.5] text-black">
                    {m.bio}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
