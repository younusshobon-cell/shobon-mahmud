import { PageSchema } from "@/components/seo/PageSchema";
import pageCopy from "@/content/copy-app-portfolio-page.json";
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
  title: pageCopy.text_001,
  description: pageCopy.text_002,
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <PageSchema path={"/portfolio"} />
      <PageHero
        crumbs={[{ name: "Work", href: "/portfolio" }]}
        kicker={pageCopy.text_003}
        title={pageCopy.text_004}
        intro={pageCopy.text_005}
      />
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <h2 className="sr-only">{pageCopy.text_006}</h2>
        <PortfolioGrid
          filters={portfolioFilters}
          items={caseStudies.map((c) => ({
            key: c.slug,
            filter: c.filter,
            node: <CaseStudyCard study={c} />,
          }))}
        />
      </Section>
      <SeoBrief
        title={pageCopy.text_007}
        intro={pageCopy.text_008}
        points={[
          { title: pageCopy.text_009, body: pageCopy.text_010 },
          { title: pageCopy.text_011, body: pageCopy.text_012 },
          { title: pageCopy.text_013, body: pageCopy.text_014 },
        ]}
      />
      <Section>
        <FAQ faqs={portfolioFaqs} />
      </Section>
      <FinalCta
        title={pageCopy.text_015}
        body="Tell me what's happening with your search visibility and I'll tell you how I'd approach it."
      />
    </>
  );
}
