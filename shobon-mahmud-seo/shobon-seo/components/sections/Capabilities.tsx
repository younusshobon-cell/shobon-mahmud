import Link from "next/link";
import { Section } from "@/components/content/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
        <Link
          href="/contact"
          className="group relative block overflow-hidden rounded-[var(--radius-panel)] border border-line-strong bg-[linear-gradient(115deg,#e8ecfd_0%,#f7f8fb_55%,#e9f1ec_100%)] px-7 py-8 shadow-[0_22px_55px_-35px_rgba(15,26,43,0.46)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-link hover:shadow-[0_28px_65px_-32px_rgba(15,26,43,0.38)] sm:px-10 sm:py-10"
        >
          <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(31,63,209,.08)_1px,transparent_1px)] [background-size:26px_26px]" aria-hidden="true" />
          <div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-link">Your next growth step</span>
              <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl">Is your website losing customers before they find you?</h3>
              <p className="mt-3 text-base leading-relaxed text-ink-2">Indexing gaps, slow pages and unclear content can limit Google visibility and enquiries. Share your website and goals, and we&apos;ll identify where to start.</p>
            </div>
            <span className="inline-flex min-h-12 w-fit items-center justify-center gap-3 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors group-hover:bg-link sm:text-base">
              Find Your Growth Blockers <Arrow className="text-white" />
            </span>
          </div>
        </Link>
      </div>
    </Section>
  );
}
