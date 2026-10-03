import pageCopy from "@/content/copy-app-portfolio-slug-page.json";
import type { Metadata } from "next";
import Image from "@/components/content/EditableImage";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import {
  caseStudies,
  caseStudiesFor,
  getCaseStudy,
} from "@/lib/content/case-studies";
import { getIndustry } from "@/lib/content/industries";
import { getServices } from "@/lib/content/services";
import { PageHero } from "@/components/content/PageHero";
import { Section } from "@/components/content/Section";
import { FAQ } from "@/components/content/FAQ";
import { portfolioFaqs } from "@/lib/content/faqs";
import { Fill } from "@/components/ui/Fill";

import { RelatedCaseStudies } from "@/components/related/Related";
import { FinalCta } from "@/components/sections/FinalCta";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCaseStudy((await params).slug);
  if (!c) return {};
  // These completed pages clearly identify scenarios as illustrative, not measured client results.
  return buildMetadata({
    title: c.title,
    description: c.summary,
    path: `/portfolio/${c.slug}`,
    noindex: c.draft,
  });
}

function Block({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className="grid gap-6 border-t border-line py-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16"
    >
      <h2 id={id} className="text-2xl font-semibold tracking-tight text-ink">
        {title}
      </h2>
      <div className="text-[1.0625rem] leading-relaxed text-ink-2">
        {children}
      </div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();
  const path = `/portfolio/${study.slug}`;
  const industry = getIndustry(study.industry);
  const services = getServices(study.services);
  const related = caseStudiesFor({ exclude: study.slug, limit: 3 });

  return (
    <>
      <PageHero
        tone="dark"
        crumbs={[
          { name: "Work", href: "/portfolio" },
          { name: study.title, href: path },
        ]}
        kicker={`${industry?.name ?? ""} SEO example strategy`}
        title={study.title}
        aside={
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 rounded-[var(--radius-panel)] border border-night-line p-6 text-sm">
            <div className="col-span-2">
              <dt className="text-on-night-muted">{pageCopy.text_001}</dt>
              <dd className="mt-1 text-on-night">
                <Fill text={study.client} />
              </dd>
            </div>
            <div>
              <dt className="text-on-night-muted">{pageCopy.text_002}</dt>
              <dd className="mt-1">
                <Link
                  href={`/industries/${study.industry}`}
                  className="text-link-night hover:underline"
                >
                  {industry?.name}
                </Link>
              </dd>
            </div>
            <div>
              <dt className="text-on-night-muted">{pageCopy.text_003}</dt>
              <dd className="mt-1 text-on-night">
                <Fill text={study.timeline} />
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="text-on-night-muted">{pageCopy.text_004}</dt>
              <dd className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="text-link-night hover:underline"
                  >
                    {s.name}
                  </Link>
                ))}
              </dd>
            </div>
          </dl>
        }
      >
        <p className="t-lead text-on-night">
          <Fill text={study.outcome} />
        </p>
      </PageHero>

      <div className="border-b border-line bg-paper-2">
        <div className="mx-auto max-w-[1240px] px-5 py-4 text-sm text-ink-2 sm:px-8 lg:px-10">
          {pageCopy.text_005}
        </div>
      </div>

      {study.image && (
        <Section className="pb-0 sm:pb-0 lg:pb-0">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-panel)] border border-line">
            <Image
              src={study.image}
              alt={`${study.title} — screenshot`}
              fill
              sizes="(min-width: 1240px) 1160px, 100vw"
              className="object-cover"
            />
          </div>
        </Section>
      )}

      <Section className="py-10 sm:py-12 lg:py-16">
        <Block id="situation" title={pageCopy.text_006}>
          <p>
            <Fill text={study.situation} />
          </p>
        </Block>
        <Block id="challenge" title={pageCopy.text_007}>
          <p>
            <Fill text={study.challenge} />
          </p>
        </Block>
        <Block id="research" title={pageCopy.text_008}>
          <dl className="grid gap-6 sm:grid-cols-2">
            {study.research.map((r) => (
              <div key={r.title}>
                <dt className="font-semibold text-ink">{r.title}</dt>
                <dd className="mt-1 text-muted">
                  <Fill text={r.body} />
                </dd>
              </div>
            ))}
          </dl>
        </Block>
        <Block id="strategy" title={pageCopy.text_009}>
          <ul className="space-y-3">
            {study.strategy.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-2.5 size-1.5 shrink-0 rounded-full bg-link"
                />
                <span>
                  <Fill text={s} />
                </span>
              </li>
            ))}
          </ul>
        </Block>
        <Block id="execution" title={pageCopy.text_010}>
          <ol className="space-y-3">
            {study.execution.map((s, i) => (
              <li key={i} className="grid grid-cols-[2rem_1fr]">
                <span className="tabular-nums text-link">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <Fill text={s} />
                </span>
              </li>
            ))}
          </ol>
        </Block>
        <Block id="results" title={pageCopy.text_011}>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
            {study.results.map((r) => (
              <div key={r.label}>
                <dd className="text-lg font-semibold leading-snug tracking-tight text-ink">
                  <Fill text={r.value} />
                </dd>
                <dt className="mt-1 text-sm text-muted">{r.label}</dt>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-sm text-muted">{pageCopy.text_012}</p>
        </Block>
        <Block id="takeaway" title={pageCopy.text_013}>
          <p className="border-l-2 border-link pl-5 text-xl leading-snug tracking-tight text-ink">
            <Fill text={study.takeaway} />
          </p>
        </Block>
      </Section>

      <Section>
        <FAQ faqs={portfolioFaqs} title={pageCopy.text_014} />
      </Section>
      <Section tone="muted">
        <RelatedCaseStudies items={related} title={pageCopy.text_015} />
      </Section>
      <FinalCta
        title={pageCopy.text_016}
        body="Tell me where search is getting stuck for you. I'll reply with how I'd approach it."
      />
    </>
  );
}
