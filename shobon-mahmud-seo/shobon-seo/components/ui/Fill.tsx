/**
 * Renders text, highlighting any [BRACKETED PLACEHOLDER] so missing
 * real data is obvious on the page until it's replaced.
 */
export function Fill({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        /^\[[^\]]+\]$/.test(part) ? (
          <span key={i} className="placeholder" title="Placeholder — replace with real data">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}
