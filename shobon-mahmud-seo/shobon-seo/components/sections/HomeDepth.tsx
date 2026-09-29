import Link from "next/link";
import { Section } from "@/components/content/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PointGrid } from "@/components/content/PointGrid";

const diagnostic = [
  { title: "Search demand and intent", body: "Map the questions people ask before they compare options, request a quote or buy. Keyword research should reveal pages worth building, not just a list of volumes." },
  { title: "Technical access", body: "Check crawling, indexing, canonical URLs, internal links and mobile page experience. Important pages need to be accessible before content improvements can compound." },
  { title: "Conversion path", body: "Connect search landing pages to a clear next action. Track qualified enquiries and sales so growth means more than a rising impressions chart." },
];
const roadmap = [
  { title: "First: establish a baseline", body: "Review Search Console, analytics and the pages that already attract relevant visits. Record branded and non-branded demand separately before changing the site." },
  { title: "Next: fix the constraint", body: "Prioritise the highest-impact issue: indexation, missing high-intent pages, thin service copy or weak internal linking. Each recommendation has an owner and a reason." },
  { title: "Then: measure and refine", body: "Compare page groups and conversion actions against the baseline. Continue what helps buyers, improve what underperforms and revisit the plan as search demand changes." },
];

export function HomeDepth() {
  return (
    <>
      <Section labelledBy="seo-diagnostic">
        <div id="seo-diagnostic"><SectionHeading kicker="Where growth starts" title="Find the SEO bottleneck before adding more pages." intro="More content is not always the answer. A useful SEO audit checks whether your site can be found, whether its pages match search intent and whether visits can turn into enquiries." /></div>
        <div className="mt-12"><PointGrid points={diagnostic} numbered /></div>
        <Link href="/services/seo-audits" className="link mt-9 inline-block font-medium">Explore SEO audits →</Link>
      </Section>
      <Section tone="muted" labelledBy="seo-roadmap">
        <div id="seo-roadmap"><SectionHeading kicker="A practical roadmap" title="From organic visibility to qualified leads." intro="A search strategy works best as a sequence of decisions, with technical SEO, on-page improvements and content tied to the same business goal." /></div>
        <div className="mt-12"><PointGrid points={roadmap} numbered /></div>
      </Section>
      <Section labelledBy="seo-fit">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div id="seo-fit"><SectionHeading kicker="Is SEO a fit?" title="Build search around the way customers choose." /></div>
          <div className="space-y-5 text-lg leading-relaxed text-ink-2">
            <p>SEO is valuable when people search for your product, service or problem before they contact a provider. For SaaS and B2B teams, that might mean comparison and use-case pages. For local businesses, it may begin with service pages, a complete Business Profile and clear coverage information.</p>
            <p>The right plan depends on your market and capacity to implement changes. See <Link href="/industries" className="link">industry-specific SEO opportunities</Link>, review the <Link href="/services" className="link">services</Link>, or share your site for a focused first conversation.</p>
          </div>
        </div>
      </Section>
    </>
  );
}
