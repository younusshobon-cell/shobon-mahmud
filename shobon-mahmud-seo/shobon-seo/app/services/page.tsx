import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/lib/content/services";
import { PageHero } from "@/components/content/PageHero";
import { Section } from "@/components/content/Section";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { FinalCta } from "@/components/sections/FinalCta";
import { processSteps } from "@/lib/content/process";

export const metadata: Metadata = buildMetadata({
  title: "SEO Services — Technical, On-Page, Content, Local & More",
  description: "SEO services built around your business: technical SEO, on-page, content, off-page, local, e-commerce and international SEO, audits, keyword and competitor research.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", href: "/services" }]}
        kicker="Services"
        title="SEO built around your business, not a checklist."
        intro="A SaaS company fighting review sites for comparison searches needs different SEO from a clinic trying to reach the map pack. I start with where your growth is stuck, then use the parts of SEO that will move it."
      >
        <ButtonLink href="/contact">Talk about your site</ButtonLink>
      </PageHero>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <h2 className="sr-only">All SEO services</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => <ServiceCard key={s.slug} service={s} index={i} />)}
        </div>
      </Section>

      <Section tone="muted" labelledBy="svc-process">
        <div id="svc-process">
          <SectionHeading title="Every engagement follows the same loop." intro="Whichever service you start with, the work moves through the same steps — so decisions stay tied to data and business value." />
        </div>
        <ol className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((s, i) => (
            <li key={s.title} className="border-t border-line-strong pt-5">
              <p className="text-sm tabular-nums text-link">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="t-h3 mt-2 text-ink">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <FinalCta title="Not sure which service you need?" body="Most people aren't. Tell me what you're seeing in search and I'll tell you where I'd start." />
    </>
  );
}
