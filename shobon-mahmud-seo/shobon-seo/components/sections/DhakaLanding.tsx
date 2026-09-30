import { MapPin, Search, Megaphone, Globe, MessageCircle, BarChart3, ArrowUpRight, Check, Stethoscope, Store, CalendarDays } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/content/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQ } from "@/components/content/FAQ";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site";

const services = [
  { icon: Search, title: "SEO services in Dhaka", body: "Technical checks, keyword research, on-page SEO and useful service content. We focus on searches that match your business and connect visitors with an enquiry or booking.", href: "/services/on-page-seo" },
  { icon: MapPin, title: "Local SEO & Google Business Profile", body: "Improve accurate business information, service categories, opening hours and website links for eligible businesses. Build useful local pages around your actual service areas.", href: "/services/local-seo" },
  { icon: Megaphone, title: "Facebook & Instagram marketing", body: "Content planning, campaign creative and Ads Manager setup for messages, leads or website enquiries. Audience, offer and follow-up are planned together.", href: "#facebook-marketing" },
  { icon: ArrowUpRight, title: "Google Ads & paid marketing", body: "Reach people searching for your services through focused search campaigns and relevant landing pages. Advertising spend and management fees are agreed separately.", href: "/contact" },
  { icon: Globe, title: "Business website design in Dhaka", body: "A mobile-friendly starter website for BDT 15,000, with a clear service overview, contact links, enquiry form and basic on-page SEO within the agreed scope.", href: "#website-offer" },
  { icon: BarChart3, title: "Organic content & performance tracking", body: "Plan helpful content and track search visibility, enquiries and campaign costs. Use lead quality and your team's booking feedback to decide what to improve next.", href: "/services/content-seo" },
];

const businesses = [
  { title: "Dental clinics & dentists", body: "Explain treatments, introduce clinicians and make appointment requests simple. Local SEO connects your actual clinic location with relevant patient searches." },
  { title: "Clinics & diagnostic centres", body: "Organise departments, doctor schedules, test information and contact details so people can understand the service and ask about availability." },
  { title: "Restaurants & cafés", body: "Make menus, opening hours, directions and reservation or order enquiries easy to find across your website and business profiles." },
  { title: "Retail & online businesses", body: "Connect product content, offers and delivery information with social campaigns and an organised customer message flow." },
  { title: "Interior & home services", body: "Show real projects, explain service coverage and guide customers towards a quotation request with the right project details." },
  { title: "Education & professional services", body: "Present courses, expertise and consultation options clearly, with useful landing pages and an enquiry process suited to your business." },
];

const faqs = [
  { q: "How much do digital marketing services in Dhaka cost?", a: "Pricing depends on the channels, competition, content requirements and campaign scope. SEO, Facebook marketing and paid campaign management are quoted separately. Advertising spend is separate from service fees. The starter business website offer is BDT 15,000 for the agreed scope." },
  { q: "What is included in your SEO services for Dhaka businesses?", a: "Depending on the agreed scope, work includes keyword research, technical checks, on-page optimisation, service content, internal links and local search improvements. We set a baseline and review relevant search visibility and enquiries rather than judging success by rankings alone." },
  { q: "Do you offer dental clinic SEO and marketing in Dhaka?", a: "Yes. We plan local SEO, treatment and clinician pages, clinic information and appointment enquiry journeys. Clinical information is reviewed by your clinicians. Facebook content and paid campaigns can support discovery and enquiries alongside your website and Google Business Profile." },
  { q: "Can you run Facebook marketing for clinics and diagnostic centres?", a: "Yes. Campaigns can explain available services, share approved clinic information and invite appointment enquiries. The goal, creative, budget and follow-up process are agreed before launch. Medical claims and patient content must be accurate, approved and appropriate for the platform." },
  { q: "What is the difference between boosting a post and Facebook Ads Manager?", a: "Boosting is a simple way to promote an existing post. Ads Manager offers more detailed control over objectives, audiences, placements, creative and measurement. The right approach depends on whether you want awareness, messages, leads or website enquiries." },
  { q: "What does the BDT 15,000 website package include?", a: "The proposed starter scope includes up to five essential pages, mobile-friendly design, business and service information, phone and message links, a basic enquiry form and basic on-page SEO. Page count, content and delivery schedule are agreed in writing. Domain, hosting, paid tools and ongoing maintenance cost extra. Custom booking systems, payments and e-commerce need a separate quote." },
  { q: "How can my business improve visibility on Google Maps in Dhaka?", a: "For eligible businesses, start with an accurate Google Business Profile, appropriate categories, real address or service coverage, opening hours and consistent contact information. Genuine reviews and useful local website content help customers understand the business. Results also depend on relevance, distance and prominence, so no specific Maps position is guaranteed." },
  { q: "Should I choose SEO, Facebook Ads or Google Ads?", a: "SEO develops organic search visibility over time. Google Ads can reach people actively searching for a service, while Facebook and Instagram campaigns can introduce your offer and generate messages or leads. We choose channels around customer intent, your budget and your ability to follow up." },
  { q: "How long does SEO take, and can you guarantee a number-one ranking?", a: "There is no fixed timeline or guaranteed number-one position. The starting condition of your website, competition and implementation affect progress. SEO usually needs sustained work over months. We agree clear priorities and reporting checkpoints, then use real search and enquiry data to evaluate improvement." },
  { q: "Do you work with Dhaka businesses remotely and create Bangla content?", a: "Yes. I am based in Dubai and work remotely with Dhaka businesses. Campaign and customer-facing content can be in English, Bangla or both, depending on the audience. Share your website or Facebook Page, business type, service area and budget through the contact page to start." },
];

const areas = ["Dhanmondi", "Mirpur", "Uttara", "Gulshan", "Banani", "Bashundhara", "Mohammadpur", "Badda", "Rampura", "Motijheel", "Old Dhaka"];
const included = ["Up to five essential pages", "Mobile-friendly design", "Business and service information", "Phone and message links", "Basic enquiry form", "Basic on-page SEO setup"];
const steps = [
  { title: "Understand your business", body: "Review your services, Dhaka service area, audience, existing website or Facebook Page and available budget." },
  { title: "Choose the priorities", body: "Identify the biggest gaps and agree a written scope: website foundations, organic visibility or paid campaigns." },
  { title: "Build and launch", body: "Prepare content, pages, campaign assets and agreed tracking. Review the work with you before launch." },
  { title: "Review and improve", body: "Use relevant enquiries, campaign costs and booking feedback to improve the message, targeting and customer journey." },
];

export function DhakaLanding() {
  const url = new URL("/locations/dhaka", siteConfig.url).toString();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": url + "#service",
    name: "SEO and Digital Marketing Services for Dhaka Businesses",
    serviceType: ["SEO", "Local SEO", "Digital marketing", "Facebook marketing", "Website design"],
    url,
    description: "Remote SEO, paid and organic marketing for Dhaka businesses, with a starter business website offer of BDT 15,000.",
    areaServed: { "@type": "City", name: "Dhaka", containedInPlace: { "@type": "Country", name: "Bangladesh" } },
    provider: { "@type": "Person", name: siteConfig.name, url: new URL("/about", siteConfig.url).toString() },
    hasOfferCatalog: { "@type": "OfferCatalog", name: "Dhaka business services", itemListElement: [{ "@type": "Offer", price: "15000", priceCurrency: "BDT", url: url + "#website-offer", itemOffered: { "@type": "Service", name: "Starter business website", description: "Up to five essential pages within the agreed starter scope. Domain, hosting, paid tools and maintenance are extra." } }] },
  };
  return (
    <div lang="en">
      <section className="relative overflow-hidden bg-[#eef5f1]">
        <Container className="relative pt-10 pb-16 sm:pt-14 lg:pb-24">
          <Breadcrumbs items={[{ name: "Locations", href: "/locations" }, { name: "Dhaka", href: "/locations/dhaka" }]} />
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#14604b]"><MapPin className="size-4" aria-hidden /> Dhaka, Bangladesh · Remote services</p>
              <h1 className="t-h1 text-ink">SEO & digital marketing services for Dhaka businesses.</h1>
              <p className="t-lead mt-6 text-ink-2">Turn discovery into enquiries with local SEO, Facebook marketing and paid or organic campaigns. For dental clinics, diagnostic centres, shops and service businesses across Dhaka.</p>
              <p className="mt-4 leading-relaxed text-muted">Need a website first? Start with a mobile-friendly business website for <strong className="text-ink">BDT 15,000</strong>, within an agreed starter scope.</p>
              <div className="mt-8 flex flex-wrap gap-3"><ButtonLink href="/contact">Discuss My Business</ButtonLink><ButtonLink href="#website-offer" variant="secondary">Explore the BDT 15,000 Website</ButtonLink></div>
              <p className="mt-4 text-sm text-muted">English & Bangla campaigns · Clear deliverables · Separate ad budget</p>
            </div>
            <div className="rounded-[28px] border border-[#cbded4] bg-white p-6 shadow-[0_24px_70px_-35px_rgba(20,96,75,.3)] sm:p-8">
              <div className="flex items-center justify-between border-b border-line pb-5"><span className="text-sm font-semibold text-[#14604b]">Your local growth plan</span><Store className="size-5 text-[#14604b]" aria-hidden /></div>
              <p className="mt-6 text-2xl font-semibold text-ink">Get found. Build trust. Make contact easy.</p>
              <ol className="mt-7 space-y-4">{[{ icon: Search, title: "Found through local search", text: "Relevant services and real locations" }, { icon: Megaphone, title: "Discovered on Facebook", text: "Useful content and focused campaigns" }, { icon: CalendarDays, title: "Ready for an enquiry", text: "Calls, messages and appointment requests" }].map(({ icon: Icon, title, text }, i) => <li key={title} className="flex items-center gap-4 rounded-2xl bg-[#f3f7f5] p-4"><span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#14604b]"><Icon className="size-5" aria-hidden /></span><div><span className="text-xs text-muted">0{i + 1}</span><h2 className="text-base font-semibold text-ink">{title}</h2><p className="mt-1 text-sm text-muted">{text}</p></div></li>)}</ol>
              <a href="#website-offer" className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#153d32] px-5 py-4 text-white"><span className="text-sm">Start with a business website</span><span className="text-xl font-semibold">BDT 15,000 ↗</span></a>
            </div>
          </div>
          <nav aria-label="Dhaka page sections" className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#cbded4] pt-6 text-sm font-medium text-[#14604b]">
            <a href="#services">Marketing services</a><a href="#dental-clinic-marketing">Dental & clinic marketing</a><a href="#facebook-marketing">Facebook marketing</a><a href="#website-offer">Website pricing</a><a href="#dhaka-faq">FAQs</a>
          </nav>
        </Container>
      </section>

      <Section labelledBy="dhaka-context">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20"><div><p className="mb-4 text-sm font-medium text-[#14604b]">A plan built around your customers</p><h2 id="dhaka-context" className="t-h2 text-ink">Connect local searches, social discovery and real enquiries.</h2></div><div className="t-lead space-y-5 text-muted"><p>A customer looking for a nearby clinic needs different information from someone comparing interior services or checking a restaurant menu. We map those questions to the right page, profile or campaign.</p><p>For your Dhaka business, that means accurate service information, clear directions, suitable language and an easy next step. Your website, Google profile and Facebook Page should give customers consistent contact details and a useful reason to get in touch.</p></div></div>
      </Section>

      <Section tone="muted" labelledBy="dhaka-problems">
        <h2 id="dhaka-problems" className="t-h2 max-w-3xl text-ink">Where is your marketing losing potential customers?</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{[{ title: "Reach without enquiries", body: "Promoted posts get attention, but the offer and contact step do not explain what to do next." }, { title: "Weak local visibility", body: "Incomplete profiles, unclear service pages or inconsistent details make discovery harder." }, { title: "A Page without a website", body: "Essential information is spread across posts, with no central place to compare services." }, { title: "Leads without follow-up", body: "Slow replies and unclear booking steps lose interested customers after the first message." }].map(p => <div key={p.title} className="rounded-2xl border border-line bg-white p-6"><h3 className="t-h3 text-ink">{p.title}</h3><p className="mt-3 leading-relaxed text-muted">{p.body}</p></div>)}</div>
      </Section>

      <Section id="services" labelledBy="dhaka-services">
        <p className="mb-4 text-sm font-medium text-[#14604b]">SEO, paid advertising & organic marketing</p><h2 id="dhaka-services" className="t-h2 max-w-3xl text-ink">Digital marketing services shaped around your Dhaka business.</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{services.map(({ icon: Icon, title, body, href }) => <article key={title} className="flex flex-col rounded-2xl border border-line bg-white p-7"><Icon className="mb-6 size-6 text-[#14604b]" strokeWidth={1.75} aria-hidden /><h3 className="t-h3 text-ink">{title}</h3><p className="mt-3 leading-relaxed text-muted">{body}</p><a href={href} className="mt-auto pt-6 text-sm font-semibold text-link">Explore this service ↗</a></article>)}</div>
      </Section>

      <Section id="dental-clinic-marketing" tone="dark" labelledBy="dhaka-clinics">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20"><div><Stethoscope className="mb-5 size-8 text-[#bbdfce]" aria-hidden /><p className="mb-4 text-sm text-[#bbdfce]">Dental & healthcare businesses</p><h2 id="dhaka-clinics" className="t-h2 text-on-night">Dental clinic SEO & digital marketing in Dhaka.</h2><p className="t-lead mt-6 text-on-night-muted">Help patients understand your services, location and appointment process. We connect local search content, clinic information and relevant campaigns with a straightforward enquiry journey.</p><div className="mt-8"><ButtonLink href="/contact" variant="light">Discuss My Clinic</ButtonLink></div></div><ol className="space-y-5">{[{ title: "Treatment and clinician information", body: "Clearly organised service pages, doctor profiles, chamber hours and appointment requests. Your clinicians review medical information before publication." }, { title: "Searches around your real location", body: "Research queries such as dental clinic in Dhanmondi or dentist in Mirpur, then plan relevant content around your actual treatments and service coverage." }, { title: "Clinic content and campaigns", body: "Use approved service explainers, doctor schedules and enquiry campaigns. Patient images and testimonials are published only with appropriate permission." }, { title: "A clear appointment enquiry flow", body: "Keep phone, directions and message links easy to find. Initial forms collect contact details rather than sensitive medical information." }].map((p, i) => <li key={p.title} className="border-t border-night-line pt-5"><span className="text-sm text-[#bbdfce]">0{i + 1}</span><h3 className="t-h3 mt-2 text-on-night">{p.title}</h3><p className="mt-2 leading-relaxed text-on-night-muted">{p.body}</p></li>)}</ol></div>
      </Section>

      <Section id="facebook-marketing" labelledBy="dhaka-facebook">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20"><div><MessageCircle className="mb-5 size-7 text-[#14604b]" aria-hidden /><h2 id="dhaka-facebook" className="t-h2 text-ink">Facebook marketing in Dhaka, from content to customer conversations.</h2><p className="t-lead mt-6 text-muted">Choose the message, offer and campaign objective before spending on promotion. Organic posts explain your business; paid campaigns bring that message to a relevant audience.</p></div><div className="space-y-6">{[{ title: "Content customers can use", body: "Service introductions, business updates, frequently asked questions and useful offer details in English, Bangla or both." }, { title: "Campaigns with a clear next step", body: "Plan suitable message, lead or website campaigns, including creative, audience, landing page and reply process." }, { title: "Review lead quality, not just likes", body: "Compare campaign spend with relevant enquiries and your team's follow-up feedback. Improve weak messages and contact steps before scaling." }].map(p => <article key={p.title} className="border-t border-line pt-5"><h3 className="t-h3 text-ink">{p.title}</h3><p className="mt-3 leading-relaxed text-muted">{p.body}</p></article>)}</div></div>
      </Section>

      <Section tone="muted" labelledBy="dhaka-businesses"><h2 id="dhaka-businesses" className="t-h2 text-ink">Marketing for clinics, shops and local service businesses.</h2><p className="t-lead mt-5 max-w-3xl text-muted">Different businesses need different customer journeys. We adapt the plan to your offer, local competition, budget and capacity to handle enquiries.</p><div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">{businesses.map(p => <article key={p.title} className="border-t border-line pt-5"><h3 className="t-h3 text-ink">{p.title}</h3><p className="mt-3 leading-relaxed text-muted">{p.body}</p></article>)}</div></Section>

      <Section id="website-offer" labelledBy="dhaka-website">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16"><div><p className="mb-4 text-sm font-semibold text-[#14604b]">Affordable business website design</p><h2 id="dhaka-website" className="t-h2 text-ink">A business website for BDT 15,000.</h2><p className="t-lead mt-6 text-muted">Give your business a clear home beyond a Facebook Page. A starter website helps customers find your services, understand your business and contact you from their phone.</p><p className="mt-5 leading-relaxed text-muted">Suitable for dental clinics, shops, restaurants and service businesses that need a focused brochure website. We build around your business details, logo, images and approved service information.</p><p className="mt-5 leading-relaxed text-sm text-muted">The starter scope is listed here. We confirm the pages, supplied content, delivery schedule and deliverables in writing before work starts.</p></div><div className="rounded-[28px] border border-[#cbded4] bg-[#f3f7f5] p-7 sm:p-9"><p className="text-sm font-medium text-muted">Starter Business Website</p><p className="mt-3 text-5xl font-semibold tracking-tight text-ink">BDT 15,000</p><p className="mt-2 text-sm text-muted">One-time website build fee</p><ul className="my-7 space-y-4">{included.map(text => <li key={text} className="flex gap-3 text-ink-2"><Check className="mt-1 size-4 shrink-0 text-[#14604b]" aria-hidden />{text}</li>)}</ul><ButtonLink href="/contact" className="w-full">Discuss the Website Offer</ButtonLink><p className="mt-5 leading-relaxed text-sm text-muted">Domain, hosting, paid tools and ongoing maintenance are extra. Custom appointment systems, payments and e-commerce require a separate quote.</p></div></div>
      </Section>

      <Section tone="muted" labelledBy="dhaka-channel-plan"><h2 id="dhaka-channel-plan" className="t-h2 text-ink">SEO or paid ads? Start with the right foundation.</h2><div className="mt-10 grid gap-5 md:grid-cols-3">{[{ title: "Build your online foundation", body: "Missing a website or essential business information? Start with clear service pages, a mobile-friendly experience and easy contact steps.", tag: "Website + basic setup" }, { title: "Improve local discovery", body: "Have a website but few search enquiries? Review technical SEO, your eligible business profile and service content relevant to your location.", tag: "SEO + Google profile" }, { title: "Test a focused campaign", body: "Have a clear offer and a reply process? Test paid campaigns, measure relevant enquiries and support them with useful organic content.", tag: "Facebook / Google Ads" }].map(p => <div key={p.title} className="rounded-2xl border border-line bg-white p-7"><p className="text-xs font-semibold uppercase tracking-wider text-[#14604b]">{p.tag}</p><h3 className="t-h3 mt-4 text-ink">{p.title}</h3><p className="mt-3 leading-relaxed text-muted">{p.body}</p></div>)}</div><p className="mt-6 text-sm text-muted">Marketing service fees and ad spend are separate from the website offer. We agree a channel plan within your available budget.</p></Section>

      <Section labelledBy="dhaka-process"><h2 id="dhaka-process" className="t-h2 text-ink">Four steps from your first enquiry to a working plan.</h2><ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{steps.map((p, i) => <li key={p.title} className="border-t border-line-strong pt-5"><span className="text-sm font-semibold text-[#14604b]">0{i + 1}</span><h3 className="t-h3 mt-4 text-ink">{p.title}</h3><p className="mt-3 leading-relaxed text-muted">{p.body}</p></li>)}</ol></Section>

      <Section tone="muted" labelledBy="dhaka-areas"><div className="grid gap-10 lg:grid-cols-2 lg:gap-20"><div><h2 id="dhaka-areas" className="t-h2 text-ink">A local strategy for the Dhaka areas you serve.</h2><p className="mt-5 leading-relaxed text-muted">A clinic in Uttara and a home service business covering several neighbourhoods have different needs. Your actual location, service radius and customer questions guide the targeting and page content.</p><p className="mt-4 leading-relaxed text-muted">I am Shobon Mahmud, based in Dubai and working remotely with Dhaka businesses. Learn more about <a className="link" href="/about">my approach</a> or explore <a className="link" href="/services/local-seo">local SEO services</a>.</p></div><div><ul className="flex flex-wrap gap-3">{areas.map(area => <li key={area} className="rounded-full border border-line bg-white px-5 py-2.5 text-sm text-ink">{area}</li>)}</ul><p className="mt-5 leading-relaxed text-sm text-muted">Planning can cover these areas where your business genuinely operates. This is remote service coverage, not a list of physical offices.</p></div></div></Section>

      <Section labelledBy="dhaka-reporting"><div className="grid gap-10 lg:grid-cols-2 lg:gap-20"><div><h2 id="dhaka-reporting" className="t-h2 text-ink">Measure what helps your business make decisions.</h2><p className="mt-5 leading-relaxed text-muted">Agree a baseline, reporting scope and review schedule. Tracking depends on the tools available and the booking feedback your team can provide.</p></div><ul className="space-y-4">{["Relevant Google searches and website visits", "Calls, messages, forms and appointment enquiries", "Advertising spend and cost per relevant enquiry", "Lead quality and confirmed booking feedback"].map(text => <li key={text} className="flex gap-3 rounded-xl border border-line bg-[#f3f7f5] p-4"><BarChart3 className="mt-1 size-5 shrink-0 text-[#14604b]" aria-hidden />{text}</li>)}</ul></div></Section>

      <Section id="dhaka-faq" tone="muted"><FAQ faqs={faqs} title="Dhaka SEO, digital marketing & website FAQs" /></Section>

      <Section tone="dark" labelledBy="dhaka-contact"><div className="max-w-3xl"><p className="mb-4 text-sm text-[#bbdfce]">Your next step</p><h2 id="dhaka-contact" className="t-h2 text-on-night">Tell me about your Dhaka business.</h2><p className="t-lead mt-6 text-on-night-muted">Share your business type, service area, website or Facebook Page and budget. We will work out whether SEO, paid campaigns or the BDT 15,000 website is the most useful place to start.</p><div className="mt-8 flex flex-wrap gap-3"><ButtonLink href="/contact" variant="light">Discuss My Marketing Plan</ButtonLink>{siteConfig.email && <ButtonLink href={"mailto:" + siteConfig.email} variant="outline-light">Email Shobon</ButtonLink>}</div></div></Section>
      <JsonLd data={schema} />
    </div>
  );
}
