
import pageCopy from "@/content/copy-components-sections-HowIWork.json";
import { Section } from "@/components/content/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessTimeline } from "./ProcessTimeline";

export function HowIWork() {
  return (
    <Section tone="muted" labelledBy="process-heading">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div id="process-heading" className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            kicker={pageCopy.text_001}
            title={pageCopy.text_002}
            intro={pageCopy.text_003}
          />
        </div>
        <ProcessTimeline />
      </div>
    </Section>
  );
}
