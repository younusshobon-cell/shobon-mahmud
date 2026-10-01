import pageCopy from "@/content/copy-app-services-page.json";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/lib/content/services";
import { PageHero } from "@/components/content/PageHero";
import { Section } from "@/components/content/Section";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { FAQ } from "@/components/content/FAQ";
import { SeoBrief } from "@/components/content/SeoBrief";
import { serviceHubFaqs } from "@/lib/content/faqs";
import { FinalCta } from "@/components/sections/FinalCta";
import { processSteps } from "@/lib/content/process";

export const metadata: Metadata = buildMetadata({
  title: pageCopy.text_001,
  description: pageCopy.text_002,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", href: "/services" }]}
        kicker={pageCopy.text_003}
        title={pageCopy.text_004}
        intro={pageCopy.text_005}
      >
        <ButtonLink href={pageCopy.text_006}>{pageCopy.text_007}</ButtonLink>
      </PageHero>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <h2 className="sr-only">{pageCopy.text_008}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </Section>

      <Section tone="muted" labelledBy="svc-process">
        <div id="svc-process">
          <SectionHeading title={pageCopy.text_009} intro={pageCopy.text_010} />
        </div>
        <ol className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((s, i) => (
            <li key={s.title} className="border-t border-line-strong pt-5">
              <p className="text-sm tabular-nums text-link">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="t-h3 mt-2 text-ink">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <SeoBrief
        title={pageCopy.text_011}
        intro={pageCopy.text_012}
        points={[
          { title: pageCopy.text_013, body: pageCopy.text_014 },
          { title: pageCopy.text_015, body: pageCopy.text_016 },
          { title: pageCopy.text_017, body: pageCopy.text_018 },
        ]}
      />
      <Section>
        <FAQ faqs={serviceHubFaqs} />
      </Section>
      <FinalCta
        title={pageCopy.text_019}
        body="Most people aren't. Tell me what you're seeing in search and I'll tell you where I'd start."
      />
    </>
  );
}
