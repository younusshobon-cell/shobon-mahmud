/**
 * Server-rendered SVG line chart — no chart library, no client JS.
 * Pass monthly values (e.g. organic clicks from Search Console).
 */
export function ResultsChart({ data, label }: { data?: { label: string; value: number }[]; label?: string }) {
  if (!data || data.length < 2) {
    return (
      <figure className="grid aspect-[16/7] place-items-center rounded-[var(--radius-card)] border border-dashed border-line-strong bg-paper-2 p-6 text-center">
        <figcaption className="max-w-sm text-sm text-muted">
          Results chart appears here once real data is added.
          <br />
          Add monthly values to <code className="text-ink-2">chart</code> in <code className="text-ink-2">lib/content/case-studies.ts</code>.
        </figcaption>
      </figure>
    );
  }
  const W = 720, H = 300, P = { t: 20, r: 16, b: 36, l: 48 };
  const max = Math.max(...data.map((d) => d.value)) * 1.1;
  const x = (i: number) => P.l + (i / (data.length - 1)) * (W - P.l - P.r);
  const y = (v: number) => H - P.b - (v / max) * (H - P.t - P.b);
  const line = data.map((d, i) => `${i ? "L" : "M"}${x(i)},${y(d.value)}`).join(" ");
  const area = `${line} L${x(data.length - 1)},${H - P.b} L${x(0)},${H - P.b} Z`;
  const ticks = [0, 0.5, 1].map((t) => Math.round(max * t));
  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} className="w-full">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={P.l} x2={W - P.r} y1={y(t)} y2={y(t)} stroke="var(--color-line)" />
            <text x={P.l - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="var(--color-muted)">{t.toLocaleString()}</text>
          </g>
        ))}
        <path d={area} fill="var(--color-link)" opacity="0.08" />
        <path d={line} fill="none" stroke="var(--color-link)" strokeWidth="2" />
        {data.map((d, i) => (
          <text key={d.label} x={x(i)} y={H - 12} textAnchor="middle" fontSize="11" fill="var(--color-muted)">{d.label}</text>
        ))}
      </svg>
      {label && <figcaption className="mt-2 text-sm text-muted">{label}</figcaption>}
    </figure>
  );
}
