import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { photos } from "@/lib/images";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export function FinalCta({
  title = "Have a search problem worth solving?",
  body = "Tell me what you're trying to grow, where search is getting stuck, and what you've already tried.",
}: { title?: string; body?: string }) {
  return (
    <section aria-labelledby="cta-heading" className="bg-paper-2">
      <Container className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Image src={photos.casual.src} alt="" width={72} height={72} className="mx-auto size-[72px] rounded-full object-cover ring-4 ring-paper" />
          <h2 id="cta-heading" className="t-h1 mt-8 text-ink">{title}</h2>
          <p className="t-lead mx-auto mt-6 max-w-xl text-muted">{body}</p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/contact">Discuss My SEO Goals</ButtonLink>
            {siteConfig.email ? <ButtonLink href={`mailto:${siteConfig.email}`} variant="secondary">Email Me Directly</ButtonLink> : null}
          </div>
          <p className="mt-4 text-sm text-muted">Start with your website and what you want to improve. We can arrange a call if it&apos;s a fit.</p>
        </div>
      </Container>
    </section>
  );
}
