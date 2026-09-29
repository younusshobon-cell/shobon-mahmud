import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { locations } from "@/lib/content/locations";
import { PageHero } from "@/components/content/PageHero";
import { Section } from "@/components/content/Section";
import { LocationCard } from "@/components/cards/LocationCard";
import { ContextCta } from "@/components/content/ContextCta";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = buildMetadata({
  title: "Locations — SEO for Businesses in San Francisco, New York, London & More",
  description: "SEO for businesses in San Francisco, New York, Austin, Dubai and London — how search works in each market and where the opportunities are.",
  path: "/locations",
});

export default function LocationsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Locations", href: "/locations" }]}
        kicker="Locations"
        title="Remote SEO, grounded in how each market searches."
        intro="I work remotely with businesses in these cities. Each page covers what's specific about search there — local competition, language, buyer behaviour — rather than the same page with a different city name."
      />
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <h2 className="sr-only">Cities</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((l) => <LocationCard key={l.slug} location={l} />)}
        </div>
        <div className="mt-14">
          <ContextCta line="Need local SEO where you are?" action="Explore local SEO" href="/services/local-seo" />
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
