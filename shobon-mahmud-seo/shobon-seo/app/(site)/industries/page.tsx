import { PageSchema } from "@/components/seo/PageSchema";
import pageCopy from "@/content/copy-app-industries-page.json";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { industries } from "@/lib/content/industries";
import { PageHero } from "@/components/content/PageHero";
import { Section } from "@/components/content/Section";
import { IndustryCard } from "@/components/cards/IndustryCard";
import { FAQ } from "@/components/content/FAQ";
import { SeoBrief } from "@/components/content/SeoBrief";
import { industryHubFaqs } from "@/lib/content/faqs";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = buildMetadata({
  title: pageCopy.text_001,
  description: pageCopy.text_002,
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageSchema path={"/industries"} />
      <PageHero
        crumbs={[{ name: "Industries", href: "/industries" }]}
        kicker={pageCopy.text_003}
        title={pageCopy.text_004}
        intro={pageCopy.text_005}
      />
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <h2 className="sr-only">{pageCopy.text_006}</h2>
        <div className="grid gap-px overflow-hidden rounded-[var(--radius-panel)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((i) => (
            <IndustryCard key={i.slug} industry={i} />
          ))}
        </div>
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
        <FAQ faqs={industryHubFaqs} />
      </Section>
      <FinalCta
        title={pageCopy.text_015}
        body="The principles carry over. Tell me about your industry and how your customers find you."
      />
    </>
  );
}
