'use client';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight, FileText, Search } from 'lucide-react';
const sections = [
  {name:'Case Studies', root:'/case-studies'},
  {name:'Services', root:'/services'},
  {name:'Industries', root:'/industries'},
  {name:'Locations', root:'/locations'},
  {name:'Blog', root:'/blog'},
  {name:'About', root:'/about'},
  {name:'Other pages', root:''},
];
function belongs(path:string, root:string):boolean {
  if (!root) return !sections.filter(s=>s.root).some(s=>belongs(path,s.root));
  const normalized=path.replace(/^\/(ar|bn)(?=\/)/,'');
  return normalized===root || normalized.startsWith(root+'/');
}
function pageTitle(path:string) {
  if(path==='/') return 'Home';
  const title=path.split('/').filter(Boolean).at(-1)!.replace(/-/g,' ');
  return title.replace(/\b\w/g,letter=>letter.toUpperCase());
}
export function PageDirectory({onEdit,onCustom}:{onEdit:(path:string)=>void;onCustom:()=>void}) {
  const [pages,setPages]=useState<string[]>([]),[selected,setSelected]=useState<string|null>(null),[search,setSearch]=useState(''),[loading,setLoading]=useState(true),[error,setError]=useState(''),[reload,setReload]=useState(0);
  useEffect(()=>{const controller=new AbortController();setLoading(true);setError('');
    fetch('/api/admin/visual',{cache:'no-store',signal:controller.signal}).then(async response=>{const data=await response.json();if(!response.ok)throw Error(data.error||'Could not load pages.');if(!controller.signal.aborted)setPages(data.pages);}).catch(e=>{if(!controller.signal.aborted)setError(e.message);}).finally(()=>{if(!controller.signal.aborted)setLoading(false);});return()=>controller.abort();
  },[reload]);
  const section=sections.find(s=>s.name===selected);
  const visible=pages.filter(path=>(!section||belongs(path,section.root)) && `${path} ${pageTitle(path)}`.toLowerCase().includes(search.toLowerCase()));
  return <>
    <div className="admin-page-heading"><div><p className="admin-eyebrow">WEBSITE CONTENT</p><h1>{selected||'Website pages'}</h1><p className="admin-muted">{selected?'Choose a page to edit its text and images.':'Choose a section to find and edit your existing website pages.'}</p></div><div className="admin-heading-actions"><button className="admin-secondary" disabled={loading} onClick={()=>setReload(n=>n+1)}>Refresh pages</button><button className="admin-secondary" onClick={onCustom}>Custom pages & drafts</button></div></div>
    {selected && <button className="admin-small" onClick={()=>{setSelected(null);setSearch('');}}><ArrowLeft size={16}/> All sections</button>}
    <label className="admin-search page-directory-search"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={selected?'Search this section…':'Search all website pages…'}/></label>
    {error?<div className="admin-error-box" role="alert">{error} <button className="admin-small" onClick={()=>setReload(n=>n+1)}>Try again</button></div>:loading?<div className="admin-card admin-empty" role="status">Loading website pages…</div>:!selected&&!search?<div className="admin-collection-grid">{sections.map(item=><button key={item.name} className="admin-collection-card" onClick={()=>setSelected(item.name)}><FileText size={20}/><strong>{item.name}</strong><span>{pages.filter(path=>belongs(path,item.root)).length} pages</span><ArrowUpRight size={17}/></button>)}</div>:<div className="studio-list">{visible.map(path=><div className="admin-card page-directory-row" key={path}><FileText size={20}/><div><strong>{pageTitle(path)}</strong><small>{path}</small></div><button className="admin-primary" onClick={()=>onEdit(path)}>Edit page</button><a className="admin-small" href={path} target="_blank" rel="noopener noreferrer" aria-label={`View ${path}`}>View <ArrowUpRight size={14}/></a></div>)}{!visible.length&&<div className="admin-card admin-empty">{search?'No pages match your search.':'No published pages in this section yet.'}</div>}</div>}
  </>;
}
