"use client";
import pageCopy from "@/content/copy-components-forms-ContactForm.json";

import { useState } from "react";
import { cn } from "@/lib/utils";

const industries = ["SaaS", pageCopy.text_001, pageCopy.text_002, "Logistics", pageCopy.text_003, "E-commerce", "Technology", pageCopy.text_004, "Other"];
const goals = [pageCopy.text_005, pageCopy.text_006, pageCopy.text_007, pageCopy.text_008, pageCopy.text_009, pageCopy.text_010, pageCopy.text_011];
// TODO: adjust budget ranges to match how you price your work.
const budgets = [pageCopy.text_012, pageCopy.text_013, pageCopy.text_014, pageCopy.text_015, pageCopy.text_016, pageCopy.text_017];

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
      if (!res.ok) throw new Error(data.error || pageCopy.text_018);
      if (data.blocked) {
        form.reset();
        setStatus({ state: "idle" });
        return;
      }
      // Native submission lets FormSubmit present its CAPTCHA when needed.
      form.submit();
    } catch (err) {
      const message = err instanceof Error ? err.message : pageCopy.text_019;
      setStatus({ state: "error", message });
    }
  }

  return (
    <form action="https://formsubmit.co/younusshobon@gmail.com" method="POST" onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <input type="hidden" name="_subject" value="New enquiry from Shobon Mahmud website" />
      <input type="hidden" name="_template" value="table" />
      {/* Honeypot: hidden from people, filled by bots */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label>{pageCopy.text_020}<input type="text" name="_honey" tabIndex={-1} autoComplete="off" /></label>
        <input type="text" name="company_url" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="block"><span className={label}>{pageCopy.text_021}</span><input required maxLength={120} name="name" autoComplete="name" className={field} /></label>
      <label className="block"><span className={label}>{pageCopy.text_022}</span><input required maxLength={200} type="email" name="email" autoComplete="email" className={field} /></label>
      <label className="block"><span className={label}>{pageCopy.text_023}<span className="font-normal text-muted">{pageCopy.text_024}</span></span><input name="company" autoComplete="organization" className={field} /></label>
      <label className="block"><span className={label}>{pageCopy.text_025}<span className="font-normal text-muted">{pageCopy.text_026}</span></span><input name="website" type="text" inputMode="url" placeholder={pageCopy.text_027} autoComplete="url" className={field} /></label>
      <label className="block"><span className={label}>{pageCopy.text_028}<span className="font-normal text-muted">{pageCopy.text_029}</span></span>
        <select name="industry" defaultValue="" className={field}><option value="" disabled>{pageCopy.text_030}</option>{industries.map((i) => <option key={i}>{i}</option>)}</select>
      </label>
      <label className="block"><span className={label}>{pageCopy.text_031}<span className="font-normal text-muted">{pageCopy.text_032}</span></span>
        <select name="budget" defaultValue="" className={field}><option value="" disabled>{pageCopy.text_033}</option>{budgets.map((b) => <option key={b}>{b}</option>)}</select>
      </label>
      <label className="block sm:col-span-2"><span className={label}>{pageCopy.text_034}</span>
        <select required name="goal" defaultValue="" className={field}><option value="" disabled>{pageCopy.text_035}</option>{goals.map((g) => <option key={g}>{g}</option>)}</select>
      </label>
      <label className="block sm:col-span-2"><span className={label}>{pageCopy.text_036}</span>
        <textarea required maxLength={5000} name="message" rows={6} placeholder={pageCopy.text_037} className={cn(field, "resize-y")} />
      </label>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">{pageCopy.text_038}{fallbackEmail ? <> {pageCopy.text_039}<a className="underline" href={`mailto:${fallbackEmail}`}>{fallbackEmail}</a> {pageCopy.text_040}</> : null}</p>
        <button type="submit" disabled={status.state === "sending"} className="inline-flex h-12 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-ink px-7 font-medium text-paper transition-colors hover:bg-link active:translate-y-px disabled:opacity-60">
          {status.state === "sending" ? "Checking…" : pageCopy.text_041}
        </button>
      </div>
      {status.state === "error" && <p role="alert" className="text-sm text-red-700 sm:col-span-2">{status.message}</p>}
    </form>
  );
}
