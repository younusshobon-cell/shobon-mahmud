import cms_locations from "@/content/locations-locations.json";
import type { Location } from "./types";

/**
 * Location pages describe how Shobon works WITH businesses in each market (remotely).
 * They must never imply a physical office that doesn't exist — which is why
 * no LocalBusiness schema is used on these pages.
 */
export const locations: Location[] = cms_locations as Location[];

export const getLocation = (slug: string) =>
  locations.find((l) => `seo-consultant-${l.slug}` === slug);
