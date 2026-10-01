import cms_industries from "@/content/industries-industries.json";
import type { Industry } from "./types";

export const industries: Industry[] = cms_industries as Industry[];

export const getIndustry = (slug: string) =>
  industries.find((i) => i.slug === slug);
export const getIndustries = (slugs: string[]) =>
  slugs.map((s) => getIndustry(s)).filter((i): i is Industry => Boolean(i));
