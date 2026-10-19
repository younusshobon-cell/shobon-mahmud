"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Entry = { id: string; label: string };

export function MobileSectionNav() {
  const pathname = usePathname();
  return <SectionNav key={pathname} />;
}

function SectionNav() {
  const pathname = usePathname();
  const enabled = /^\/(case-studies|blog)\/[^/]+\/?$/.test(pathname) && !pathname.startsWith("/blog/page/");
  const [items, setItems] = useState<Entry[]>([]);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const main = document.getElementById("main");
    if (!main) return;
    const headings = Array.from(main.querySelectorAll<HTMLElement>("h2"))
      .filter(h => h.textContent?.trim() && !h.closest('[data-section-nav-exclude]'));
    const added: HTMLElement[] = [];
    headings.forEach((h, index) => {
      if (!h.id) {
        const base = `section-${index + 1}`;
        let id = base;
        let n = 1;
        while (document.getElementById(id)) id = `${base}-${n++}`;
        h.id = id;
        added.push(h);
      }
    });
    setItems(headings.map(h => ({ id: h.id, label: h.textContent!.trim() })));
    const name = pathname.includes("arhq-") ? "ARHQ" : pathname.includes("retirement-tax-partners-") ? "RTP" : pathname.includes("americas-medicare-associates-") ? "AMA" : pathname.startsWith("/blog/") ? "Article" : "Case study";
    setTitle(name);
    let frame = 0;
    const update = () => {
      frame = 0;
      let index = 0;
      headings.forEach((h, i) => { if (h.getBoundingClientRect().top <= 150) index = i; });
      setActive(index);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
      added.forEach(h => h.removeAttribute("id"));
    };
  }, [pathname, enabled]);

  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);

  if (!enabled || items.length < 2) return null;
  return <div className="mobile-section-nav lg:hidden">
    {open && <button type="button" tabIndex={-1} aria-label="Close section navigation" className="fixed inset-0 z-40 bg-black/20" onClick={() => { setOpen(false); toggle.current?.focus(); }} />}
    <div className="fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50 mx-auto max-w-lg rounded-2xl border border-white/15 bg-[#1c201d] text-white shadow-2xl">
      {open && <nav id="mobile-section-list" aria-label="On this page" className="max-h-[min(65dvh,32rem)] overflow-y-auto overscroll-contain px-3 pb-3 pt-4">
        <p className="mb-3 px-2 text-xs text-white/60">On this page</p>
        <ol className="space-y-1">{items.map((item, i) => <li key={item.id}><a href={`#${item.id}`} aria-current={i === active ? "location" : undefined} className={`flex gap-3 rounded-lg px-2 py-3 text-sm leading-5 focus-visible:outline-2 focus-visible:outline-[#d8e7af] ${i === active ? "bg-white/10 text-white" : "text-white/75"}`} onClick={() => { setActive(i); setOpen(false); toggle.current?.focus(); }}><span className="shrink-0 font-mono text-xs text-[#d8e7af]">{String(i + 1).padStart(2, "0")}</span><span>{item.label}</span></a></li>)}</ol>
      </nav>}
      <button ref={toggle} type="button" aria-expanded={open} aria-controls="mobile-section-list" aria-label={`${open ? "Close" : "Open"} page sections. Current section: ${items[active]?.label}`} onClick={() => setOpen(!open)} className="flex min-h-14 w-full items-center gap-3 rounded-2xl px-4 py-3 text-left focus-visible:outline-2 focus-visible:outline-[#d8e7af]">
        <span className="shrink-0 text-xs text-white/55">{title}</span><span className="shrink-0 font-mono text-xs text-[#d8e7af]">{String(active + 1).padStart(2, "0")}</span><span className="min-w-0 flex-1 truncate text-xs font-semibold">{items[active]?.label}</span><span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-full border border-white/25 text-xl leading-none">{open ? "×" : "+"}</span>
      </button>
    </div>
  </div>;
}
