import { NextResponse, type NextRequest } from "next/server";

/**
 * Permanent redirects for paths that only differ from a live route by case.
 * next.config redirects match case-insensitively, so a rule written there for
 * /services/Holistic-SEO also matches /services/holistic-seo and loops.
 * The lookup below compares the pathname exactly.
 */
const legacyPaths = new Map([["/services/Holistic-SEO", "/services/holistic-seo"]]);

export function middleware(request: NextRequest) {
  const destination = legacyPaths.get(request.nextUrl.pathname);
  if (!destination) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = destination;
  return NextResponse.redirect(url, 308);
}

export const config = { matcher: ["/services/:slug"] };
