export const localizedLocations = {
  dubai: { locale: "ar", country: "AE", languageTag: "ar-AE" },
  "saudi-arabia": { locale: "ar", country: "SA", languageTag: "ar-SA" },
  oman: { locale: "ar", country: "OM", languageTag: "ar-OM" },
  dhaka: { locale: "bn", country: "BD", languageTag: "bn-BD" },
} as const;
export type LocalizedSlug = keyof typeof localizedLocations;
export type Locale = "en" | "ar" | "bn";
export function localizedConfig(slug: string) {
  return localizedLocations[slug as LocalizedSlug];
}
export function locationPath(slug: string, locale: Locale = "en") {
  return `${locale === "en" ? "" : `/${locale}`}/locations/seo-consultant-${slug}`;
}
export function locationAlternates(slug: string, origin: string) {
  const config = localizedConfig(slug);
  if (!config) return undefined;
  const english = new URL(locationPath(slug), origin).toString();
  const native = new URL(locationPath(slug, config.locale), origin).toString();
  return { en: english, [config.locale]: native, [config.languageTag]: native, "x-default": english };
}
/** Explicit URLs remain accessible; only the English entry point auto-selects a locale. */
export function chooseLocationLanguage(slug: string, country: string | null, preference?: string): Locale {
  const config = localizedConfig(slug);
  if (!config) return "en";
  if (preference === "en" || preference === config.locale) return preference;
  return country?.toUpperCase() === config.country ? config.locale : "en";
}
