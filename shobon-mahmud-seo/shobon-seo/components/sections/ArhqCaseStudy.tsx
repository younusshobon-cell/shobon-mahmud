import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/content/types";
import { PageSchema } from "@/components/seo/PageSchema";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { FinalCta } from "./FinalCta";

const chapters = [
  {title: "A new domain. A business that still needed to be found.", paragraphs: [
    "When ARHQ came to me in July 2025, the conversation was about more than replacing an old domain. They needed the next version of their website to support organic growth in the service locations that mattered to the business.",
    "A website transition creates a difficult overlap: the business needs to move forward while people still need to find and understand its services. A better-looking site alone does not resolve that. The technical transition, the service content and the local search strategy have to work together.",
    "For a retirement-planning business, that journey also depends on confidence. Visitors need to understand the services, recognise who they are speaking to and find a clear way to begin a conversation. My job was to connect those needs with a practical search strategy."
  ]},
  {title: "Before recommending anything, I listened.", paragraphs: [
    "I sat down with the team to discuss the problem behind the website change. Where did growth need to happen? What did the move need to achieve? Which service locations mattered? Starting with that conversation helped put the website work in the context of the business.",
    "Once I had access to the site, I began with a full diagnosis. I wanted to understand the site as a connected system: technical foundations, on-page signals, content organisation and the role of off-page work. The purpose was to find the right starting point, rather than prescribe the same list of tasks I would give any other business.",
    "That diagnosis shaped the work that followed. The transition and the growth plan needed one direction, with each part supporting the next."
  ]},
  {title: "One diagnosis. Four connected workstreams.", paragraphs: [
    "The engagement brought on-page SEO, technical SEO, off-page work and content distribution into a shared plan. None of these areas could be treated as a complete answer on its own.",
    "Technical work supported the website’s ability to be discovered and understood. On-page work connected the services with the questions people ask. Content organisation helped the right information sit in the right place. Off-page work formed part of the wider effort to strengthen the business’s online presence.",
    "The important strategic choice was the sequence. A domain transition is not the moment to pursue isolated wins that ignore the rest of the site. I approached the work around the same question throughout: does this help the new website become a stronger route from relevant search to a useful business conversation?"
  ]},
  {title: "The migration was part of the growth problem.", paragraphs: [
    "ARHQ’s biggest concern was changing the site while continuing to grow. That made the domain transition a central planning constraint, rather than a separate development task at the end of the project.",
    "In a transition like this, old and new page relationships, discoverability, indexing signals and the continuity of useful service information all deserve attention. A technically available website still needs a coherent search journey. That is why I started with diagnosis and treated the migration and organic strategy as connected work.",
    "The value of a connected approach is that the website move and the longer-term growth requirement inform each other. The new site needs a clear role for its service information, not just a new address."
  ]},
  {title: "Local growth needed more than a city name on a page.", paragraphs: [
    "ARHQ wanted organic growth where it provides services. That meant keeping location relevance connected to what the business actually offers, rather than treating all traffic as equally valuable.",
    "The content-distribution work sat alongside on-page and technical improvements. The aim was to give service information a more purposeful role across the website and support discovery in the markets the business wanted to reach.",
    "For a prospect considering the same kind of project, this distinction matters: the objective is not simply to publish more pages. It is to make the website more useful to the people who could realistically become customers."
  ]},
  {title: "The outcome: 67% reported online growth.", paragraphs: [
    "Across the engagement, I report a 67% increase in ARHQ’s online growth compared with its previous position. The result followed work spanning website diagnosis, the domain-transition challenge, technical and on-page SEO, off-page work and content distribution.",
    "That number is the reported engagement outcome, not a promise of what another business will achieve. The exact metric definition, baseline and comparison period have not been supplied for this published case study. It should not be read as a verified increase in organic clicks, qualified leads, sales or revenue.",
    "The more transferable lesson is how the work was connected. Instead of treating the new website and the growth requirement as separate briefs, I approached them as one business problem."
  ]},
  {title: "What this means for your next website change.", paragraphs: [
    "If you are replacing a domain, rebuilding a site or struggling to grow in your service areas, the first decision is where to focus. Adding content without understanding the site can create more work without solving the constraint. Treating technical SEO in isolation can leave the commercial pages unclear.",
    "I start by understanding your business and diagnosing the current site. From there, we can agree the priorities, connect the right disciplines and define how progress should be reviewed. You get a partner who can explain the decisions behind the work and keep the plan tied to the outcome your business needs.",
    "Bring me the website, the transition you are considering and the growth problem you want to solve. We can start with a clear conversation about what deserves attention first."
  ]},
];

export function ArhqCaseStudy({ study }: {study: CaseStudy}) {
  return <>
    <PageSchema path={`/case-studies/${study.slug}`} />
    <section className="bg-night text-on-night py-12 sm:py-20">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-10 text-sm text-on-night-muted"><Link href="/case-studies" className="hover:underline">Case Studies</Link><span aria-hidden="true"> / </span>ARHQ</nav>
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-link-night">Client engagement · Financial services · Since July 2025</p>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <div><h1 className="t-h1 max-w-3xl">A new domain.<br />A connected growth plan.<br /><span className="text-[#b8cbb0]">ARHQ’s next chapter.</span></h1><p className="mt-6 max-w-2xl text-lg leading-8 text-on-night-muted">How I approached a website transition, service-location visibility and the SEO work behind ARHQ’s reported online growth.</p></div>
          <aside className="rounded-3xl border border-night-line bg-night-2 p-8"><p className="text-6xl font-semibold tracking-tight text-[#b8cbb0]">+67%</p><p className="mt-3 text-lg">Reported online growth</p><p className="mt-3 text-sm leading-6 text-on-night-muted">Engagement outcome reported by Shobon. Metric definition and comparison period were not provided for publication.</p></aside>
        </div>
      </Container>
    </section>
    <Container>
      <figure className="my-10 overflow-hidden rounded-3xl border border-line bg-white">
        <div className="relative aspect-[1600/622]"><Image src="/images/case-studies/arhq-hero.webp" alt="Retired couple pictured in ARHQ’s website hero imagery" fill priority sizes="(min-width: 1240px) 1160px, 100vw" className="object-cover" /></div>
        <figcaption className="flex flex-wrap items-center justify-between gap-5 px-6 py-5"><Image src="/images/case-studies/arhq-logo.webp" alt="America’s Retirement Headquarters" width={242} height={40} className="h-auto w-48" /><a href="https://arhq.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-link underline">View the client’s website ↗</a><span className="text-xs text-muted">Brand imagery sourced from ARHQ’s website.</span></figcaption>
      </figure>
      <dl className="mb-12 grid gap-6 rounded-3xl bg-paper-2 p-7 sm:grid-cols-2 lg:grid-cols-4">{[['Client','America’s Retirement Headquarters'],['Work began','July 2025'],['Core challenge','Domain transition + local organic growth'],['Scope','Technical, on-page, off-page & content']].map(([label,value])=><div key={label}><dt className="text-xs uppercase tracking-wider text-muted">{label}</dt><dd className="mt-2 text-sm font-medium leading-6">{value}</dd></div>)}</dl>
      <div className="grid gap-10 pb-16 lg:grid-cols-[.65fr_1.35fr] lg:gap-20">
        <aside className="lg:sticky lg:top-28 lg:self-start"><p className="text-xs font-semibold uppercase tracking-wider text-link">The engagement</p><h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight">Diagnose first.<br />Connect the work.<br />Build from there.</h2><p className="mt-5 text-sm leading-7 text-muted">A first-person account of the business challenge, the decisions behind the work and the reported outcome.</p><ButtonLink href="/contact" className="mt-7">Discuss your website ↗</ButtonLink></aside>
        <article>{chapters.map((chapter,index)=><section key={chapter.title} aria-labelledby={`arhq-${index}`} className="border-t border-line py-9 first:pt-0 first:border-0"><p className="mb-3 font-mono text-xs text-link">0{index+1}</p><h2 id={`arhq-${index}`} className="text-2xl font-semibold leading-snug tracking-tight">{chapter.title}</h2>{chapter.paragraphs.map(p=><p key={p} className="mt-5 text-base leading-8 text-muted">{p}</p>)}</section>)}<div className="rounded-2xl border border-line bg-paper-2 p-6 text-sm leading-7 text-muted"><strong className="text-ink">Source note.</strong> Engagement details and the 67% outcome were provided by Shobon Mahmud. Business identity and imagery are from <a href="https://arhq.com/" className="text-link underline">arhq.com</a>. No analytics export, exact old domain, comparison dates or independently verified revenue figures are included.</div></article>
      </div>
    </Container>
    <FinalCta title="Changing your website? Let’s protect the bigger picture." body="Tell me what is changing and where you need growth. We’ll start with the business problem, diagnose the website and identify the priorities that deserve attention." />
  </>;
}
