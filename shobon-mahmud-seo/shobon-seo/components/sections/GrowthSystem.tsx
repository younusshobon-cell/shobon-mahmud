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
            kicker="My approach"
            title="SEO is not a traffic project. It's a growth system."
          />
          <div className="mt-6 max-w-md space-y-4 leading-relaxed text-on-night-muted">
            <p>Traffic is a middle step, not the goal. Every stage below depends on the one before it — and a weak link anywhere caps everything after it.</p>
            <p>Strong content on a site Google can't crawl goes nowhere. Great rankings for searches nobody buys from go nowhere. I work on the whole chain, starting wherever it's weakest.</p>
          </div>
        </div>
        <GrowthFunnel />
      </div>
    </Section>
  );
}
