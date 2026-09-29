import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Capabilities } from "@/components/sections/Capabilities";
import { HowIWork } from "@/components/sections/HowIWork";
import { IndustriesGrid } from "@/components/sections/IndustriesGrid";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { GrowthSystem } from "@/components/sections/GrowthSystem";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { HomeDepth } from "@/components/sections/HomeDepth";
import { FAQ } from "@/components/content/FAQ";
import { Section } from "@/components/content/Section";
import { homeFaqs } from "@/lib/content/faqs";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} — SEO Specialist | Technical, Content & Local SEO`,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Capabilities />
      <HowIWork />
      <IndustriesGrid />
      <FeaturedWork />
      <GrowthSystem />
      <HomeDepth />
      <BlogPreview />
      <Section><FAQ faqs={homeFaqs} title="SEO questions, answered plainly" /></Section>
      <FinalCta />
    </>
  );
}
