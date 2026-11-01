import Link from "next/link";
import { ArrowUpRight, Check, type LucideIcon, Compass, Layers, LineChart, Target, BarChart3, Building2, Rocket, Globe, Repeat, Code2, FileSearch, Link2, Scale, PenLine, BookOpen, MousePointerClick, Palette, Archive, Siren, Zap, Trees, Bug, LayoutGrid, Package, ShoppingCart, Shirt, Sofa, Cpu, Leaf, Store, Gift, Eye, ShieldCheck, Megaphone, Wrench, Home, Sparkles, Stethoscope, ShoppingBag, MapPin, Phone, Search } from "lucide-react";
import type { Service } from "@/lib/content/types";
import { serviceLandings, type IconName, type ServiceLandingCopy } from "@/lib/content/service-landings";
import { serviceSearchFaqs } from "@/lib/content/service-search-faqs";
import { getIndustries } from "@/lib/content/industries";
import { getServices, services } from "@/lib/content/services";
import { showcaseCaseStudies } from "@/lib/content/case-studies";
import { postsFor } from "@/lib/content/blog";
import { serviceSchema } from "@/lib/schema";
import holistic from "@/content/holistic-seo.json";
import growthDepth from "@/content/growth-service-depth.json";
import guides from "@/content/page-growth-guides.json";
import { HeroArt, heroArtKind, heroArtStyle } from "@/components/content/HeroArt";
import { PageSchema } from "@/components/seo/PageSchema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { FAQ } from "@/components/content/FAQ";
import { RelatedArticles, RelatedCaseStudies } from "@/components/related/Related";
import "./local-seo.css";
import "./service-landing.css";

type Point = { title: string; body: string };
type DeepSection = { id: string; eyebrow: string; title: string; intro?: string; points: Point[] };

const ICONS: Record<IconName, LucideIcon> = { Compass, Layers, LineChart, Target, BarChart3, Building2, Rocket, Globe, Repeat, Code2, FileSearch, Link2, Scale, PenLine, BookOpen, MousePointerClick, Palette, Archive, Siren, Zap, Trees, Bug, LayoutGrid, Package, ShoppingCart, Shirt, Sofa, Cpu, Leaf, Store, Gift, Eye, ShieldCheck, Megaphone, Wrench, Home, Sparkles, Stethoscope, ShoppingBag, MapPin, Phone, Search };

function Icon({ name, size = 22, className }: { name: IconName; size?: number; className?: string }) {
  const Glyph = ICONS[name];
  return <Glyph size={size} className={className} aria-hidden="true" />;
}

function Heading({ eyebrow, title, intro, id }: { eyebrow: string; title: string; intro?: string; id?: string }) {
  return <div className="local-heading"><div><p className="local-eyebrow">{eyebrow}</p><h2 id={id}>{title}</h2></div>{intro && <p>{intro}</p>}</div>;
}

const num = (i: number) => String(i + 1).padStart(2, "0");

/** Service-specific long-form sections that already exist in the CMS. */
function deepSections(slug: string): DeepSection[] {
  if (slug === "Holistic-SEO") {
    return [
      { id: "measurement", eyebrow: "DEFINE PROGRESS BEFORE THE WORK", title: "Measure what changed and why it matters.", intro: "A reporting baseline keeps delivery and business outcomes separate, so every increase isn’t treated as a success claim.", points: holistic.measurementCards },
      { id: "trust", eyebrow: "TRUST THROUGH THE WAY WE WORK", title: "Clear evidence. Clear responsibilities.", intro: "Before work starts, you should understand what is recommended, who will implement it and how completion will be checked.", points: holistic.trustPrinciples },
      { id: "scope", eyebrow: "SCOPE, OWNERSHIP AND TIMING", title: "Start with a plan your team can deliver.", intro: "Cost and timing depend on page coverage, technical complexity, editorial needs and implementation support.", points: holistic.scoping },
    ];
  }
  const depth = (growthDepth as Record<string, { id: string; title: string; intro: string; points: string[][] }[]>)[slug];
  if (!depth) return [];
  const eyebrow = slug === "digital-growth-strategy" ? "GROWTH STRATEGY IN PRACTICE" : "CONVERSION IMPROVEMENT IN PRACTICE";
  return depth.map(section => ({ id: section.id, eyebrow, title: section.title, intro: section.intro, points: section.points.map(([title = "", body = ""]) => ({ title, body })) }));
}

export function ServiceLanding({ service }: { service: Service }) {
  const copy: ServiceLandingCopy | undefined = serviceLandings[service.slug];
  if (!copy) return null;
  const path = `/services/${service.slug}`;
  const kind = heroArtKind(path) ?? "pillars";
  const faqs = [...service.faqs, ...(serviceSearchFaqs[service.slug] ?? [])].filter((faq, index, all) => all.findIndex(item => item.q.toLowerCase().trim() === faq.q.toLowerCase().trim()) === index);
  const articles = postsFor({ service: service.slug });
  const guide = guides[path as keyof typeof guides];
  const industries = getIndustries(service.relatedIndustries);
  const related = getServices(service.relatedServices ?? services.filter(s => s.slug !== service.slug).map(s => s.slug)).filter(s => s.slug !== service.slug).slice(0, 5);
  const deep = deepSections(service.slug);
  const pillars = service.slug === "Holistic-SEO" ? holistic.pillars : [];
  const sectionNav = [
    { id: "covers", label: "What’s included" },
    ...(pillars.length ? [{ id: "foundations", label: "Three foundations" }] : []),
    { id: "process", label: "Process" },
    ...(service.engagement ? [{ id: "delivery-details", label: "The work in practice" }] : []),
    { id: "who-for", label: "Who it’s for" },
    { id: "service-faqs", label: "FAQs" },
  ];
  // Alternate the tinted background so sections stay visually separated whatever optional blocks render.
  let tint = false;
  const tone = () => (tint = !tint) ? "local-section local-tint" : "local-section";

  return <div className="local-landing svc-landing" data-service={service.slug} style={heroArtStyle(kind)}>
    <PageSchema path={path} /><JsonLd data={serviceSchema(service, path)} />

    <section className="local-hero"><Container>
      <Breadcrumbs items={[{ name: "Services", href: "/services" }, { name: service.name, href: path }]} />
      <div className="local-hero-grid">
        <div>
          <p className="local-eyebrow"><span className="local-dot" /> {copy.eyebrow}</p>
          <h1>{copy.h1[0]}<br /><span>{copy.h1[1]}</span><br />{copy.h1[2]}</h1>
          <p className="local-intro">{copy.intro}</p>
          <div className="local-actions"><WhatsAppLink subject={copy.final.whatsapp} /><ButtonLink href="/contact">Discuss my website <ArrowUpRight size={17} /></ButtonLink></div>
          <p className="local-note">{copy.note}</p>
        </div>
        <div className="svc-visual"><HeroArt kind={kind} /></div>
      </div>
      <div className="local-proof">{copy.proof.map(p => <span key={p}>{p}</span>)}</div>
    </Container></section>

    <div className="local-query-strip" aria-label={`Examples of searches related to ${service.name.toLowerCase()}`}>{copy.queries.map(q => <span key={q}>{q}</span>)}</div>

    <nav className="svc-nav" aria-label={`${service.name} page sections`}><Container>{sectionNav.map(item => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}</Container></nav>

    <section className="local-section"><Container><div className="local-split">
      <div>
        <p className="local-eyebrow">{copy.split.eyebrow}</p>
        <h2>{copy.split.title}</h2>
        <p className="local-intro">{copy.split.lead}</p>
        {service.problem.map(text => <p key={text} className="local-body">{text}</p>)}
        <Link className="local-text-link" href="#covers">See what’s included <ArrowUpRight size={16} /></Link>
      </div>
      <div className="local-search-art"><div className="local-search-card">
        <p className="local-search-label">{copy.split.journeyLabel}</p>
        {copy.split.journey.map(([icon, title, body]) => <div className="local-search-row" key={title}><Icon name={icon} size={21} /><div><strong>{title}</strong><p>{body}</p></div></div>)}
      </div></div>
    </div></Container></section>

    <section id="covers" className={tone()}><Container>
      <Heading eyebrow={copy.covers.eyebrow} title={copy.covers.title} intro={copy.covers.intro} />
      <div className="local-cards local-three">{service.covers.map((c, i) => <article key={c.title} className="local-card"><span className="local-number">{num(i)}</span><h3>{c.title}</h3><p>{c.body}</p></article>)}</div>
      <p className="svc-inline-cta">{service.ctaLine} <Link href="/contact" className="local-text-link">Discuss your project <ArrowUpRight size={16} /></Link></p>
    </Container></section>

    {pillars.length > 0 && <section id="foundations" className={tone()}><Container>
      <Heading eyebrow="THE THREE FOUNDATIONS" title={holistic.definition.title} intro={holistic.definition.body} />
      <div className="local-cards local-three">{pillars.map((p, i) => <article key={p.id} className="local-card svc-pillar"><span className="local-number">Foundation {num(i)}</span><h3>{p.name}</h3><p>{p.intro}</p><ul className="local-checklist svc-small-list">{p.covers.map(c => <li key={c.title}><span className="local-check">✓</span><span><strong>{c.title}</strong> {c.body}</span></li>)}</ul></article>)}</div>
      <p className="svc-footnote">{holistic.definition.note}</p>
    </Container></section>}

    <section id="process" className={tone()}><Container>
      <Heading eyebrow="A PRACTICAL WORKING PROCESS" title={copy.process.title} intro={copy.process.intro} />
      <div className={`local-cards ${service.process.length > 4 ? "local-three" : "local-four"}`}>{service.process.map((p, i) => <article key={p.title} className="local-card"><span className="local-number">{num(i)}</span><h3>{p.title}</h3><p>{p.body}</p></article>)}</div>
    </Container></section>

    <section className={tone()}><Container><div className="local-split svc-top">
      <div><p className="local-eyebrow">USEFUL HANDOFFS</p><h2>{copy.deliverables.title}</h2><p className="local-intro">{copy.deliverables.intro}</p><div className="local-actions"><ButtonLink href="/contact">Plan my next step <ArrowUpRight size={17} /></ButtonLink></div></div>
      <article className="local-card"><ul className="local-checklist">{service.deliverables.map(d => <li key={d}><span className="local-check"><Check size={16} aria-hidden="true" /></span>{d}</li>)}</ul></article>
    </div></Container></section>

    {service.engagement && <section id="delivery-details" className={tone()}><Container>
      <Heading eyebrow="THE WORK IN PRACTICE" title={service.engagement.title} intro={service.engagement.intro} />
      <div className="local-cards local-three">{service.engagement.priorities.map((p, i) => <article key={p.title} className="local-card"><span className="local-number">{num(i)}</span><h3>{p.title}</h3><p>{p.body}</p></article>)}</div>
      <div className="local-cards local-two svc-gap">
        <article className="local-card svc-example"><p className="local-eyebrow">ILLUSTRATIVE WORKFLOW</p><h3>{service.engagement.example.title}</h3><p>{service.engagement.example.body}</p></article>
        <article className="local-card"><h3>How we measure progress</h3><p>{service.engagement.measurement}</p><h3>What helps us get started</h3><ul className="local-checklist svc-small-list">{service.engagement.preparation.map(item => <li key={item}><span className="local-check">✓</span>{item}</li>)}</ul></article>
      </div>
    </Container></section>}

    <section className="local-section svc-mid-wrap"><Container><div className="svc-mid">
      <div><h2>{copy.mid.title}</h2><p>{copy.mid.body}</p></div>
      <ButtonLink href="/contact" variant="light">{copy.mid.action} <ArrowUpRight size={17} /></ButtonLink>
    </div></Container></section>

    {deep.map(section => <section key={section.id} id={section.id} className={tone()}><Container>
      <Heading eyebrow={section.eyebrow} title={section.title} intro={section.intro} />
      <div className={`local-cards ${section.points.length === 2 || section.points.length === 4 ? "local-two" : "local-three"}`}>{section.points.map((p, i) => <article key={p.title} className="local-card"><span className="local-number">{num(i)}</span><h3>{p.title}</h3><p>{p.body}</p></article>)}</div>
    </Container></section>)}

    <section id="who-for" className={tone()}><Container>
      <Heading eyebrow="BUILT AROUND YOUR BUSINESS" title={copy.audiences.title} intro={copy.audiences.intro} />
      <div className="local-cards local-three">{copy.audiences.items.map(a => <article key={a.name} className="local-card"><span className="svc-icon"><Icon name={a.icon} size={22} /></span><h3>{a.name}</h3><p>{a.text}</p><Link href={a.href} className="local-text-link">Explore support <ArrowUpRight size={16} /></Link></article>)}</div>
    </Container></section>

    <section className={tone()}><Container>
      <Heading eyebrow="SIGNALS WORTH A CONVERSATION" title={`When ${copy.label} usually helps.`} />
      <div className="local-cards local-two">
        <article className="local-card"><h3>Problems this solves</h3><ul className="local-checklist">{service.commonProblems.map(p => <li key={p}><span className="local-neutral">→</span>{p}</li>)}</ul></article>
        <article className="local-card"><h3>Teams this supports</h3><ul className="local-checklist">{service.whoFor.map(w => <li key={w}><span className="local-check">●</span>{w}</li>)}</ul></article>
      </div>
    </Container></section>

    <section className={tone()}><Container>
      <Heading eyebrow="BEFORE WE START" title="Are we the right fit?" intro="A useful engagement begins with realistic expectations and access to the information needed to make decisions." />
      <div className="local-cards local-two">{([["A good fit", copy.fit.good, true], ["A different approach may suit you", copy.fit.different, false]] as const).map(([title, items, good]) => <article className="local-card" key={title}><h3>{title}</h3><ul className="local-checklist">{items.map(item => <li key={item}><span className={good ? "local-check" : "local-neutral"}>{good ? "✓" : "—"}</span>{item}</li>)}</ul></article>)}</div>
    </Container></section>

    {service.useCases.length > 0 && <section className={tone()}><Container>
      <Heading eyebrow="ILLUSTRATIVE SITUATIONS" title="What this can look like in practice." intro="These examples explain possible workflows. They don’t represent claimed client results or promised performance." />
      <div className="local-cards local-two">{service.useCases.map(u => <article key={u.title} className="local-card"><h3>{u.title}</h3><p>{u.body}</p></article>)}</div>
    </Container></section>}

    <section className={tone()}><Container>
      <Heading eyebrow="WORKING PRINCIPLES" title="What you can expect from me." />
      <div className="local-cards local-three">{copy.principles.map(([title, text], i) => <article className="local-card" key={title}><span className="local-number">{num(i)}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </Container></section>

    {guide && <section className={tone()}><Container>
      <Heading eyebrow="MAKING THE DECISION" title={guide.title} intro={guide.intro} />
      <p className="local-body svc-guide-body">{guide.body}</p>
      <div className="svc-table" role="region" aria-label={guide.title} tabIndex={0}><table>
        <thead><tr>{guide.headers.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead>
        <tbody>{guide.rows.map(row => <tr key={row[0]}><th scope="row">{row[0]}</th>{row.slice(1).map(cell => <td key={cell}>{cell}</td>)}</tr>)}</tbody>
      </table></div>
      <Link href={guide.link.href} className="local-text-link">{guide.link.label} <ArrowUpRight size={16} /></Link>
    </Container></section>}

    {industries.length > 0 && <section className={tone()}><Container>
      <Heading eyebrow="APPLY IT TO YOUR MARKET" title="Your buyers decide what the pages need to answer." intro="The approach stays consistent, but the terminology, proof and next step change by industry." />
      <div className="local-markets">{industries.map(i => <Link key={i.slug} href={`/industries/${i.slug}`}>{i.name}<ArrowUpRight size={14} /></Link>)}</div>
    </Container></section>}

    <section className="local-section"><Container><RelatedCaseStudies items={showcaseCaseStudies} title="Selected client work" /></Container></section>
    {articles.length > 0 && <section className="local-section local-tint"><Container><RelatedArticles items={articles} title={copy.articlesTitle} /></Container></section>}
    <section id="service-faqs" className="local-section"><Container><FAQ faqs={faqs} title={copy.faqTitle} withSchema /></Container></section>
    {related.length > 0 && <section className="local-section local-tint"><Container>
      <Heading eyebrow="RELATED SERVICES" title="Pair it with the right next step." />
      <div className="local-markets">{related.map(s => <Link key={s.slug} href={`/services/${s.slug}`}>{s.name}<ArrowUpRight size={14} /></Link>)}</div>
    </Container></section>}

    <section className="local-section local-final svc-final"><Container><div className="local-dark-cta">
      <p className="local-eyebrow">{copy.final.eyebrow}</p>
      <h2>{copy.final.title}</h2>
      <p>{copy.final.body}</p>
      <div className="local-actions"><WhatsAppLink subject={copy.final.whatsapp} /><ButtonLink href="/contact" variant="outline-light">Send a project brief <ArrowUpRight size={17} /></ButtonLink></div>
    </div></Container></section>
  </div>;
}
