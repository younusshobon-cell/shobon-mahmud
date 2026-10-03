import pageCopy from "@/content/copy-components-sections-FinalCta.json";
import Image from "@/components/content/EditableImage";
import { ArrowUpRight, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { photos } from "@/lib/images";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export function FinalCta({
  title = pageCopy.text_001,
  body = pageCopy.text_002,
}: { title?: string; body?: string }) {
  return (
    <section aria-labelledby="cta-heading" className="bg-paper-2">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="cta-panel relative isolate grid gap-10 overflow-hidden rounded-[28px] border border-line bg-paper p-6 sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-16 lg:p-14">
          <div>
            <p className="mb-5 text-sm font-medium text-link">{pageCopy.text_008}</p>
            <h2 id="cta-heading" className="t-h2 max-w-2xl text-ink">{title}</h2>
            <p className="t-lead mt-5 max-w-xl text-muted">{body}</p>
          </div>
          <div className="relative rounded-[22px] border border-line bg-white/80 p-6 sm:p-7">
            <Image src={photos.casual.src} alt={pageCopy.text_003} width={56} height={56} className="size-14 rounded-full object-cover ring-4 ring-paper-2" />
            <div className="mt-6 flex flex-col gap-3">
              <ButtonLink href={pageCopy.text_004}>{pageCopy.text_005}<ArrowUpRight aria-hidden className="size-4 shrink-0" /></ButtonLink>
              {siteConfig.email ? <ButtonLink href={`mailto:${siteConfig.email}`} variant="secondary"><Mail aria-hidden className="size-4 shrink-0" />{pageCopy.text_006}</ButtonLink> : null}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted">{pageCopy.text_007}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
