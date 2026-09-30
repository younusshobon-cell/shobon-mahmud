import { heroTheme } from "@/lib/hero-theme";
import { Container } from "@/components/ui/Container";
import { FAQ } from "./FAQ";
import { privacyFaqs, termsFaqs } from "@/lib/content/faqs";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: React.ReactNode }) {
  return (
    <>
    <section className="hero-surface" style={heroTheme(path)}>
      <Container className="pt-10 pb-10 sm:pt-14">
      <Breadcrumbs items={[{ name: title, href: path }]} />
      <div className="max-w-2xl">
        <h1 className="t-h1 text-ink">{title}</h1>
        <p className="mt-4 text-sm text-muted">Last updated {updated}</p>
      </div>
      </Container>
    </section>
    <Container className="pb-24">
      <div className="prose-article max-w-2xl pt-10">{children}</div>
      <div className="mt-16 border-t border-line pt-12"><FAQ faqs={path === "/privacy" ? privacyFaqs : termsFaqs} title={`${title}: common questions`} /></div>
    </Container>
    </>
  );
}
