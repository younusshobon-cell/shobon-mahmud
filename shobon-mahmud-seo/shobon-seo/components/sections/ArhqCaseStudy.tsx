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
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-link-night">Client engagement · Legal Tech · Since July 2025</p>
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
      <section aria-labelledby="growth-partnership" className="my-12 rounded-3xl border border-line bg-paper-2 p-7 sm:p-9"><p className="text-xs font-semibold uppercase tracking-wider text-link">The growth partnership</p><h2 id="growth-partnership" className="mt-4 text-2xl font-semibold">SEO in service of digital growth.</h2><p className="mt-5 max-w-3xl text-base leading-8 text-muted">I worked with ARHQ as a Digital Growth Partner, using SEO to support the wider goal of digital growth through a website transition. Technical foundations, service content, local relevance and off-page work were connected around that business need.</p><p className="mt-4 max-w-3xl text-base leading-8 text-muted">If your business needs the same kind of direction, explore <Link href="/" className="text-link underline underline-offset-4">a connected approach to digital growth</Link> to see how I connect diagnosis, priorities and execution.</p></section>
      <dl className="mb-12 grid gap-6 rounded-3xl bg-paper-2 p-7 sm:grid-cols-2 lg:grid-cols-4">{[['Client','America’s Retirement Headquarters'],['Work began','July 2025'],['Core challenge','Domain transition + local organic growth'],['Scope','Technical, on-page, off-page & content']].map(([label,value])=><div key={label}><dt className="text-xs uppercase tracking-wider text-muted">{label}</dt><dd className="mt-2 text-sm font-medium leading-6">{value}</dd></div>)}</dl>
      <section aria-labelledby="organic-evidence" className="mb-16 border-t border-line pt-12">
        <p className="text-xs font-semibold uppercase tracking-wider text-link">Organic search performance</p>
        <h2 id="organic-evidence" className="t-h2 mt-4">Helping the right people find ARHQ.</h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-muted">The website move was only one part of the job. ARHQ also needed to be found when people searched for help with retirement, Medicare and tax planning. I wanted the new site to give those searches somewhere useful to land.</p>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted">The three-month Search Console snapshot below shows 4.8K clicks and 120K impressions, with a 4.0% average click-through rate and an average position of 8.1. The daily figures fluctuate, but the chart finishes at higher levels than it starts. It gives a clearer picture of how the site was being discovered during this period.</p>
        <dl className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">{[['4.8K','Total clicks'],['120K','Total impressions'],['4.0%','Average CTR'],['8.1','Average position']].map(([value,label])=><div key={label} className="rounded-2xl border border-line bg-paper-2 p-5 sm:p-6"><dt className="text-xs text-muted">{label}</dt><dd className="mt-3 text-3xl font-semibold tracking-tight">{value}</dd></div>)}</dl>
        <div className="mt-10 space-y-8">
          {[
            {file:'arhq-search-console-performance',width:1916,height:821,title:'Three months of organic search activity',alt:'ARHQ Search Console three-month performance showing 4.8K clicks, 120K impressions, 4.0 percent CTR and average position 8.1',caption:'The chart runs from July into October 2026. Both clicks and impressions end above their starting levels, with day-to-day variation along the way. These totals describe the selected period; they are not a before-and-after comparison.'},
            {file:'arhq-search-console-queries',width:1886,height:834,title:'Searches connected to the services ARHQ offers',alt:'ARHQ Search Console query table with retirement planning Maumee Ohio, Medicare planning Ohio and retirement tax planning among the top queries',caption:'“Retirement planning maumee ohio” leads the visible table with 142 clicks, followed by “medicare planning ohio” with 118 and “retirement tax planning” with 96. Seeing these service searches alongside the ARHQ brand terms matters: people were finding the site through the help they were looking for, as well as the business name.'},
          ].map(item=><figure key={item.file} className="overflow-hidden rounded-2xl border border-line bg-white"><a href={`/images/case-studies/${item.file}.webp`} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size ${item.title}`}><Image src={`/images/case-studies/${item.file}.webp`} alt={item.alt} width={item.width} height={item.height} sizes="(min-width:1240px) 1160px, 100vw" className="h-auto w-full" /></a><figcaption className="p-6 sm:p-8"><h3 className="text-lg font-semibold">{item.title}</h3><p className="mt-3 max-w-3xl text-sm leading-7 text-muted">{item.caption}</p></figcaption></figure>)}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-7 text-muted">Source: Search Console screenshots supplied by Shobon Mahmud. Query positions reflect the selected report, rather than a fixed ranking for every searcher. The three-month figures are separate from the engagement’s reported 67% online-growth result.</p>
      </section>
      <section aria-labelledby="local-evidence" className="mb-16 border-t border-line pt-12">
        <p className="text-xs font-semibold uppercase tracking-wider text-link">Local search evidence</p>
        <h2 id="local-evidence" className="t-h2 mt-4">Visible progress in local discovery.</h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-muted">The supplied Localo dashboard shows 43% visibility with a displayed +7% change, and 368 profile views with a displayed increase of 86. Six of the ten tracked keyword rows show Rank 1. These are tool-specific snapshots, rather than a claim of first position across every location.</p>
        <figure className="mt-8"><Image src="/images/case-studies/arhq-local-performance-summary.svg" alt="Designed summary of supplied evidence: 43 percent Localo visibility, 368 profile views and six of ten tracked keywords showing Rank 1" width={1440} height={640} className="h-auto w-full rounded-3xl" /><figcaption className="mt-3 text-xs leading-6 text-muted">Designed evidence summary from the screenshots below; not a native analytics export.</figcaption></figure>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {[
            {file:"arhq-localo-dashboard",title:"Localo dashboard",width:1366,height:630,caption:"Visibility: 43%, with a displayed +7% change versus the last 30 days. Profile views: 368, with a displayed +86 versus last month. Overall position shown: 9. The capture date is not visible."},
            {file:"arhq-localo-keywords",title:"Tracked keyword performance",width:1121,height:886,caption:"Six of ten tracked terms show Rank 1, including retirement advisor and retirement planning. Other terms remain lower, including financial planner at 27 and wealth management at 21. Rankings depend on the tool’s tracking settings and location."},
            {file:"arhq-localo-position-map",title:"Local position map",width:1358,height:633,caption:"The retirement advisor map is dated February 5, 2026 and displays 57% business visibility. Green areas sit alongside lower-ranking areas, showing that performance varies across the map."},
            {file:"arhq-profile-calls",title:"Google Business Profile calls",width:1048,height:572,caption:"15 calls are shown for December 2025–February 2026. December displays 9 calls and the visible series declines towards February. This screenshot documents call activity; it does not demonstrate call growth or confirmed sales."},
          ].map(item=><figure key={item.file} className="overflow-hidden rounded-2xl border border-line bg-white"><a href={`/images/case-studies/${item.file}.webp`} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size ${item.title}`}><Image src={`/images/case-studies/${item.file}.webp`} alt={item.title+" for America’s Retirement Headquarters"} width={item.width} height={item.height} sizes="(min-width:1024px) 560px, 100vw" className="h-auto w-full" /></a><figcaption className="p-6"><h3 className="text-lg font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-7 text-muted">{item.caption}</p></figcaption></figure>)}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-7 text-muted">Evidence supplied by Shobon. These screenshots support the specific local metrics shown here. They do not independently substantiate the separate 67% online-growth figure, and do not provide verified sales or revenue data.</p>
      </section>
      <div className="grid gap-10 pb-16 lg:grid-cols-[.65fr_1.35fr] lg:gap-20">
        <aside className="lg:sticky lg:top-28 lg:self-start"><p className="text-xs font-semibold uppercase tracking-wider text-link">The engagement</p><h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight">Diagnose first.<br />Connect the work.<br />Build from there.</h2><p className="mt-5 text-sm leading-7 text-muted">A first-person account of the business challenge, the decisions behind the work and the reported outcome.</p><ButtonLink href="/contact" className="mt-7">Discuss your website ↗</ButtonLink></aside>
        <article>{chapters.map((chapter,index)=><section key={chapter.title} aria-labelledby={`arhq-${index}`} className="border-t border-line py-9 first:pt-0 first:border-0"><p className="mb-3 font-mono text-xs text-link">0{index+1}</p><h2 id={`arhq-${index}`} className="text-2xl font-semibold leading-snug tracking-tight">{chapter.title}</h2>{chapter.paragraphs.map(p=><p key={p} className="mt-5 text-base leading-8 text-muted">{p}</p>)}</section>)}<div className="rounded-2xl border border-line bg-paper-2 p-6 text-sm leading-7 text-muted"><strong className="text-ink">Source note.</strong> Engagement details and the 67% outcome were provided by Shobon Mahmud. Business identity and imagery are from <a href="https://arhq.com/" className="text-link underline">arhq.com</a>. Supplied Google Search Console, Localo and Google Business Profile screenshots are shown above with their visible context. The separate 67% growth figure still has no underlying analytics export, metric definition or comparison dates; no verified revenue figures are included.</div></article>
      </div>
    </Container>
    <FinalCta title="Changing your website? Let’s protect the bigger picture." body="Tell me what is changing and where you need growth. We’ll start with the business problem, diagnose the website and identify the priorities that deserve attention." />
  </>;
}
