"use client";
import pageCopy from "@/content/copy-components-maps-LocalMap.json";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

/**
 * Lazy Google Maps embed. The iframe is only created when the map scrolls
 * near the viewport, so it never affects initial load or LCP.
 * Uses NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY if set (Embed API keys are designed to be
 * public — restrict it by HTTP referrer in Google Cloud). Falls back to the keyless embed.
 */
export function LocalMap({ lat, lng, label, zoom = 12 }: { lat: number; lng: number; label: string; zoom?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;
  const src = key
    ? `https://www.google.com/maps/embed/v1/view?key=${key}&center=${lat},${lng}&zoom=${zoom}`
    : `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;

  return (
    <div ref={ref} className="relative aspect-[16/10] w-full overflow-hidden rounded-[var(--radius-panel)] border border-line bg-paper-2 sm:aspect-[21/9]">
      {visible ? (
        <iframe
          src={src}
          title={`Map of ${label}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0 grayscale-[30%]"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-sm text-muted">
          <span className="inline-flex items-center gap-2"><MapPin aria-hidden className="size-4" /> {pageCopy.text_001}{label}</span>
        </div>
      )}
    </div>
  );
}
