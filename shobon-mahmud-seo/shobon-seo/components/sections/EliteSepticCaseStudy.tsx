import { CaseStudyHero } from "./CaseStudyHero";
import { CaseGrowthNote } from "@/components/content/CaseGrowthNote";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageSchema } from "@/components/seo/PageSchema";
import { FinalCta } from "./FinalCta";

const slug = "elite-septic-service-local-seo";

const chapters: [string, string[]][] = [
  ["A septic business needs the phone to ring.", [
    "Elite Septic Service works with homeowners and property owners in Lufkin, Jasper and the wider East Texas area. Its website describes licensed septic tank installation, repair, inspection and pumping, with free estimates, flat-rate pricing and a 24/7 emergency service. That is a business where the customer usually has a real problem in front of them: a backup, a slow drain, an alarm going off or a tank that is overdue for pumping.",
    "People in that situation rarely browse for long. They search on their phone, look at who is nearby, glance at the reviews and call. So before I built anything, I agreed with myself what success would look like for this client: not traffic for its own sake, but more people finding Elite Septic on Google and picking up the phone.",
    "I started working with Elite Septic Service on 27 May 2026. My role covered the whole path: I built the website from scratch, then worked on local SEO and the Google Business Profile so the two support each other. This case study explains that work and shows the Business Profile Performance reports exactly as Google displays them."
  ]],
  ["I built the website around the searches homeowners actually make.", [
    "A septic company does not need a clever website. It needs one that answers three questions in a few seconds: what do you do, where do you work, and how fast can I reach you? I structured the site around the services the business actually offers and the towns it actually serves, with the phone number and contact routes easy to reach on a small screen.",
    "You can see that thinking in how the site appears in Google. The homepage title reads “Septic Tank Service in Lufkin & Jasper, TX | Elite Septic”, and the description names installation, repair, inspection and pumping alongside Lufkin, Jasper and East Texas, then gives the reasons to call now: free estimates, flat-rate pricing and 24/7 emergency service. Someone scanning results knows what the business does and where before they even click.",
    "I kept the wording plain on purpose. Homeowners search for “septic tank service”, “septic pumping” or a town name, not industry jargon. Matching that language helps search engines understand the page and helps the person reading it feel they are in the right place."
  ]],
  ["The Google Business Profile became the front door.", [
    "For a local service business, the Business Profile is often where the decision is made. It is what appears in the map results and the panel beside them, and it puts the call button, reviews and photos in one place. Many customers will call Elite Septic without ever opening the website, so the profile had to be just as accurate and useful as the site itself.",
    "The profile is verified and listed under the Septic system service category. It links to the website, shows the phone number and opening hours, has online booking switched on through the “Book online” button and uses real photos, including the branded service truck. It currently shows a 4.8 average from 25 Google reviews. Those reviews belong to the client’s customers; my job is to make sure the profile around them is complete, consistent with the website and easy to act on.",
    "I also want to be straightforward about what is not finished. Google’s profile-strength indicator still suggests adding more information, and I treat that as part of the ongoing work rather than something to hide. A Business Profile is never really done: services, photos, posts and review requests all need regular attention."
  ]],
  ["What the Performance reports show.", [
    "Between June and November 2026, Google recorded 232 Business Profile interactions for Elite Septic Service. Interactions are actions people take on the profile, such as calls, chat clicks, bookings and website clicks. Of those 232 interactions, 100 were calls made directly from the profile. That means roughly 43% of everything people did on the profile was picking up the phone.",
    "Reading the monthly points on the charts, interactions rose to about 67 in July, held at about 54 in August, dipped to about 26 in September and came back to about 48 in October. Calls followed a similar shape: about 20 in June, 23 in July and 25 in August, a lower September with about 11, then about 21 in October. A separate September–October report confirms 32 calls across those two months.",
    "November shows zero on both charts for a simple reason: I captured the reports at the very start of the month, so November had barely begun. It is not a drop in demand, and I would not want anyone to read it that way."
  ]],
  ["Why I focus on calls, and what a call is not.", [
    "For septic work, a call is the closest measurable signal to a real job. It is a person with a problem choosing this business over the others on the page. That is why I put the calls figure at the top of this case study instead of impressions or website visits.",
    "A call is still not a booked job. Some calls are quotes, some are questions and some will not become work. The Business Profile report also only counts calls started from the profile itself. Calls from the website, from returning customers dialling the saved number or from other sources are not included in these 100. I have not been given job or revenue figures, so I make no claims about sales.",
    "Work began on 27 May 2026 and the report starts in June 2026, a few days later. I do not have a comparable period from before the engagement in these screenshots, so I am not presenting a percentage increase. What the evidence does show is a steady stream of local customers finding the profile and calling, month after month."
  ]],
  ["Reading the September dip honestly.", [
    "September was the quietest month in the report, for both interactions and calls, and October recovered strongly, with calls roughly doubling from about 11 to about 21. It would be easy to claim the recovery as proof of a specific change, but six months of data is not enough to separate my work from weather, seasonal demand or what competitors were doing.",
    "Instead of guessing, I watch the trend month by month and look at the pieces I can influence: whether the profile information is current, whether new reviews are coming in, whether the website still answers the questions people are calling about and whether booking and contact routes are working. That is a more useful habit than reacting to a single month."
  ]],
  ["What comes next for Elite Septic.", [
    "The next steps on my list are practical. Complete the remaining profile information Google is prompting for. Keep adding real job photos and regular updates. Encourage happy customers to leave reviews using the profile’s review link. And strengthen the website’s content for the specific services and nearby towns people search for around Lufkin and Jasper.",
    "I also want to measure more of the journey. Separating calls from the website and from the profile, and recording which calls turn into booked work, would let us talk about lead quality rather than just volume. That is the conversation I want to be having with any local service client: not “are we ranking?”, but “is the phone ringing with the right jobs?”"
  ]],
  ["Is this case study relevant to your business?", [
    "If you run a septic company, a plumbing business, an HVAC service or any trade where customers call when something goes wrong, the same principles apply. Build a website that answers the urgent questions quickly. Make the Business Profile accurate, complete and connected to the site. Then judge the work by the calls and enquiries it produces, with honest context around the numbers.",
    "Elite Septic’s reports are one example, not a forecast for another business. Your service area, competition, reviews and starting point will shape what is realistic. If you would like to talk it through, I am happy to look at your website and profile and tell you where I would start."
  ]],
];

const evidence: [string, number, number, string, string][] = [
  ["elite-septic-gbp-profile", 1143, 545, "The verified Google Business Profile", "Elite Septic Service appears as a verified profile with a 4.8 average from 25 Google reviews, the Septic system service category, Website and Book online actions, phone number and opening hours. The manager panel on the left shows 232 customer interactions. Google’s profile-strength ring still prompts for more information."],
  ["elite-septic-interactions", 1387, 921, "232 Business Profile interactions, June–November 2026", "The Overview tab counts actions people took on the profile, including calls, chat clicks, bookings and website clicks. The monthly points peak in July and dip in September before recovering in October. November is near zero because the report was captured at the start of that month."],
  ["elite-septic-calls-six-months", 1314, 922, "100 calls made from the Business Profile", "The Calls tab for June–November 2026 shows 100 calls started from the profile. Calls run at roughly 20–25 a month from June to August, dip in September and recover in October. Calls from the website or from customers dialling directly are not counted here."],
  ["elite-septic-calls-sep-oct", 1356, 907, "32 calls across September and October", "A narrower window confirms 32 profile calls in September and October 2026, with the chart rising from about 11 calls in September to about 21 in October. Monthly values are read from the chart and rounded."],
];

const monthly: [string, string, string][] = [
  ["June 2026", "≈ 37", "≈ 20"],
  ["July 2026", "≈ 67", "≈ 23"],
  ["August 2026", "≈ 54", "≈ 25"],
  ["September 2026", "≈ 26", "≈ 11"],
  ["October 2026", "≈ 48", "≈ 21"],
  ["November 2026", "Month just started", "Month just started"],
];

export function EliteSepticCaseStudy() {
  return <>
    <PageSchema path={`/case-studies/${slug}`} />
    <CaseStudyHero project="elite" />
    <Container>
      <section aria-labelledby="growth-partnership" className="my-12 rounded-3xl border border-line bg-paper-2 p-7 sm:p-9">
        <p className="text-xs font-semibold uppercase tracking-wider text-link">The growth partnership</p>
        <h2 id="growth-partnership" className="mt-4 text-2xl font-semibold">From a new website to a profile people call.</h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-muted">Since 27 May 2026, I have built Elite Septic Service’s website from scratch and connected it with local SEO and Google Business Profile optimization. The goal was simple and practical: help homeowners in Lufkin, Jasper and East Texas find a septic company quickly and call it with confidence.</p>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted">If you run a trade or home service business, see how I approach <Link href="/services/seo-for-home-service-providers" className="text-link underline underline-offset-4">SEO for home service providers</Link> and <Link href="/services/local-seo" className="text-link underline underline-offset-4">local SEO</Link>.</p>
      </section>

      <dl className="mb-14 grid gap-6 rounded-3xl bg-paper-2 p-7 sm:grid-cols-2 lg:grid-cols-4">{[["Client", "Elite Septic Service"], ["Started", "27 May 2026"], ["Starting point", "A website built from scratch"], ["Scope", "Website build, local SEO & Google Business Profile"]].map(([k, v]) => <div key={k}><dt className="text-xs uppercase tracking-wider text-muted">{k}</dt><dd className="mt-2 text-sm leading-7">{v}</dd></div>)}</dl>

      <section id="elite-evidence" aria-labelledby="elite-evidence-title" className="mb-16 scroll-mt-28">
        <p className="text-xs uppercase tracking-wider text-link">Google Business Profile performance</p>
        <h2 id="elite-evidence-title" className="t-h2 mt-4">The numbers, exactly as Google shows them.</h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-muted">These screenshots come straight from Elite Septic Service’s Business Profile Performance report. I have kept each time window separate and explained what each number does and does not include.</p>
        <dl className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">{[["232", "Profile interactions"], ["100", "Calls from the profile"], ["43%", "Of interactions were calls"], ["4.8★", "From 25 Google reviews"]].map(([v, k]) => <div key={k} className="rounded-2xl border border-line bg-paper-2 p-6"><dt className="text-xs text-muted">{k}</dt><dd className="mt-3 text-3xl font-semibold">{v}</dd></div>)}</dl>
        <p className="mt-3 text-xs text-muted">Interactions and calls cover June–November 2026, with November captured at the start of the month. The 43% share is 100 calls divided by 232 interactions.</p>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-line bg-white" role="region" aria-label="Monthly profile interactions and calls" tabIndex={0}>
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <caption className="px-6 pt-6 text-left text-base font-semibold text-ink">Month by month, read from the charts</caption>
            <thead><tr className="text-muted"><th scope="col" className="px-6 py-4 font-medium">Month</th><th scope="col" className="px-6 py-4 font-medium">Profile interactions</th><th scope="col" className="px-6 py-4 font-medium">Calls from the profile</th></tr></thead>
            <tbody>{monthly.map(([m, i, c]) => <tr key={m} className="border-t border-line"><th scope="row" className="px-6 py-4 font-medium text-ink">{m}</th><td className="px-6 py-4 text-ink-2">{i}</td><td className="px-6 py-4 text-ink-2">{c}</td></tr>)}</tbody>
          </table>
          <p className="border-t border-line px-6 py-4 text-xs leading-6 text-muted">Monthly values are estimated from the chart points and rounded. They add up to the report totals of 232 interactions and 100 calls, and the September–October calls match the separate 32-call report.</p>
        </div>

        <div className="mt-10 space-y-8">{evidence.map(([file, width, height, title, caption]) => <figure key={file} className="overflow-hidden rounded-2xl border border-line bg-white"><a href={`/images/case-studies/${file}.webp`} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size: ${title}`}><Image src={`/images/case-studies/${file}.webp`} alt={`Elite Septic Service: ${title}`} width={width} height={height} sizes="(min-width:1240px) 1160px, 100vw" className="h-auto w-full" /></a><figcaption className="p-6 sm:p-8"><h3 className="text-lg font-semibold">{title}</h3><p className="mt-3 max-w-3xl text-sm leading-7 text-muted">{caption}</p></figcaption></figure>)}</div>
      </section>

      <div className="grid gap-10 pb-16 lg:grid-cols-[.65fr_1.35fr] lg:gap-20">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs uppercase tracking-wider text-link">The process behind the project</p>
          <h2 className="mt-4 text-3xl font-medium leading-tight">Build the website.<br />Fix the front door.<br />Measure the calls.</h2>
          <p className="mt-5 text-sm leading-7 text-muted">A first-person account of building a septic company’s website and local search presence in East Texas.</p>
          <nav aria-label="Case study chapters" className="mt-7 space-y-3">{chapters.map(([title], i) => <a key={title} href={`#elite-chapter-${i + 1}`} className="block text-sm leading-6 text-link hover:underline">{String(i + 1).padStart(2, "0")} · {title}</a>)}</nav>
          <Link href="/contact" className="mt-8 inline-block text-link underline">Discuss your website ↗</Link>
        </aside>
        <article>
          {chapters.map(([title, paragraphs], i) => <section id={`elite-chapter-${i + 1}`} key={title} className="scroll-mt-28 border-t border-line py-9 first:border-0 first:pt-0"><p className="mb-3 font-mono text-xs text-link">{String(i + 1).padStart(2, "0")}</p><h2 className="text-2xl font-semibold leading-snug tracking-tight">{title}</h2>{paragraphs.map(p => <p key={p} className="mt-5 text-base leading-8 text-muted">{p}</p>)}</section>)}
          <p className="rounded-2xl border border-line bg-paper-2 p-6 text-sm leading-7 text-muted"><strong className="text-ink">Source note.</strong> Project scope and the Business Profile screenshots were supplied by Shobon Mahmud. Service and location details come from the search listing for <a href="https://elitesepticservice.net/" className="text-link underline" target="_blank" rel="noopener noreferrer">elitesepticservice.net</a> and the public Business Profile. Monthly values are estimated from the report charts. Reviews belong to Elite Septic Service’s customers. Screenshot values have not been independently audited, and no job, sales or revenue results are claimed.</p>
          <div className="mt-8 flex flex-wrap gap-5"><Link href="/services/seo-for-home-service-providers" className="text-link underline">Explore SEO for home service providers ↗</Link><Link href="/case-studies/americas-medicare-associates-seo-growth" className="text-link underline">Read the AMA local SEO case study ↗</Link></div>
        </article>
      </div>
    </Container>
    <CaseGrowthNote slug={slug} />
    <FinalCta title="Want your phone ringing with local jobs?" body="Send me your website, your service area and the jobs you want more of. I’ll look at your site and Business Profile and tell you where I would start." />
  </>;
}
