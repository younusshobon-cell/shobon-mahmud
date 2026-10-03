"use client";
import pageCopy from "@/content/copy-components-layout-Navbar.json";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { mainNav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

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

        <nav aria-label={pageCopy.text_001} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[0.9375rem] transition-colors",
                    isActive(item.href) ? "text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span aria-hidden layoutId="nav-underline" className="absolute inset-x-3.5 -bottom-0.5 h-px bg-link" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={pageCopy.text_002}
            className="site-button inline-flex min-h-11 items-center rounded-full bg-ink px-3 text-sm font-medium text-paper transition-colors hover:bg-link active:translate-y-px sm:px-5"
          >
            {pageCopy.text_003}</Link>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? pageCopy.text_004 : pageCopy.text_005}
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
            aria-label={pageCopy.text_006}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] z-40 overflow-y-auto bg-paper lg:hidden"
          >
            <div className="flex items-center justify-between px-5 pt-5 sm:px-8">
              <p className="text-sm font-medium text-muted">{pageCopy.text_001}</p>
              <button type="button" onClick={() => setOpen(false)} aria-label={pageCopy.text_004} className="grid size-11 place-items-center rounded-full border border-line-strong"><X aria-hidden className="size-5" /></button>
            </div>
            <nav aria-label={pageCopy.text_006} className="px-5 pt-6 pb-10 sm:px-8">
              <ul className="divide-y divide-line border-y border-line">
                {mainNav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i, duration: 0.25 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn("flex items-center justify-between py-4 text-2xl font-medium tracking-tight", isActive(item.href) ? "text-link" : "text-ink")}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <Link href={pageCopy.text_007} onClick={() => setOpen(false)} className="site-button mt-8 flex h-12 items-center justify-center rounded-full bg-ink text-paper font-medium">
                {pageCopy.text_008}</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
