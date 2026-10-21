import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArabicLocation } from "@/components/i18n/ArabicLocation";
import { LanguageSwitch } from "@/components/i18n/LanguageSwitch";
import { DhakaLanding } from "@/components/sections/DhakaLanding";
import { JsonLd } from "@/components/seo/JsonLd";
import arabic from "@/content/locations-ar.json";
import bangla from "@/content/dhaka-bn.json";
import { localizedLocations, localizedConfig, locationPath, locationAlternates } from "@/lib/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
type Props = { params: Promise<{ locale: string; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return Object.entries(localizedLocations).map(([slug, config]) => ({ locale: config.locale, slug: `seo-consultant-${slug}` }));
}
function getPage(locale: string, fullSlug: string) {
  const slug = fullSlug.replace(/^seo-consultant-/, "");
  const config = localizedConfig(slug);
  if (!config || config.locale !== locale || fullSlug !== `seo-consultant-${slug}`) notFound();
  const data = slug === "dhaka" ? { seoTitle: "ঢাকার ব্যবসার ডিজিটাল গ্রোথ পার্টনার | শোভন মাহমুদ", intro: "ঢাকার ব্যবসার জন্য বাংলা ও ইংরেজি কনটেন্ট, লোকাল সার্চ ও ইনকোয়ারির পরিকল্পনা। দুবাই থেকে শোভন মাহমুদের সঙ্গে দূর থেকে কাজ করুন।" } : arabic[slug as keyof typeof arabic];
  return { slug, config, data, path: locationPath(slug, config.locale) };
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getPage(locale, slug);
  const metadata = buildMetadata({ title: page.data.seoTitle, description: "metaDescription" in page.data ? page.data.metaDescription : page.data.intro, path: page.path, absoluteTitle: true });
  return { ...metadata, alternates: { ...metadata.alternates, languages: locationAlternates(page.slug, siteConfig.url) }, openGraph: { ...metadata.openGraph, locale: page.config.languageTag.replace("-", "_"), alternateLocale: ["en"], images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: page.data.seoTitle }] } };
}
export default async function LocalizedLocationPage({ params }: Props) {
  const { locale, slug } = await params;
  const page = getPage(locale, slug);
  const url = new URL(page.path, siteConfig.url).toString();
  return <><LanguageSwitch slug={page.slug} locale={page.config.locale} />{page.slug === "dhaka" ? <DhakaLanding copy={bangla} locale="bn" /> : <ArabicLocation slug={page.slug as keyof typeof arabic} />}<JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", "@id": `${url}#webpage`, url, name: page.data.seoTitle, description: page.data.intro, inLanguage: page.config.languageTag, isPartOf: { "@id": `${siteConfig.url}/#website` }, about: { "@id": `${url}#service` }, author: { "@id": `${siteConfig.url}/#person` } }} /></>;
}
