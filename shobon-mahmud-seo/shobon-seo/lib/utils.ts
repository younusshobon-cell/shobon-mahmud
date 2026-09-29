import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function absoluteUrl(path = "/", base: string) {
  return new URL(path, base).toString();
}

export function isPlaceholder(value: string) {
  return /\[[^\]]+\]/.test(value);
}

export function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function readingMinutes(words: number) {
  return Math.max(1, Math.round(words / 220));
}
