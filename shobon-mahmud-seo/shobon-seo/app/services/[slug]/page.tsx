import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";
import { getService, getServices, services } from "@/lib/content/services";
import { getIndustries } from "@/lib/content/industries";
import { caseStudiesFor } from "@/lib/content/case-studies";
import { postsFor } from "@/lib/content/blog";
import { PageHero } from "@/components/content/PageHero";
import { Section } from "@/components/content/Section";
import { PointGrid } from "@/components/content/PointGrid";
import { FAQ } from "@/components/content/FAQ";
import { expandFaqs } from "@/lib/content/faqs";
import { ContextCta } from "@/components/content/ContextCta";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedArticles, RelatedCaseStudies, RelatedIndustryLinks, RelatedServices } from "@/components/related/Related";
import { FinalCta } from "@/components/sections/FinalCta";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return buildMetadata({ title: s.seoTitle, description: s.summary, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const path = `/services/${service.slug}`;
  const studies = caseStudiesFor({ service: service.slug });
  const articles = postsFor({ service: service.slug });
  const others = getServices(services.filter((s) => s.slug !== service.slug).map((s) => s.slug)).slice(0, 4);

  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", href: "/services" }, { name: service.name, href: path }]}
        kicker={service.name}
        title={service.heroTitle}
        intro={service.heroIntro}
      >
        <ButtonLink href="/contact">Discuss {service.name.toLowerCase()}</ButtonLink>
        <ButtonLink href="/portfolio" variant="secondary">See related work</ButtonLink>
      </PageHero>

      <Section tone="muted" labelledBy="problem">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <h2 id="problem" className="t-h2 text-ink">The problem</h2>
          <div className="space-y-5 t-lead text-ink-2">
            {service.problem.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </Section>

      <Section labelledBy="covers">
        <div id="covers"><SectionHeading title={`What ${service.name.toLowerCase()} covers`} /></div>
        <div className="mt-12"><PointGrid points={service.covers} /></div>
        <div className="mt-14"><ContextCta line={service.ctaLine} /></div>
      </Section>

      <Section tone="muted" labelledBy="process">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 id="process" className="t-h2 text-ink">Process</h2>
            <ol className="mt-8 space-y-6">
              {service.process.map((p, i) => (
                <li key={p.title} className="grid grid-cols-[2.25rem_1fr] gap-4">
                  <span className="text-sm tabular-nums leading-7 text-link">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="t-h3 text-ink">{p.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-muted">{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="t-h2 text-ink">Deliverables</h2>
            <ul className="mt-8 divide-y divide-line-strong border-y border-line-strong">
              {service.deliverables.map((d) => (
                <li key={d} className="flex gap-3 py-4 text-ink-2">
                  <Check aria-hidden className="mt-1 size-4 shrink-0 text-link" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section labelledBy="fit">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 id="fit" className="t-h2 text-ink">Common problems I solve</h2>
            <ul className="mt-8 space-y-3">
              {service.commonProblems.map((p) => (
                <li key={p} className="rounded-xl border border-line px-5 py-4 text-ink-2">{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="t-h2 text-ink">Who it&apos;s for</h2>
            <ul className="mt-8 space-y-4">
              {service.whoFor.map((w) => (
                <li key={w} className="flex gap-3 leading-relaxed text-ink-2">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-link" />
                  {w}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <RelatedIndustryLinks items={getIndustries(service.relatedIndustries)} title="Often used in" />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="muted" labelledBy="usecases">
        <div id="usecases"><SectionHeading title="Example use cases" /></div>
        <div className="mt-10"><PointGrid points={service.useCases} columns={2} /></div>
      </Section>

      {studies.length > 0 && <Section><RelatedCaseStudies items={studies} /></Section>}
      <Section className={studies.length ? "pt-0 sm:pt-0 lg:pt-0" : ""}><FAQ faqs={expandFaqs(service.faqs, service.name, "service")} /></Section>
      {articles.length > 0 && <Section tone="muted"><RelatedArticles items={articles} /></Section>}
      <Section><RelatedServices items={others} title="Other services" /></Section>
      <FinalCta title={service.ctaLine} body="Tell me about your site and what you're trying to grow. I'll reply with how I'd approach it." />
      <JsonLd data={serviceSchema(service, path)} />
    </>
  );
}
