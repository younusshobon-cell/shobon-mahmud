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
  title: "Industries — SEO for SaaS, Legal Tech, Health Tech & More",
  description: "How SEO works in SaaS, legal tech, health tech, logistics, design, e-commerce, technology and local services — the search landscape and opportunities in each.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Industries", href: "/industries" }]}
        kicker="Industries"
        title="SEO shaped by how your buyers actually search."
        intro="Search behaviour changes by industry — the terms people use, how long they research, what they need to see before they trust you. Each page below covers the landscape, the common problems and the opportunities in that market."
      />
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <h2 className="sr-only">Industries</h2>
        <div className="grid gap-px overflow-hidden rounded-[var(--radius-panel)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((i) => <IndustryCard key={i.slug} industry={i} />)}
        </div>
      </Section>
      <SeoBrief title="An industry SEO plan starts with the buyer" intro="The same keyword can mean different things in different markets. Research the decisions buyers need to make before writing pages." points={[{ title: "Map the journey", body: "Separate educational searches from product, provider and service comparisons so each page has a clear job." }, { title: "Show relevant expertise", body: "Use specific processes, examples, product details and subject review where accuracy or trust is essential." }, { title: "Measure commercial intent", body: "Track qualified enquiries, signups and sales by landing page, not just total industry keyword rankings." }]} />
      <Section><FAQ faqs={industryHubFaqs} /></Section>
      <FinalCta title="Working in a market that isn't listed?" body="The principles carry over. Tell me about your industry and how your customers find you." />
    </>
  );
}
