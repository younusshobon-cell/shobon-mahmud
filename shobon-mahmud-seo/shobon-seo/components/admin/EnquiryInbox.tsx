'use client';
import {useEffect,useState} from 'react';
import {Search, Mail, Download, Save, Trash2, Inbox} from 'lucide-react';
type Lead={id:string;created:string;status:string;notes:string;details:Record<string,string>};
const stages=['new','contacted','qualified','closed'];
export function EnquiryInbox({days,refresh=0,onDirty}:{days:number;refresh?:number;onDirty?:(dirty:boolean)=>void}){
 const [leads,setLeads]=useState<Lead[]>([]),[query,setQuery]=useState(''),[stage,setStage]=useState('all'),[selected,setSelected]=useState(''),[draft,setDraft]=useState<Lead|null>(null),[busy,setBusy]=useState(false),[loading,setLoading]=useState(true),[error,setError]=useState(''),[notice,setNotice]=useState('');
 useEffect(()=>{const controller=new AbortController();setLoading(true);setError('');setLeads([]);setSelected('');setDraft(null);
 fetch('/api/admin/enquiries?days='+days,{cache:'no-store',signal:controller.signal}).then(async r=>{const d=await r.json();if(!r.ok)throw Error(d.error);setLeads(d.enquiries);setSelected('');setDraft(null);}).catch(e=>{if(e.name!=='AbortError')setError(e.message);}).finally(()=>{if(!controller.signal.aborted)setLoading(false);});
 return ()=>controller.abort();},[days,refresh]);
 const dirty=!!draft && JSON.stringify(draft)!==JSON.stringify(leads.find(l=>l.id===draft.id));
 useEffect(()=>{onDirty?.(dirty);return ()=>onDirty?.(false);},[dirty,onDirty]);
 useEffect(()=>{function warn(e:BeforeUnloadEvent){if(dirty){e.preventDefault();e.returnValue='';}}window.addEventListener('beforeunload',warn);return ()=>window.removeEventListener('beforeunload',warn);},[dirty]);
 const visible=leads.filter(l=>(stage==='all'||l.status===stage)&&Object.values(l.details).join(' ').toLowerCase().includes(query.toLowerCase()));
 function choose(l:Lead){if(draft && leads.find(x=>x.id===draft.id) && JSON.stringify(draft)!==JSON.stringify(leads.find(x=>x.id===draft.id)) && !window.confirm('Discard unsaved enquiry notes?'))return;setSelected(l.id);setDraft({...l});setNotice('');setError('');}
 async function save(remove=false){
 if(!draft)return;if(remove&&!window.confirm('Permanently delete this enquiry and its details?'))return;
 setBusy(true);setError('');setNotice('');
 try{const r=await fetch('/api/admin/enquiries',{method:remove?'DELETE':'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:draft.id,status:draft.status,notes:draft.notes})});const d=await r.json();if(!r.ok)throw Error(d.error);
 setLeads(rows=>remove?rows.filter(l=>l.id!==draft.id):rows.map(l=>l.id===draft.id?draft:l));
 if(remove){setDraft(null);setSelected('');}setNotice(remove?'Enquiry deleted.':'Status and notes saved.');
 }catch(e){setError((e as Error).message);}finally{setBusy(false);}
 }
 function csv(){
 const fields=['created','status','name','email','company','website','industry','budget','goal','message','notes'];
 const text=[fields,...visible.map(l=>fields.map(f=>f in l?String(l[f as keyof Lead]):l.details[f]||''))].map(row=>row.map(v=>{let value=String(v);if(/^[=+@-]/.test(value.trimStart()))value="'"+value;return '"'+value.replace(/"/g,'""')+'"';}).join(',')).join('\n');
 const url=URL.createObjectURL(new Blob([text],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='contact-enquiries.csv';a.click();URL.revokeObjectURL(url);
 }
 return <section className="admin-card enquiry-inbox" aria-labelledby="enquiries-heading">
 <div className="inbox-heading"><div><p className="admin-eyebrow">YOUR LEAD PIPELINE</p><h2 id="enquiries-heading">Contact enquiries <span className="admin-count">{leads.length}</span></h2><p className="admin-muted">Submitted details · private inbox · retained for 90 days</p></div><button className="admin-secondary" onClick={csv} disabled={!visible.length}><Download size={16}/> Export filtered</button></div>
 <div className="inbox-filters"><label className="inbox-search"><Search size={17}/><input aria-label="Search enquiries" placeholder="Search name, email, company or message…" value={query} onChange={e=>setQuery(e.target.value)}/></label><select aria-label="Filter enquiry status" value={stage} onChange={e=>setStage(e.target.value)}><option value="all">All statuses</option>{stages.map(s=><option key={s} value={s}>{s}</option>)}</select></div>
 {error&&<p role="alert" className="admin-notice is-error">{error}</p>}{notice&&<p role="status" className="admin-success">{notice}</p>}
 {loading?<p role="status" className="admin-empty">Loading enquiries…</p>:visible.length===0?<div className="admin-empty"><Inbox size={30}/><h3>{leads.length?'No matching enquiries':'Your next enquiry will appear here'}</h3><p>Details are saved when a visitor submits a valid contact form. Email delivery is a separate step.</p></div>:<div className="inbox-workspace">
 <div className="inbox-list">{visible.map(l=><button key={l.id} className={selected===l.id?'selected':''} onClick={()=>choose(l)}><div><strong>{l.details.name}</strong><span className={'lead-status status-'+l.status}>{l.status}</span></div><p>{l.details.company||l.details.email}</p><small>{l.details.goal} · {new Date(l.created).toLocaleDateString()}</small></button>)}</div>
 <div className="inbox-detail">{draft?<><div className="inbox-heading"><div><h3>{draft.details.name}</h3><small className="admin-muted">{new Date(draft.created).toLocaleString()}</small></div><a className="admin-secondary" href={'mailto:'+draft.details.email}><Mail size={16}/> Reply</a></div><dl className="lead-fields">{Object.entries(draft.details).filter(([k])=>k!=='message').map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v||'—'}</dd></div>)}</dl><div className="lead-message"><strong>Message</strong><p>{draft.details.message}</p></div><label className="admin-field">Status<select value={draft.status} disabled={busy} onChange={e=>setDraft({...draft,status:e.target.value})}>{stages.map(s=><option key={s}>{s}</option>)}</select></label><label className="admin-field">Internal notes<textarea rows={4} maxLength={3000} value={draft.notes} disabled={busy} placeholder="Follow-up, requirements or next steps…" onChange={e=>setDraft({...draft,notes:e.target.value})}/></label><div className="inbox-actions"><button className="admin-primary" disabled={busy} onClick={()=>save()}><Save size={16}/>{busy?'Saving…':'Save changes'}</button><button className="admin-secondary admin-danger" disabled={busy} onClick={()=>save(true)}><Trash2 size={16}/>Delete</button></div></>:<div className="admin-empty"><Mail size={28}/><h3>Select an enquiry</h3><p>Review all submitted details, reply and manage follow-up.</p></div>}</div></div>}
 {leads.length===500&&<p className="admin-muted">Showing the latest 500 enquiries. Choose a shorter date range to narrow the results.</p>}
 </section>;
}
