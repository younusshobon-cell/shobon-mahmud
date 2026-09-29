import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { industries } from "@/lib/content/industries";
import { PageHero } from "@/components/content/PageHero";
import { Section } from "@/components/content/Section";
import { IndustryCard } from "@/components/cards/IndustryCard";
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
      <FinalCta title="Working in a market that isn't listed?" body="The principles carry over. Tell me about your industry and how your customers find you." />
    </>
  );
}
