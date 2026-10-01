
import pageCopy from "@/content/copy-components-sections-Hero.json";
import Image from "next/image";
import { Search } from "lucide-react";
import { photos } from "@/lib/images";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SerpSnippet } from "./SerpSnippet";

export function Hero() {
  return (
    <section className="hero-surface" data-hero-theme="international">
      <Container className="grid gap-12 pt-10 pb-16 sm:pt-16 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-16 lg:pt-20 lg:pb-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white py-1.5 pr-4 pl-3 text-sm text-ink-2 shadow-[0_1px_0_rgba(15,26,43,0.04)]">
            <Search aria-hidden className="size-3.5 text-link" strokeWidth={2.25} />
            {pageCopy.text_001}</p>
          <h1 className="t-display mt-7 max-w-[15ch] text-ink">{pageCopy.text_002}</h1>
          <p className="t-lead mt-7 max-w-[58ch] text-muted">
            {pageCopy.text_003}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={pageCopy.text_004}>{pageCopy.text_005}</ButtonLink>
            <ButtonLink href={pageCopy.text_006} variant="secondary">{pageCopy.text_007}</ButtonLink>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">{pageCopy.text_008}</p>
        </div>

        <div className="relative mx-auto w-full max-w-[460px] lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-night">
            <Image
              src={photos.studio.src}
              alt={photos.studio.alt}
              fill
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 460px, (min-width: 640px) 460px, 100vw"
              className="object-cover object-[50%_30%]"
            />
          </div>
          <SerpSnippet
            className="absolute -bottom-8 left-3 right-3 sm:-left-8 sm:right-auto sm:w-[340px] lg:-left-14"
            siteName={siteConfig.name}
            url={siteConfig.url}
            path="services"
            title={pageCopy.text_009}
            description={pageCopy.text_010}
          />
        </div>
      </Container>
    </section>
  );
}
