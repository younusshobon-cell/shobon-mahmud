import type { CSSProperties } from "react";

const palettes = [
  ["#e6effb", "#e4f2ef"], // blue / jade
  ["#eee9fb", "#f5e9ee"], // lilac / rose
  ["#f6eadc", "#edf2dd"], // sand / sage
  ["#e1f1ed", "#e9eefb"], // mint / slate
  ["#f8e7e2", "#f7efdb"], // clay / cream
  ["#e8eafb", "#e9f2e2"], // periwinkle / olive
  ["#e2f0f4", "#f4e9de"], // sea / limestone
  ["#f2e7f1", "#e3eef3"], // mauve / ice
];

/** Stable route-based variations, rendered on the server without extra JS. */
export function heroTheme(key: string): CSSProperties {
  const hash = Array.from(key).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const [start, end] = palettes[hash % palettes.length];
  return {
    "--hero-start": start,
    "--hero-end": end,
    "--hero-grid-x": `${32 + (hash % 4) * 8}px`,
    "--hero-grid-y": `${32 + (hash % 3) * 8}px`,
  } as CSSProperties;
}
