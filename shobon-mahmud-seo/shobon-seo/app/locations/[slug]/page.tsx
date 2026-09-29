import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getLocation, locations } from "@/lib/content/locations";
import { getServices, getService } from "@/lib/content/services";
import { getIndustries } from "@/lib/content/industries";
import { caseStudies } from "@/lib/content/case-studies";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { PageHero } from "@/components/content/PageHero";
import { Section } from "@/components/content/Section";
import { PointGrid } from "@/components/content/PointGrid";
import { FAQ } from "@/components/content/FAQ";
import { expandFaqs } from "@/lib/content/faqs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { LocalMap } from "@/components/maps/LocalMap";
import { RelatedCaseStudies, RelatedIndustryLinks, RelatedServices } from "@/components/related/Related";
import { FinalCta } from "@/components/sections/FinalCta";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const l = getLocation((await params).slug);
  if (!l) return {};
  return buildMetadata({ title: l.seoTitle, description: l.intro.slice(0, 158), path: `/locations/${l.slug}` });
}

export default async function LocationPage({ params }: Props) {
  const loc = getLocation((await params).slug);
  if (!loc) notFound();
  const path = `/locations/${loc.slug}`;
  const studies = caseStudies.filter((c) => loc.industries.includes(c.industry)).slice(0, 3);
  const localSeo = getService("local-seo");

  return (
    <>
      <PageHero
        crumbs={[{ name: "Locations", href: "/locations" }, { name: loc.city, href: path }]}
        kicker={`${loc.city}, ${loc.country === "United States" ? loc.region : loc.country}`}
        title={loc.heroTitle}
        intro={loc.intro}
      >
        <ButtonLink href="/contact">Talk about your {loc.city} business</ButtonLink>
      </PageHero>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <LocalMap lat={loc.coords.lat} lng={loc.coords.lng} label={loc.city} />
      </Section>

      <Section tone="muted" labelledBy="context">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <h2 id="context" className="t-h2 text-ink">Search in {loc.city}</h2>
            <div className="mt-8">
              <RelatedIndustryLinks items={getIndustries(loc.industries)} title={`Industries I work with in ${loc.city}`} />
            </div>
          </div>
          <div className="space-y-5 t-lead text-ink-2">
            {loc.context.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </Section>

      <Section labelledBy="problems">
        <div id="problems"><SectionHeading title={`Common SEO problems for ${loc.city} businesses`} /></div>
        <div className="mt-12"><PointGrid points={loc.problems} columns={2} /></div>
      </Section>

      <Section tone="muted" labelledBy="opps">
        <div id="opps"><SectionHeading title={`Search opportunities in ${loc.city}`} /></div>
        <div className="mt-12"><PointGrid points={loc.opportunities} /></div>
      </Section>

      <Section><RelatedServices items={getServices(loc.relatedServices)} title={`Services for ${loc.city} businesses`} /></Section>
      {studies.length > 0 && <Section tone="muted"><RelatedCaseStudies items={studies} /></Section>}
      <Section><FAQ faqs={expandFaqs(loc.faqs, loc.city, "location")} title={`SEO in ${loc.city}: FAQs`} /></Section>
      <FinalCta title={`Growing a business in ${loc.city}?`} body="Tell me about your market, your competitors and what you've tried. I'll share how I'd approach it." />
      {localSeo && <JsonLd data={serviceSchema(localSeo, path, loc.city)} />}
    </>
  );
}
