import Link from "next/link";
import guides from "@/content/page-growth-guides.json";
import { Section } from "./Section";

/** Page-specific buying decisions, deliberately excluded from the homepage. */
export function PageGrowthGuide({ path }: { path: string }) {
  const guide = guides[path as keyof typeof guides];
  if (!guide) return null;
  return (
    <Section labelledBy="growth-decisions" tone="muted">
      <div className="max-w-3xl">
        <h2 id="growth-decisions" className="t-h2 text-ink">{guide.title}</h2>
        <p className="t-lead mt-6 text-ink-2">{guide.intro}</p>
        <p className="mt-5 leading-relaxed text-muted">{guide.body}</p>
      </div>
      <div className="mt-10 overflow-x-auto rounded-2xl border border-line bg-white" role="region" aria-label={guide.title} tabIndex={0}>
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead className="bg-paper-2">
            <tr>{guide.headers.map(header => <th key={header} scope="col" className="px-6 py-5 font-semibold text-ink">{header}</th>)}</tr>
          </thead>
          <tbody>{guide.rows.map(row => (
            <tr key={row[0]} className="border-t border-line">
              <th scope="row" className="px-6 py-5 font-medium text-ink">{row[0]}</th>
              {row.slice(1).map(cell => <td key={cell} className="px-6 py-5 leading-relaxed text-muted">{cell}</td>)}
            </tr>
          ))}</tbody>
        </table>
      </div>
      <Link href={guide.link.href} className="mt-8 inline-block font-medium text-link underline underline-offset-4">{guide.link.label}</Link>
    </Section>
  );
}
