import { Section } from "@/components/content/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessTimeline } from "./ProcessTimeline";

export function HowIWork() {
  return (
    <Section tone="muted" labelledBy="process-heading">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div id="process-heading" className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            kicker="How I work"
            title="Six steps, one loop."
            intro="SEO isn't a project with an end date. Each cycle starts from what the last one taught us."
          />
        </div>
        <ProcessTimeline />
      </div>
    </Section>
  );
}
