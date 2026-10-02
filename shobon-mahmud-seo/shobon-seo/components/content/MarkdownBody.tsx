import {parseMarkdown} from '@/lib/content/editor';
import {RichBlocks} from './RichBlocks';
export function MarkdownBody({body}:{body:string}){return <div className="cms-body">{parseMarkdown(body).map(s=><section key={s.id}><h2>{s.heading}</h2><RichBlocks blocks={s.blocks}/></section>)}</div>;}
