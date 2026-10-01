
import pageCopy from "@/content/copy-components-sections-GrowthSystem.json";
import { Section } from "@/components/content/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GrowthFunnel } from "./GrowthFunnel";

export function GrowthSystem() {
  return (
    <Section tone="dark" labelledBy="system-heading">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div id="system-heading">
          <SectionHeading
            tone="dark"
            kicker={pageCopy.text_001}
            title={pageCopy.text_002}
          />
          <div className="mt-6 max-w-md space-y-4 leading-relaxed text-on-night-muted">
            <p>{pageCopy.text_003}</p>
            <p>{pageCopy.text_004}</p>
          </div>
        </div>
        <GrowthFunnel />
      </div>
    </Section>
  );
}
