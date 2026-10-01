import cms_serviceSearchFaqs from "@/content/service-search-faqs-serviceSearchFaqs.json";
import type { FAQ } from "./types";

/** Specific buyer questions, paired with the three editorial FAQs on each service. */
export const serviceSearchFaqs: Record<string, FAQ[]> =
  cms_serviceSearchFaqs as Record<string, FAQ[]>;
