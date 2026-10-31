import { CaseStudyHero } from "./CaseStudyHero";
import { WolfpixelEvidence } from "./WolfpixelEvidence";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageSchema } from "@/components/seo/PageSchema";
import { FinalCta } from "./FinalCta";

const chapters: [string, string[]][] = [
  ["The journey began with learning and client work.", [
    "I started working on SEO at Wolfpixel on 12 April 2025. I learned the work under the guidance of Khondokar Asiful Islam, and my experience grew through SEO projects for different Wolfpixel clients. That is the foundation behind this case study: an ongoing agency role, followed by a focused effort on the agency’s own website.",
    "Working across client businesses gave me exposure to different services, audiences and commercial goals. The agency’s website was a different challenge again. This time, the business we needed to help people discover was Wolfpixel itself, with its own design and development services to explain.",
    "I later took on responsibility as Wolfpixel’s SEO Team Lead from 1 August. That progression is part of my professional journey, while the results below refer specifically to work on Wolfpixel’s website. They are not a combined total from the agency’s client projects."
  ]],
  ["The business behind the search opportunity.", [
    "Wolfpixel is a product and brand design agency. Its live website presents services including UI/UX design, mobile app design, landing page design, Webflow development and brand identity. These are services a potential buyer needs to understand and compare before booking a conversation.",
    "For an agency, a portfolio demonstrates the kind of work it can deliver. Search visibility has a complementary job: help people looking for that kind of help discover the relevant service. A visitor may arrive with a specific project in mind rather than begin on the homepage.",
    "That makes service and landing pages central to this story. They sit close to a commercial decision: what the agency offers, whether the work is a fit and how to start a discussion. The portfolio images on this page show that business context; they are Wolfpixel’s design work, not SEO performance reports."
  ]],
  ["A three-month focus on Wolfpixel’s own website.", [
    "During the three months leading up to this case study, I have been actively working on SEO for Wolfpixel’s own website. This focused phase is separate from my employment start date and from the work I have done for other Wolfpixel clients.",
    "The reported starting point was zero relevant ranking keywords. Over this phase, the site reached visibility for 585+ potential ranking keywords—around 600 in rounded terms. I use that figure to describe the expansion of relevant keyword coverage, rather than claim that every term ranks in the same position or brings the same commercial value.",
    "The commercial side of that visibility matters to me. The progress includes service and landing pages ranking for searches with potential buying intent. It gives the agency a route to discovery around what it sells, alongside the broader visibility of its website."
  ]],
  ["Why buying-intent pages matter in this case.", [
    "A keyword count alone cannot explain whether SEO is helping an agency grow. A person researching a general design topic may be at a different stage from someone looking for a partner to build a landing page or deliver a Webflow project. Both can be relevant, but they play different roles.",
    "In this engagement, service and landing pages are part of the reported ranking progress. That is important because those pages connect search interest to a defined offer. They give a potential buyer somewhere useful to land when evaluating a service.",
    "The live site provides context for that journey: visitors can explore services, inspect the agency’s work and use a call-booking route. These public pages show the offer and the next step. They do not, by themselves, establish which individual keyword or page generated a particular enquiry."
  ]],
  ["The outcome: visibility that leads to conversations.", [
    "The result I report is growth from zero to 585+ potential ranking keywords (around 600) during the focused three-month phase. Alongside that visibility, Wolfpixel’s service and landing pages are generating approximately 5–10 potential call bookings per month from buying-intent discovery.",
    "I describe these as potential call bookings because a booking is an opportunity to discuss a project. It is not the same as a completed call, a qualified sales opportunity or a signed client. No revenue or close-rate figure is included in this case study.",
    "The reference gallery includes Search Console, Semrush, PageSpeed and site-audit screenshots. The three-month Search Console view records 790 clicks and 148K impressions, while the Semrush screenshot shows 495 keywords in its selected US desktop database. My broader 585+ keyword count and 5–10 monthly potential call bookings remain reported engagement figures; the screenshots do not establish booking attribution or a before-and-after percentage increase."
  ]],
  ["One person responsible for the full SEO scope.", [
    "At Wolfpixel, I personally handle the SEO work across audits, on-page SEO, off-page SEO and technical SEO, alongside leading the SEO team. My role includes hands-on execution as well as team leadership. That gives the work a consistent point of responsibility across the website’s content, search visibility and technical condition.",
    "The audit screenshots provide a view of that technical condition: 97% Site Health across 115 crawled pages, with zero errors and 30 warnings. I include the remaining warnings because they help explain what still needs attention. The audit is a reference point for ongoing work, not a claim that the website has no issues.",
    "The desktop PageSpeed reference adds another view: 77 for Performance, 93 for Accessibility and 100 for both Best Practices and SEO. Strong loading and layout metrics sit alongside 440 ms of total blocking time. Technical SEO requires reviewing those details together, rather than relying on one headline score."
  ]],
  ["Authoritative blog content built around intent and business potential.", [
    "I also write Wolfpixel’s blog content, choosing topics according to search intent and their potential value to the business. The aim is to produce authoritative, useful content that answers the reader’s question and has a clear relationship with the agency’s services.",
    "Intent matters because readers arrive with different needs. Some want to understand a design problem; others are comparing possible partners or exploring a specific service. Business potential adds a second question: does this topic connect with work Wolfpixel can actually deliver? I use both considerations when deciding what to write.",
    "The supplied ranking report shows several blog URLs appearing for relevant searches, including design-agency and industry-specific topics. The Search Console table also shows impressions for SaaS web design, law-firm website design and UI/UX services. These references help explain the content’s search context without assuming that every visible query has already generated a lead."
  ]],
  ["The relationship now includes the founders’ personal websites.", [
    "I have recently started working on the personal portfolio websites of Wolfpixel’s founder and co-founder as well. This extends the relationship beyond the agency website into their individual professional presence.",
    "These projects are at an early stage. They are included here as additional scope entrusted to me, with their own audiences and objectives. No ranking, traffic or lead-generation result is claimed for either portfolio at this point. As work progresses, their outcomes should be measured separately from Wolfpixel’s agency website."
  ]],
  ["What SEO team leadership means for a potential client.", [
    "My position as SEO Team Lead gives this story a wider context than a one-off website task. I have worked within Wolfpixel since April 2025, contributed to SEO for its clients and then taken on a leadership role. The three-month website result sits within that continuing relationship.",
    "For someone considering working with me, the relevant question is what that experience brings to a business discussion. I can speak from working on both an agency’s own search presence and projects for the businesses it serves. Those are different situations: the offer, the customer and the route to an enquiry all need to be understood on their own terms.",
    "I also want to give proper credit to the people behind that development. Khondokar Asiful Islam guided my SEO learning, and Wolfpixel is a team environment. This is my account of my SEO contribution; the agency’s design portfolio and wider delivery capability belong to the people who created them. Clear ownership is part of presenting a trustworthy case study."
  ]],
  ["How I would evaluate the next growth opportunity.", [
    "For a similar service-business project, I would begin by discussing the work you want to win. Which services are commercially important? Who normally buys them? What does a useful enquiry look like? Those answers give an SEO plan a business direction before we decide which pages deserve attention.",
    "Next, I would review the relationship between search intent and the existing website. A service page should answer a buyer’s service-specific questions, while an educational article should help someone understand a problem. I would look for gaps between those roles and whether a visitor can move naturally from relevant information to a suitable service.",
    "I would then agree a baseline and a practical way to review progress. Keyword coverage, visits to important pages and enquiries answer different questions. Recording them separately makes it easier to see whether discovery is improving and whether that attention is turning into useful conversations. This describes how I would frame a new engagement, rather than an unpublished checklist of changes made to Wolfpixel."
  ]],
  ["Is this case study relevant to your business?", [
    "The closest fit is an agency or service business with a clear offer but limited organic discovery. You may already have a good portfolio and capable delivery team, yet still rely heavily on referrals or outbound activity. In that situation, the question is how search can help potential buyers find the services you already provide.",
    "It is also relevant if your website attracts visitors but your important service pages are difficult to find. That calls for a closer look at the audience and intent behind the traffic. More visits to unrelated topics may not address the gap between an interested reader and someone ready to discuss a project.",
    "Wolfpixel’s reported progress provides one example, not a forecast for another site. Your competition, existing visibility, service demand and website condition would shape the priorities. The useful starting point is a review of your own situation and agreement on what a worthwhile outcome would look like."
  ]],
  ["What this project says about my approach to growth.", [
    "This case connects three parts of my work: learning under experienced guidance, contributing to different client projects and taking responsibility for the agency’s own organic growth. The progression matters, but the business outcome needs its own clear definition.",
    "For Wolfpixel, the useful connection is between relevant search visibility, pages that describe services and potential buyers booking a conversation. That is why I look beyond the headline keyword total when discussing this project. Discovery has a practical purpose when it helps the right person take the next step.",
    "If you run a service business, the same questions are a useful starting point: which services need more visibility, what are potential buyers looking for, and how does the website help them decide to speak with you? Those are the questions I would bring to an initial discussion about your growth."
  ]],
];

export function WolfpixelCaseStudy() {
  return <>
    <PageSchema path="/case-studies/wolfpixel-seo-growth" />
    <CaseStudyHero project="wolfpixel" />
    <Container>
      
      <dl className="mb-12 grid gap-6 rounded-3xl bg-paper-2 p-7 sm:grid-cols-2 lg:grid-cols-4">{[["Joined Wolfpixel","12 April 2025"],["SEO Team Lead","From 1 August"],["Guidance","Khondokar Asiful Islam"],["Website growth phase","Three months, reported October 2026"]].map(([label,value])=><div key={label}><dt className="text-xs uppercase tracking-wider text-muted">{label}</dt><dd className="mt-2 text-sm leading-7">{value}</dd></div>)}</dl>
      <section aria-labelledby="wolfpixel-growth" className="mb-14 rounded-3xl border border-line p-7 sm:p-9"><p className="text-xs uppercase tracking-wider text-link">The growth partnership</p><h2 id="wolfpixel-growth" className="mt-4 text-2xl font-semibold">Make the agency discoverable for the work it wants to win.</h2><p className="mt-5 max-w-3xl leading-8 text-muted">My role at Wolfpixel includes SEO work for agency clients and responsibility as SEO Team Lead. This case study focuses on a distinct part of that role: working on Wolfpixel’s own organic visibility and the buying-intent service pages that lead potential clients towards a call.</p></section>
      <WolfpixelEvidence />
      <div className="grid gap-10 pb-16 lg:grid-cols-[.65fr_1.35fr] lg:gap-20">
        <aside className="lg:sticky lg:top-28 lg:self-start"><p className="text-xs uppercase tracking-wider text-link">The story behind the result</p><h2 className="mt-4 text-3xl font-medium leading-tight">Learn the craft.<br />Take responsibility.<br />Connect visibility to opportunity.</h2><nav aria-label="Case study chapters" className="mt-7 space-y-3">{chapters.map(([title],i)=><a key={title} href={`#wolfpixel-chapter-${i+1}`} className="block text-sm leading-6 text-link hover:underline">{String(i+1).padStart(2,"0")} · {title}</a>)}</nav><Link href="/contact" className="mt-8 inline-block text-link underline">Discuss your website ↗</Link></aside>
        <article>{chapters.map(([title,paragraphs],i)=><section id={`wolfpixel-chapter-${i+1}`} key={title} className="scroll-mt-28 border-t border-line py-9 first:border-0 first:pt-0"><p className="mb-3 font-mono text-xs text-link">{String(i+1).padStart(2,"0")}</p><h2 className="text-2xl font-semibold leading-snug tracking-tight">{title}</h2>{paragraphs.map(p=><p key={p} className="mt-5 text-base leading-8 text-muted">{p}</p>)}{i===1&&<figure className="mt-8 overflow-hidden rounded-2xl border border-line bg-white"><Image src="/images/case-studies/wolfpixel-clientmind.webp" alt="ClientMind website design displayed in Wolfpixel’s homepage portfolio" width={780} height={860} sizes="(min-width:1024px) 700px, 100vw" className="h-auto w-full" /><figcaption className="p-6 text-sm leading-7 text-muted">Design imagery from <a href="https://www.wolfpixel.agency/" className="text-link underline">Wolfpixel’s live homepage</a>. This illustrates the agency’s work; figures within the design are not results from this SEO engagement.</figcaption></figure>}</section>)}
          <p className="rounded-2xl border border-line bg-paper-2 p-6 text-sm leading-7 text-muted"><strong className="text-ink">Source note.</strong> Role history, mentorship, full SEO scope, founder-portfolio work and report screenshots were supplied by Shobon Mahmud. The overall 585+ keyword count is rounded to around 600; the US desktop screenshot shows 495. Call bookings are reported separately from the search metrics. The team-lead start date is recorded as 1 August; the year was not specified. Business context and portfolio artwork come from Wolfpixel’s public website, reviewed on 31 October 2026. Results are reported, not independently audited.</p>
          <div className="mt-8 flex flex-wrap gap-5"><Link href="/case-studies/americas-medicare-associates-seo-growth" className="text-link underline">Read the AMA case study ↗</Link><Link href="/services/digital-growth-strategy" className="text-link underline">Explore digital growth strategy ↗</Link></div>
        </article>
      </div>
    </Container>
    <FinalCta title="Have a strong service, but too few organic enquiries?" body="Send me your website, the services you want to grow and the kind of clients you want to attract. We can discuss where discovery is falling short and whether an SEO-led growth plan fits your business." />
  </>;
}
