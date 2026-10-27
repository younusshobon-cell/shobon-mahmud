import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/content/PageHero";
import { Section } from "@/components/content/Section";
import { ButtonLink } from "@/components/ui/Button";
export const metadata = buildMetadata({ title: "Insights", description: "Perspectives on search, content and the decisions behind digital growth.", path: "/insights", noindex: true });
export default function Page() {
  return <><PageHero crumbs={[{name: "Resources", href: "/resources"}, {name: "Insights", href: "/insights"}]} kicker="Resources" title="Insights" intro="Perspectives on search, content and the decisions behind digital growth." />
    <Section className="pt-0 sm:pt-0 lg:pt-0"><div className="max-w-3xl rounded-3xl border border-line bg-paper-2 p-8 sm:p-12"><p className="text-sm font-medium text-link">Coming soon</p><h2 className="t-h2 mt-4 text-ink">New insights are on the way.</h2><p className="mt-5 leading-relaxed text-muted">This section will bring together focused observations and ideas. In the meantime, explore the practical guides in the blog.</p><div className="mt-7 flex flex-wrap gap-3"><ButtonLink href="/blog">Explore the blog</ButtonLink><ButtonLink href="/resources" variant="secondary">All resources</ButtonLink></div></div></Section></>;
}
