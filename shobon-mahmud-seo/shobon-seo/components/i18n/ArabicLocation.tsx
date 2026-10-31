import { showcaseCaseStudies } from "@/lib/content/case-studies";
import { RelatedCaseStudies } from "@/components/related/Related";
import { ExperienceHero } from "@/components/content/ExperienceHero";
import content from "@/content/locations-ar.json";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/content/Section";
import { PointGrid } from "@/components/content/PointGrid";
import { FAQ } from "@/components/content/FAQ";
import { GrowthPrompt } from "@/components/content/GrowthPrompt";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { nativeServices } from "./LocalizedFooter";
import { locationPath } from "@/lib/i18n/routing";
import { siteConfig } from "@/lib/site";
import { ArabicOmanDelivery } from "./ArabicOmanDelivery";
const industryNames: Record<string,string> = { logistics: "اللوجستيات", ecommerce: "التجارة الإلكترونية", "health-tech": "تقنيات الصحة", "local-services": "الخدمات المحلية", "real-estate": "العقارات" };
export function ArabicLocation({ slug }: { slug: keyof typeof content }) {
  const loc = content[slug];
  const path = locationPath(slug, "ar");
  const url = new URL(path, siteConfig.url).toString();
  return <div>
    <ExperienceHero locale="ar" crumbs={[{name:loc.city,href:path}]} kicker={loc.eyebrow} title={loc.heroTitle} intro={loc.intro}/>

    <div className="location-content" data-location={slug}>
      <div className="hero-grid-band border-y border-line"><Container className="grid gap-3 py-5 sm:grid-cols-3">{["الظهور في Google", "الاكتشاف بالذكاء الاصطناعي", "استفسارات مؤهلة"].map((label,i) => <p key={label} className="rounded-xl border border-line bg-white px-5 py-4 font-semibold text-ink"><span className="me-4 text-link">0{i+1}</span>{label} في {loc.city}</p>)}</Container></div>
      <nav aria-label="أقسام الصفحة" className="location-section-nav"><Container className="flex flex-wrap gap-2 py-5">{[["context", "السوق المحلي"], ["opps", "فرص النمو"], ["growth-path", "منهج العمل"], ["location-services", "خدمات السيو"], ["location-faqs", "الأسئلة الشائعة"]].map(([id,label]) => <a key={id} href={`#${id}`}>{label}</a>)}</Container></nav>
      <Section tone="muted" labelledBy="context"><div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]"><div><h2 id="context" className="t-h2 text-ink">فهم السوق في {loc.city}</h2>{loc.industries.length > 0 && <nav aria-label="القطاعات" className="mt-8"><h3 className="t-h3">القطاعات التي أعمل معها</h3><ul className="mt-5 space-y-3">{loc.industries.map(slug => <li key={slug}><a className="link" href={`/industries/${slug}`}>{industryNames[slug] ?? slug}</a></li>)}</ul></nav>}</div><div className="space-y-5 t-lead text-muted">{loc.context.map(text => <p key={text}>{text}</p>)}</div></div></Section>
      <Section labelledBy="problems"><h2 id="problems" className="t-h2 text-ink">ما الذي يحدّ من النمو العضوي في {loc.city}؟</h2><div className="mt-12"><PointGrid points={loc.problems} columns={2} /></div></Section>
      <Section tone="muted" labelledBy="opps"><h2 id="opps" className="t-h2 text-ink">أين تبدأ فرص النمو في {loc.city}؟</h2><div className="mt-12"><PointGrid points={loc.opportunities} /></div></Section>
      <GrowthPrompt title={`كن النشاط الذي يجده العملاء في ${loc.city}.`} body="لنراجع سوقك وخدماتك وأسئلة عملائك، ونحدد الصفحات والخطوات التي تستحق الأولوية." action="ناقش خطة النمو" labels={{ kicker: "خطوتك التالية", cards: ["البحث", "المحتوى", "التواصل"], services: "استعرض الخدمات" }} />
      <Section labelledBy="sectors"><h2 id="sectors" className="t-h2 text-ink">{slug === "oman" ? "سيو للمشاريع العامة والقطاع العقاري في عُمان" : `قطاعات تستحق المتابعة حتى 2030 في ${loc.city}`}</h2><p className="mt-5 text-muted">اختر الفرص التي تناسب خدماتك الفعلية، ثم تحقق من طلب العملاء واحتياجاتهم.</p><div className="mt-12"><PointGrid points={loc.sectors} /></div><p className="mt-10 text-sm text-muted">المصدر: <a className="link" href={loc.source.href} target="_blank" rel="noopener noreferrer">{loc.source.label}</a></p></Section>
      <Section tone="muted" labelledBy="growth-path"><h2 id="growth-path" className="t-h2 text-ink">من الاكتشاف إلى العملاء في {loc.city}</h2><p className="mt-5 text-muted">اربط نية البحث بمعلومات مفيدة وخطوة تالية واضحة، ثم راجع النتائج.</p><div className="mt-12"><PointGrid points={loc.searchPaths} numbered /></div></Section>
      {slug === "oman" && <ArabicOmanDelivery />}
      <Section id="location-services"><h2 className="t-h2 text-ink">خدمات لشركات {loc.city}</h2><div className="mt-10 grid gap-5 md:grid-cols-3">{loc.relatedServices.map(slug => <a key={slug} href={`/services/${slug}`} className="rounded-2xl border border-line bg-white p-6 text-link hover:underline">{nativeServices[slug as keyof typeof nativeServices]?.ar ?? slug} ↗</a>)}</div></Section>
      <Section tone="muted" labelledBy="coverage"><h2 id="coverage" className="t-h2 text-ink">خطة تناسب سوقك في {loc.city}</h2><p className="t-lead mt-5 max-w-3xl text-muted">يشكل عملاؤك ومنطقة خدمتك الفعلية الاستراتيجية. أعمل عن بُعد من دبي مع فرق {loc.city} بأولويات واضحة وتواصل متفق عليه.</p><iframe src={`https://maps.google.com/maps?q=${loc.coords.lat},${loc.coords.lng}&z=12&hl=ar&output=embed`} title={`خريطة ${loc.city}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="mt-8 aspect-[16/10] w-full rounded-[28px] border border-line sm:aspect-[21/9]" /></Section>
      <Section id="location-faqs"><FAQ faqs={loc.faqs} title={`النمو العضوي في ${loc.city}: الأسئلة الشائعة`} withSchema /></Section>
      <Section><RelatedCaseStudies items={showcaseCaseStudies} title="نماذج من أعمال العملاء"/></Section>
      <Section tone="dark" labelledBy="native-contact"><h2 id="native-contact" className="t-h2 text-on-night">{slug === "oman" ? "مسار أوضح لمشروعك في عُمان من الاكتشاف إلى الإجراء." : `وصل إلى مزيد من العملاء في ${loc.city} عبر البحث.`}</h2><p className="t-lead mt-5 max-w-3xl text-on-night-muted">أخبرني عن سوقك ومنافسيك وما جرّبته. سأشاركك كيف أتعامل مع المشروع.</p><div className="mt-8 flex flex-wrap gap-3"><ButtonLink href="/contact" variant="light">ناقش مشروعك</ButtonLink><ButtonLink href={`mailto:${siteConfig.email}`} variant="outline-light">راسلني بالبريد</ButtonLink></div></Section>
    </div>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", "@id": `${url}#service`, name: loc.seoTitle, description: loc.intro, url, serviceType: "تحسين محركات البحث", areaServed: { "@type": slug === "dubai" ? "City" : "Country", name: loc.city }, provider: { "@id": `${siteConfig.url}/#person` } }} />
  </div>;
}
