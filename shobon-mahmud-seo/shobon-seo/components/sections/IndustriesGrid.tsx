import { industries } from "@/lib/content/industries";
import { Section } from "@/components/content/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IndustryCard } from "@/components/cards/IndustryCard";

export function IndustriesGrid() {
  return (
    <Section labelledBy="industries-heading">
      <div id="industries-heading">
        <SectionHeading
          kicker="Industries"
          title="Every industry searches differently."
          intro="A SaaS buyer comparing tools and a patient looking for a clinic are both 'searching'. The strategy behind each looks nothing alike."
        />
      </div>
      <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-panel)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {industries.map((i) => <IndustryCard key={i.slug} industry={i} />)}
      </div>
    </Section>
  );
}
