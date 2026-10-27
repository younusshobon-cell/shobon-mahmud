import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/content/PageHero";
import { Section } from "@/components/content/Section";
import { ButtonLink } from "@/components/ui/Button";
export const metadata = buildMetadata({ title: "Free Tools", description: "Practical tools to help you review your website and plan your next marketing move.", path: "/free-tools", noindex: true });
export default function Page() {
  return <><PageHero crumbs={[{name: "Resources", href: "/resources"}, {name: "Free Tools", href: "/free-tools"}]} kicker="Resources" title="Free Tools" intro="Practical tools to help you review your website and plan your next marketing move." />
    <Section className="pt-0 sm:pt-0 lg:pt-0"><div className="max-w-3xl rounded-3xl border border-line bg-paper-2 p-8 sm:p-12"><p className="text-sm font-medium text-link">Coming soon</p><h2 className="t-h2 mt-4 text-ink">A home for useful, free tools.</h2><p className="mt-5 leading-relaxed text-muted">Free tools will appear here as they become available. For now, the blog offers guides you can use to review and improve your website.</p><div className="mt-7 flex flex-wrap gap-3"><ButtonLink href="/blog">Explore the blog</ButtonLink><ButtonLink href="/resources" variant="secondary">All resources</ButtonLink></div></div></Section></>;
}
