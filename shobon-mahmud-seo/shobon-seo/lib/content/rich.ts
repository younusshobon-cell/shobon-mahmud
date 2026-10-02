import type {Block,Post} from './types';
export function articleBlocks(post:Post):Block[]{return post.sections.flatMap(s=>[...(s.heading?[{type:'heading' as const,level:2 as const,text:s.heading,id:s.id}]:[]),...s.blocks]);}
export function sectionsFromBlocks(blocks:Block[],previous:Post['sections']=[]):Post['sections']{
 const sections:Post['sections']=[];let current:Post['sections'][number]={id:'introduction',heading:'',blocks:[]};const used=new Set<string>();
 const finish=()=>{if(current.heading||current.blocks.length)sections.push(current);};
 for(const b of blocks){if(b.type==='heading'&&b.level===2){finish();let id=b.id||previous.find(s=>s.heading===b.text&&!used.has(s.id))?.id||`section-${sections.length+1}`;while(used.has(id))id+='-new';used.add(id);current={id,heading:b.text,blocks:[]};}else current.blocks.push(b);}finish();return sections;
}
export function blockText(b:Block):string{if('items'in b)return b.items.join(' ');if(b.type==='table')return [...b.headers,...b.rows.flat()].join(' ');if(b.type==='image')return [b.alt,b.caption].filter(Boolean).join(' ');return b.text;}
export function safeImageUrl(url:string){return /^\/(?!\/)[^\s<>]*$/.test(url)||/^https?:\/\/[^\s<>]+$/i.test(url);}
// Read only supported blocks. Saved data contains text and structured values, never HTML.
export function readRichDom(root:HTMLElement):Block[]{
 const blocks:Block[]=[];function walk(node:Node){if(node.nodeType===3){const text=node.textContent?.trim();if(text)blocks.push({type:'p',text});return;}if(node.nodeType!==1)return;const el=node as HTMLElement,tag=el.tagName.toLowerCase();const text=(el.innerText??el.textContent??'').trim();
 if(/^h[1-6]$/.test(tag)){if(text)blocks.push({type:'heading',level:Number(tag[1]) as 1|2|3|4|5|6,text,...(el.id?{id:el.id}:{})});}
 else if(tag==='ul'||tag==='ol'){const items=Array.from(el.children).filter(c=>c.tagName==='LI').map(c=>(c as HTMLElement).innerText??c.textContent??'');if(items.some(x=>x.trim()))blocks.push({type:tag,items});}
 else if(tag==='table'){const rows=Array.from((el as HTMLTableElement).rows).map(row=>Array.from(row.cells).map(c=>(c.innerText??c.textContent??'').trim()));if(rows.length)blocks.push({type:'table',headers:rows[0],rows:rows.slice(1)});}
 else if(tag==='figure'||tag==='img'){const image=tag==='img'?el as HTMLImageElement:el.querySelector('img');if(image&&safeImageUrl(image.getAttribute('src')||''))blocks.push({type:'image',src:image.getAttribute('src')!,alt:image.alt||'',caption:el.querySelector('figcaption')?.textContent||''});}
 else if(tag==='blockquote'){if(text)blocks.push({type:'quote',text});}
 else if(tag==='p'){if(text)blocks.push({type:'p',text});}
 else if(tag==='div'&&Array.from(el.children).some(c=>/^(P|H[1-6]|UL|OL|TABLE|FIGURE|DIV)$/.test(c.tagName))){Array.from(el.childNodes).forEach(walk);}
 else if(!['script','style','iframe','object','svg'].includes(tag)&&text)blocks.push({type:'p',text});}
 Array.from(root.childNodes).forEach(walk);return blocks;
}
export function writeRichDom(root:HTMLElement,blocks:Block[]){root.replaceChildren();const doc=root.ownerDocument;for(const b of blocks){let el:HTMLElement;if(b.type==='ul'||b.type==='ol'){el=doc.createElement(b.type);b.items.forEach(item=>{const li=doc.createElement('li');li.textContent=item;el.append(li);});}else if(b.type==='table'){el=doc.createElement('table');const head=doc.createElement('thead'),body=doc.createElement('tbody');[b.headers,...b.rows].forEach((row,i)=>{const tr=doc.createElement('tr');row.forEach(text=>{const cell=doc.createElement(i?'td':'th');cell.textContent=text;tr.append(cell);});(i?body:head).append(tr);});el.append(head,body);}else if(b.type==='image'){el=doc.createElement('figure');el.contentEditable='false';const image=doc.createElement('img');image.src=b.src;image.alt=b.alt;el.append(image);if(b.caption){const caption=doc.createElement('figcaption');caption.textContent=b.caption;el.append(caption);}}else {el=doc.createElement(b.type==='heading'?`h${b.level}`:b.type==='h3'?'h3':b.type==='quote'?'blockquote':'p');el.textContent=b.text;if(b.type==='heading'&&b.id)el.id=b.id;}root.append(el);}if(!root.childNodes.length){const p=doc.createElement('p');p.append(doc.createElement('br'));root.append(p);}}
