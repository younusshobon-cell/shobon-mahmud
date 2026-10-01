import cms_portfolioFilters from "@/content/case-studies-portfolioFilters.json";
import cms_caseStudies from "@/content/case-studies-caseStudies.json";
import type { CaseStudy, PortfolioFilter } from "./types";

/** Complete illustrative strategies. No client performance data or measured outcome is implied. */
export const portfolioFilters: {
  value: "all" | PortfolioFilter;
  label: string;
}[] = cms_portfolioFilters as {
  value: "all" | PortfolioFilter;
  label: string;
}[];

export const caseStudies: CaseStudy[] = cms_caseStudies as CaseStudy[];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);

export const caseStudiesFor = (opts: {
  industry?: string;
  service?: string;
  exclude?: string;
  limit?: number;
}) => {
  const list = caseStudies.filter(
    (c) =>
      c.slug !== opts.exclude &&
      (!opts.industry || c.industry === opts.industry) &&
      (!opts.service || c.services.includes(opts.service)),
  );
  return list.slice(0, opts.limit ?? 3);
};
