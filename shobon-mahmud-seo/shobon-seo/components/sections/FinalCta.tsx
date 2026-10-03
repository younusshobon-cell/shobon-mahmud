
import pageCopy from "@/content/copy-components-sections-FinalCta.json";
import Image from "@/components/content/EditableImage";
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
      <Container className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Image src={photos.casual.src} alt={pageCopy.text_003} width={72} height={72} className="mx-auto size-[72px] rounded-full object-cover ring-4 ring-paper" />
          <h2 id="cta-heading" className="t-h1 mt-8 text-ink">{title}</h2>
          <p className="t-lead mx-auto mt-6 max-w-xl text-muted">{body}</p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={pageCopy.text_004}>{pageCopy.text_005}</ButtonLink>
            {siteConfig.email ? <ButtonLink href={`mailto:${siteConfig.email}`} variant="secondary">{pageCopy.text_006}</ButtonLink> : null}
          </div>
          <p className="mt-4 text-sm text-muted">{pageCopy.text_007}</p>
        </div>
      </Container>
    </section>
  );
}
