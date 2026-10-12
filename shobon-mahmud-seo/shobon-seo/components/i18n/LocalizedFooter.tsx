import { siteConfig } from "@/lib/site";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/layout/SocialLinks";
export const nativeServices = {
  "Holistic-SEO": { ar: "السيو الشامل", bn: "হলিস্টিক এসইও" },
  "local-seo": { ar: "السيو المحلي", bn: "লোকাল এসইও" },
  "content-seo": { ar: "المحتوى والسيو", bn: "কনটেন্ট এসইও" },
} as const;
export function LocalizedFooter({ locale }: { locale: "ar" | "bn" }) {
  const ar = locale === "ar";
  const nav = ar ? ["الأعمال", "الخدمات", "القطاعات", "المناطق", "المقالات", "عنّي", "تواصل"] : ["কাজ", "সেবা", "ইন্ডাস্ট্রি", "লোকেশন", "ব্লগ", "আমার সম্পর্কে", "যোগাযোগ"];
  return <footer className="on-night bg-night text-on-night"><Container className="pt-16 pb-10">
    <div className="grid gap-10 md:grid-cols-3"><div><Logo tone="dark" /><p className="mt-5 leading-relaxed text-on-night-muted">{ar ? "سيو ومحتوى واستراتيجية نمو تساعد عملاءك على اكتشاف أعمالك واتخاذ الخطوة التالية." : "এসইও, কনটেন্ট ও গ্রোথ পরিকল্পনার মাধ্যমে গ্রাহককে আপনার ব্যবসা খুঁজে পেতে এবং যোগাযোগ করতে সাহায্য করি।"}</p><a className="mt-6 block" href={`mailto:${siteConfig.email}`}>{ar ? "راسلني بالبريد" : "ইমেইল করুন"}: <bdi>{siteConfig.email}</bdi></a><a className="mt-4 block" href="https://wa.me/8801309580863" target="_blank" rel="noopener noreferrer">{ar ? "تواصل عبر واتساب" : "হোয়াটসঅ্যাপে কথা বলুন"}</a><SocialLinks tone="dark" iconOnly className="mt-5" /></div>
    <nav aria-label={ar ? "روابط الموقع" : "সাইট লিংক"}><h2 className="font-semibold">{ar ? "الموقع" : "সাইট"}</h2><ul className="mt-5 space-y-3">{["portfolio", "services", "industries", "locations", "blog", "about", "contact"].map((slug,i) => <li key={slug}><a href={`/${slug}`} className="text-on-night-muted hover:underline">{nav[i]}</a></li>)}</ul></nav>
    <nav aria-label={ar ? "خدمات السيو" : "এসইও সেবা"}><h2 className="font-semibold">{ar ? "الخدمات" : "সেবা"}</h2><ul className="mt-5 space-y-3">{Object.entries(nativeServices).map(([slug,label]) => <li key={slug}><a href={`/services/${slug}`} className="text-on-night-muted hover:underline">{label[locale]}</a></li>)}</ul></nav></div>
    <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-night-line pt-6 text-sm text-on-night-muted"><p>© {new Date().getFullYear()} {siteConfig.name}. {ar ? "جميع الحقوق محفوظة." : "সর্বস্বত্ব সংরক্ষিত।"}</p><div className="flex gap-5"><a href="/privacy">{ar ? "الخصوصية" : "গোপনীয়তা"}</a><a href="/terms">{ar ? "الشروط" : "শর্তাবলি"}</a></div></div>
  </Container></footer>;
}
