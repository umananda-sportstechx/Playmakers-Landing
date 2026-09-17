import { faq } from '@/lib/content';
import { Art } from '@/components/art';

/**
 * FAQ — 1513x1136, cream, a 652-wide column of 12 rows.
 *
 * Native <details>/<summary>, no JavaScript: keyboard handling, screen-reader
 * semantics and browser find-in-page opening the matching row all come free,
 * and a scripted accordion would have to reimplement each of them.
 *
 * `name` is what makes it an accordion rather than 12 independent disclosures —
 * same name, at most one open, so opening a row closes the last. Without it
 * every row stayed open, which is the whole of what "the accordion logic is
 * wrong" meant. Do not remove it in favour of an onToggle handler; the point of
 * this component is that the browser does all of it.
 *
 * The artboard draws every row collapsed, so it specifies no open state at all —
 * the panel's type and spacing below are ours, not the design's.
 */
export function Faq() {
  return (
    <section
      id="faq"
      className="noise bg-band py-[calc(120*var(--k))]"
      style={{ '--noise-alpha': 0.1 } as React.CSSProperties}
    >
      <div className="container-page">
        <h2 className="text-center font-display text-section leading-[1.25] text-heading uppercase">
          {faq.title}
        </h2>

        <div className="mx-auto mt-[calc(120*var(--k))] lg:max-w-[calc(652*var(--k))]">
          {faq.items.map(({ q, a }) => (
            <details
              key={q}
              name="faq"
              className="faq-row group border-b border-dashed border-line py-[calc(17*var(--k))]"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-[calc(24*var(--k))] [&::-webkit-details-marker]:hidden">
                <span className="font-sans text-lead font-medium leading-[1.33] text-black">{q}</span>
                <Art
                  name="icon-plus"
                  className="mt-[calc(4*var(--k))] shrink-0 transition-transform duration-200 group-open:rotate-45"
                />
              </summary>

              <p className="pt-[calc(14*var(--k))] pr-[calc(44*var(--k))] font-sans text-body leading-[1.6] text-black/70">
                {a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
