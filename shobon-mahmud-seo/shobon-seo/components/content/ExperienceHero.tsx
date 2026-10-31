import Image from "@/components/content/EditableImage";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import type { Crumb } from "@/lib/schema";
import { photos } from "@/lib/images";
import { services } from "@/lib/content/services";
import { industries } from "@/lib/content/industries";
import "./experience.css";

export function ExperienceHero({ crumbs, kicker, title, intro, locale = "en" }: { crumbs: Crumb[]; kicker?: string; title: string; intro?: string; locale?: "en" | "bn" | "ar" }) {
  const path = crumbs.at(-1)?.href ?? "/";
  const service = services.find(s => path === `/services/${s.slug}`);
  const industry = industries.find(i => path === `/industries/${i.slug}`);
  const location = path.includes("/locations/");
  const about = path === "/about";
  const editorial = path.startsWith("/blog");
  const cases = path === "/case-studies";
  const tone = location ? "market" : industry ? "industry" : editorial ? "editorial" : about ? "personal" : "service";
  const steps = service ? service.covers.slice(0,3).map(p=>p.title) : industry ? industry.name ? ["Understand your buyers", `${industry.name} search intent`, "Connect discovery to enquiries"] : [] : location ? ["Local search intent", "Relevant service pages", "A clear path to contact"] : editorial ? ["Understand search intent", "Review the evidence", "Apply it to your website"] : cases ? ["The starting point", "The work and decisions", "Results with their context"] : ["Diagnose the opportunity", "Choose the right priorities", "Build and measure progress"];
  const labels = locale === "ar" ? {contact:"ناقش مشروعك",whatsapp:"تواصل عبر واتساب",note:"شارك موقعك وأهدافك. نحدد الخطوة التالية معاً.",plan:"خطة واضحة للنمو",steps:["فهم نشاطك التجاري","تحديد فرص البحث","تحويل الزيارات إلى استفسارات"],proof:"استكشف دراسات الحالة"} : locale === "bn" ? {contact:"আপনার প্রকল্প নিয়ে কথা বলুন",whatsapp:"WhatsApp-এ কথা বলুন",note:"আপনার ওয়েবসাইট ও লক্ষ্য জানান। একসঙ্গে পরবর্তী পদক্ষেপ ঠিক করি।",plan:"আপনার ব্যবসার জন্য পরিকল্পনা",steps:["ব্যবসা ও গ্রাহককে বোঝা","সার্চের সুযোগ খোঁজা","প্রাসঙ্গিক ইনকোয়ারির পথ তৈরি"],proof:"কাজের উদাহরণ দেখুন"} : {contact:about?"Let’s work together":"Discuss your project",whatsapp:"Chat on WhatsApp",note:"Share your website and goals. We’ll discuss the right next step.",plan:editorial?"From insight to action":cases?"Behind every engagement":"Your growth, with a clear direction",steps,proof:"Explore client case studies"};
  return <section className="experience-hero" data-experience={tone}><Container>
    <Breadcrumbs items={crumbs} />
    <div className="experience-grid"><div className="experience-copy"><p className="experience-eyebrow"><span aria-hidden="true"/>{kicker ?? "Digital growth with Shobon Mahmud"}</p><h1>{title}</h1>{intro&&<p className="experience-intro">{intro}</p>}<div className="experience-actions"><Link href="/contact" className="experience-primary">{labels.contact}<span aria-hidden="true">↗</span></Link><WhatsAppLink subject={kicker || title} label={labels.whatsapp}/></div><p className="experience-note">{labels.note}</p><Link href={editorial?"/free-tools":"/case-studies"} className="experience-proof">{editorial?"Put the advice to work with free SEO tools":labels.proof} <span aria-hidden="true">↗</span></Link></div>
    <div className="experience-art">{about?<div className="experience-portrait"><Image src={photos.outdoor.src} alt={photos.outdoor.alt} width={640} height={760} priority sizes="(min-width:1024px) 460px, 100vw" className="h-full w-full object-cover"/><div><strong>Shobon Mahmud</strong><span>Digital Growth Partner &amp; SEO Consultant</span></div></div>:<><div className="experience-orbit" aria-hidden="true"><span/><span/><b>↗</b></div><div className="experience-plan"><p>{editorial?"THE FIELD NOTES":cases?"REAL PROJECTS / REAL CONTEXT":"STRATEGY → EXECUTION"}</p><h2>{labels.plan}</h2><ol>{labels.steps.map((s,i)=><li key={s}><span>0{i+1}</span><strong>{s}</strong><span aria-hidden="true">↗</span></li>)}</ol><div className="experience-plan-foot"><span className="experience-dot"/> {locale==="en"?"Built around your business":labels.note}</div></div><div className="experience-signature"><Image src={photos.studio.src} alt="Shobon Mahmud" width={48} height={48} sizes="48px"/><span><strong>Shobon Mahmud</strong><small>Strategy. Content. Conversion.</small></span></div></>}</div></div>
    <div className="experience-bottom"><span>{locale==="en"?"A clear brief. A focused plan. A practical next step.":labels.note}</span><span>{locale==="en"?"Independent expertise · Direct communication":"SEO · Content · Growth"}</span></div>
  </Container></section>;
}
