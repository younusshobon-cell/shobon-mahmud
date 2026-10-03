"use client";
import pageCopy from "@/content/copy-components-blog-BlogSearch.json";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { Search } from "lucide-react";

export type SearchEntry = { slug: string; title: string; description: string; category: string };

/** Client-side search over a small index. Listing pages stay fully server-rendered. */
export function BlogSearch({ index }: { index: SearchEntry[] }) {
  const [q, setQ] = useState("");
  const id = useId();
  const resultsId = `${id}-results`;
  const [focused, setFocused] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const showResults = focused && !dismissed && q.trim().length >= 2;
  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (term.length < 2) return [];
    return index.filter((e) => `${e.title} ${e.description} ${e.category}`.toLowerCase().includes(term)).slice(0, 8);
  }, [q, index]);

  return (
    <div className="relative w-full max-w-md" onFocus={() => setFocused(true)} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
    }} onKeyDown={(event) => {
      if (event.key === "Escape") { event.preventDefault(); setDismissed(true); }
    }}>
      <label htmlFor={id} className="sr-only">{pageCopy.text_001}</label>
      <div className="flex h-12 items-center gap-3 rounded-full border border-line-strong bg-white px-4 focus-within:border-ink">
        <Search aria-hidden className="size-4 text-muted" />
        <input
          id={id}
          type="search"
          value={q}
          onChange={(e) => { setQ(e.target.value); setDismissed(false); }}
          aria-expanded={showResults}
          aria-controls={showResults ? resultsId : undefined}
          placeholder={pageCopy.text_002}
          autoComplete="off"
          className="h-full w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
        />
      </div>
      <p role="status" aria-live="polite" className="sr-only">{showResults ? `${results.length} ${pageCopy.text_003}` : ""}</p>
      {showResults && (
        <div id={resultsId} className="absolute inset-x-0 top-14 z-20 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_18px_40px_-18px_rgba(15,26,43,0.3)]">
          {results.length ? (
            <ul className="divide-y divide-line">
              {results.map((r) => (
                <li key={r.slug}>
                  <Link href={`/blog/${r.slug}`} className="block px-5 py-3.5 hover:bg-paper-2">
                    <span className="block text-xs text-link">{r.category}</span>
                    <span className="mt-0.5 block text-[0.9375rem] font-medium text-ink">{r.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-5 py-4 text-sm text-muted">{pageCopy.text_004}{q}{pageCopy.text_005}</p>
          )}
        </div>
      )}
    </div>
  );
}
