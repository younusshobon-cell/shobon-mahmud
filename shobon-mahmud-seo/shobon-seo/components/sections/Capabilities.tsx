import Link from "next/link";
import { Section } from "@/components/content/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContextCta } from "@/components/content/ContextCta";
import { Arrow } from "@/components/ui/Arrow";

const capabilities = [
  { slug: "technical-seo", name: "Technical SEO", body: "Crawling, indexing, site architecture, Core Web Vitals, schema, technical audits, JavaScript SEO, internal linking." },
  { slug: "on-page-seo", name: "On-Page SEO", body: "Search intent, keyword mapping, content optimisation, metadata, headings, internal links, topical relevance." },
  { slug: "content-seo", name: "Content SEO", body: "Content strategy, topical authority, content briefs, SERP analysis, information architecture, content optimisation." },
  { slug: "off-page-seo", name: "Off-Page SEO", body: "Digital PR, link acquisition, authority building, backlink analysis, competitor backlink research." },
  { slug: "local-seo", name: "Local SEO", body: "Google Business Profile optimisation, local landing pages, citations, reviews, local keyword strategy." },
  { slug: "ecommerce-seo", name: "E-commerce SEO", body: "Category optimisation, product pages, faceted navigation, technical SEO, internal linking, product schema." },
  { slug: "international-seo", name: "International SEO", body: "International targeting, localisation, hreflang, country-specific SEO strategies." },
];

export function Capabilities() {
  return (
    <Section labelledBy="capabilities-heading">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start" id="capabilities-heading">
          <SectionHeading
            kicker="Capabilities"
            title="One SEO stack. Multiple growth levers."
            intro="Rankings rarely come down to one thing. Most growth problems sit between disciplines — which is why I work across all of them."
          />
          <Link href="/services" className="group mt-8 inline-flex items-center gap-1.5 font-medium text-link">
            See all services <Arrow />
          </Link>
        </div>
        <ul className="border-t border-line">
          {capabilities.map((c) => (
            <li key={c.slug} className="border-b border-line">
              <Link href={`/services/${c.slug}`} className="group grid gap-2 py-6 sm:grid-cols-[180px_1fr_auto] sm:items-baseline sm:gap-8">
                <h3 className="text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-link">{c.name}</h3>
                <p className="leading-relaxed text-muted">{c.body}</p>
                <Arrow className="hidden text-muted group-hover:text-link sm:block" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-14">
        <ContextCta line="Have technical issues blocking growth?" />
      </div>
    </Section>
  );
}
