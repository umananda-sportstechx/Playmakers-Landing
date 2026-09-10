import { faq } from '@/lib/content';

/**
 * FAQ — 1513x1136, cream, a 652-wide column of 12 rows.
 *
 * Native <details>/<summary>, no JavaScript: keyboard handling, screen-reader
 * semantics and browser find-in-page opening the matching row all come free,
 * and a scripted accordion would have to reimplement each of them.
 *
 * The design draws every row collapsed, so there are no answers in the file
 * yet — the panel renders whatever content.ts grows later.
 */
export function Faq() {
  return (
    <section
      id="faq"
      className="noise bg-band py-[120px]"
      style={{ '--noise-alpha': 0.1 } as React.CSSProperties}
    >
      <div className="container-page">
        <h2 className="text-center font-display text-section leading-[1.25] text-heading uppercase">
          {faq.title}
        </h2>

        <div className="mx-auto mt-[120px] max-w-[652px]">
          {faq.questions.map((q) => (
            <details key={q} className="group border-b border-dashed border-line py-[17px]">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
                <span className="font-sans text-lead font-medium leading-[1.33] text-black">{q}</span>
                {/* eslint-disable-next-line @next/next/no-img-element -- exported vector */}
                <img
                  src="/vectors/icon-plus.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="mt-1 shrink-0 transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
