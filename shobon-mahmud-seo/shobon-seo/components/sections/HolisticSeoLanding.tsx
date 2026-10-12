import { ArrowUpRight, Check, Code2, FileSearch, Link2, ShieldCheck } from "lucide-react";
import content from "@/content/holistic-seo.json";
import type { Service } from "@/lib/content/types";
import { getIndustries } from "@/lib/content/industries";
import { getServices } from "@/lib/content/services";
import { serviceSchema } from "@/lib/schema";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/content/Section";
import { PointGrid } from "@/components/content/PointGrid";
import { PageContents } from "@/components/content/PageContents";
import { EngagementDetails } from "@/components/content/EngagementDetails";
import { FAQ } from "@/components/content/FAQ";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PageSchema } from "@/components/seo/PageSchema";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedServices } from "@/components/related/Related";
import { FinalCta } from "./FinalCta";

const pillarIcons = [Code2, FileSearch, Link2];

function PlanButton({ label = "Discuss my SEO growth plan" }: { label?: string }) {
  return <ButtonLink href="/contact" className="holistic-cta">{label}<ArrowUpRight aria-hidden="true" className="size-4 shrink-0" /></ButtonLink>;
}

export function HolisticSeoLanding({ service }: { service: Service }) {
  const path = "/services/Holistic-SEO";
  return <div className="holistic-page">
    <PageSchema path={path} />
    <section className="hero-surface hero-surface--dark holistic-hero on-night" aria-labelledby="holistic-title">
      <Container className="relative z-10 pt-10 pb-16 sm:pt-14 lg:pb-24">
        <Breadcrumbs tone="dark" items={[{ name: "Services", href: "/services" }, { name: "Holistic SEO", href: path }]} />
        <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[.18em] text-link-night">Technical + on-page + off-page SEO</p>
            <h1 id="holistic-title" className="t-h1 text-on-night">{service.heroTitle}</h1>
            <p className="t-lead mt-6 max-w-2xl text-on-night-muted">{service.heroIntro}</p>
            <div className="mt-8 flex flex-wrap gap-3"><PlanButton /><ButtonLink href="#deliverables" variant="outline-light">See what is included</ButtonLink></div>
            <p className="mt-4 text-sm leading-relaxed text-on-night-muted">Share your site and priorities. We will discuss scope, responsibilities and a practical next step.</p>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-on-night">{["Clear scope before work", "Evidence-led priorities", "Qualified-action measurement"].map(label => <li key={label} className="flex items-center gap-2"><Check aria-hidden="true" className="size-4 shrink-0 text-[#ffe36e]" />{label}</li>)}</ul>
          </div>
          <div className="hero-media holistic-system rounded-[28px] border border-white/15 p-5 sm:p-8">
            <div className="mb-7 flex items-center justify-between gap-4"><p className="text-xs font-semibold uppercase tracking-[.16em] text-link-night">One connected SEO plan</p><ShieldCheck aria-hidden="true" className="size-5 text-link-night" /></div>
            <ol className="space-y-3">{[
              { title: "Technical foundation", text: "Make valuable pages accessible", Icon: Code2 },
              { title: "On-page relevance", text: "Answer the buyer’s real question", Icon: FileSearch },
              { title: "Relevant authority", text: "Build resources worth referencing", Icon: Link2 },
            ].map(({ title, text, Icon }, index) => <li key={title} className="holistic-system-step flex items-center gap-4 rounded-2xl border border-white/15 bg-white/[.04] p-4 sm:p-5"><span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-link-night"><Icon aria-hidden="true" className="size-5" /></span><div className="min-w-0"><h2 className="text-base font-semibold text-on-night">{title}</h2><p className="mt-1 text-sm text-on-night-muted">{text}</p></div><span aria-hidden="true" className="ms-auto text-xs tabular-nums text-link-night">0{index + 1}</span></li>)}</ol>
            <div className="mt-7 border-t border-white/15 pt-6"><p className="text-xs uppercase tracking-wider text-link-night">The shared objective</p><p className="mt-2 text-xl font-semibold leading-snug text-on-night">Useful discovery.<br />A clearer path to an enquiry.</p><p className="mt-3 text-sm text-on-night-muted">Measure the journey, then refine the priorities.</p></div>
          </div>
        </div>
      </Container>
    </section>

    <PageContents label="Holistic SEO page sections" items={[{ id: "foundations", label: "The three foundations" }, { id: "process", label: "How it works" }, { id: "deliverables", label: "What you receive" }, { id: "delivery-details", label: "The work in practice" }, { id: "measurement", label: "Measurement" }, { id: "scope", label: "Scope & timing" }, { id: "service-faqs", label: "FAQs" }]} />

    <Section labelledBy="foundations">
      <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20"><div id="foundations"><SectionHeading kicker="What is holistic SEO?" title={content.definition.title} /></div><div className="space-y-5"><p className="t-lead text-ink-2">{content.definition.body}</p><p className="leading-relaxed text-muted">{content.definition.note}</p></div></div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">{content.pillars.map((pillar, index) => { const Icon = pillarIcons[index]; return <a key={pillar.id} href={`#${pillar.id}`} className="interactive-card rounded-2xl border border-line bg-paper p-6"><Icon aria-hidden="true" className="mb-5 size-6 text-link" /><h3 className="t-h3 text-ink">{pillar.name}</h3><p className="mt-3 leading-relaxed text-muted">{pillar.intro}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-link">Explore this foundation<ArrowUpRight aria-hidden="true" className="size-4" /></span></a>; })}</div>
    </Section>

    <Section tone="muted" labelledBy="connected-problem"><div className="grid gap-10 lg:grid-cols-2 lg:gap-16"><div id="connected-problem"><SectionHeading kicker="Why isolated SEO work stalls" title="Fix the connection between the work and the buyer." /></div><div className="space-y-5 t-lead text-ink-2">{service.problem.map(text => <p key={text}>{text}</p>)}</div></div></Section>

    {content.pillars.map((pillar, index) => {
      const Icon = pillarIcons[index];
      return <Section key={pillar.id} tone={index === 1 ? "muted" : "light"} labelledBy={pillar.id}>
        <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
          <div><div className="mb-6 inline-flex items-center gap-3 rounded-full border border-line px-4 py-2 text-sm font-medium text-link"><Icon aria-hidden="true" className="size-4" />Foundation 0{index + 1}</div><h2 id={pillar.id} className="t-h2 text-ink">{pillar.name}</h2><p className="t-lead mt-5 text-muted">{pillar.intro}</p><p className="mt-6 leading-relaxed text-muted">{pillar.problem[1]}</p></div>
          <ul className="grid gap-5 sm:grid-cols-2">{pillar.covers.map(item => <li key={item.title} data-motion-step className="delivery-card rounded-2xl border border-line bg-white p-6"><h3 className="t-h3 text-ink">{item.title}</h3><p className="mt-3 leading-relaxed text-muted">{item.body}</p></li>)}</ul>
        </div>
      </Section>;
    })}

    <section className="holistic-mid-cta on-night bg-link" aria-labelledby="connected-plan-cta"><Container className="grid gap-8 py-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16"><div><p className="mb-3 text-sm font-medium text-white/85">A clearer starting point</p><h2 id="connected-plan-cta" className="t-h2 text-white">Which constraint deserves your next SEO investment?</h2><p className="mt-4 leading-relaxed text-white/85">Share your website, priority offers and what you are seeing in search. We will discuss the problem before choosing the scope.</p></div><div className="lg:justify-self-end"><PlanButton label="Review my website’s priorities" /><p className="mt-4 text-sm text-white/85">A focused conversation about your site and the next step.</p></div></Container></section>

    <Section tone="dark" labelledBy="process"><div id="process"><SectionHeading tone="dark" kicker="The delivery rhythm" title="From scattered tasks to a clear implementation plan." intro="Each phase has a purpose, an owner and a way to check completion. The sequence changes when your site’s evidence calls for it." /></div><ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{service.process.map((step, index) => <li key={step.title} data-motion-step className="rounded-2xl border border-night-line bg-night-2 p-6 sm:p-8"><span className="text-sm tabular-nums text-link-night">{String(index + 1).padStart(2, "0")}</span><h3 className="t-h3 mt-6 text-on-night">{step.title}</h3><p className="mt-3 leading-relaxed text-on-night-muted">{step.body}</p></li>)}</ol></Section>

    <Section labelledBy="deliverables"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20"><div id="deliverables"><SectionHeading kicker="Useful handoffs" title="What you receive, and what your team can do with it." intro="A clear plan should survive the handoff to a developer, writer or decision-maker. The proposal confirms which deliverables are included in your engagement." /><div className="mt-8"><PlanButton label="Plan my SEO implementation" /></div></div><ul className="divide-y divide-line border-y border-line">{service.deliverables.map(item => <li key={item} className="flex items-start gap-3 py-5 text-ink-2"><Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-link" /><span>{item}</span></li>)}</ul></div></Section>

    <EngagementDetails content={service.engagement} topic="Holistic SEO" />

    <Section labelledBy="measurement"><div id="measurement"><SectionHeading kicker="Define progress before the work" title="Measure what changed and why it matters." intro="A reporting baseline keeps delivery and business outcomes separate. It helps your team understand the evidence without turning every increase into a success claim." /></div><div className="mt-10"><PointGrid points={content.measurementCards} /></div></Section>

    <Section tone="muted" labelledBy="fit"><div id="fit"><SectionHeading kicker="When a connected plan makes sense" title="Is holistic SEO the right next step for your site?" intro="It is a useful approach when several parts of the search journey need coordination. A focused issue may still call for a smaller first scope." /></div><div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16"><div><h3 className="t-h3 text-ink">Signals worth reviewing</h3><ul className="mt-5 space-y-3">{service.commonProblems.map(item => <li key={item} className="rounded-xl border border-line bg-white px-5 py-4 text-ink-2">{item}</li>)}</ul></div><div><h3 className="t-h3 text-ink">Teams this can support</h3><ul className="mt-5 list-disc space-y-4 ps-5 leading-relaxed text-muted">{service.whoFor.map(item => <li key={item}>{item}</li>)}</ul><p className="mt-7 leading-relaxed text-muted">For specialised needs, explore <a className="link" href="/services/content-seo">content SEO strategy</a>, <a className="link" href="/services/local-seo">local SEO</a> or <a className="link" href="/services/ecommerce-seo">e-commerce SEO</a>. These offers can complement the connected plan where the scope calls for them.</p></div></div></Section>

    <Section labelledBy="trust"><div id="trust"><SectionHeading kicker="Trust through the way we work" title="Clear evidence. Clear responsibilities. Honest expectations." intro="Your plan is led by Shobon Mahmud. Before work starts, you should understand what is being recommended, who will implement it and how completion will be checked." /></div><div className="mt-10"><PointGrid points={content.trustPrinciples} /></div><div className="mt-8 flex flex-wrap gap-x-6 gap-y-3"><a className="link" href="/about">Meet Shobon and review his approach</a><a className="link" href="/portfolio">Explore illustrative SEO strategies</a><a className="link" href="/contact">Discuss your project and scope</a></div></Section>

    <Section tone="muted" labelledBy="usecases"><div id="usecases"><SectionHeading kicker="Illustrative situations" title="Different websites. The same connected decision process." intro="These examples explain possible workflows; they do not represent claimed client results or promised performance." /></div><div className="mt-10"><PointGrid points={service.useCases} columns={2} /></div></Section>

    <Section labelledBy="scope"><div id="scope"><SectionHeading kicker="Scope, ownership and timing" title="Start with a plan your team can actually deliver." intro="Cost and timing depend on page coverage, technical complexity, editorial needs and implementation support. We agree the responsibilities and reporting before making a delivery commitment." /></div><div className="mt-10"><PointGrid points={content.scoping} /></div><p className="mt-8 max-w-3xl leading-relaxed text-muted">Legal or clinical review, additional development and third-party fees are not automatically included. Editorial placements and ranking outcomes remain outside anyone’s guarantee. What you should expect is a clear scope, useful evidence and a practical review process.</p></Section>

    <Section tone="muted" labelledBy="industries"><div id="industries"><SectionHeading kicker="Apply the plan to your market" title="Your buyers decide what the pages need to answer." intro="The foundations stay connected, but the terminology, proof and next step change by industry. Explore the approach that fits your audience." /></div><div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{getIndustries(service.relatedIndustries).map(industry => <a key={industry.slug} href={`/industries/${industry.slug}`} className="interactive-card flex items-center justify-between gap-3 rounded-xl border border-line bg-white p-5 text-sm font-semibold text-ink">{industry.name} SEO<ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-link" /></a>)}</div></Section>

    <Section id="service-faqs"><FAQ title="Holistic SEO: questions before you start" faqs={service.faqs} withSchema /></Section>
    <Section tone="muted"><RelatedServices items={getServices(service.relatedServices ?? [])} title="Focused services for specific priorities" /></Section>
    <FinalCta title="Give your SEO work one direction and a clear next step." body="Share your website, the customers you want to reach and the constraint you want to solve. We will discuss a focused plan, delivery responsibilities and how to measure progress." actionTitle="Talk through my SEO priorities" actionClassName="holistic-cta" />
    <JsonLd data={serviceSchema(service, path)} />
  </div>;
}
