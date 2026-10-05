import { PageSchema } from "@/components/seo/PageSchema";
import pageCopy from "@/content/copy-app-contact-page.json";
import { heroTheme } from "@/lib/hero-theme";
import type { Metadata } from "next";
import Image from "@/components/content/EditableImage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { photos } from "@/lib/images";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { Section } from "@/components/content/Section";
import { FAQ } from "@/components/content/FAQ";
import { contactFaqs } from "@/lib/content/faqs";
import { SocialLinks } from "@/components/layout/SocialLinks";

export const metadata: Metadata = buildMetadata({
  title: pageCopy.text_001,
  description: pageCopy.text_002,
  path: "/contact",
});

const next = [pageCopy.text_003, pageCopy.text_004, pageCopy.text_005];
const contactEmail = siteConfig.email || "younusshobon@gmail.com";

export default function ContactPage() {
  return (
    <>
      <PageSchema path={"/contact"} />
      <section className="hero-surface" style={heroTheme("/contact")}>
        <Container className="pt-10 pb-20 sm:pt-14 lg:pb-28">
          <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />
          <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <div>
              <h1 className="t-h1 text-ink">{pageCopy.text_006}</h1>
              <p className="t-lead mt-6 max-w-xl text-muted">
                {pageCopy.text_007}
              </p>
              <div className="mt-12">
                <ContactForm fallbackEmail={contactEmail} />
              </div>
            </div>
            <aside className="space-y-10 lg:pt-4">
              <div className="flex items-center gap-4">
                <Image
                  src={photos.formal.src}
                  alt={photos.formal.alt}
                  width={80}
                  height={100}
                  className="h-24 w-20 rounded-2xl object-cover object-top"
                />
                <div>
                  <p className="font-semibold text-ink">{siteConfig.name}</p>
                  <p className="text-sm text-muted">{siteConfig.jobTitle}</p>
                </div>
              </div>
              <div>
                <h2 className="text-sm font-medium text-ink">
                  {pageCopy.text_008}
                </h2>
                <ol className="mt-4 space-y-4">
                  {next.map((n, i) => (
                    <li
                      key={n}
                      className="grid grid-cols-[1.75rem_1fr] text-[0.9375rem] leading-relaxed text-ink-2"
                    >
                      <span className="tabular-nums text-link">
                        {i + 1}
                        {pageCopy.text_009}
                      </span>
                      {n}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h2 className="text-sm font-medium text-ink">
                  {pageCopy.text_010}
                </h2>
                <SocialLinks className="mt-3 flex-col gap-y-2" />
                <p className="mt-3 text-sm text-muted">
                  {pageCopy.text_011}
                  <a
                    className="underline underline-offset-2"
                    href={`mailto:${contactEmail}`}
                  >
                    {contactEmail}
                  </a>
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
      <Section tone="muted">
        <FAQ faqs={contactFaqs} title={pageCopy.text_012} />
      </Section>
    </>
  );
}
