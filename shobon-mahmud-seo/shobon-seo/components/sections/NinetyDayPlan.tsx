
import pageCopy from "@/content/copy-components-sections-NinetyDayPlan.json";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/content/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const phases = [
  {
    days: pageCopy.text_001,
    title: pageCopy.text_002,
    goal: pageCopy.text_003,
    steps: [
      pageCopy.text_004,
      pageCopy.text_005,
      pageCopy.text_006,
    ],
    output: pageCopy.text_007,
  },
  {
    days: pageCopy.text_008,
    title: pageCopy.text_009,
    goal: pageCopy.text_010,
    steps: [
      pageCopy.text_011,
      pageCopy.text_012,
      pageCopy.text_013,
    ],
    output: pageCopy.text_014,
  },
  {
    days: pageCopy.text_015,
    title: pageCopy.text_016,
    goal: pageCopy.text_017,
    steps: [
      pageCopy.text_018,
      pageCopy.text_019,
      pageCopy.text_020,
    ],
    output: pageCopy.text_021,
  },
];

export function NinetyDayPlan() {
  return (
    <Section labelledBy="ninety-day-heading">
      <div id="ninety-day-heading" className="max-w-3xl">
        <SectionHeading
          kicker={pageCopy.text_022}
          title={pageCopy.text_023}
          intro={pageCopy.text_024}
        />
      </div>
      <ol className="mt-12 grid gap-4 lg:grid-cols-3">
        {phases.map((phase, index) => (
          <li data-motion-step key={phase.days} className="flex h-full flex-col rounded-[var(--radius-panel)] border border-line bg-paper p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-semibold tabular-nums text-link">{phase.days}</span>
              <span className="text-sm tabular-nums text-muted">{pageCopy.text_025}{index + 1} {pageCopy.text_026}</span>
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
              <p className="border-t border-line pt-5 text-sm leading-relaxed text-ink-2"><strong className="text-ink">{pageCopy.text_027}</strong> {phase.output}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-8 flex flex-col gap-4 rounded-[var(--radius-card)] bg-paper-2 p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-8">
        <p className="max-w-2xl text-sm leading-relaxed text-ink-2"><strong className="text-ink">{pageCopy.text_028}</strong> {pageCopy.text_029}</p>
        <ButtonLink href={pageCopy.text_030} variant="secondary" className="shrink-0">{pageCopy.text_031}</ButtonLink>
      </div>
    </Section>
  );
}
