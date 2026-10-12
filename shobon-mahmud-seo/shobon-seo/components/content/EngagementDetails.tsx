import type { Engagement } from "@/lib/content/types";
import { Section } from "./Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Buyer-facing, page-specific content; rendered on the server and available without JS. */
export function EngagementDetails({ content, topic }: { content?: Engagement; topic: string }) {
  if (!content) return null;
  return (
    <Section tone="muted" labelledBy="delivery-details" className="engagement-details">
      <div id="delivery-details"><SectionHeading kicker="The work in practice" title={content.title} intro={content.intro} /></div>
      <ol className="mt-10 grid gap-5 md:grid-cols-3">
        {content.priorities.map((item, index) => (
          <li key={item.title} data-motion-step className="delivery-card relative rounded-2xl border border-line bg-white p-6 sm:p-7">
            <span aria-hidden="true" className="mb-6 block text-sm font-medium tabular-nums text-link">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="t-h3 text-ink">{item.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
          </li>
        ))}
      </ol>
      <div data-motion-step className="mt-8 rounded-2xl border border-line bg-white p-6 sm:p-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-link">Illustrative workflow</p>
        <h3 className="t-h3 text-ink">{content.example.title}</h3>
        <p className="mt-4 max-w-4xl leading-relaxed text-muted">{content.example.body}</p>
      </div>
      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div><h3 className="t-h3 text-ink">How we measure {topic}</h3><p className="mt-4 leading-relaxed text-muted">{content.measurement}</p></div>
        <div><h3 className="t-h3 text-ink">What helps us get started</h3><ul className="mt-4 list-disc space-y-3 ps-5 text-muted">{content.preparation.map(item => <li key={item}>{item}</li>)}</ul></div>
      </div>
      <p className="mt-10 border-t border-line pt-6 text-sm leading-relaxed text-muted">Your SEO plan is led by <a className="link" href="/about">Shobon Mahmud</a>. Scope, responsibilities and reporting are agreed before work starts. <a className="link" href="/contact">Discuss your priorities and implementation needs</a>.</p>
    </Section>
  );
}
