import { Fragment } from 'react';

/**
 * Renders a string that carries U+2028 LINE SEPARATOR as real line breaks.
 *
 * The designer set these breaks by hand in Figma and the headline wraps wrong
 * without them. They cannot be left to CSS: a browser treats U+2028 in HTML as
 * ordinary collapsible whitespace, so `white-space: pre-line` does nothing for
 * it — the character has to become a <br> in the markup.
 *
 * Each segment is trimmed because the design's breaks usually sit after a
 * trailing space ("Apply For  Membership"), which would otherwise render as
 * a stray space at the end of a line.
 */
export function Lines({ text }: { text: string }) {
  const parts = text.split(' ');
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {part.trim()}
        </Fragment>
      ))}
    </>
  );
}
