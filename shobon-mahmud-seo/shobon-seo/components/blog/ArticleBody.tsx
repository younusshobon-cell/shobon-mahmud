import type {Post} from '@/lib/content/types';
import {RichBlocks} from '@/components/content/RichBlocks';
export function ArticleBody({post}:{post:Post}){return <div className="prose-article">{post.sections.map(s=><section key={s.id} aria-labelledby={s.heading?s.id:undefined}>{s.heading&&<h2 id={s.id}>{s.heading}</h2>}<div className="mt-4 space-y-5"><RichBlocks blocks={s.blocks}/></div></section>)}</div>;}
