"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";

export function ScrollJourney() {
  const pathname = usePathname();
  const progressRef = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    let frame = 0;
    let previousVisible = false;
    setShowTop(false);
    const update = () => {
      frame = 0;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? Math.min(1, Math.max(0, window.scrollY / height)) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      const visible = window.scrollY > 700;
      if (visible !== previousVisible) { previousVisible = visible; setShowTop(visible); }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : undefined;
    observer?.observe(document.body);
    return () => { cancelAnimationFrame(frame); observer?.disconnect(); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, [pathname]);
  return <>
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]"><div ref={progressRef} className="h-full origin-left scale-x-0 bg-link" /></div>
    <button hidden={!showTop} type="button" aria-label="Back to top" className={`back-to-top fixed right-4 bottom-4 z-30 size-11 place-items-center rounded-full border border-line-strong bg-paper text-ink shadow-lg sm:right-6 sm:bottom-6 ${showTop ? "grid" : "hidden"}`}
      onClick={() => { window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); document.getElementById("main")?.focus({ preventScroll: true }); }}>
      <ArrowUp aria-hidden className="size-5" />
    </button>
  </>;
}
