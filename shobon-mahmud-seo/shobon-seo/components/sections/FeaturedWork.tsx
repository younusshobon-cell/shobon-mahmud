import Link from "next/link";
import { caseStudies } from "@/lib/content/case-studies";
import { Section } from "@/components/content/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { Arrow } from "@/components/ui/Arrow";

export function FeaturedWork() {
  const featured = caseStudies.filter((c) => c.featured).slice(0, 3);
  const [first, ...rest] = featured;
  if (!first) return null;
  return (
    <Section tone="muted" labelledBy="work-heading">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" id="work-heading">
        <SectionHeading kicker="SEO approaches" title="Search problems, and a plan to solve them." />
        <Link href="/portfolio" className="group inline-flex shrink-0 items-center gap-1.5 font-medium text-link">
          All example strategies <Arrow />
        </Link>
      </div>
      <div className="mt-12 grid gap-5">
        <CaseStudyCard study={first} variant="wide" />
        <div className="grid gap-5 md:grid-cols-2">
          {rest.map((c) => <CaseStudyCard key={c.slug} study={c} />)}
        </div>
      </div>
    </Section>
  );
}
