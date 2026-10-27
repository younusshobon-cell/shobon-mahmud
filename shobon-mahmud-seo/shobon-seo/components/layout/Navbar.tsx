"use client";
import pageCopy from "@/content/copy-components-layout-Navbar.json";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { resourceLinks } from "@/lib/resources";
import { mainNav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export function Navbar({ locale = "en" }: { locale?: "en" | "ar" | "bn" } = {}) {
  const native = locale !== "en";
  const navLabels: Record<string, string> = locale === "ar" ? { Work: "أعمالي", Services: "الخدمات", Industries: "القطاعات", Locations: "المناطق", Blog: "المقالات", About: "عنّي" } : locale === "bn" ? { Work: "কাজ", Services: "সেবা", Industries: "ইন্ডাস্ট্রি", Locations: "লোকেশন", Blog: "ব্লগ", About: "আমার সম্পর্কে" } : {};
  const labels = locale === "ar" ? { contact: "تواصل معي", nav: "التنقل الرئيسي", close: "إغلاق القائمة", open: "فتح القائمة", menu: "قائمة الموقع" } : { contact: "যোগাযোগ করুন", nav: "প্রধান নেভিগেশন", close: "মেনু বন্ধ করুন", open: "মেনু খুলুন", menu: "সাইট মেনু" };
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const resourcesRef = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const close = (event: PointerEvent) => { if (!resourcesRef.current?.contains(event.target as Node)) resourcesRef.current?.removeAttribute("open"); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape" && resourcesRef.current?.open) { resourcesRef.current.removeAttribute("open"); resourcesRef.current.querySelector("summary")?.focus(); } };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", escape); };
  }, []);
  useEffect(() => { resourcesRef.current?.removeAttribute("open"); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", onResize);
    return () => desktop.removeEventListener("change", onResize);
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    const background = Array.from(document.querySelectorAll<HTMLElement>("main, footer"));
    const previousInert = background.map(element => element.inert);
    background.forEach(element => { element.inert = true; });
    const frame = requestAnimationFrame(() => menuRef.current?.querySelector<HTMLButtonElement>("button")?.focus());
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); setOpen(false); }
      if (event.key !== "Tab") return;
      const links = menuRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!links?.length) return;
      const first = links[0];
      const last = links[links.length - 1];
      if (!menuRef.current?.contains(document.activeElement)) {
        event.preventDefault(); first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const toggle = toggleRef.current;
    return () => {
      cancelAnimationFrame(frame);
      root.style.overflow = previousOverflow;
      background.forEach((element, index) => { element.inert = previousInert[index]; });
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        open ? "border-b border-line bg-paper" : scrolled ? "border-b border-line bg-paper/90 backdrop-blur-md" : "border-b border-transparent bg-paper",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:h-[4.5rem] lg:px-10">
        <Logo className="max-[380px]:[&>span]:hidden" />

        <nav aria-label={native ? labels.nav : pageCopy.text_001} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                {item.href === "/resources" ? <details ref={resourcesRef} className="group relative" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) event.currentTarget.removeAttribute("open"); }}>
                  <summary className={cn("flex min-h-11 cursor-pointer list-none items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.9375rem] [&::-webkit-details-marker]:hidden", resourceLinks.some(link => isActive(link.href)) || isActive("/resources") ? "text-ink" : "text-muted hover:text-ink")}>
                    Resources <ChevronDown aria-hidden className="size-4 transition-transform group-open:rotate-180" />
                  </summary>
                  <ul className="absolute start-0 top-full z-50 mt-2 w-72 rounded-2xl border border-line bg-paper p-2 shadow-xl">
                    {resourceLinks.map(link => <li key={link.href}><Link href={link.href} aria-current={isActive(link.href) ? "page" : undefined} onClick={() => resourcesRef.current?.removeAttribute("open")} className="block rounded-xl px-4 py-3 hover:bg-paper-2 focus-visible:bg-paper-2"><span className="block font-medium text-ink">{link.label}</span><span className="mt-1 block text-sm leading-relaxed text-muted">{link.description}</span></Link></li>)}
                  </ul>
                </details> : <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[0.9375rem] transition-colors",
                    isActive(item.href) ? "text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  {navLabels[item.label] ?? item.label}
                  {isActive(item.href) && (
                    <motion.span aria-hidden layoutId="nav-underline" className="absolute inset-x-3.5 -bottom-0.5 h-px bg-link" />
                  )}
                </Link>}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={pageCopy.text_002}
            className="site-button inline-flex min-h-11 items-center rounded-full bg-ink px-3 text-sm font-medium text-paper transition-colors hover:bg-link active:translate-y-px sm:px-5"
          >
            {native ? labels.contact : pageCopy.text_003}</Link>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? (native ? labels.close : pageCopy.text_004) : (native ? labels.open : pageCopy.text_005)}
            className="grid size-11 place-items-center rounded-full border border-line-strong text-ink lg:hidden"
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={native ? labels.menu : pageCopy.text_006}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] z-40 overflow-y-auto bg-paper lg:hidden"
          >
            <div className="flex items-center justify-between px-5 pt-5 sm:px-8">
              <p className="text-sm font-medium text-muted">{native ? labels.nav : pageCopy.text_001}</p>
              <button type="button" onClick={() => setOpen(false)} aria-label={native ? labels.close : pageCopy.text_004} className="grid size-11 place-items-center rounded-full border border-line-strong"><X aria-hidden className="size-5" /></button>
            </div>
            <nav aria-label={native ? labels.menu : pageCopy.text_006} className="px-5 pt-6 pb-10 sm:px-8">
              <ul className="divide-y divide-line border-y border-line">
                {mainNav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i, duration: 0.25 }}
                  >
                    {item.href === "/resources" ? <div className="py-4"><p className="text-2xl font-medium tracking-tight text-ink">Resources</p><ul className="mt-2 grid gap-1">{resourceLinks.map(link => <li key={link.href}><Link href={link.href} onClick={() => setOpen(false)} aria-current={isActive(link.href) ? "page" : undefined} className={cn("flex min-h-12 items-center rounded-xl px-4 text-lg hover:bg-paper-2", isActive(link.href) ? "text-link" : "text-muted")}>{link.label}</Link></li>)}</ul></div> : <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn("flex items-center justify-between py-4 text-2xl font-medium tracking-tight", isActive(item.href) ? "text-link" : "text-ink")}
                    >
                      {navLabels[item.label] ?? item.label}
                    </Link>}
                  </motion.li>
                ))}
              </ul>
              <Link href={pageCopy.text_007} onClick={() => setOpen(false)} className="site-button mt-8 flex h-12 items-center justify-center rounded-full bg-ink text-paper font-medium">
                {native ? labels.contact : pageCopy.text_008}</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
