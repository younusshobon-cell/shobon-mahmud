import Link from "next/link";
import { Section } from "@/components/content/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const phases = [
  {
    days: "Days 01–30",
    title: "Onboard & find the opportunity",
    goal: "Understand the business, its buyers and where organic search currently loses them.",
    steps: [
      "Align on products, services, target markets and what counts as a qualified lead or sale.",
      "Set a baseline in Search Console and analytics; review crawl, indexation and key landing pages.",
      "Map high-intent searches to existing and missing product, service or category pages.",
    ],
    output: "A prioritised SEO roadmap and measurement plan.",
  },
  {
    days: "Days 31–60",
    title: "Build & make pages discoverable",
    goal: "Fix the main blockers and publish pages that answer real buying questions.",
    steps: [
      "Resolve important technical issues and improve navigation and internal links.",
      "Optimise key pages for search intent, clear offers, useful details and calls to action.",
      "Create briefs or launch comparison, use-case, local or category content where demand exists.",
    ],
    output: "Stronger search-ready pages and a clearer path to enquiry or checkout.",
  },
  {
    days: "Days 61–90",
    title: "Reach, measure & improve",
    goal: "See which searches are finding the pages and improve the journey toward a sale.",
    steps: [
      "Check indexing, relevant impressions and clicks for the pages changed or launched.",
      "Review form enquiries, calls, demo requests or purchases from organic visitors.",
      "Improve pages with weak engagement and set the next 90-day priorities from the evidence.",
    ],
    output: "A performance review and the next growth backlog.",
  },
];

export function NinetyDayPlan() {
  return (
    <Section labelledBy="ninety-day-heading">
      <div id="ninety-day-heading" className="max-w-3xl">
        <SectionHeading
          kicker="First 90 days"
          title="From onboarding to search-led enquiries and sales."
          intro="A practical SEO plan moves from understanding the business to launching useful pages, then measuring whether the right visitors take action. The exact pace depends on the site and implementation capacity."
        />
      </div>
      <ol className="mt-12 grid gap-4 lg:grid-cols-3">
        {phases.map((phase, index) => (
          <li key={phase.days} className="flex h-full flex-col rounded-[var(--radius-panel)] border border-line bg-paper p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-semibold tabular-nums text-link">{phase.days}</span>
              <span className="text-sm tabular-nums text-muted">0{index + 1} / 03</span>
            </div>
            <h3 className="mt-7 text-2xl font-semibold leading-tight tracking-tight text-ink">{phase.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{phase.goal}</p>
            <ul className="mt-7 space-y-4 border-t border-line pt-6">
              {phase.steps.map((step) => (
                <li key={step} className="flex gap-3 text-sm leading-relaxed text-ink-2">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-link" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <p className="border-t border-line pt-5 text-sm leading-relaxed text-ink-2"><strong className="text-ink">By this stage:</strong> {phase.output}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-8 flex flex-col gap-4 rounded-[var(--radius-card)] bg-paper-2 p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-8">
        <p className="max-w-2xl text-sm leading-relaxed text-ink-2"><strong className="text-ink">The path:</strong> relevant search → useful page → qualified enquiry or checkout → sale. SEO can improve each step, but rankings and revenue are not guaranteed within 90 days.</p>
        <Link href="/contact" className="shrink-0 font-medium text-link hover:underline">Discuss your 90-day plan →</Link>
      </div>
    </Section>
  );
}
