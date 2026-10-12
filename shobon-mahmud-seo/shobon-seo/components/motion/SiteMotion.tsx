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

  useEffect(() => {
    // Service and industry hubs/details share progressive buyer-journey motion.
    // Location motion retains its existing scope, including translated pages.
    if (!/^(?:\/(?:ar|bn))?\/locations\/[^/]+\/?$/.test(pathname) &&
        !/^\/(?:services|industries)(?:\/[^/]+)?\/?$/.test(pathname)) return;
    const main = document.querySelector("main");
    if (!main) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    let observer: IntersectionObserver | undefined;
    main.classList.add("page-motion");
    const cancel = () => {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
    const enter = (element: HTMLElement, delay: number, media = false) => {
      if (typeof element.animate !== "function") return;
      const animation = element.animate([
        { opacity: 0.65, transform: media ? "scale(.97)" : "translateY(18px)" },
        { opacity: 1, transform: media ? "scale(1)" : "translateY(0)" },
      ], { duration: media ? 850 : 650, delay, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" });
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    };
    const start = () => {
      cancel();
      if (preference.matches) return;
      const hero = main.querySelector(".hero-surface");
      hero?.querySelectorAll<HTMLElement>("h1, .t-lead, .site-button, .hero-media").forEach((element, index) => {
        enter(element, Math.min(index * 90, 360), element.matches(".hero-media"));
      });
      if (!("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          const siblings = Array.from(element.parentElement?.children ?? []);
          enter(element, (siblings.indexOf(element) % 3) * 90);
          observer?.unobserve(element);
        });
      }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });
      main.querySelectorAll<HTMLElement>("section ul.grid > li, section ol.grid > li, section .grid > a, section .grid > article, .hero-grid-band .grid > *, .location-section-nav a, .page-contents a").forEach((element) => {
        if (!element.closest(".hero-surface") && !element.matches("[data-motion-step], .interactive-card")) observer?.observe(element);
      });
    };
    start();
    preference.addEventListener("change", start);
    return () => {
      cancel();
      preference.removeEventListener("change", start);
      main.classList.remove("page-motion");
    };
  }, [pathname]);
  return null;
}
