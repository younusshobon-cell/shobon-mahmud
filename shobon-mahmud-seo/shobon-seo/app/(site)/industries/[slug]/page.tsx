import { PageSchema } from "@/components/seo/PageSchema";
import pageCopy from "@/content/copy-app-industries-slug-page.json";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Search } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { getIndustry, industries } from "@/lib/content/industries";
import { getServices } from "@/lib/content/services";
import { caseStudiesFor } from "@/lib/content/case-studies";
import { postsFor } from "@/lib/content/blog";
import { GrowthPrompt } from "@/components/content/GrowthPrompt";
import { PageHero } from "@/components/content/PageHero";
import { Section } from "@/components/content/Section";
import { PointGrid } from "@/components/content/PointGrid";
import { FAQ } from "@/components/content/FAQ";
import { expandFaqs } from "@/lib/content/faqs";
import { ContextCta } from "@/components/content/ContextCta";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import {
  RelatedArticles,
  RelatedCaseStudies,
  RelatedServices,
} from "@/components/related/Related";
import { FinalCta } from "@/components/sections/FinalCta";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const i = getIndustry((await params).slug);
  if (!i) return {};
  return buildMetadata({
    title: i.seoTitle,
    description: i.summary,
    path: `/industries/${i.slug}`,
  });
}

export default async function IndustryPage({ params }: Props) {
  const industry = getIndustry((await params).slug);
  if (!industry) notFound();
  const path = `/industries/${industry.slug}`;
  const studies = caseStudiesFor({ industry: industry.slug });
  const articles = postsFor({ industry: industry.slug });

  return (
    <>
      <PageSchema path={path} />
      <PageHero
        crumbs={[
          { name: "Industries", href: "/industries" },
          { name: `${industry.name} SEO`, href: path },
        ]}
        kicker={`${industry.name} SEO`}
        title={industry.heroTitle}
        intro={industry.heroIntro}
      >
        <ButtonLink href={pageCopy.text_001}>
          {pageCopy.text_002}
          {industry.name} {pageCopy.text_003}
        </ButtonLink>
      </PageHero>

      <Section tone="muted" labelledBy="landscape">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <h2 id="landscape" className="t-h2 text-ink">
            {pageCopy.text_004}
          </h2>
          <div className="space-y-5 t-lead text-ink-2">
            {industry.landscape.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section labelledBy="challenges">
        <div id="challenges">
          <SectionHeading title={pageCopy.text_005} />
        </div>
        <div className="mt-12">
          <PointGrid points={industry.challenges} columns={2} />
        </div>
      </Section>

      <Section tone="dark" labelledBy="journey">
        <div id="journey">
          <SectionHeading
            tone="dark"
            title={pageCopy.text_006}
            intro={pageCopy.text_007}
          />
        </div>
        <ol className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
          {industry.journey.map((j, i) => (
            <li
              key={j.stage}
              className="flex min-w-0 flex-col rounded-[var(--radius-card)] border border-night-line p-5"
            >
              <p className="text-sm tabular-nums text-link-night">
                {pageCopy.text_008}
                {i + 1}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-on-night">
                {j.stage}
              </h3>
              <p className="mt-1 text-sm text-on-night-muted">{j.intent}</p>
              <ul className="mt-5 space-y-2">
                {j.examples.map((e) => (
                  <li
                    key={e}
                    className="flex items-center gap-2 rounded-full bg-night-2 px-3 py-1.5 text-[0.8125rem] text-on-night"
                  >
                    <Search
                      aria-hidden
                      className="size-3 shrink-0 text-on-night-muted"
                    />
                    <span className="truncate">{e}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="opps">
        <div id="opps">
          <SectionHeading
            title={`Where ${industry.name} SEO opportunities usually are`}
          />
        </div>
        <div className="mt-12">
          <PointGrid points={industry.opportunities} />
        </div>
      </Section>

      <GrowthPrompt title={`Make your ${industry.name} expertise easier to discover.`} />

      <Section tone="muted" labelledBy="strategy">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div id="strategy">
            <SectionHeading
              title={pageCopy.text_009}
              intro={pageCopy.text_010}
            />
          </div>
          <ol className="space-y-4">
            {industry.exampleStrategy.map((s, i) => (
              <li
                key={s}
                className="grid grid-cols-[2.25rem_1fr] gap-3 border-b border-line-strong pb-4 text-ink-2"
              >
                <span className="tabular-nums text-link">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section>
        <RelatedServices
          items={getServices(industry.relatedServices)}
          title={`Services for ${industry.name}`}
        />
        <div className="mt-14">
          <ContextCta
            line={`Working on ${industry.name} SEO?`}
            action="Let's discuss it"
          />
        </div>
      </Section>
      {studies.length > 0 && (
        <Section tone="muted">
          <RelatedCaseStudies items={studies} title={`${industry.name} work`} />
        </Section>
      )}
      <Section>
        <FAQ faqs={expandFaqs(industry.faqs, industry.name, "industry")} />
      </Section>
      {articles.length > 0 && (
        <Section tone="muted">
          <RelatedArticles items={articles} />
        </Section>
      )}
      <FinalCta title={`Build an SEO plan for your ${industry.name.toLowerCase()} business.`} />
    </>
  );
}
