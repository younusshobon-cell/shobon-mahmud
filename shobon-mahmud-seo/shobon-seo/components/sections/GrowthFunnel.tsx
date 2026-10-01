"use client";
import pageCopy from "@/content/copy-components-sections-GrowthFunnel.json";

import { motion } from "motion/react";

const stages = [
  { name: pageCopy.text_001, body: pageCopy.text_002 },
  { name: "Content", body: pageCopy.text_003 },
  { name: pageCopy.text_004, body: pageCopy.text_005 },
  { name: "Authority", body: pageCopy.text_006 },
  { name: "Visibility", body: pageCopy.text_007 },
  { name: pageCopy.text_008, body: pageCopy.text_009 },
  { name: "Conversions", body: pageCopy.text_010 },
  { name: "Revenue", body: pageCopy.text_011 },
];

/**
 * Bars narrow as volume falls through the system and grow brighter as
 * value rises — the whole argument of the section in one picture.
 */
export function GrowthFunnel() {
  const n = stages.length;
  return (
    <ol className="space-y-2.5">
      {stages.map((s, i) => {
        const width = 100 - (i / (n - 1)) * 62;
        const strength = 0.14 + (i / (n - 1)) * 0.86;
        return (
          <li key={s.name} className="grid gap-1.5 sm:grid-cols-[1fr_1.1fr] sm:items-center sm:gap-6">
            <div className="relative h-11">
              <motion.div
                className="absolute inset-y-0 left-0 flex items-center rounded-lg px-4"
                style={{ backgroundColor: `color-mix(in srgb, var(--color-link-night) ${Math.round(strength * 100)}%, var(--color-night-2))` }}
                initial={{ width: "18%" }}
                whileInView={{ width: `${width}%` }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={`truncate text-sm font-medium ${strength > 0.55 ? "text-night" : "text-on-night"}`}>{s.name}</span>
              </motion.div>
            </div>
            <p className="text-sm leading-relaxed text-on-night-muted">{s.body}</p>
          </li>
        );
      })}
    </ol>
  );
}
