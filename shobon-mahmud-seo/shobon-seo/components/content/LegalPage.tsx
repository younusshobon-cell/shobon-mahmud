import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: React.ReactNode }) {
  return (
    <Container className="pt-10 pb-24 sm:pt-14">
      <Breadcrumbs items={[{ name: title, href: path }]} />
      <div className="max-w-2xl">
        <h1 className="t-h1 text-ink">{title}</h1>
        <p className="mt-4 text-sm text-muted">Last updated {updated}</p>
        <div className="prose-article mt-10">{children}</div>
      </div>
    </Container>
  );
}
