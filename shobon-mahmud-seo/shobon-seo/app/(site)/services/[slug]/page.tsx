import pageCopy from "@/content/copy-app-services-slug-page.json";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";
import { getService, getServices, services } from "@/lib/content/services";
import { getIndustries } from "@/lib/content/industries";
import { caseStudiesFor } from "@/lib/content/case-studies";
import { postsFor } from "@/lib/content/blog";
import { GrowthPrompt } from "@/components/content/GrowthPrompt";
import { PageHero } from "@/components/content/PageHero";
import { Section } from "@/components/content/Section";
import { PointGrid } from "@/components/content/PointGrid";
import { FAQ } from "@/components/content/FAQ";
import { serviceSearchFaqs } from "@/lib/content/service-search-faqs";
import { ContextCta } from "@/components/content/ContextCta";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  RelatedArticles,
  RelatedCaseStudies,
  RelatedIndustryLinks,
  RelatedServices,
} from "@/components/related/Related";
import { FinalCta } from "@/components/sections/FinalCta";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return buildMetadata({
    title: s.seoTitle,
    description: s.summary,
    path: `/services/${s.slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const path = `/services/${service.slug}`;
  const studies = caseStudiesFor({ service: service.slug });
  const articles = postsFor({ service: service.slug });
  const others = getServices(
    services.filter((s) => s.slug !== service.slug).map((s) => s.slug),
  ).slice(0, 4);

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Services", href: "/services" },
          { name: service.name, href: path },
        ]}
        kicker={service.name}
        title={service.heroTitle}
        intro={service.heroIntro}
      >
        <ButtonLink href={pageCopy.text_001}>
          {pageCopy.text_002}
          {service.name.toLowerCase()}
        </ButtonLink>
        <ButtonLink href={pageCopy.text_003} variant="secondary">
          {pageCopy.text_004}
        </ButtonLink>
      </PageHero>

      <div className="hero-grid-band border-y border-line">
        <div className="mx-auto grid max-w-7xl gap-3 px-5 py-5 sm:grid-cols-3 sm:px-8">
          {[pageCopy.text_005, pageCopy.text_006, pageCopy.text_007].map(
            (label, index) => (
              <div
                key={label}
                className="rounded-xl border border-line bg-white px-5 py-4 text-sm font-semibold text-ink"
              >
                <span className="mr-4 text-link">
                  {pageCopy.text_008}
                  {index + 1}
                </span>
                {label}
              </div>
            ),
          )}
        </div>
      </div>
      <Section tone="muted" labelledBy="problem">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <h2 id="problem" className="t-h2 text-ink">
            {pageCopy.text_009}
          </h2>
          <div className="space-y-5 t-lead text-ink-2">
            {service.problem.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section labelledBy="covers">
        <div id="covers">
          <SectionHeading title={`What ${service.name.toLowerCase()} covers`} />
        </div>
        <div className="mt-12">
          <PointGrid points={service.covers} />
        </div>
        <div className="mt-14">
          <ContextCta line={service.ctaLine} />
        </div>
      </Section>

      <Section tone="muted" labelledBy="process">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 id="process" className="t-h2 text-ink">
              {pageCopy.text_010}
            </h2>
            <ol className="mt-8 space-y-6">
              {service.process.map((p, i) => (
                <li
                  key={p.title}
                  className="grid grid-cols-[2.25rem_1fr] gap-4"
                >
                  <span className="text-sm tabular-nums leading-7 text-link">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="t-h3 text-ink">{p.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-muted">
                      {p.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="t-h2 text-ink">{pageCopy.text_011}</h2>
            <ul className="mt-8 divide-y divide-line-strong border-y border-line-strong">
              {service.deliverables.map((d) => (
                <li key={d} className="flex gap-3 py-4 text-ink-2">
                  <Check
                    aria-hidden
                    className="mt-1 size-4 shrink-0 text-link"
                  />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <GrowthPrompt title={`Get a focused ${service.name} plan for your website.`} />

      <Section labelledBy="fit">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 id="fit" className="t-h2 text-ink">
              {pageCopy.text_012}
            </h2>
            <ul className="mt-8 space-y-3">
              {service.commonProblems.map((p) => (
                <li
                  key={p}
                  className="rounded-xl border border-line px-5 py-4 text-ink-2"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="t-h2 text-ink">{pageCopy.text_013}</h2>
            <ul className="mt-8 space-y-4">
              {service.whoFor.map((w) => (
                <li key={w} className="flex gap-3 leading-relaxed text-ink-2">
                  <span
                    aria-hidden
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-link"
                  />
                  {w}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <RelatedIndustryLinks
                items={getIndustries(service.relatedIndustries)}
                title={pageCopy.text_014}
              />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="muted" labelledBy="usecases">
        <div id="usecases">
          <SectionHeading title={pageCopy.text_015} />
        </div>
        <div className="mt-10">
          <PointGrid points={service.useCases} columns={2} />
        </div>
      </Section>

      {studies.length > 0 && (
        <Section>
          <RelatedCaseStudies items={studies} />
        </Section>
      )}
      <Section className={studies.length ? "pt-0 sm:pt-0 lg:pt-0" : ""}>
        <FAQ
          faqs={[
            ...service.faqs,
            ...(serviceSearchFaqs[service.slug] ?? []),
          ].slice(0, 10)}
        />
      </Section>
      {articles.length > 0 && (
        <Section tone="muted">
          <RelatedArticles items={articles} />
        </Section>
      )}
      <Section>
        <RelatedServices items={others} title={pageCopy.text_016} />
      </Section>
      <FinalCta
        title={service.ctaLine}
        body="Tell me about your site and what you're trying to grow. I'll reply with how I'd approach it."
      />
      <JsonLd data={serviceSchema(service, path)} />
    </>
  );
}
