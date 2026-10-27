import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { resourceLinks } from "@/lib/resources";
import { PageHero } from "@/components/content/PageHero";
import { Section } from "@/components/content/Section";
export const metadata = buildMetadata({title: "Resources — Blog, Insights & Free Tools", description: "Explore Shobon Mahmud’s practical guides, insights and upcoming free tools for SEO, content and digital growth.", path: "/resources"});
export default function ResourcesPage() { return <><PageHero crumbs={[{name: "Resources", href: "/resources"}]} kicker="Learn & explore" title="Resources for your next growth decision." intro="Find practical guides in the blog, explore new perspectives in Insights, and check back for free tools." /><Section className="pt-0 sm:pt-0 lg:pt-0"><div className="grid gap-5 md:grid-cols-3">{resourceLinks.map((item,i)=><Link key={item.href} href={item.href} className="group rounded-3xl border border-line bg-paper p-7 transition-colors hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-4"><div className="flex items-center justify-between text-link"><span className="text-sm">0{i+1}</span><ArrowUpRight aria-hidden size={24}/></div><h2 className="t-h3 mt-8 text-ink">{item.label}</h2><p className="mt-4 leading-relaxed text-muted">{item.description}</p><p className="mt-6 text-sm font-medium text-link">{i===0 ? "Read the guides" : "Coming soon"}</p></Link>)}</div></Section></>; }
