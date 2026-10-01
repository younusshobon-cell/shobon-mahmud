import pageCopy from "@/content/copy-app-locations-page.json";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { locations } from "@/lib/content/locations";
import { PageHero } from "@/components/content/PageHero";
import { Section } from "@/components/content/Section";
import { LocationCard } from "@/components/cards/LocationCard";
import { ContextCta } from "@/components/content/ContextCta";
import { FAQ } from "@/components/content/FAQ";
import { SeoBrief } from "@/components/content/SeoBrief";
import { locationHubFaqs } from "@/lib/content/faqs";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = buildMetadata({
  title: pageCopy.text_001,
  description: pageCopy.text_002,
  path: "/locations",
});

const featuredOrder = [
  "dubai",
  "dhaka",
  "san-francisco",
  "saudi-arabia",
  "new-york",
  "austin",
  "london",
];
const rank = (slug: string) => {
  const index = featuredOrder.indexOf(slug);
  return index === -1 ? featuredOrder.length : index;
};
const orderedLocations = [...locations].sort(
  (a, b) => rank(a.slug) - rank(b.slug),
);

export default function LocationsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Locations", href: "/locations" }]}
        kicker={pageCopy.text_003}
        title={pageCopy.text_004}
        intro={pageCopy.text_005}
      />
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <h2 className="sr-only">{pageCopy.text_006}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {orderedLocations.map((l) => (
            <LocationCard key={l.slug} location={l} />
          ))}
        </div>
        <div className="mt-14">
          <ContextCta
            line="Need local SEO where you are?"
            action="Explore local SEO"
            href={pageCopy.text_007}
          />
        </div>
      </Section>
      <SeoBrief
        title={pageCopy.text_008}
        intro={pageCopy.text_009}
        points={[
          { title: pageCopy.text_010, body: pageCopy.text_011 },
          { title: pageCopy.text_012, body: pageCopy.text_013 },
          { title: pageCopy.text_014, body: pageCopy.text_015 },
        ]}
      />
      <Section>
        <FAQ faqs={locationHubFaqs} />
      </Section>
      <FinalCta />
    </>
  );
}
