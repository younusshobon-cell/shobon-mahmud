import { NextRequest, NextResponse } from "next/server";
import { chooseLocationLanguage, localizedConfig, locationPath, type Locale } from "@/lib/i18n/routing";

export function proxy(request: NextRequest) {
  const match = request.nextUrl.pathname.match(/^\/(?:(ar|bn)\/)?locations\/seo-consultant-(dubai|saudi-arabia|oman|dhaka)\/?$/);
  if (!match) return NextResponse.next();
  const [, currentLocale, slug] = match;
  const config = localizedConfig(slug);
  if (!config || (currentLocale && currentLocale !== config.locale)) return NextResponse.next();
  const key = `location-language-${slug}`;
  const selected = request.nextUrl.searchParams.get("lang");
  if (selected === "en" || selected === config.locale) {
    const url = request.nextUrl.clone();
    url.pathname = locationPath(slug, selected as Locale);
    url.searchParams.delete("lang");
    const response = NextResponse.redirect(url, 307);
    response.cookies.set(key, selected, { path: "/", maxAge: 31536000, sameSite: "lax", httpOnly: true, secure: request.nextUrl.protocol === "https:" });
    response.headers.set("Cache-Control", "private, no-store");
    return response;
  }
  // No user-agent exceptions: people and crawlers can access the same language URLs.
  if (!currentLocale) {
    const locale = chooseLocationLanguage(slug, request.headers.get("x-vercel-ip-country"), request.cookies.get(key)?.value);
    if (locale !== "en") {
      const url = request.nextUrl.clone();
      url.pathname = locationPath(slug, locale);
      const response = NextResponse.redirect(url, 307);
      response.headers.set("Cache-Control", "private, no-store");
      return response;
    }
  }
  const response = NextResponse.next();
  // English entry-point decisions must never be cached across countries or preferences.
  if (!currentLocale) response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Content-Language", currentLocale || "en");
  return response;
}
export const config = { matcher: [
  "/locations/seo-consultant-dubai", "/locations/seo-consultant-saudi-arabia", "/locations/seo-consultant-oman", "/locations/seo-consultant-dhaka",
  "/ar/locations/:slug", "/bn/locations/:slug",
] };
