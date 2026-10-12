import { localizedConfig, locationPath, type Locale } from "@/lib/i18n/routing";
export function LanguageSwitch({ slug, locale = "en" }: { slug: string; locale?: Locale }) {
  const config = localizedConfig(slug);
  if (!config) return null;
  const label = locale === "ar" ? "لغة الصفحة" : locale === "bn" ? "পেজের ভাষা" : "Page language";
  return <nav aria-label={label} className="border-b border-line bg-paper-2">
    <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-5 py-3 text-sm sm:px-8">
      <span>{label}</span>
      {(["en", config.locale] as const).map(language => <a key={language} href={`${locationPath(slug, language)}?lang=${language}`} lang={language} hrefLang={language} aria-current={locale === language ? "page" : undefined} className={`rounded-full border px-4 py-2 ${locale === language ? "border-ink bg-ink text-paper" : "border-line-strong text-ink hover:underline"}`}>{language === "en" ? "English" : language === "ar" ? "العربية" : "বাংলা"}</a>)}
    </div>
  </nav>;
}
