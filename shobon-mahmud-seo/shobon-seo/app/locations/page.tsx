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
  title: "Locations — SEO for Businesses in Dubai, Saudi Arabia, Dhaka, US and UK",
  description: "SEO for businesses in Dubai, Saudi Arabia, Dhaka, San Francisco, New York, Austin and London — how search works in each market and where the opportunities are.",
  path: "/locations",
});

const featuredOrder = ["dubai", "dhaka", "san-francisco", "saudi-arabia", "new-york", "austin", "london"];
const rank = (slug: string) => {
  const index = featuredOrder.indexOf(slug);
  return index === -1 ? featuredOrder.length : index;
};
const orderedLocations = [...locations].sort((a, b) => rank(a.slug) - rank(b.slug));

export default function LocationsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Locations", href: "/locations" }]}
        kicker="Locations"
        title="Based in Dubai. Built for the way each market discovers businesses."
        intro="From Dubai, Dhaka and Saudi Arabia to US cities and London, I help businesses grow through Google search and AI discovery. Explore local language, buyer behaviour and practical opportunities in each market."
      />
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <h2 className="sr-only">Cities</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {orderedLocations.map((l) => <LocationCard key={l.slug} location={l} />)}
        </div>
        <div className="mt-14">
          <ContextCta line="Need local SEO where you are?" action="Explore local SEO" href="/services/local-seo" />
        </div>
      </Section>
      <SeoBrief title="Location SEO that reflects real service coverage" intro="Search in each city has its own competitors, language and customer expectations. Useful local pages need more than a changed city name." points={[{ title: "Confirm the service area", body: "Describe where you actually operate and which services are available in each market." }, { title: "Research local intent", body: "Review map results, service searches and regional language before choosing pages or Business Profile actions." }, { title: "Connect visibility to enquiries", body: "Track calls, forms and relevant landing pages for each target area with a clear reporting baseline." }]} />
      <Section><FAQ faqs={locationHubFaqs} /></Section>
      <FinalCta />
    </>
  );
}
