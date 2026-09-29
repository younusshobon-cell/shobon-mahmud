"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

const industries = ["SaaS", "Legal Tech", "Health Tech", "Logistics", "Design & Creative", "E-commerce", "Technology", "Local Services", "Other"];
const goals = ["More organic traffic", "More leads or sales from search", "Local / map pack visibility", "Fixing technical issues", "Recovering from a traffic drop", "Expanding to new markets", "Not sure yet"];
// TODO: adjust budget ranges to match how you price your work.
const budgets = ["Under $1,000 / month", "$1,000 – $3,000 / month", "$3,000 – $5,000 / month", "$5,000+ / month", "One-off project", "Not sure yet"];

const field = "mt-2 block w-full rounded-xl border border-line-strong bg-white px-4 py-3 text-[0.9375rem] text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-ink";
const label = "text-sm font-medium text-ink";

type Status = { state: "idle" | "sending" | "error"; message?: string };

export function ContactForm({ fallbackEmail }: { fallbackEmail?: string }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact?validate=1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; blocked?: boolean };
      if (!res.ok) throw new Error(data.error || "Please check the form and try again.");
      if (data.blocked) {
        form.reset();
        setStatus({ state: "idle" });
        return;
      }
      // Native submission lets FormSubmit present its CAPTCHA when needed.
      form.submit();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Please try again.";
      setStatus({ state: "error", message });
    }
  }

  return (
    <form action="https://formsubmit.co/younusshobon@gmail.com" method="POST" onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <input type="hidden" name="_subject" value="New enquiry from Shobon Mahmud website" />
      <input type="hidden" name="_template" value="table" />
      {/* Honeypot: hidden from people, filled by bots */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label>Leave this empty<input type="text" name="_honey" tabIndex={-1} autoComplete="off" /></label>
        <input type="text" name="company_url" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="block"><span className={label}>Name</span><input required maxLength={120} name="name" autoComplete="name" className={field} /></label>
      <label className="block"><span className={label}>Email</span><input required maxLength={200} type="email" name="email" autoComplete="email" className={field} /></label>
      <label className="block"><span className={label}>Company <span className="font-normal text-muted">(optional)</span></span><input name="company" autoComplete="organization" className={field} /></label>
      <label className="block"><span className={label}>Website</span><input name="website" type="text" inputMode="url" placeholder="yourcompany.com" autoComplete="url" className={field} /></label>
      <label className="block"><span className={label}>Industry</span>
        <select name="industry" defaultValue="" className={field}><option value="" disabled>Select one</option>{industries.map((i) => <option key={i}>{i}</option>)}</select>
      </label>
      <label className="block"><span className={label}>Budget range</span>
        <select name="budget" defaultValue="" className={field}><option value="" disabled>Select one</option>{budgets.map((b) => <option key={b}>{b}</option>)}</select>
      </label>
      <label className="block sm:col-span-2"><span className={label}>What are you trying to improve?</span>
        <select required name="goal" defaultValue="" className={field}><option value="" disabled>Select one</option>{goals.map((g) => <option key={g}>{g}</option>)}</select>
      </label>
      <label className="block sm:col-span-2"><span className={label}>Message</span>
        <textarea required maxLength={5000} name="message" rows={6} placeholder="Where is search getting stuck, and what have you already tried?" className={cn(field, "resize-y")} />
      </label>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">I&apos;ll review your message and get back to you as soon as possible.{fallbackEmail ? <> Or email <a className="underline" href={`mailto:${fallbackEmail}`}>{fallbackEmail}</a> directly.</> : null}</p>
        <button type="submit" disabled={status.state === "sending"} className="inline-flex h-12 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-ink px-7 font-medium text-paper transition-colors hover:bg-link active:translate-y-px disabled:opacity-60">
          {status.state === "sending" ? "Checking…" : "Send message"}
        </button>
      </div>
      {status.state === "error" && <p role="alert" className="text-sm text-red-700 sm:col-span-2">{status.message}</p>}
    </form>
  );
}
