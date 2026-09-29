"use client";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Heading = { id: string; heading: string };

function List({ items, active }: { items: Heading[]; active: string }) {
  return (
    <ol className="space-y-1 border-l border-line">
      {items.map((h) => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            aria-current={active === h.id ? "location" : undefined}
            className={cn(
              "-ml-px block border-l py-1.5 pl-4 text-sm leading-snug transition-colors",
              active === h.id ? "border-link text-ink" : "border-transparent text-muted hover:text-ink",
            )}
          >
            {h.heading}
          </a>
        </li>
      ))}
    </ol>
  );
}

export function TableOfContents({ items }: { items: Heading[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <>
      {/* Mobile: collapsible */}
      <details className="group rounded-[var(--radius-card)] border border-line lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-medium text-ink [&::-webkit-details-marker]:hidden">
          On this page
          <ChevronDown aria-hidden className="size-4 transition-transform group-open:rotate-180" />
        </summary>
        <nav aria-label="Table of contents" className="px-5 pb-5"><List items={items} active={active} /></nav>
      </details>
      {/* Desktop: sticky */}
      <nav aria-label="Table of contents" className="sticky top-28 hidden lg:block">
        <p className="mb-4 text-sm font-medium text-ink">On this page</p>
        <List items={items} active={active} />
      </nav>
    </>
  );
}
