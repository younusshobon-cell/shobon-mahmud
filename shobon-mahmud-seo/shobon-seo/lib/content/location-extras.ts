import cms_locationExtras from "@/content/location-extras-locationExtras.json";
import type { FAQ, Point } from "./types";

/** Editorial market themes, not forecasts or promises of sector growth. */
export const locationExtras: Record<
  string,
  {
    eyebrow: string;
    palette: string;
    sectors: Point[];
    searchPaths: Point[];
    faqs: FAQ[];
    source: { label: string; href: string };
  }
> = cms_locationExtras as Record<
  string,
  {
    eyebrow: string;
    palette: string;
    sectors: Point[];
    searchPaths: Point[];
    faqs: FAQ[];
    source: { label: string; href: string };
  }
>;
