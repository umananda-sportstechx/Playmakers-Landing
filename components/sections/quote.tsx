import { Lines } from '@/components/lines';
import { quote } from '@/lib/content';

/** Quote — 1513x414, cream, Teko throughout. */
export function Quote() {
  return (
    <section
      className="noise bg-band py-[calc(87*var(--k))] text-center"
      style={{ '--noise-alpha': 0.1 } as React.CSSProperties}
    >
      <figure className="container-page">
        <blockquote className="mx-auto max-w-[calc(1054*var(--k))] font-display text-quote leading-[1.25] text-black uppercase">
          <Lines text={quote.text} />
        </blockquote>
        <figcaption className="mt-[calc(20*var(--k))] font-display text-attrib font-light leading-[1.49] text-black">
          {quote.attribution}
        </figcaption>
      </figure>
    </section>
  );
}
