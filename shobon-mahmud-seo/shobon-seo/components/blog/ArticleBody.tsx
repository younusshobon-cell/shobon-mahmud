import type { Block, Post } from "@/lib/content/types";

function renderBlock(b: Block, i: number) {
  switch (b.type) {
    case "p": return <p key={i}>{b.text}</p>;
    case "h3": return <h3 key={i}>{b.text}</h3>;
    case "ul": return <ul key={i}>{b.items.map((t) => <li key={t}>{t}</li>)}</ul>;
    case "ol": return <ol key={i}>{b.items.map((t) => <li key={t}>{t}</li>)}</ol>;
    case "quote": return <blockquote key={i}>{b.text}</blockquote>;
  }
}

export function ArticleBody({ post }: { post: Post }) {
  return (
    <div className="prose-article">
      {post.sections.map((s) => (
        <section key={s.id} aria-labelledby={s.id}>
          <h2 id={s.id}>{s.heading}</h2>
          <div className="mt-4 space-y-5">{s.blocks.map(renderBlock)}</div>
        </section>
      ))}
    </div>
  );
}
