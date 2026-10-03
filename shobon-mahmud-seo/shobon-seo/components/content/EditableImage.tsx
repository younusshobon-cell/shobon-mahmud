"use client";
import NextImage, { type ImageProps } from "next/image";
import { usePathname } from "next/navigation";
import type { ImgHTMLAttributes, ReactNode } from "react";
import pageImages from "@/content/page-images.json";
import { cn } from "@/lib/utils";
export type PageImage = {page: string; key: string; src: string; alt: string};
const images = pageImages as PageImage[];
function source(src: ImageProps["src"]) {
  return typeof src === "string" ? src : "default" in src ? src.default.src : src.src;
}
export function imageKey(src: string, alt: string) {
  // Static import hashes change when an original portrait is replaced.
  return JSON.stringify([src.replace(/\.[a-f0-9]{8,}\./g, "."), alt]);
}
function useOverride(key: string) {
  const page = usePathname();
  return images.find(item => item.page === page && item.key === key);
}
export default function EditableImage(props: ImageProps) {
  const original = source(props.src), key = imageKey(original, props.alt);
  const override = useOverride(key);
  return <NextImage {...props} data-page-image-key={key} data-original-src={original} data-original-alt={props.alt}
    {...(override ? {src: override.src, alt: override.alt, placeholder: "empty", blurDataURL: undefined, unoptimized: true, overrideSrc: undefined} : {})}/>;
}
export function EditableInlineImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const original = typeof props.src === "string" ? props.src : "", alt = props.alt || "", key = imageKey(original, alt);
  const override = useOverride(key);
  return <img {...props} data-page-image-key={key} data-original-src={original} data-original-alt={alt}
    {...(override ? {src: override.src, alt: override.alt, srcSet: undefined} : {})}/>;
}
export function HeroImageLayout({children, aside, alt}: {children: ReactNode; aside?: ReactNode; alt: string}) {
  const override = useOverride("hero");
  return <div className={cn("grid gap-10", (aside || override) && "lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16")}>
    {children}
    <div data-page-image-slot="hero" data-original-alt={alt} data-has-original-aside={Boolean(aside)} hidden={!aside && !override} className="lg:self-center">
      <div data-page-image-original hidden={Boolean(override)}>{aside}</div>
      {override && <img data-page-image-replacement src={override.src} alt={override.alt} fetchPriority="high" className="h-auto w-full rounded-[28px]"/>}
    </div>
  </div>;
}
