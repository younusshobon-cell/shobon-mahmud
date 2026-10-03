"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Progressive enhancement: content stays visible with JS disabled or reduced motion. */
export function SiteMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    const start = () => {
      observer?.disconnect();
      if (preference.matches || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (entry.target.matches(".interactive-card, [data-motion-step]")) {
            const siblings = Array.from(entry.target.parentElement?.children ?? []);
            (entry.target as HTMLElement).style.setProperty("--reveal-delay", `${(siblings.indexOf(entry.target) % 3) * 60}ms`);
          }
          entry.target.classList.add("section-enter");
          observer?.unobserve(entry.target);
        }
      }, { threshold: 0, rootMargin: "0px 0px -32px 0px" });
      document.querySelectorAll("main section:not(.hero-surface) > div, main > article > header, main .context-cta, main .interactive-card, main [data-motion-step]").forEach((element) => {
        if (!element.closest(".prose-article") && !element.classList.contains("section-enter")) observer?.observe(element);
      });
    };
    start();
    preference.addEventListener("change", start);
    return () => { observer?.disconnect(); preference.removeEventListener("change", start); };
  }, [pathname]);
  return null;
}
