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
    "The reported starting point was zero relevant ranking keywords. Over this phase, the site reached visibility for more than 500 potential keywords. I use that figure to describe the expansion of relevant keyword coverage, rather than claim that every term ranks in the same position or brings the same commercial value.",
    "The commercial side of that visibility matters to me. The progress includes service and landing pages ranking for searches with potential buying intent. It gives the agency a route to discovery around what it sells, alongside the broader visibility of its website."
  ]],
  ["Why buying-intent pages matter in this case.", [
    "A keyword count alone cannot explain whether SEO is helping an agency grow. A person researching a general design topic may be at a different stage from someone looking for a partner to build a landing page or deliver a Webflow project. Both can be relevant, but they play different roles.",
    "In this engagement, service and landing pages are part of the reported ranking progress. That is important because those pages connect search interest to a defined offer. They give a potential buyer somewhere useful to land when evaluating a service.",
    "The live site provides context for that journey: visitors can explore services, inspect the agency’s work and use a call-booking route. These public pages show the offer and the next step. They do not, by themselves, establish which individual keyword or page generated a particular enquiry."
  ]],
  ["The outcome: visibility that leads to conversations.", [
    "The result I report is growth from zero to 500+ relevant ranking keywords during the focused three-month phase. Alongside that visibility, Wolfpixel’s service and landing pages are generating approximately 5–10 potential call bookings per month from buying-intent discovery.",
    "I describe these as potential call bookings because a booking is an opportunity to discuss a project. It is not the same as a completed call, a qualified sales opportunity or a signed client. No revenue or close-rate figure is included in this case study.",
    "These figures are my account of the engagement as of 31 October 2026. A keyword export, ranking-position breakdown and booking-attribution report are not published here. The numbers should therefore be read as reported outcomes, not independently audited measurements or a promise of the same results for another business."
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
    <section className="bg-night py-14 text-on-night sm:py-20"><Container>
      <nav aria-label="Breadcrumb" className="mb-10 text-sm text-on-night-muted"><Link href="/case-studies" className="underline">Case Studies</Link> / Wolfpixel</nav>
      <p className="text-xs uppercase tracking-widest text-link-night">Agency SEO · Team leadership · Digital growth</p>
      <div className="mt-6 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div><h1 className="t-h1">Wolfpixel SEO:<br />From zero visibility to buyer conversations.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-on-night-muted">My journey from learning SEO at Wolfpixel to leading the team—and a focused three-month phase that brought the agency visibility for 500+ relevant keywords.</p></div>
        <aside className="rounded-3xl border border-night-line bg-night-2 p-8"><p className="text-6xl font-semibold text-[#b8cbb0]">500+</p><p className="mt-3 text-lg">Relevant ranking keywords</p><p className="mt-5 text-4xl font-semibold text-[#b8cbb0]">5–10</p><p className="mt-3 text-lg">Potential call bookings per month</p><p className="mt-5 text-xs leading-6 text-on-night-muted">Engagement results reported by Shobon Mahmud · October 2026</p></aside>
      </div>
    </Container></section>
    <Container>
      <figure className="my-10 overflow-hidden rounded-3xl border border-line bg-night"><Image src="/images/case-studies/wolfpixel-homepage.webp" alt="Wolfpixel homepage showing its product and brand design services and yellow brand symbol" width={1381} height={753} sizes="(min-width:1240px) 1160px, 100vw" className="h-auto w-full" /><figcaption className="flex flex-wrap justify-between gap-4 p-6 text-sm text-on-night-muted"><span>Wolfpixel homepage · Screenshot supplied by Shobon Mahmud</span><a href="https://www.wolfpixel.agency/" target="_blank" rel="noopener noreferrer" className="text-link-night underline">Visit Wolfpixel’s website ↗</a></figcaption></figure>
      <dl className="mb-12 grid gap-6 rounded-3xl bg-paper-2 p-7 sm:grid-cols-2 lg:grid-cols-4">{[["Joined Wolfpixel","12 April 2025"],["SEO Team Lead","From 1 August"],["Guidance","Khondokar Asiful Islam"],["Website growth phase","Three months, reported October 2026"]].map(([label,value])=><div key={label}><dt className="text-xs uppercase tracking-wider text-muted">{label}</dt><dd className="mt-2 text-sm leading-7">{value}</dd></div>)}</dl>
      <section aria-labelledby="wolfpixel-growth" className="mb-14 rounded-3xl border border-line p-7 sm:p-9"><p className="text-xs uppercase tracking-wider text-link">The growth partnership</p><h2 id="wolfpixel-growth" className="mt-4 text-2xl font-semibold">Make the agency discoverable for the work it wants to win.</h2><p className="mt-5 max-w-3xl leading-8 text-muted">My role at Wolfpixel includes SEO work for agency clients and responsibility as SEO Team Lead. This case study focuses on a distinct part of that role: working on Wolfpixel’s own organic visibility and the buying-intent service pages that lead potential clients towards a call.</p></section>
      <div className="grid gap-10 pb-16 lg:grid-cols-[.65fr_1.35fr] lg:gap-20">
        <aside className="lg:sticky lg:top-28 lg:self-start"><p className="text-xs uppercase tracking-wider text-link">The story behind the result</p><h2 className="mt-4 text-3xl font-medium leading-tight">Learn the craft.<br />Take responsibility.<br />Connect visibility to opportunity.</h2><nav aria-label="Case study chapters" className="mt-7 space-y-3">{chapters.map(([title],i)=><a key={title} href={`#wolfpixel-chapter-${i+1}`} className="block text-sm leading-6 text-link hover:underline">{String(i+1).padStart(2,"0")} · {title}</a>)}</nav><Link href="/contact" className="mt-8 inline-block text-link underline">Discuss your website ↗</Link></aside>
        <article>{chapters.map(([title,paragraphs],i)=><section id={`wolfpixel-chapter-${i+1}`} key={title} className="scroll-mt-28 border-t border-line py-9 first:border-0 first:pt-0"><p className="mb-3 font-mono text-xs text-link">{String(i+1).padStart(2,"0")}</p><h2 className="text-2xl font-semibold leading-snug tracking-tight">{title}</h2>{paragraphs.map(p=><p key={p} className="mt-5 text-base leading-8 text-muted">{p}</p>)}{i===1&&<figure className="mt-8 overflow-hidden rounded-2xl border border-line bg-white"><Image src="/images/case-studies/wolfpixel-clientmind.webp" alt="ClientMind website design displayed in Wolfpixel’s homepage portfolio" width={780} height={860} sizes="(min-width:1024px) 700px, 100vw" className="h-auto w-full" /><figcaption className="p-6 text-sm leading-7 text-muted">Design imagery from <a href="https://www.wolfpixel.agency/" className="text-link underline">Wolfpixel’s live homepage</a>. This illustrates the agency’s work; figures within the design are not results from this SEO engagement.</figcaption></figure>}</section>)}
          <p className="rounded-2xl border border-line bg-paper-2 p-6 text-sm leading-7 text-muted"><strong className="text-ink">Source note.</strong> Role history, mentorship and performance figures were supplied by Shobon Mahmud. The team-lead start date is recorded as 1 August; the year was not specified. Business context and portfolio artwork come from Wolfpixel’s public website, reviewed on 31 October 2026. Results are reported, not independently audited.</p>
          <div className="mt-8 flex flex-wrap gap-5"><Link href="/case-studies/retirement-tax-partners-seo-growth" className="text-link underline">Read the RTP case study ↗</Link><Link href="/services/digital-growth-strategy" className="text-link underline">Explore digital growth strategy ↗</Link></div>
        </article>
      </div>
    </Container>
    <FinalCta title="Turn relevant discovery into a business conversation." body="Tell me which services you want to grow and where your website stands today. We can identify the search opportunities that fit your business." />
  </>;
}
