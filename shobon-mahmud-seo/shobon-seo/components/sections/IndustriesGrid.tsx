
import pageCopy from "@/content/copy-components-sections-IndustriesGrid.json";
import { industries } from "@/lib/content/industries";
import { Section } from "@/components/content/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IndustryCard } from "@/components/cards/IndustryCard";

export function IndustriesGrid() {
  return (
    <Section labelledBy="industries-heading">
      <div id="industries-heading">
        <SectionHeading
          kicker={pageCopy.text_001}
          title={pageCopy.text_002}
          intro={pageCopy.text_003}
        />
      </div>
      <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-panel)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {industries.map((i) => <IndustryCard key={i.slug} industry={i} />)}
      </div>
    </Section>
  );
}
