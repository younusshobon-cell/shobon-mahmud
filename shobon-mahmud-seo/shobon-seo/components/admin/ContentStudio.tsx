'use client';
import { useEffect, useRef, useState } from 'react';
import { Plus, Search, ArrowLeft, Save, Eye, Send, FileText, Copy } from 'lucide-react';
import { MarkdownBody } from '@/components/content/MarkdownBody';
import { slugify, toMarkdown, reservedSlugs, type CustomPage } from '@/lib/content/editor';
import type { Block, Post } from '@/lib/content/types';
import { RichTextEditor } from './RichTextEditor';
import { RichBlocks } from '@/components/content/RichBlocks';
import { articleBlocks, sectionsFromBlocks } from '@/lib/content/rich';
import categories from '@/content/blog-blogCategories.json';
type Item = Post | CustomPage;
type Form = {
    title: string;
    slug: string;
    description: string;
    body: string;
    blocks: Block[];
    seoTitle: string;
    image: string;
    category: string;
    tags: string;
    author: string;
    date: string;
};
const today = () => new Date().toISOString().slice(0, 10);
const empty = (): Form => ({ title: '', slug: '', description: '', body: '', blocks: [], seoTitle: '', image: '', category: categories[0].slug, tags: '', author: 'Shobon Mahmud', date: today() });
async function api(url: string, options?: RequestInit) { const r = await fetch(url, options), d = await r.json(); if (!r.ok)
    throw new Error(d.error || 'Request failed.'); return d; }
export function ContentStudio({ kind, publishing, onDirty, onBusy, onAdvanced, onLiveEditor }: {
    kind: 'blog' | 'pages';
    publishing: boolean;
    onDirty: (dirty: boolean) => void;
    onBusy: (busy: boolean) => void;
    onAdvanced: () => void;
    onLiveEditor: (path: string) => void;
}) {
    const id = kind === 'blog' ? 'blog-rawPosts' : 'custom-pages', [items, setItems] = useState<Item[]>([]), [sha, setSha] = useState(''), [loading, setLoading] = useState(true), [error, setError] = useState(''), [message, setMessage] = useState(''), [busy, setBusy] = useState(false), [editing, setEditing] = useState<number | null>(null), [form, setForm] = useState<Form>(empty), [baseline, setBaseline] = useState(''), [preview, setPreview] = useState(false), [search, setSearch] = useState(''), [manualSlug, setManualSlug] = useState(false);
    const textarea = useRef<HTMLTextAreaElement>(null), dirty = editing !== null && JSON.stringify(form) !== baseline;
    useEffect(() => { onDirty(dirty); return () => onDirty(false); }, [dirty, onDirty]);
    useEffect(() => { let ignore = false; api('/api/admin/content?id=' + id).then(d => { if (!ignore) {
        setItems(d.data);
        setSha(d.sha);
    } }).catch(e => { if (!ignore)
        setError(e.message); }).finally(() => { if (!ignore)
        setLoading(false); }); return () => { ignore = true; }; }, [id]);
    function choose(index: number) { if (dirty && !confirm('Discard your unsaved changes?'))
        return; const item = items[index]; const value = item ? { title: item.title, slug: item.slug, description: item.description, body: 'sections' in item ? toMarkdown(item.sections) : item.body, blocks: 'sections' in item ? articleBlocks(item) : [], seoTitle: item.seoTitle || '', image: 'image' in item ? item.image || '' : '', category: 'category' in item ? item.category : categories[0].slug, tags: 'tags' in item ? item.tags.join(', ') : '', author: 'author' in item ? item.author : 'Shobon Mahmud', date: 'date' in item ? item.date : today() } : empty(); setEditing(index); setForm(value); setBaseline(JSON.stringify(value)); setManualSlug(!!item); setPreview(false); setError(''); setMessage(''); }
    function change<K extends keyof Form>(key: K, value: Form[K]) { setForm(f => ({ ...f, [key]: value, ...(key === 'title' && !manualSlug ? { slug: slugify(String(value)) } : {}) })); setMessage(''); }
    function insert(prefix: string) { const node = textarea.current; if (!node)
        return; const start = node.selectionStart, end = node.selectionEnd; const body = form.body.slice(0, start) + (start && form.body[start - 1] !== '\n' ? '\n' : '') + prefix + (form.body.slice(start, end) || 'Your text') + '\n' + form.body.slice(end); change('body', body); node.focus(); }
    async function save(status: 'draft' | 'published') {
        if (editing === null || busy)
            return;
        setError('');
        setMessage('');
        if (!form.title.trim() || !form.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(form.slug)) {
            setError('Add a title and a URL using lowercase letters, numbers and hyphens.');
            return;
        }
        if (kind === 'pages' && reservedSlugs.has(form.slug)) {
            setError('That URL belongs to an existing website section. Choose another URL.');
            return;
        }
        if (items.some((p, i) => i !== editing && p.slug === form.slug)) {
            setError('This URL is already used. Choose a unique URL.');
            return;
        }
        if (status === 'published' && (!form.description.trim() || (kind === 'blog' ? !form.blocks.length : !form.body.trim()))) {
            setError('Add a description and body before publishing.');
            return;
        }
        const previous = items[editing];
        const common = { title: form.title.trim(), slug: form.slug, description: form.description.trim(), seoTitle: form.seoTitle.trim(), status, updated: today() };
        const value: Item = kind === 'blog' ? { ...(previous as Post || {}), ...common, date: form.date, author: form.author || 'Shobon Mahmud', category: form.category, tags: form.tags.split(',').map(x => x.trim()).filter(Boolean), image: form.image, sections: sectionsFromBlocks(form.blocks, previous && 'sections' in previous ? previous.sections : []), relatedServices: previous && 'relatedServices' in previous ? previous.relatedServices : [], relatedIndustries: previous && 'relatedIndustries' in previous ? previous.relatedIndustries : [] } : { ...common, body: form.body };
        const next = [...items];
        if (editing === -1)
            next.push(value);
        else
            next[editing] = value;
        setBusy(true);
        onBusy(true);
        try {
            const result = await api('/api/admin/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, sha, data: next }) });
            setSha(result.sha);
            setItems(next);
            setEditing(editing === -1 ? next.length - 1 : editing);
            setBaseline(JSON.stringify(form));
            setManualSlug(true);
            setMessage(status === 'draft' ? 'Draft saved. It is hidden from the website.' : `Published to the repository. Vercel is deploying /${kind === 'blog' ? 'blog/' : ''}${form.slug}.`);
        }
        catch (e) {
            setError((e as Error).message);
        }
        finally {
            setBusy(false);
            onBusy(false);
        }
    }
    async function reload() { if (dirty && !confirm('Reload from the repository and discard unsaved changes?'))
        return; setLoading(true); try {
        const d = await api('/api/admin/content?id=' + id);
        setItems(d.data);
        setSha(d.sha);
        setEditing(null);
        setError('');
        setMessage('');
    }
    catch (e) {
        setError((e as Error).message);
    }
    finally {
        setLoading(false);
    } }
    const label = kind === 'blog' ? 'article' : 'page';
    return <><div className="admin-page-heading"><div><p className="admin-eyebrow">SIMPLE CONTENT EDITOR</p><h1>{kind === 'blog' ? 'Blog' : 'Website pages'}</h1><p className="admin-muted">{kind === 'blog' ? 'Write, preview and publish articles in one place.' : 'Create a new page with its own URL and search description.'}</p></div><div className="admin-heading-actions"><button onClick={onAdvanced} disabled={busy}>Advanced collections</button><button onClick={reload} disabled={busy || loading}>Reload latest</button>{editing === null && <button className="admin-primary" onClick={() => choose(-1)} disabled={loading || busy}><Plus size={16}/> New {label}</button>}</div></div>{error && <div className="admin-notice is-error" role="alert">{error}</div>}{message && <div className="admin-notice" role="status">{message}</div>}{loading ? <section className="admin-card admin-empty">Loading latest content…</section> : editing === null ? <><label className="admin-search"><Search size={17}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${label}s…`}/></label><div className="studio-list">{items.map((item, i) => ({ item, i })).filter(({ item }) => (item.title + ' ' + item.slug).toLowerCase().includes(search.toLowerCase())).map(({ item, i }) => <button className="admin-card studio-item" key={item.slug} onClick={() => choose(i)}><FileText size={20}/><span><strong>{item.title}</strong><small>/{kind === 'blog' ? 'blog/' : ''}{item.slug}</small></span><span className={`studio-badge ${item.status === 'draft' ? 'draft' : ''}`}>{item.status === 'draft' ? 'Draft' : 'Published'}</span></button>)}</div>{!items.length && <div className="admin-card admin-empty">No pages yet. Choose New {label} to start.</div>}</> : <div className="studio-editor"><section className="admin-card"><div className="studio-actions"><button disabled={busy} onClick={() => { if (!dirty || confirm('Discard your unsaved changes?'))
        setEditing(null); }}><ArrowLeft size={16}/> All {label}s</button><span className="admin-muted">{dirty ? 'Unsaved changes' : 'Up to date'}</span></div><label className="studio-field">Title<input value={form.title} disabled={busy} onChange={e => change('title', e.target.value)} placeholder={`Your ${label} title`}/></label><label className="studio-field">Page URL<div className="studio-url"><span>/{kind === 'blog' ? 'blog/' : ''}</span><input value={form.slug} disabled={busy} onChange={e => { setManualSlug(true); change('slug', e.target.value.toLowerCase()); }} placeholder="your-page-url"/></div><small>Generated from the title. Changing a published URL can break old links.</small></label><label className="studio-field">Short description<textarea rows={3} value={form.description} disabled={busy} onChange={e => change('description', e.target.value)} placeholder="Summarize the page for visitors and search results."/></label><div className="studio-body-heading"><strong>Content</strong><button onClick={() => setPreview(!preview)}><Eye size={16}/> {preview ? 'Back to writing' : 'Preview'}</button></div>{preview ? <div className="studio-preview"><h1>{form.title || 'Untitled'}</h1><p>{form.description}</p>{kind === 'blog' ? <div className="rich-canvas rich-preview"><RichBlocks blocks={form.blocks}/></div> : <MarkdownBody body={form.body}/>}</div> : kind === 'blog' ? <RichTextEditor key={`${editing}-${items[editing]?.slug || 'new'}`} value={form.blocks} onChange={blocks=>change('blocks',blocks)} disabled={busy} onUploadBusy={value=>{setBusy(value);onBusy(value);}}/> : <><div className="studio-toolbar">{[['Heading', '## '], ['Subheading', '### '], ['List', '- '], ['Numbered list', '1. '], ['Quote', '> ']].map(([name, prefix]) => <button key={name} disabled={busy} onClick={() => insert(prefix)}>{name}</button>)}</div><textarea ref={textarea} className="studio-body" rows={18} value={form.body} disabled={busy} onChange={e => change('body', e.target.value)} placeholder={'Start writing here…\n\n## A section heading\n\nWrite a paragraph.\n\n- A list item'}/><p className="admin-muted">Use the toolbar for headings and lists. Blank lines separate paragraphs. Preview shows how your content will read.</p></>}{kind === 'blog' && <div className="studio-grid"><label className="studio-field">Category<select value={form.category} disabled={busy} onChange={e => change('category', e.target.value)}>{categories.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label><label className="studio-field">Publication date<input type="date" value={form.date} disabled={busy} onChange={e => change('date', e.target.value)}/></label></div>}<details className="studio-options"><summary>Search appearance & optional settings</summary><label className="studio-field">SEO title<input value={form.seoTitle} disabled={busy} onChange={e => change('seoTitle', e.target.value)} placeholder="Leave empty to use the page title"/></label>{kind === 'blog' && <><label className="studio-field">Cover image URL<input value={form.image} disabled={busy} onChange={e => change('image', e.target.value)} placeholder="/uploads/image.jpg or https://…"/><small>Upload an image in Media, then paste its URL here.</small></label><label className="studio-field">Author<input value={form.author} disabled={busy} onChange={e => change('author', e.target.value)}/></label><label className="studio-field">Tags<input value={form.tags} disabled={busy} onChange={e => change('tags', e.target.value)} placeholder="SEO, technical audit, content"/></label></>}<div className="studio-search-preview"><strong>{form.seoTitle || form.title || 'Your page title'}</strong><small>shobon-mahmud.vercel.app/{kind === 'blog' ? 'blog/' : ''}{form.slug}</small><p>{form.description || 'Your search description will appear here.'}</p></div></details></section><aside className="admin-card studio-publish"><h2>Ready when you are</h2><p>Save a draft to continue later. Publish when you want it to appear on your website.</p><button onClick={() => save('draft')} disabled={busy || !publishing}><Save size={16}/> {busy ? 'Saving…' : 'Save draft'}</button><button className="admin-primary" onClick={() => save('published')} disabled={busy || !publishing}><Send size={16}/> Publish {label}</button>{editing >= 0 && items[editing]?.status !== 'draft' && <button disabled={busy} onClick={() => onLiveEditor(`/${kind === 'blog' ? 'blog/' : ''}${items[editing].slug}`)}><Eye size={16}/> Edit live page</button>}<p className="admin-muted">Website updates appear after Vercel finishes deployment. New pages are added to the sitemap automatically.</p>{editing >= 0 && <button disabled={busy || dirty} onClick={() => { const copy = { ...form, title: form.title + ' (copy)', slug: form.slug + '-copy' }; setForm(copy); setEditing(-1); setBaseline(JSON.stringify(empty())); setManualSlug(true); setMessage(''); }}><Copy size={16}/> Duplicate as new {label}</button>}</aside></div>}</>;
}
