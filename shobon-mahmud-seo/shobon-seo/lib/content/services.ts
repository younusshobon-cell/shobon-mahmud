import cms_services from "@/content/services-services.json";
import type { Service } from "./types";

export const services: Service[] = cms_services as Service[];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);
export const getServices = (slugs: string[]) =>
  slugs.map((s) => getService(s)).filter((s): s is Service => Boolean(s));
