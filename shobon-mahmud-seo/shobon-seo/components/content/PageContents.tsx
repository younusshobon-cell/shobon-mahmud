import { Container } from "@/components/ui/Container";

export function PageContents({ label, items }: { label: string; items: { id: string; label: string }[] }) {
  return <nav aria-label={label} className="page-contents border-b border-line bg-paper">
    <Container className="flex flex-wrap items-center gap-2 py-5">
      <span className="me-2 text-xs font-semibold uppercase tracking-wider text-muted">On this page</span>
      {items.map(item => <a key={item.id} href={`#${item.id}`} className="rounded-full border border-line px-4 py-2 text-sm font-medium text-ink">{item.label}</a>)}
    </Container>
  </nav>;
}
