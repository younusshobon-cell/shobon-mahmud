import { PageSchema } from "@/components/seo/PageSchema";
import pageCopy from "@/content/copy-app-locations-slug-page.json";
import type { Metadata } from "next";
import { DhakaLanding } from "@/components/sections/DhakaLanding";
import Image from "@/components/content/EditableImage";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getLocation, locations } from "@/lib/content/locations";
import { getServices, getService } from "@/lib/content/services";
import { getIndustries } from "@/lib/content/industries";
import { caseStudies } from "@/lib/content/case-studies";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { GrowthPrompt } from "@/components/content/GrowthPrompt";
import { PageHero } from "@/components/content/PageHero";
import { Section } from "@/components/content/Section";
import { PointGrid } from "@/components/content/PointGrid";
import { FAQ } from "@/components/content/FAQ";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { LocalMap } from "@/components/maps/LocalMap";
import {
  RelatedCaseStudies,
  RelatedIndustryLinks,
  RelatedServices,
} from "@/components/related/Related";
import { LocationVisual } from "@/components/content/LocationVisual";
import { locationExtras } from "@/lib/content/location-extras";
import { FinalCta } from "@/components/sections/FinalCta";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return locations.map((l) => ({ slug: `seo-consultant-${l.slug}` }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const l = getLocation((await params).slug);
  if (!l) return {};
  if (l.slug === "dhaka") {
    const metadata = buildMetadata({
      title: l.seoTitle,
      description: l.intro,
      path: "/locations/seo-consultant-dhaka",
      absoluteTitle: true,
    });
    return {
      ...metadata,
      openGraph: { ...metadata.openGraph, locale: "en_BD" },
    };
  }
  return buildMetadata({
    title: l.seoTitle,
    description: l.intro.slice(0, 158),
    path: `/locations/seo-consultant-${l.slug}`,
  });
}

export default async function LocationPage({ params }: Props) {
  const loc = getLocation((await params).slug);
  if (!loc) notFound();
  if (loc.slug === "dhaka") return <><PageSchema path="/locations/seo-consultant-dhaka" /><DhakaLanding /></>;
  const path = `/locations/seo-consultant-${loc.slug}`;
  const studies = caseStudies
    .filter((c) => loc.industries.includes(c.industry))
    .slice(0, 3);
  const localSeo = getService("local-seo");
  const extra = locationExtras[loc.slug];

  return (
    <>
      <PageSchema path={path} />
      <PageHero
        theme={loc.slug}
        tone={loc.slug === "saudi-arabia" ? "dark" : "light"}
        crumbs={[
          { name: "Locations", href: "/locations" },
          { name: loc.city, href: path },
        ]}
        kicker={
          loc.city === loc.country
            ? loc.region
            : `${loc.city}, ${loc.country === pageCopy.text_001 ? loc.region : loc.country}`
        }
        title={loc.heroTitle}
        intro={loc.intro}
        aside={
          loc.slug === "dubai" ? (
            <div className="overflow-hidden rounded-[28px] lg:self-center lg:-translate-y-8">
              <Image
                src={pageCopy.text_002}
                alt={pageCopy.text_003}
                width={1600}
                height={1369}
                priority
                sizes="(min-width: 1024px) 560px, (min-width: 640px) 600px, 100vw"
                className="h-auto w-full"
              />
            </div>
          ) : (
            <LocationVisual slug={loc.slug} city={loc.city} />
          )
        }
      >
        <ButtonLink href={pageCopy.text_004} variant={loc.slug === "saudi-arabia" ? "light" : "primary"}>
          {pageCopy.text_005}
          {loc.city} {pageCopy.text_006}
        </ButtonLink>
      </PageHero>

      <div className="hero-grid-band border-y border-line">
        <div className="mx-auto grid max-w-7xl gap-3 px-5 py-5 sm:grid-cols-3 sm:px-8">
          {[pageCopy.text_007, pageCopy.text_008, pageCopy.text_009].map(
            (label, index) => (
              <div
                key={label}
                className="rounded-xl border border-line bg-white px-5 py-4 text-sm font-semibold text-ink"
              >
                <span className="mr-4 text-link">
                  {pageCopy.text_010}
                  {index + 1}
                </span>
                {label} {pageCopy.text_011}
                {loc.city}
              </div>
            ),
          )}
        </div>
      </div>
      <Section className="pt-10 sm:pt-10 lg:pt-10">
        <LocalMap lat={loc.coords.lat} lng={loc.coords.lng} label={loc.city} />
      </Section>

      <Section tone="muted" labelledBy="context">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <h2 id="context" className="t-h2 text-ink">
              {pageCopy.text_012}
              {loc.city}
            </h2>
            <div className="mt-8">
              <RelatedIndustryLinks
                items={getIndustries(loc.industries)}
                title={`Industries I work with in ${loc.city}`}
              />
            </div>
          </div>
          <div className="space-y-5 t-lead text-ink-2">
            {loc.context.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section labelledBy="problems">
        <div id="problems">
          <SectionHeading
            title={`What holds back organic growth for ${loc.city} businesses`}
          />
        </div>
        <div className="mt-12">
          <PointGrid points={loc.problems} columns={2} />
        </div>
      </Section>

      <Section tone="muted" labelledBy="opps">
        <div id="opps">
          <SectionHeading title={`Where growth can start in ${loc.city}`} />
        </div>
        <div className="mt-12">
          <PointGrid points={loc.opportunities} />
        </div>
      </Section>

      <GrowthPrompt title={`Be the business customers find in ${loc.city}.`} />

      <Section labelledBy="sectors">
        <div id="sectors">
          <SectionHeading
            title={`Priority sectors to watch through 2030 in ${loc.city}`}
            intro={pageCopy.text_013}
          />
        </div>
        <div className="mt-12">
          <PointGrid points={extra.sectors} />
        </div>
        <p className="mt-10 text-sm text-muted">
          {pageCopy.text_014}
          <a
            className="link"
            href={extra.source.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {extra.source.label}
          </a>
        </p>
      </Section>
      <Section tone="muted" labelledBy="growth-path">
        <div id="growth-path">
          <SectionHeading
            title={`From discovery to customers in ${loc.city}`}
            intro={pageCopy.text_015}
          />
        </div>
        <div className="mt-12">
          <PointGrid points={extra.searchPaths} numbered />
        </div>
      </Section>
      <Section>
        <RelatedServices
          items={getServices(loc.relatedServices)}
          title={`Services for ${loc.city} businesses`}
        />
      </Section>
      {studies.length > 0 && (
        <Section tone="muted">
          <RelatedCaseStudies items={studies} />
        </Section>
      )}
      <Section>
        <FAQ faqs={extra.faqs} title={`Organic growth in ${loc.city}: FAQs`} />
      </Section>
      <FinalCta
        title={`Reach more customers in ${loc.city} through search.`}
        body="Tell me about your market, your competitors and what you've tried. I'll share how I'd approach it."
      />
      {localSeo && <JsonLd data={serviceSchema(localSeo, path, loc.city)} />}
    </>
  );
}
