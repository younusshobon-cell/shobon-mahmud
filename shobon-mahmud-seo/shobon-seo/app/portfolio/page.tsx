import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { caseStudies, portfolioFilters } from "@/lib/content/case-studies";
import { PageHero } from "@/components/content/PageHero";
import { Section } from "@/components/content/Section";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = buildMetadata({
  title: "SEO Portfolio & Case Studies",
  description: "SEO case studies across SaaS, legal tech, health tech, logistics, design and e-commerce — the problem, the research, the strategy and the results.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Work", href: "/portfolio" }]}
        kicker="Work"
        title="SEO work, written up properly."
        intro="Each case study covers the situation, what was blocking growth, the research, the strategy, what was actually implemented and what changed."
      />
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <h2 className="sr-only">Case studies</h2>
        <PortfolioGrid
          filters={portfolioFilters}
          items={caseStudies.map((c) => ({ key: c.slug, filter: c.filter, node: <CaseStudyCard study={c} /> }))}
        />
      </Section>
      <FinalCta title="Working through a similar problem?" body="Tell me what's happening with your search visibility and I'll tell you how I'd approach it." />
    </>
  );
}
