import { ExperienceHero } from "@/components/content/ExperienceHero";
import { PageSchema } from "@/components/seo/PageSchema";
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { customPages } from '@/lib/content/pages';
import { MarkdownBody } from '@/components/content/MarkdownBody';
import { siteConfig } from '@/lib/site';
export const dynamicParams = false;
export function generateStaticParams() { return customPages.map(p => ({ slug: [p.slug] })); }
async function pageFor(params: Promise<{
    slug: string[];
}>) { const { slug } = await params; const page = customPages.find(p => p.slug === slug.join('/')); if (!page)
    notFound(); return page; }
export async function generateMetadata({ params }: {
    params: Promise<{
        slug: string[];
    }>;
}): Promise<Metadata> { const p = await pageFor(params); return { title: p.seoTitle || p.title, description: p.description, alternates: { canonical: `${siteConfig.url}/${p.slug}` }, openGraph: { title: p.seoTitle || p.title, description: p.description, url: `${siteConfig.url}/${p.slug}` } }; }
export default async function Page({ params }: {
    params: Promise<{
        slug: string[];
    }>;
}) { const p = await pageFor(params); return <><PageSchema path={`/${p.slug}`} /><ExperienceHero crumbs={[{name:p.title,href:`/${p.slug}`}]} title={p.title} intro={p.description}/><article className="mx-auto max-w-4xl px-6 py-20"><MarkdownBody body={p.body}/></article></>; }
