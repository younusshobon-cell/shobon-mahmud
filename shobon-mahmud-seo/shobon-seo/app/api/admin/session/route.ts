import { NextResponse } from "next/server";
import {
  authenticated,
  authConfigured,
  allowLogin,
  verifyPassword,
  issueSession,
  COOKIE,
  cookieOptions,
  sameOrigin,
} from "@/lib/admin/auth";
import { publishingConfigured } from "@/lib/admin/github";
export const runtime = "nodejs";
export async function GET() {
  return NextResponse.json(
    {
      authenticated: await authenticated(),
      configured: authConfigured(),
      publishing: publishingConfigured(),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return NextResponse.json(
      { error: "Invalid request origin." },
      { status: 403 },
    );
  if (!authConfigured())
    return NextResponse.json(
      {
        error:
          "Admin login needs ADMIN_PASSWORD (16+ characters) and ADMIN_SESSION_SECRET (32+ characters) in Vercel.",
      },
      { status: 503 },
    );
  if (!allowLogin(request))
    return NextResponse.json(
      { error: "Too many login attempts. Try again in 15 minutes." },
      { status: 429 },
    );
  if (Number(request.headers.get("content-length") ?? 0) > 2048)
    return NextResponse.json({ error: "Request too large." }, { status: 413 });
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!(await verifyPassword(body?.password)))
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE, issueSession(), cookieOptions);
  return response;
}
export async function DELETE(request: Request) {
  if (!sameOrigin(request))
    return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE, "", { ...cookieOptions, maxAge: 0 });
  return response;
}
