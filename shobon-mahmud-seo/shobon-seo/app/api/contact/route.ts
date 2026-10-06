import { sameOrigin } from "@/lib/admin/auth";
import { saveEnquiry } from "@/lib/analytics/conversions";
import { NextResponse } from "next/server";

/**
 * Contact form handler. Sends via the Resend HTTP API when RESEND_API_KEY and
 * CONTACT_TO_EMAIL are set (server-only env vars — never exposed to the browser).
 */
const MAX = { name: 120, email: 200, company: 160, website: 300, industry: 80, budget: 80, goal: 120, message: 5000 };
type Payload = Partial<Record<keyof typeof MAX | "company_url" | "_honey", string>>;

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({error:"Invalid origin."},{status:403});
  const validateOnly = new URL(req.url).searchParams.get("validate") === "1";
  let body: Payload;
  try {
    const text = await req.text();
    if (text.length > 12000) return NextResponse.json({error:"Request too large."},{status:413});
    body = JSON.parse(text) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) return NextResponse.json({error:"Invalid request."},{status:400});

  // Honeypot: pretend success to bots
  if (body.company_url || body._honey) return NextResponse.json({ ok: true, blocked: true });

  const clean: Record<string, string> = {};
  for (const [k, max] of Object.entries(MAX)) clean[k] = String(body[k as keyof Payload] ?? "").trim().slice(0, max);

  if (!clean.name || !clean.message || !clean.goal) return NextResponse.json({ error: "Please fill in your name, goal and message." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });

  // The browser submits valid forms to FormSubmit, which presents its CAPTCHA.
  const submissionId = (body as Payload & {submissionId?:string}).submissionId;
  if (validateOnly) {
    if (!submissionId || !/^[a-f0-9-]{36}$/.test(submissionId)) return NextResponse.json({error:"Invalid submission."},{status:400});
    try { await saveEnquiry(clean, submissionId, req); }
    catch (error) { return NextResponse.json({error:error instanceof Error ? error.message : "Could not save your enquiry. Please try again."},{status:503}); }
    return NextResponse.json({ok:true,saved:true});
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) {
    console.warn("[contact] RESEND_API_KEY / CONTACT_TO_EMAIL not configured — message not delivered.");
    return NextResponse.json({ error: "The contact form isn't connected yet." }, { status: 503 });
  }

  const rows = Object.entries(clean).map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#5a6474">${k}</td><td style="padding:4px 0">${esc(v) || "—"}</td></tr>`).join("");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Website <onboarding@resend.dev>",
      to: [to],
      reply_to: clean.email,
      subject: `New enquiry from ${clean.name}${clean.company ? ` (${clean.company})` : ""}`,
      html: `<table style="font-family:system-ui,sans-serif;font-size:14px">${rows}</table>`,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text().catch(() => ""));
    return NextResponse.json({ error: "The message couldn't be sent right now." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
