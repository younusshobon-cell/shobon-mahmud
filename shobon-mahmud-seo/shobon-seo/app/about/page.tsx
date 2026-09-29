import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { profilePageSchema } from "@/lib/schema";
import { experience, siteConfig, tools } from "@/lib/site";
import { photos } from "@/lib/images";
import { industries } from "@/lib/content/industries";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/content/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Fill } from "@/components/ui/Fill";
import { RelatedIndustryLinks } from "@/components/related/Related";
import { FAQ } from "@/components/content/FAQ";
import { aboutFaqs } from "@/lib/content/faqs";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = buildMetadata({
  title: "About Shobon Mahmud — SEO Specialist",
  description: "Shobon Mahmud is an SEO specialist working across SaaS, legal tech, health tech, logistics, design, e-commerce and local businesses. His approach, experience and tools.",
  path: "/about",
  type: "profile",
});

const skills = [
  "Technical SEO", "On-page SEO", "Off-page SEO", "Local SEO", "E-commerce SEO", "Content SEO",
  "International SEO", "Keyword research", "Competitor research", "SEO audits", "Search strategy",
];

const principles = [
  { title: "Business first, rankings second", body: "A ranking is only worth something if the people it brings can become customers. I start from revenue goals and work back to keywords." },
  { title: "Evidence over opinion", body: "Search Console, crawls, server logs and the SERP itself settle most debates. I'd rather test than guess." },
  { title: "Fewer, better priorities", body: "Most sites don't need 200 fixes. They need the right ten, done properly, in the right order." },
  { title: "No guarantees I can't keep", body: "Nobody controls Google. I promise clear thinking, honest reporting and work that compounds — not #1 rankings." },
];

const workingStyle = [
  { title: "Clear communication", body: "Plain-language updates. You always know what's being done, why, and what changed." },
  { title: "Works with your team", body: "Developer-ready tickets, writer-ready briefs, and time with the people who'll implement." },
  { title: "Async by default", body: "Written updates and recorded walkthroughs, with calls when they're genuinely useful." },
  { title: "Measured on outcomes", body: "Reporting built around traffic quality, leads and revenue — not vanity metrics." },
];

export default function AboutPage() {
  return (
    <>
      <Container className="pt-10 sm:pt-14">
        <Breadcrumbs items={[{ name: "About", href: "/about" }]} />
        <div className="grid gap-12 pb-16 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16 lg:pb-24">
          <div>
            <p className="mb-5 text-sm font-medium text-link">About</p>
            <h1 className="t-h1 text-ink">I&apos;m Shobon — an SEO specialist focused on turning search into sustainable growth.</h1>
            <div className="t-lead mt-7 max-w-2xl space-y-5 text-muted">
              <p>
                My SEO approach covers SaaS, legal tech, health tech, logistics, design, e-commerce, technology and local
                markets. The industries are different; the question underneath is always the same: how does search turn into customers
                for this business?
              </p>
              <p>
                That question is why I work across the whole SEO stack — technical foundations, content, authority, local and
                international search — rather than treating any one of them as the answer.
              </p>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Work With Me</ButtonLink>
              <ButtonLink href="/portfolio" variant="secondary">View My Work</ButtonLink>
            </div>
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[28px] bg-paper-2">
            <Image src={photos.outdoor.src} alt={photos.outdoor.alt} fill priority placeholder="blur" sizes="(min-width: 1024px) 440px, 100vw" className="object-cover object-[50%_25%]" />
          </div>
        </div>
      </Container>

      <Section tone="muted" labelledBy="story">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <h2 id="story" className="t-h2 text-ink">How I got here</h2>
          <div className="space-y-5 t-lead text-ink-2">
            <p>My work starts with a practical question: what can a potential customer find today, and what is missing between that search and a useful next step? That leads from keyword research into technical checks, page structure and content that earns its place.</p>
            <p>Across more than ten SEO projects, the lesson is to adapt the plan to the market. A product comparison, a local service query and a technical guide signal different needs, so each deserves a different page and measure of success.</p>
            <p>Along the way I&apos;ve learned that the best SEO work rarely looks dramatic. It&apos;s a clear understanding of how customers search, a site search engines can read without friction, and steady, well-prioritised improvement.</p>
          </div>
        </div>
      </Section>

      <Section labelledBy="experience">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div id="experience">
            <SectionHeading title="Practice areas" />
            {siteConfig.baseLocation && <p className="mt-4 text-muted">Based in <Fill text={siteConfig.baseLocation} />, working with clients remotely.</p>}
          </div>
          <ol className="relative border-l border-line-strong">
            {experience.map((e) => (
              <li key={e.period + e.role} className="relative pb-10 pl-8 last:pb-0">
                <span aria-hidden className="absolute top-1.5 -left-[5px] size-2.5 rounded-full border-2 border-paper bg-link" />
                <p className="text-sm tabular-nums text-muted"><Fill text={e.period} /></p>
                <h3 className="mt-1 text-lg font-semibold tracking-tight text-ink"><Fill text={e.role} /> <span className="font-normal text-muted">— <Fill text={e.org} /></span></h3>
                <p className="mt-2 leading-relaxed text-ink-2"><Fill text={e.summary} /></p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="muted" labelledBy="skills">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 id="skills" className="t-h2 text-ink">Skills</h2>
            <ul className="mt-8 flex flex-wrap gap-2">
              {skills.map((s) => <li key={s} className="rounded-full border border-line-strong bg-paper px-4 py-2 text-sm text-ink-2">{s}</li>)}
            </ul>
            <div className="mt-10"><RelatedIndustryLinks items={industries} title="Industries covered on this site" /></div>
          </div>
          <div>
            <h2 className="t-h2 text-ink">Tools I use</h2>
            <ul className="mt-8 divide-y divide-line-strong border-y border-line-strong">
              {tools.map((t) => (
                <li key={t.name} className="flex items-baseline justify-between gap-6 py-3.5">
                  <span className="font-medium text-ink">{t.name}</span>
                  <span className="text-right text-sm text-muted">{t.use}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="dark" labelledBy="philosophy">
        <div id="philosophy"><SectionHeading tone="dark" title="What I believe about SEO" /></div>
        <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {principles.map((p) => (
            <li key={p.title} className="border-t border-night-line pt-5">
              <h3 className="t-h3 text-on-night">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-on-night-muted">{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="style">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <div>
            <h2 id="style" className="t-h2 text-ink">How I work with clients</h2>
            <ul className="mt-10 space-y-7">
              {workingStyle.map((w) => (
                <li key={w.title}>
                  <h3 className="t-h3 text-ink">{w.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted">{w.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <figure>
            <div className="relative aspect-[3/4] overflow-hidden rounded-[28px] bg-paper-2">
              <Image src={photos.coast.src} alt={photos.coast.alt} fill placeholder="blur" sizes="(min-width: 1024px) 520px, 100vw" className="object-cover object-[50%_60%]" />
            </div>
            <figcaption className="mt-3 text-sm text-muted">A moment away from the screen.</figcaption>
          </figure>
        </div>
      </Section>

      <Section><FAQ faqs={aboutFaqs} title="Working with Shobon: FAQs" /></Section>
      <FinalCta />
      <JsonLd data={profilePageSchema()} />
    </>
  );
}
