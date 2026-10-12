import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@/app/globals.css";
export function DocumentLayout({
  children, lang = "en",
}: {
  children: React.ReactNode; lang?: "en" | "ar" | "bn";
}) {
  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
