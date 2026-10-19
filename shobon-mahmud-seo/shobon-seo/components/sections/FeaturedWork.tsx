
import pageCopy from "@/content/copy-components-sections-FeaturedWork.json";
import Link from "next/link";
import { caseStudies } from "@/lib/content/case-studies";
import { Section } from "@/components/content/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { ContextCta } from "@/components/content/ContextCta";
import { Arrow } from "@/components/ui/Arrow";

export function FeaturedWork() {
  // Keep this homepage selection explicit: new case studies stay in the full index.
  const homepageSlugs = [
    "arhq-domain-migration-organic-growth",
    "retirement-tax-partners-seo-growth",
    "americas-medicare-associates-seo-growth",
  ];
  const featured = homepageSlugs.flatMap(slug => {
    const study = caseStudies.find(c => c.slug === slug && !c.draft);
    return study ? [study] : [];
  });
  const [first, ...rest] = featured;
  if (!first) return null;
  return (
    <Section tone="muted" labelledBy="work-heading">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" id="work-heading">
        <SectionHeading kicker={pageCopy.text_001} title={pageCopy.text_002} />
        <Link href={pageCopy.text_003} className="group inline-flex shrink-0 items-center gap-1.5 font-medium text-link">
          {pageCopy.text_004}<Arrow />
        </Link>
      </div>
      <div className="mt-12 grid gap-5">
        <CaseStudyCard study={first} variant="wide" />
        <div className="grid gap-5 md:grid-cols-2">
          {rest.map((c) => <CaseStudyCard key={c.slug} study={c} />)}
        </div>
      </div>
      <div className="mt-10">
        <ContextCta line="Want a strategy shaped around your website?" action="Discuss my growth goals" />
      </div>
    </Section>
  );
}
