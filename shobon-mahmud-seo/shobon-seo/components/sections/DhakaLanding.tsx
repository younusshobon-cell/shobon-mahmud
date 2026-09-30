import { MapPin, Search, Megaphone, Globe, MessageCircle, BarChart3, ArrowUpRight, Check, Stethoscope, Store, CalendarDays } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/content/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQ } from "@/components/content/FAQ";

const services = [
  { icon: Search, title: "SEO ও Google Maps", body: "আপনার সেবা ও এলাকার keyword research, website SEO এবং যোগ্য ব্যবসার Google Business Profile ঠিক করা। লক্ষ্য—প্রাসঙ্গিক search থেকে কল, enquiry ও appointment।", href: "/services/local-seo" },
  { icon: Megaphone, title: "Facebook ও Instagram Ads", body: "শুধু পোস্ট boost নয়। সঠিক offer, creative ও audience দিয়ে message, lead বা website enquiry campaign; ফল অনুযায়ী পরবর্তী পরিবর্তন।", href: "/contact" },
  { icon: MessageCircle, title: "Organic Social Marketing", body: "বাংলা ও English content plan, service explainer, business update এবং নিয়মিত পোস্ট। আপনার brand সম্পর্কে জানার পর যোগাযোগ করার পথ সহজ করা।", href: "/contact" },
  { icon: ArrowUpRight, title: "Google Ads ও Paid Marketing", body: "সেবা খুঁজছেন এমন মানুষের জন্য search campaign, আলাদা landing page এবং enquiry tracking। বিজ্ঞাপনের budget ও management fee আলাদাভাবে ঠিক করা হবে।", href: "/contact" },
  { icon: Globe, title: "Business Website", body: "মাত্র ৳১৫,০০০-এ নির্ধারিত scope-এর business website। মোবাইলে সহজে সেবা দেখা, ফোন করা, message পাঠানো এবং enquiry দেওয়ার ব্যবস্থা।", href: "#website-offer" },
  { icon: BarChart3, title: "Tracking ও Growth Review", body: "শুধু reach বা like নয়—কোন channel থেকে enquiry এসেছে, কতটি relevant এবং follow-up-এর পর কী হয়েছে, সেই তথ্য দিয়ে পরের কাজ বাছাই।", href: "/contact" },
];

const businesses = [
  { title: "Dental clinic ও dentist", body: "চিকিৎসকের পরিচয়, সেবার তথ্য, chamber hours ও appointment request—রোগীর সিদ্ধান্ত নেওয়ার প্রয়োজনীয় তথ্য এক জায়গায়।" },
  { title: "Clinic ও diagnostic centre", body: "বিভাগ, চিকিৎসক, test information, ঠিকানা ও যোগাযোগ পরিষ্কার করে enquiry থেকে booking-এর পথ সহজ করা।" },
  { title: "Restaurant ও café", body: "Menu, location, opening hours ও reservation বা order enquiry—এলাকার মানুষের জন্য দ্রুত খুঁজে পাওয়ার মতো করে সাজানো।" },
  { title: "Shop ও online business", body: "Product category, offer, delivery information ও customer message flow—organic content এবং paid campaign একসঙ্গে পরিকল্পনা।" },
  { title: "Interior ও home services", body: "বাস্তব কাজের portfolio, service area ও quotation request—কোন কাজ করেন এবং কীভাবে শুরু করা যায় তা স্পষ্ট করা।" },
  { title: "Education ও professional services", body: "Course, consultation বা service-এর বিস্তারিত, প্রাসঙ্গিক অভিজ্ঞতা এবং enquiry form দিয়ে interested মানুষকে পরের ধাপে আনা।" },
];

const faqs = [
  { q: "ঢাকায় digital marketing service-এর খরচ কত?", a: "খরচ আপনার service, competition, কাজের scope এবং campaign-এর ওপর নির্ভর করে। SEO, social content ও paid campaign-এর fee আলোচনা করে ঠিক করা হবে। বিজ্ঞাপনের budget service fee থেকে আলাদা; নির্ধারিত scope-এর business website-এর মূল্য ৳১৫,০০০।" },
  { q: "ঢাকার dental clinic-এর জন্য SEO কীভাবে কাজ করে?", a: "Dental service ও এলাকার keyword research, সঠিক doctor ও chamber information, service pages এবং eligible Google Business Profile দিয়ে শুরু করি। চিকিৎসাবিষয়ক তথ্য clinic-এর চিকিৎসক যাচাই করবেন। এরপর প্রাসঙ্গিক search, কল ও appointment enquiry পর্যবেক্ষণ করি।" },
  { q: "Clinic বা diagnostic centre-এর জন্য Facebook marketing করা যাবে?", a: "হ্যাঁ। Service information, doctor schedule ও appointment enquiry নিয়ে content এবং প্রয়োজন অনুযায়ী lead বা message campaign করা যায়। চিকিৎসার ফল নিয়ে অতিরঞ্জিত দাবি ছাড়া, clinic অনুমোদিত তথ্য ও platform-এর নিয়ম অনুযায়ী campaign সাজানো হবে।" },
  { q: "Facebook boost আর Ads Manager campaign-এর পার্থক্য কী?", a: "Boost হলো একটি পোস্টের paid reach বাড়ানোর সহজ উপায়। Ads Manager-এ objective, audience, placement, creative ও reporting বেশি বিস্তারিতভাবে পরিচালনা করা যায়। আপনার লক্ষ্য message, enquiry নাকি booking—সেটি দেখে উপযুক্ত পদ্ধতি ঠিক করব।" },
  { q: "৳১৫,০০০ টাকায় business website-এ কী কী থাকবে?", a: "প্রস্তাবিত starter scope-এ সর্বোচ্চ ৫টি প্রয়োজনীয় page, mobile-friendly layout, service ও business information, phone/message links, সাধারণ enquiry form এবং basic on-page SEO setup থাকবে। কাজ শুরুর আগে page list ও deliverables লিখিতভাবে ঠিক হবে। Domain, hosting ও paid tools আলাদা; custom booking, payment বা e-commerce-এর জন্য আলাদা quotation লাগবে।" },
  { q: "Google Maps-এ আমার ঢাকার ব্যবসা কীভাবে দেখাবেন?", a: "যোগ্য ব্যবসার নিজের প্রকৃত location ও service information দিয়ে Business Profile setup বা optimisation করব। Category, hours, contact details, website link ও genuine reviews গুরুত্বপূর্ণ। ফল relevance, distance এবং prominence-এর ওপরও নির্ভর করে; নির্দিষ্ট position নিশ্চিত করা যায় না।" },
  { q: "SEO ভালো, নাকি Facebook Ads বা Google Ads ভালো?", a: "SEO organic search visibility তৈরির কাজ, আর paid ads budget দিয়ে নির্দিষ্ট campaign চালাতে সাহায্য করে। স্থানীয় সেবা খোঁজার ক্ষেত্রে search useful হতে পারে; পরিচিতি ও message enquiry-এর জন্য social campaign কাজে লাগতে পারে। Business goal ও budget দেখে একসঙ্গে বা ধাপে ধাপে শুরু করব।" },
  { q: "SEO থেকে enquiry পেতে কত সময় লাগে?", a: "একটি নির্দিষ্ট সময় সবার জন্য বলা যায় না। Website-এর বর্তমান অবস্থা, competition ও content অনুযায়ী SEO-তে কয়েক মাসের ধারাবাহিক কাজ লাগতে পারে। Paid campaign আগে data দিতে পারে, তবে enquiry বা sales-এর নিশ্চয়তা নয়। শুরুতেই baseline ও review schedule ঠিক করব।" },
  { q: "বাংলা ও English দুই ভাষায় content করবেন?", a: "হ্যাঁ, আপনার customer ও service অনুযায়ী বাংলা, English বা দুটো ভাষাতেই content পরিকল্পনা করা যায়। একই কথা শুধু অনুবাদ না করে মানুষ কীভাবে service খোঁজে, কী জানতে চায় এবং কোন এলাকায় সেবা নেয়—সেটি অনুযায়ী copy লেখা হবে।" },
  { q: "Dhaka SEO ও marketing service নিতে কীভাবে শুরু করব?", a: "আপনার business type, এলাকার নাম, website বা Facebook Page link, বর্তমান সমস্যা এবং budget পাঠান। এরপর priority ও scope সাজিয়ে quotation দেব। আমি Dubai থেকে remotely কাজ করি; ঢাকায় কোনো physical office-এর দাবি করছি না।" },
];

const areas = ["ধানমন্ডি", "মিরপুর", "উত্তরা", "গুলশান", "বনানী", "বসুন্ধরা", "মোহাম্মদপুর", "বাড্ডা", "রামপুরা", "মতিঝিল", "পুরান ঢাকা"];
const included = ["সর্বোচ্চ ৫টি প্রয়োজনীয় page", "Mobile-friendly design", "Service ও business information", "Phone ও message links", "সাধারণ enquiry form", "Basic on-page SEO setup"];
const steps = [
  { title: "Business বুঝি", body: "আপনার সেবা, এলাকা, customer, চলমান marketing ও budget নিয়ে আলোচনা।" },
  { title: "Priority ঠিক করি", body: "Website, Google visibility নাকি ads—আগে কোনটি প্রয়োজন, সেই roadmap ও scope দিই।" },
  { title: "Setup ও launch", body: "Content, page, tracking ও campaign তৈরি করে আপনার অনুমোদনে launch করি।" },
  { title: "Review ও improve", body: "Enquiry quality ও follow-up data দেখে budget, message ও page উন্নত করি।" },
];

export function DhakaLanding() {
  return (
    <div lang="bn" className="[&_p]:leading-[1.85] [&_h1]:leading-[1.35] [&_h2]:leading-[1.45] [&_h3]:leading-[1.5]">
      <section className="relative overflow-hidden bg-[#eef5f1]">
        <Container className="relative pt-10 pb-16 sm:pt-14 lg:pb-24">
          <Breadcrumbs items={[{ name: "Locations", href: "/locations" }, { name: "Dhaka", href: "/locations/dhaka" }]} />
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#14604b]"><MapPin className="size-4" aria-hidden /> ঢাকা, বাংলাদেশ · Remote service</p>
              <h1 className="t-h1 text-ink">ঢাকার ব্যবসার জন্য marketing, যা enquiry থেকে শুরু করে।</h1>
              <p className="t-lead mt-6 text-ink-2">Dental clinic, diagnostic centre, দোকান বা service business—SEO, Facebook marketing এবং paid ও organic campaign সাজাই আপনার এলাকার customer-এর জন্য।</p>
              <p className="mt-4 text-muted">Business website নেই? মাত্র <strong className="text-ink">৳১৫,০০০-এ</strong> নির্ধারিত scope-এর website তৈরি করে শুরু করুন।</p>
              <div className="mt-8 flex flex-wrap gap-3"><ButtonLink href="/contact">আমার ব্যবসা নিয়ে কথা বলি</ButtonLink><ButtonLink href="#website-offer" variant="secondary">৳১৫,০০০ website offer</ButtonLink></div>
              <p className="mt-4 text-sm text-muted">বাংলা ও English content · পরিষ্কার scope · আলাদা ad budget</p>
            </div>
            <div className="rounded-[28px] border border-[#cbded4] bg-white p-6 shadow-[0_24px_70px_-35px_rgba(20,96,75,.3)] sm:p-8">
              <div className="flex items-center justify-between border-b border-line pb-5"><span className="text-sm font-semibold text-[#14604b]">আপনার business growth plan</span><Store className="size-5 text-[#14604b]" aria-hidden /></div>
              <p className="mt-6 text-2xl font-semibold text-ink">খুঁজে পাওয়া। বিশ্বাস তৈরি। যোগাযোগ।</p>
              <ol className="mt-7 space-y-4">
                {[{ icon: Search, title: "Google-এ service খোঁজা", text: "এলাকা + সেবা অনুযায়ী visibility" }, { icon: Megaphone, title: "Facebook-এ পরিচিত হওয়া", text: "প্রাসঙ্গিক content ও paid campaign" }, { icon: CalendarDays, title: "কল, message বা appointment", text: "সহজ next step ও follow-up" }].map(({ icon: Icon, title, text }, i) => <li key={title} className="flex items-center gap-4 rounded-2xl bg-[#f3f7f5] p-4"><span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#14604b]"><Icon className="size-5" aria-hidden /></span><div><span className="text-xs text-muted">0{i + 1}</span><h2 className="text-base font-semibold text-ink">{title}</h2><p className="text-sm text-muted">{text}</p></div></li>)}
              </ol>
              <a href="#website-offer" className="mt-6 flex items-center justify-between rounded-2xl bg-[#153d32] px-5 py-4 text-white"><span className="text-sm">Website দিয়ে শুরু করুন</span><span className="text-xl font-semibold">৳১৫,০০০ ↗</span></a>
            </div>
          </div>
        </Container>
      </section>

      <Section labelledBy="dhaka-context">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20"><div><p className="mb-4 text-sm font-medium text-[#14604b]">ঢাকার customer journey</p><h2 id="dhaka-context" className="t-h2 text-ink">আপনার customer কোথায় আছেন, সেখান থেকেই শুরু।</h2></div><div className="t-lead space-y-5 text-muted"><p>কেউ Google-এ এলাকার নাম দিয়ে service খোঁজেন, কেউ Facebook Page দেখে message করেন, আবার কেউ website-এ doctor, menu বা portfolio দেখে ফোন করেন। আপনার business-এর জন্য কোন পথটি কাজ করছে, আগে সেটি বুঝি।</p><p>বাংলা ও English দুই ধরনের search, service area, যোগাযোগের সময় এবং customer-এর সাধারণ প্রশ্ন অনুযায়ী content সাজাই। Website, Google profile ও Facebook Page-এ একই ঠিকানা, নম্বর এবং service information রাখা হয়।</p></div></div>
      </Section>

      <Section tone="muted" labelledBy="dhaka-problems">
        <h2 id="dhaka-problems" className="t-h2 max-w-3xl text-ink">Marketing করছেন, কিন্তু enquiry কোথায় আটকে যাচ্ছে?</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{[{ title: "Boost আছে, enquiry কম", body: "Reach বাড়ছে, কিন্তু offer ও যোগাযোগের next step পরিষ্কার নয়।" }, { title: "Maps-এ খুঁজে পাওয়া কঠিন", body: "সেবা, category, business details বা এলাকার তথ্য অসম্পূর্ণ।" }, { title: "Page আছে, website নেই", body: "Service, দাম নিয়ে ধারণা ও বিশ্বাসযোগ্য তথ্য ছড়িয়ে রয়েছে।" }, { title: "Lead আসে, follow-up হয় না", body: "Reply, appointment confirmation ও enquiry tracking-এর মধ্যে ফাঁক রয়েছে।" }].map(p => <div key={p.title} className="rounded-2xl border border-line bg-white p-6"><h3 className="t-h3 text-ink">{p.title}</h3><p className="mt-3 text-muted">{p.body}</p></div>)}</div>
      </Section>

      <Section id="services" labelledBy="dhaka-services">
        <p className="mb-4 text-sm font-medium text-[#14604b]">SEO + Digital Marketing in Dhaka</p><h2 id="dhaka-services" className="t-h2 max-w-3xl text-ink">একটি business goal। প্রয়োজন অনুযায়ী সঠিক channel।</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{services.map(({ icon: Icon, title, body, href }) => <article key={title} className="flex flex-col rounded-2xl border border-line bg-white p-7"><Icon className="mb-6 size-6 text-[#14604b]" strokeWidth={1.75} aria-hidden /><h3 className="t-h3 text-ink">{title}</h3><p className="mt-3 text-muted">{body}</p><a href={href} className="mt-auto pt-6 text-sm font-semibold text-link">বিস্তারিত জানুন ↗</a></article>)}</div>
      </Section>

      <Section tone="dark" labelledBy="dhaka-clinics">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20"><div><Stethoscope className="mb-5 size-8 text-[#bbdfce]" aria-hidden /><p className="mb-4 text-sm text-[#bbdfce]">Dental & Clinic Marketing</p><h2 id="dhaka-clinics" className="t-h2 text-on-night">সঠিক তথ্য থেকে appointment-এর সহজ পথ।</h2><p className="t-lead mt-6 text-on-night-muted">Dental clinic বা healthcare business-এর marketing-এ মানুষের প্রশ্ন আগে। কোন সেবা পাওয়া যায়, চিকিৎসক কে, কোথায় যাবেন এবং কীভাবে appointment নেবেন—এসব স্পষ্ট করে সাজাই।</p><div className="mt-8"><ButtonLink href="/contact" variant="light">আমার clinic-এর plan চাই</ButtonLink></div></div><ol className="space-y-5">{[{ title: "Service ও doctor pages", body: "Doctor-approved service information, পরিচয়, chamber hours ও appointment request।" }, { title: "এলাকা অনুযায়ী search", body: "যেমন dental clinic in Dhanmondi বা dentist in Mirpur—প্রকৃত সেবা ও location অনুযায়ী page ও profile।" }, { title: "Content ও campaign", body: "প্রশ্নের উত্তর, clinic information ও enquiry campaign। Patient image বা testimonial ব্যবহার হলে অনুমতি নিয়ে প্রকাশ।" }, { title: "Appointment follow-up", body: "Form ও message-এ প্রাথমিক যোগাযোগের তথ্য; diagnosis বা sensitive medical details সংগ্রহের জায়গা নয়।" }].map((p, i) => <li key={p.title} className="border-t border-night-line pt-5"><span className="text-sm text-[#bbdfce]">0{i + 1}</span><h3 className="t-h3 mt-2 text-on-night">{p.title}</h3><p className="mt-2 text-on-night-muted">{p.body}</p></li>)}</ol></div>
      </Section>

      <Section labelledBy="dhaka-businesses"><h2 id="dhaka-businesses" className="t-h2 text-ink">Clinic ছাড়াও, আপনার local business-এর জন্য।</h2><p className="t-lead mt-5 max-w-3xl text-muted">Business আলাদা, customer journey-ও আলাদা। আপনার service, এলাকার competition ও budget অনুযায়ী পরিকল্পনা হবে।</p><div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">{businesses.map(p => <article key={p.title} className="border-t border-line pt-5"><h3 className="t-h3 text-ink">{p.title}</h3><p className="mt-3 text-muted">{p.body}</p></article>)}</div></Section>

      <Section id="website-offer" tone="muted" labelledBy="dhaka-website">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16"><div><p className="mb-4 text-sm font-semibold text-[#14604b]">Business Website Offer</p><h2 id="dhaka-website" className="t-h2 text-ink">মাত্র ৳১৫,০০০-এ আপনার business-এর website।</h2><p className="t-lead mt-6 text-muted">Facebook Page-এর পাশাপাশি একটি পরিষ্কার, mobile-friendly website। মানুষ আপনার সেবা বুঝবেন, প্রয়োজনীয় তথ্য পাবেন এবং সহজে যোগাযোগ করতে পারবেন।</p><p className="mt-5 text-muted">Dental clinic, দোকান, restaurant বা service business-এর starter website-এর জন্য। আপনার business information, logo, ছবি ও service details থেকে page তৈরি হবে।</p><p className="mt-5 text-sm text-muted">প্রস্তাবিত scope নিচে দেওয়া আছে। কাজ শুরুর আগে page list, content, timeline ও deliverables লিখিতভাবে চূড়ান্ত করা হবে।</p></div><div className="rounded-[28px] border border-[#cbded4] bg-white p-7 sm:p-9"><p className="text-sm font-medium text-muted">Starter Business Website</p><p className="mt-3 text-5xl font-semibold tracking-tight text-ink">৳১৫,০০০</p><p className="mt-2 text-sm text-muted">এককালীন website তৈরির fee</p><ul className="my-7 space-y-4">{included.map(text => <li key={text} className="flex gap-3 text-ink-2"><Check className="mt-1 size-4 shrink-0 text-[#14604b]" aria-hidden />{text}</li>)}</ul><ButtonLink href="/contact" className="w-full">Website offer নিয়ে কথা বলি</ButtonLink><p className="mt-5 text-sm text-muted">Domain, hosting, paid tools ও ongoing maintenance আলাদা। Custom appointment system, payment বা e-commerce-এর জন্য আলাদা quotation।</p></div></div>
      </Section>

      <Section labelledBy="dhaka-channel-plan"><h2 id="dhaka-channel-plan" className="t-h2 text-ink">কোথা থেকে শুরু করবেন?</h2><div className="mt-10 grid gap-5 md:grid-cols-3">{[{ title: "Online foundation", body: "Website নেই বা তথ্য অসম্পূর্ণ? আগে service pages, mobile experience ও সহজ contact flow তৈরি করুন।", tag: "Website + basic setup" }, { title: "Local discovery", body: "Website আছে, search থেকে customer কম? Local SEO, profile ও এলাকার relevant content দিয়ে শুরু করুন।", tag: "SEO + Google profile" }, { title: "Campaign-driven enquiry", body: "স্পষ্ট offer ও follow-up ব্যবস্থা আছে? Paid campaign চালিয়ে enquiry quality মাপুন; organic content পাশাপাশি চলুক।", tag: "Facebook / Google Ads" }].map(p => <div key={p.title} className="rounded-2xl border border-line p-7"><p className="text-xs font-semibold uppercase tracking-wider text-[#14604b]">{p.tag}</p><h3 className="t-h3 mt-4 text-ink">{p.title}</h3><p className="mt-3 text-muted">{p.body}</p></div>)}</div><p className="mt-6 text-sm text-muted">Marketing service fee ও ad spend website offer-এর অন্তর্ভুক্ত নয়। Budget বুঝে scope আলাদাভাবে ঠিক করা হবে।</p></Section>

      <Section tone="muted" labelledBy="dhaka-process"><h2 id="dhaka-process" className="t-h2 text-ink">কথা থেকে কাজ—চারটি পরিষ্কার ধাপ।</h2><ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{steps.map((p, i) => <li key={p.title} className="border-t border-line-strong pt-5"><span className="text-sm font-semibold text-[#14604b]">0{i + 1}</span><h3 className="t-h3 mt-4 text-ink">{p.title}</h3><p className="mt-3 text-muted">{p.body}</p></li>)}</ol></Section>

      <Section labelledBy="dhaka-areas"><div className="grid gap-10 lg:grid-cols-2 lg:gap-20"><div><h2 id="dhaka-areas" className="t-h2 text-ink">ঢাকার এলাকা অনুযায়ী marketing plan।</h2><p className="mt-5 text-muted">আপনি কোথায় সেবা দেন, customer কত দূর থেকে আসেন এবং কোন ভাষায় প্রশ্ন করেন—এই তথ্য দিয়ে targeting ও content বাছাই হবে। আমি Dubai থেকে remotely কাজ করি; ঢাকা-কেন্দ্রিক business-এর জন্য এই service।</p></div><div><ul className="flex flex-wrap gap-3">{areas.map(area => <li key={area} className="rounded-full border border-line bg-[#eef5f1] px-5 py-2.5 text-sm text-ink">{area}</li>)}</ul><p className="mt-5 text-sm text-muted">এগুলো সম্ভাব্য service area; প্রতিটি এলাকার content শুধু আপনার প্রকৃত business coverage অনুযায়ী তৈরি হবে।</p></div></div></Section>

      <Section tone="muted" labelledBy="dhaka-reporting"><div className="grid gap-10 lg:grid-cols-2 lg:gap-20"><div><h2 id="dhaka-reporting" className="t-h2 text-ink">Like-এর বাইরে, business-এর প্রয়োজনীয় হিসাব।</h2><p className="mt-5 text-muted">উপলব্ধ tracking ও আপনার team-এর follow-up data অনুযায়ী review করব। Customer কে উত্তর দিচ্ছেন এবং booking confirm করছেন—এই অংশটিও plan-এর সঙ্গে যুক্ত থাকবে।</p></div><ul className="space-y-4">{["Google থেকে relevant search ও website visit", "কল, message, form ও appointment enquiry", "Paid campaign-এর spend ও cost per enquiry", "Enquiry quality ও আপনার team-এর booking feedback"].map(text => <li key={text} className="flex gap-3 rounded-xl border border-line bg-white p-4"><BarChart3 className="mt-1 size-5 shrink-0 text-[#14604b]" aria-hidden />{text}</li>)}</ul></div></Section>

      <Section id="dhaka-faq"><FAQ faqs={faqs} title="Dhaka SEO, marketing ও website নিয়ে প্রশ্ন ও উত্তর" /><div className="mt-10 text-sm text-muted">আরও জানুন: <a className="link" href="https://support.google.com/business/answer/7091" target="_blank" rel="noopener noreferrer">Google local visibility</a> · <a className="link" href="https://www.facebookblueprint.com/student/path/253067-smb-ads-click-whatsapp-course" target="_blank" rel="noopener noreferrer">Meta message campaign</a></div></Section>

      <Section tone="dark" labelledBy="dhaka-contact"><div className="max-w-3xl"><p className="mb-4 text-sm text-[#bbdfce]">আপনার next step</p><h2 id="dhaka-contact" className="t-h2 text-on-night">আপনার business-এর link দিন। কোথা থেকে শুরু করবেন, কথা বলি।</h2><p className="t-lead mt-6 text-on-night-muted">Business type, ঢাকার এলাকার নাম, website বা Facebook Page link এবং budget জানান। SEO, paid campaign নাকি ৳১৫,০০০ website—আপনার প্রয়োজন অনুযায়ী scope সাজাব।</p><div className="mt-8 flex flex-wrap gap-3"><ButtonLink href="/contact" variant="light">আমার business plan চাই</ButtonLink><ButtonLink href="mailto:younusshobon@gmail.com" variant="outline-light">ইমেইল করুন</ButtonLink></div></div></Section>
    </div>
  );
}
