import content from "@/content/growth-service-depth.json";
import { Section } from "@/components/content/Section";
import Link from "next/link";

type ContentSection = { id: string; title: string; intro: string; points: string[][] };
export function GrowthServiceDepth({ slug }: { slug: string }) {
  const sections = (content as Record<string, ContentSection[]>)[slug];
  if (!sections) return null;
  return <>
    <Section className="pb-0 sm:pb-0 lg:pb-0">
      <nav aria-label="Explore this service in detail" className="rounded-2xl border border-line bg-paper-2 p-6">
        <p className="text-sm font-semibold">Explore the approach</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">{sections.map(section => <li key={section.id}><a className="text-sm leading-6 text-link underline underline-offset-4" href={`#${section.id}`}>{section.title}</a></li>)}</ul>
      </nav>
    </Section>
    {sections.map((section, i) => <Section key={section.id} tone={i % 2 ? "muted" : undefined} labelledBy={section.id}>
      <div className="max-w-3xl"><p className="mb-4 text-xs font-semibold uppercase tracking-wider text-link">{slug === "digital-growth-strategy" ? "Growth strategy in practice" : "Conversion improvement in practice"}</p><h2 id={section.id} className="t-h2">{section.title}</h2><p className="mt-5 text-lg leading-8 text-muted">{section.intro}</p></div>
      <div className="mt-9 grid gap-7 lg:grid-cols-3">{section.points.map(([title,body]) => <article key={title} className="border-t border-line-strong pt-6"><h3 className="text-xl font-semibold leading-snug">{title}</h3><p className="mt-4 text-base leading-8 text-muted">{body}</p></article>)}</div>
    </Section>)}
    <Section className="pt-0 sm:pt-0 lg:pt-0"><p className="max-w-3xl text-base leading-8 text-muted">{slug === "digital-growth-strategy" ? <>If the main constraint is turning existing visits into useful enquiries, explore my <Link href="/services/conversion-rate-optimization" className="text-link underline">conversion rate optimization service</Link>. If relevant buyers are struggling to discover you, <Link href="/services/Holistic-SEO" className="text-link underline">Holistic SEO</Link> can support the acquisition side of the plan.</> : <>Conversion work fits within a wider <Link href="/services/digital-growth-strategy" className="text-link underline">digital growth strategy</Link>. Where the website also needs stronger discovery, connect the improvements with <Link href="/services/Holistic-SEO" className="text-link underline">Holistic SEO</Link> so acquisition and the landing experience support the same goal.</>}</p></Section>
  </>;
}
