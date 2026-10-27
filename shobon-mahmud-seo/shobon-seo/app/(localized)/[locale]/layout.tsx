import { FloatingWhatsApp } from "@/components/ui/WhatsAppLink";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { DocumentLayout } from "@/components/layout/DocumentLayout";
import { Navbar } from "@/components/layout/Navbar";
import { LocalizedFooter } from "@/components/i18n/LocalizedFooter";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Analytics } from "@/components/layout/Analytics";
import { VisitorTracker } from "@/components/layout/VisitorTracker";
import { JsonLd } from "@/components/seo/JsonLd";
import { personSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
export const metadata: Metadata = { metadataBase: new URL(siteConfig.url), title: { default: siteConfig.name, template: `%s — ${siteConfig.name}` }, verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : undefined };
export const viewport: Viewport = { themeColor: "#fafaf7", width: "device-width", initialScale: 1 };
export default async function LocalizedLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "ar" && locale !== "bn") notFound();
  return <DocumentLayout lang={locale}><div className="localized-page flex min-h-dvh flex-col"><a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">{locale === "ar" ? "انتقل إلى المحتوى" : "মূল কনটেন্টে যান"}</a><MotionProvider><Navbar locale={locale} /><main id="main" tabIndex={-1} className="min-w-0 flex-1">{children}<FloatingWhatsApp /></main><LocalizedFooter locale={locale} /></MotionProvider><JsonLd data={personSchema()} /><Analytics /><VisitorTracker /></div></DocumentLayout>;
}
