import type { Metadata } from "next";
import Image from "next/image";
import { photos } from "@/lib/images";
import { ButtonLink } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Capabilities } from "@/components/sections/Capabilities";
import { HowIWork } from "@/components/sections/HowIWork";
import { NinetyDayPlan } from "@/components/sections/NinetyDayPlan";
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
      <Section id="about" labelledBy="home-about-heading">
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[28px] bg-paper-2">
            <Image
              src={photos.outdoor.src}
              alt={photos.outdoor.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 440px, (min-width: 640px) 448px, 100vw"
              className="object-cover object-[50%_25%]"
            />
          </div>
          <div>
            <p className="mb-5 text-sm font-medium text-link">About Shobon</p>
            <h2 id="home-about-heading" className="t-h2 max-w-xl text-ink">Your business goals shape the search strategy.</h2>
            <div className="t-lead mt-6 max-w-2xl space-y-5 text-muted">
              <p>I&apos;m Shobon Mahmud, an SEO specialist based in Dubai, working with businesses across the Gulf, US and UK. I connect technical SEO, content and local search to the questions your customers actually ask.</p>
              <p>My approach starts with your business, then turns research into clear priorities. You get practical guidance, plain-language updates and a focus on qualified enquiries and sales.</p>
            </div>
            <ul className="mt-8 grid gap-4 border-y border-line py-6 sm:grid-cols-3">
              {["Business-led strategy", "Evidence-based priorities", "Clear communication"].map((principle) => (
                <li key={principle} className="text-sm font-medium text-ink">{principle}</li>
              ))}
            </ul>
            <div className="mt-8">
              <ButtonLink href="/about" variant="secondary">More About Me</ButtonLink>
            </div>
          </div>
        </div>
      </Section>
      <HowIWork />
      <NinetyDayPlan />
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
