import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { photos } from "@/lib/images";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { SocialLinks } from "@/components/layout/SocialLinks";

export const metadata: Metadata = buildMetadata({
  title: "Contact — Let's Talk About Your SEO Goals",
  description: "Get in touch with Shobon Mahmud about SEO for your business. Share what you're trying to grow and where search is getting stuck.",
  path: "/contact",
});

const next = [
  "I read your message and look at your site and search visibility.",
  "I reply with initial thoughts and any questions.",
  "If it looks like a fit, we set up a call to go deeper.",
];
const contactEmail = siteConfig.email || "younusshobon@gmail.com";

export default function ContactPage() {
  return (
    <Container className="pt-10 pb-20 sm:pt-14 lg:pb-28">
      <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />
      <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <div>
          <h1 className="t-h1 text-ink">Let&apos;s talk about your SEO goals.</h1>
          <p className="t-lead mt-6 max-w-xl text-muted">
            Tell me what you&apos;re trying to grow, where search is getting stuck, and what you&apos;ve already tried. The more specific, the more useful my reply.
          </p>
          <div className="mt-12"><ContactForm fallbackEmail={contactEmail} /></div>
        </div>
        <aside className="space-y-10 lg:pt-4">
          <div className="flex items-center gap-4">
            <Image src={photos.formal.src} alt={photos.formal.alt} width={80} height={100} className="h-24 w-20 rounded-2xl object-cover object-top" />
            <div>
              <p className="font-semibold text-ink">{siteConfig.name}</p>
              <p className="text-sm text-muted">{siteConfig.jobTitle}</p>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-medium text-ink">What happens next</h2>
            <ol className="mt-4 space-y-4">
              {next.map((n, i) => (
                <li key={n} className="grid grid-cols-[1.75rem_1fr] text-[0.9375rem] leading-relaxed text-ink-2">
                  <span className="tabular-nums text-link">{i + 1}.</span>{n}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="text-sm font-medium text-ink">Elsewhere</h2>
            <SocialLinks className="mt-3 flex-col gap-y-2" />
            <p className="mt-3 text-sm text-muted">Prefer email? <a className="underline underline-offset-2" href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
          </div>
        </aside>
      </div>
    </Container>
  );
}
