import Image from "next/image";
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
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact">Start a Conversation</ButtonLink>
            <ButtonLink href="/portfolio" variant="secondary">View My Work</ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
