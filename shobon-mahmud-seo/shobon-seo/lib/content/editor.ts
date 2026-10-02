import type { Block, Post } from './types';
export const reservedSlugs = new Set(['admin', 'api', 'blog', 'services', 'industries', 'locations', 'portfolio', 'about', 'contact', 'privacy', 'terms', 'sitemaps', 'sitemap', 'robots', 'uploads', 'assets', 'icon']);
export type CustomPage = {
    slug: string;
    title: string;
    description: string;
    body: string;
    status: 'draft' | 'published';
    seoTitle?: string;
    updated: string;
};
export function slugify(text: string) { return text.normalize('NFKD').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 100); }
export function toMarkdown(sections:Post['sections']) {return sections.map(s=>`## ${s.heading}\n\n`+s.blocks.map(b=>b.type==='ul'||b.type==='ol'?b.items.map((x,i)=>`${b.type==='ul'?'-':`${i+1}.`} ${x}`).join('\n'):b.type==='heading'?`${'#'.repeat(b.level)} ${b.text}`:b.type==='image'?b.caption||b.alt:b.type==='table'?[b.headers,...b.rows].map(row=>row.join(' | ')).join('\n'):b.type==='h3'?`### ${b.text}`:b.type==='quote'?`> ${b.text}`:b.text).join('\n\n')).join('\n\n');}
export function parseMarkdown(body: string, previous: Post["sections"] = []): Post['sections'] {
    const sections: Post['sections'] = [];
    let section: Post['sections'][number] = { id: 'introduction', heading: 'Introduction', blocks: [] };
    let paragraph: string[] = [];
    const flush = () => { if (paragraph.length) {
        section.blocks.push({ type: 'p', text: paragraph.join('\n') });
        paragraph = [];
    } };
    const finish = () => { flush(); if (section.blocks.length)
        sections.push(section); };
    for (const raw of body.replace(/\r/g, '').split('\n')) {
        const line = raw.trim();
        if (line.startsWith('## ')) {
            finish();
            section = { id: `section-${sections.length + 1}`, heading: line.slice(3), blocks: [] };
        }
        else if (!line) {
            flush();
        }
        else if (line.startsWith('### ')) {
            flush();
            section.blocks.push({ type: 'h3', text: line.slice(4) });
        }
        else if (line.startsWith('> ')) {
            flush();
            section.blocks.push({ type: 'quote', text: line.slice(2) });
        }
        else if (/^(- |\d+\. )/.test(line)) {
            flush();
            const type = line.startsWith('- ') ? 'ul' : 'ol';
            const last = section.blocks.at(-1);
            const item = line.replace(/^(- |\d+\. )/, '');
            if (last?.type === type)
                (last as {
                    items: string[];
                }).items.push(item);
            else
                section.blocks.push({ type, items: [item] } as Block);
        }
        else
            paragraph.push(raw);
    }
    finish();
    const used = new Set<string>();
    const reserved = new Set(previous.map(p => p.id));
    return sections.map((s, i) => { const existing = previous.find(p => p.heading === s.heading && !used.has(p.id)); let id = existing?.id || `section-${i + 1}`; if (!existing) {
        let n = i + 1;
        while (used.has(id) || reserved.has(id))
            id = `section-${++n}`;
    } used.add(id); return { ...s, id }; });
}
