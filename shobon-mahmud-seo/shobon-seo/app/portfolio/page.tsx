import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { caseStudies, portfolioFilters } from "@/lib/content/case-studies";
import { PageHero } from "@/components/content/PageHero";
import { Section } from "@/components/content/Section";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { FAQ } from "@/components/content/FAQ";
import { SeoBrief } from "@/components/content/SeoBrief";
import { portfolioFaqs } from "@/lib/content/faqs";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = buildMetadata({
  title: "SEO Portfolio — Strategy Examples",
  description: "Illustrative SEO strategies across SaaS, legal tech, health tech, logistics, design and e-commerce — the problem, the research, the strategy and the success measures.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Work", href: "/portfolio" }]}
        kicker="Work"
        title="SEO project thinking, made clear."
        intro="Explore complete example strategies for common SEO problems. These are illustrative approaches; no client results are claimed without verified data."
      />
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <h2 className="sr-only">Illustrative SEO strategies</h2>
        <PortfolioGrid
          filters={portfolioFilters}
          items={caseStudies.map((c) => ({ key: c.slug, filter: c.filter, node: <CaseStudyCard study={c} /> }))}
        />
      </Section>
      <SeoBrief title="How to read these SEO project approaches" intro="The examples explain decisions a specialist might make in different markets. They are illustrative strategies, not fabricated client-result reports." points={[{ title: "Start with the constraint", body: "Look at the search problem, the pages available and where users lose the path to a conversion." }, { title: "Choose the work", body: "Map technical fixes, content briefs and internal links to the buyer journey and implementation capacity." }, { title: "Define success before launch", body: "Set a baseline in Search Console and analytics, then compare relevant clicks and qualified actions after implementation." }]} />
      <Section><FAQ faqs={portfolioFaqs} /></Section>
      <FinalCta title="Working through a similar problem?" body="Tell me what's happening with your search visibility and I'll tell you how I'd approach it." />
    </>
  );
}
