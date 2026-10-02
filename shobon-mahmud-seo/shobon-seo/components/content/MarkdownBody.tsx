import { parseMarkdown } from '@/lib/content/editor';
export function MarkdownBody({ body }: {
    body: string;
}) { return <div className="cms-body">{parseMarkdown(body).map(s => <section key={s.id}><h2>{s.heading}</h2>{s.blocks.map((b, i) => b.type === 'ul' ? <ul key={i}>{b.items.map((x, j) => <li key={j}>{x}</li>)}</ul> : b.type === 'ol' ? <ol key={i}>{b.items.map((x, j) => <li key={j}>{x}</li>)}</ol> : b.type === 'h3' ? <h3 key={i}>{b.text}</h3> : b.type === 'quote' ? <blockquote key={i}>{b.text}</blockquote> : <p key={i} style={{ whiteSpace: 'pre-line' }}>{b.text}</p>)}</section>)}</div>; }
