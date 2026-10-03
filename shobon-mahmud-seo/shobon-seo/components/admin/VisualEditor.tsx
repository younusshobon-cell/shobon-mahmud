"use client";
import { useEffect, useRef, useState } from "react";
import { Eye, MousePointer2, Monitor, Smartphone, Save, RotateCcw, Upload } from "lucide-react";
import { FormEditor, groupSchema, type Value } from "./FormEditor";
import { fieldKey, fieldsOf, normalize, replaceAt, valueAt, type Field } from "@/lib/admin/visual";

type Entry = {id: string; label: string; group: string};
type Doc = {id: string; sha: string; data: Value; baseline: Value};
type Target = {element: HTMLElement; kind: "text" | "src" | "href" | "alt"};
async function api(url: string, options?: RequestInit) {
  const response = await fetch(url, options), data = await response.json();
  if (!response.ok) throw new Error(data.error || "Request failed.");
  return data;
}
function safeAttribute(value: string, kind: Target["kind"]) {
  if (kind === "text" || kind === "alt") return true;
  return /^(\/[^/]|https?:\/\/)/i.test(value) || (kind === "href" && /^(#|mailto:|tel:)/i.test(value));
}
function paint(target: Target, value: string) {
  if (!safeAttribute(value, target.kind)) return;
  if (target.kind === "text") {
    if (!target.element.childElementCount) target.element.textContent = value;
    else {const textNodes = [...target.element.childNodes].filter(node => node.nodeType === 3); if (textNodes.length) {textNodes[0].textContent = value; for (const node of textNodes.slice(1)) node.textContent = "";}}
  }
  else {
    target.element.setAttribute(target.kind, value);
    if (target.kind === "src") { target.element.removeAttribute("srcset"); target.element.removeAttribute("sizes"); }
  }
}
function sourceOf(image: HTMLElement) {
  const src = image.getAttribute("src") || "";
  try { const url = new URL(src, location.origin); return url.pathname === "/_next/image" ? url.searchParams.get("url") || src : src; } catch { return src; }
}
export function VisualEditor({onPageImages, manifest, publishing, onDirty, onBusy, initialPage = "/"}: {onPageImages: (path: string) => void; initialPage?: string; manifest: Entry[]; publishing: boolean; onDirty: (dirty: boolean) => void; onBusy: (busy: boolean) => void}) {
  const [pages, setPages] = useState<string[]>([]), [page, setPage] = useState(initialPage), [catalog, setCatalog] = useState<Field[]>([]);
  const [docs, setDocs] = useState<Record<string, Doc>>({}), [options, setOptions] = useState<Field[]>([]), [selected, setSelected] = useState<Field | null>(null);
  const [collection, setCollection] = useState(""), [edit, setEdit] = useState(true), [mobile, setMobile] = useState(false), [busy, setBusy] = useState(false), [loading, setLoading] = useState(false);
  const [error, setError] = useState(""), [notice, setNotice] = useState(""), [revision, setRevision] = useState(0), [search, setSearch] = useState("");
  const iframe = useRef<HTMLIFrameElement>(null), target = useRef<Target | null>(null), docsRef = useRef(docs), catalogRef = useRef(catalog), editRef = useRef(edit), selectionId = useRef(0), cleanup = useRef<() => void>(() => {}), inlineCleanup = useRef<() => void>(() => {}), busyRef = useRef(false), images = useRef<{src: string; field: Field}[]>([]);
  const changed = Object.values(docs).filter(d => JSON.stringify(d.data) !== JSON.stringify(d.baseline));
  useEffect(() => {onDirty(changed.length > 0);}, [changed.length, onDirty]);
  useEffect(() => {onBusy(busy || loading); busyRef.current = busy || loading;}, [busy, loading, onBusy]);
  useEffect(() => {docsRef.current = docs;}, [docs]);
  useEffect(() => {catalogRef.current = catalog;}, [catalog]);
  useEffect(() => {editRef.current = edit; if (!edit) inlineCleanup.current();}, [edit]);
  useEffect(() => {let cancelled = false; api("/api/admin/visual").then(data => {if (!cancelled) {setPages(data.pages); images.current = data.images; setCatalog(data.fields); catalogRef.current = data.fields;}}).catch(e => {if (!cancelled) setError(e.message);}); return () => {cancelled = true; cleanup.current(); inlineCleanup.current(); selectionId.current++;};}, []);
  useEffect(() => {if (pages.length && catalog.length && iframe.current?.contentDocument?.readyState === "complete") attach();}, [pages, catalog]);
  function updateDocs(next: Record<string, Doc>) { docsRef.current = next; setDocs(next); }
  function clearSelection() {inlineCleanup.current(); if (target.current) target.current.element.style.outline = ""; target.current = null; setSelected(null); setOptions([]); selectionId.current++;}
  async function loadDocument(id: string) {
    if (docsRef.current[id]) return docsRef.current[id];
    const result = await api("/api/admin/content?id=" + encodeURIComponent(id));
    const doc: Doc = {...result, baseline: structuredClone(result.data)};
    updateDocs({...docsRef.current, [id]: doc}); return doc;
  }
  async function choose(field: Field) {
    const token = ++selectionId.current; setSelected(null); setError(""); setLoading(true);
    try {
      const doc = await loadDocument(field.id);
      if (token !== selectionId.current) return;
      const original = catalogRef.current.find(f => fieldKey(f) === fieldKey(field));
      const current = valueAt(doc.data, field.path), baseline = valueAt(doc.baseline, field.path);
      if (typeof current !== "string" || (original && normalize(String(baseline)) !== normalize(original.value))) throw new Error("This page is behind the latest repository content. Wait for the latest deployment, then reload preview before editing this field.");
      setSelected(field); setCollection(field.id);
      if (target.current) paint(target.current, current);
    } catch (e) {if (token === selectionId.current) setError((e as Error).message);}
    finally {if (token === selectionId.current) setLoading(false);}
  }
  function fields() {
    return [...catalogRef.current.filter(f => !docsRef.current[f.id]), ...Object.values(docsRef.current).flatMap(d => fieldsOf(d.id, d.data))];
  }
  function inspect(event: MouseEvent) {
    const element = event.target as HTMLElement;
    if (!element || element.nodeType !== 1) return;
    const anchor = element.closest("a");
    if (anchor) event.preventDefault();
    if (element.closest('[contenteditable="true"]')) return;
    if (!editRef.current || busyRef.current) return;
    event.preventDefault(); event.stopPropagation(); clearSelection(); setError(""); setNotice("");
    if (element.closest("[data-page-image-slot], img")) {onPageImages(page); return;}
    const values = fields();
    let hit: Target | null = null, candidates: Field[] = [];
    for (let node: HTMLElement | null = element; node && !["BODY", "HTML"].includes(node.tagName); node = node.parentElement) {
      if (["SCRIPT", "STYLE", "INPUT", "TEXTAREA", "SELECT"].includes(node.tagName)) break;
      const comparisons: [Target["kind"], string][] = node.tagName === "IMG" ? [["src", sourceOf(node)], ["alt", node.getAttribute("alt") || ""]] : (!node.childElementCount || [...node.children].every(child => !child.textContent?.trim())) ? [["text", node.textContent || ""], ...(node.tagName === "A" ? [["href", node.getAttribute("href") || ""] as [Target["kind"], string]] : [])] : node.tagName === "A" ? [["href", node.getAttribute("href") || ""]] : [];
      for (const [kind, value] of comparisons) {
        if (!normalize(value)) continue;
        candidates = values.filter(f => normalize(f.value) === normalize(value));
        if (kind === "src" && !candidates.length) {const binding = images.current.find(image => image.src === value); if (binding) candidates = [binding.field];}
        if (candidates.length) {hit = {element: node, kind}; break;}
      }
      if (hit) break;
    }
    if (!hit) {setNotice("This element uses generated content or a layout component. Choose its content collection below to edit the available fields."); return;}
    target.current = hit; hit.element.style.outline = "2px solid #6366f1"; hit.element.style.outlineOffset = "4px";
    setOptions(candidates);
    if (candidates.length === 1) void choose(candidates[0]);
    else setNotice("Several fields share this value. Select the correct collection and field before editing.");
  }
  function attach() {
    cleanup.current(); clearSelection();
    const document = iframe.current?.contentDocument;
    if (!document || !pages.includes(new URL(iframe.current?.contentWindow?.location.href || location.origin).pathname)) return;
    document.addEventListener("click", inspect, true);
    const submit = (event: Event) => event.preventDefault();
    document.addEventListener("submit", submit, true);
    cleanup.current = () => {document.removeEventListener("click", inspect, true); document.removeEventListener("submit", submit, true);};
    // Restore string drafts on reload only when the original value has an unambiguous source field.
    const originals = catalogRef.current;
    const counts = new Map<string, number>(); for (const field of originals) {const key = normalize(field.value); counts.set(key, (counts.get(key) || 0) + 1);}
    const nodes = document.querySelectorAll<HTMLElement>("body *");
    for (const field of originals) {
      const doc = docsRef.current[field.id]; if (!doc) continue;
      let next: unknown; try {next = valueAt(doc.data, field.path);} catch {continue;}
      if (typeof next !== "string" || next === field.value || counts.get(normalize(field.value)) !== 1) continue;
      for (const node of nodes) {
        if (["SCRIPT", "STYLE", "TEXTAREA"].includes(node.tagName)) continue;
        if (!node.childElementCount && normalize(node.textContent || "") === normalize(field.value)) paint({element: node, kind: "text"}, next);
        if (node.tagName === "IMG" && sourceOf(node) === field.value) paint({element: node, kind: "src"}, next);
        if (node.tagName === "A" && node.getAttribute("href") === field.value) paint({element: node, kind: "href"}, next);
      }
    }
  }
  function change(field: Field, value: string) {
    const doc = docsRef.current[field.id]; if (!doc || busyRef.current) return;
    try {updateDocs({...docsRef.current, [field.id]: {...doc, data: replaceAt(doc.data, field.path, value)}}); if (target.current) paint(target.current, value); setNotice("Unpublished change. Publish when you are ready."); setError("");} catch (e) {setError((e as Error).message);}
  }
  function inlineEdit() {
    const current = target.current; if (!current || current.kind !== "text" || !selected) return;
    inlineCleanup.current(); const field = selected, element = current.element;
    element.contentEditable = "true"; element.focus();
    const beforeInput = (event: Event) => {const input = event as InputEvent; if (input.inputType.startsWith("insert") && !["insertText", "insertCompositionText"].includes(input.inputType)) event.preventDefault();};
    const paste = (event: Event) => event.preventDefault();
    const input = () => change(field, element.textContent || "");
    const blur = () => inlineCleanup.current();
    element.addEventListener("beforeinput", beforeInput); element.addEventListener("paste", paste); element.addEventListener("input", input); element.addEventListener("blur", blur);
    inlineCleanup.current = () => {element.removeAttribute("contenteditable"); element.removeEventListener("beforeinput", beforeInput); element.removeEventListener("paste", paste); element.removeEventListener("input", input); element.removeEventListener("blur", blur); inlineCleanup.current = () => {};};
  }
  function selectAttribute(kind: "href" | "alt") {
    inlineCleanup.current();
    const element = kind === "href" ? target.current?.element.closest("a") : target.current?.element;
    if (!element) return;
    const value = element.getAttribute(kind) || "";
    const candidates = fields().filter(f => normalize(f.value) === normalize(value));
    if (!candidates.length) {setNotice("This attribute is generated by a component. Edit it using the content collection below.");return;}
    target.current = {element: element as HTMLElement, kind};setOptions(candidates);setSelected(null);
    if (candidates.length === 1) void choose(candidates[0]);
    else setNotice("Select the correct source field before editing this attribute.");
  }
  async function openCollection(id: string) {
    clearSelection(); setCollection(id); if (!id) return; setLoading(true); setError("");
    try {await loadDocument(id);} catch (e) {setError((e as Error).message);} finally {setLoading(false);}
  }
  async function publish() {
    inlineCleanup.current();
    if (!changed.length || !window.confirm(`Publish changes in ${changed.length} content collection(s)? Each collection is saved separately. Vercel will deploy the updates.`)) return;
    setBusy(true); busyRef.current = true; setError(""); setNotice(""); let saved = 0;
    try {
      for (const doc of changed) {
        const result = await api("/api/admin/content", {method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id: doc.id, sha: doc.sha, data: doc.data})});
        updateDocs({...docsRef.current, [doc.id]: {...doc, sha: result.sha, baseline: structuredClone(doc.data)}}); const nextCatalog = [...catalogRef.current.filter(f => f.id !== doc.id), ...fieldsOf(doc.id, doc.data)]; catalogRef.current = nextCatalog; setCatalog(nextCatalog); saved++;
      }
      setNotice(`Published ${saved} collection(s). Your live site updates after Vercel finishes deploying. Reload preview then to see the deployed result.`);
    } catch (e) {setError(`${saved} collection(s) published. Remaining changes are still here: ${(e as Error).message}`);} finally {setBusy(false); busyRef.current = false;}
  }
  async function upload(file: File | undefined) {
    if (!file || !selected) return;
    const field = selected; setBusy(true); busyRef.current = true; setError("");
    try {const form = new FormData(); form.append("file", file); const result = await api("/api/admin/media", {method: "POST", body: form}); busyRef.current = false; change(field, result.url); setNotice("Image uploaded to the repository. Publish this field to use it on the page; preview loads the image after deployment.");} catch (e) {setError((e as Error).message);} finally {setBusy(false); busyRef.current = false;}
  }
  const value = selected && docs[selected.id] ? String(valueAt(docs[selected.id].data, selected.path)) : "";
  return <section className="visual-studio">
    <div className="visual-toolbar"><div><h1><Eye size={22}/> Live page editor</h1><p>Page দেখুন → content-এ click করুন → edit করুন → Publish করুন।</p></div><button className="admin-primary" disabled={busy || loading || !publishing || !changed.length} onClick={publish}><Save size={16}/> {busy ? "Saving…" : `Publish${changed.length ? ` (${changed.length})` : ""}`}</button></div>
    {error && <div className="admin-notice" role="alert">{error}</div>}{notice && <div className="admin-notice" role="status">{notice}</div>}
    <div className="visual-controls"><button className="admin-small" disabled={busy || loading} onClick={() => onPageImages(page)}>Edit page images</button><label>Page <select value={page} disabled={busy || loading} onChange={e => {clearSelection();setPage(e.target.value);}}>{pages.map(path => <option key={path} value={path}>{path === "/" ? "Home /" : path}</option>)}</select></label><button className="admin-small" aria-pressed={edit} onClick={() => setEdit(!edit)} disabled={busy || loading}><MousePointer2 size={15}/>{edit ? "Editing on" : "Viewing"}</button><button className="admin-small" aria-label="Desktop preview" aria-pressed={!mobile} onClick={() => setMobile(false)}><Monitor size={16}/></button><button className="admin-small" aria-label="Mobile preview" aria-pressed={mobile} onClick={() => setMobile(true)}><Smartphone size={16}/></button><button className="admin-small" disabled={busy || loading} onClick={() => {clearSelection();setRevision(revision + 1);}}><RotateCcw size={15}/> Reload preview</button><a href={page} target="_blank" rel="noopener noreferrer" className="admin-small"><Eye size={15}/> Live page</a></div>
    <div className="visual-workspace"><div className="visual-canvas"><iframe key={`${page}:${revision}`} ref={iframe} title={`Live preview of ${page}`} src={`${page}?admin-preview=1`} onLoad={attach} sandbox="allow-same-origin allow-scripts" style={{width: mobile ? 390 : "100%", maxWidth: "100%"}}/></div><aside className="visual-inspector"><h2>Content inspector</h2><p>Click text, images or links on the page. All changes stay unpublished until you press Publish.</p>
      {options.length > 0 && <label>Content field<select value={selected ? fieldKey(selected) : ""} disabled={busy || loading} onChange={e => {inlineCleanup.current(); const field = options.find(f => fieldKey(f) === e.target.value); if (field) void choose(field);}}><option value="">Select a field…</option>{options.map(f => <option key={fieldKey(f)} value={fieldKey(f)}>{manifest.find(e => e.id === f.id)?.label} / {f.path.join(" → ")}</option>)}</select></label>}
      {loading && <p role="status">Loading latest repository content…</p>}
      {selected && <div className="visual-field"><label>{target.current?.kind === "src" ? "Image URL" : target.current?.kind === "href" ? "Link URL" : selected.path.join(" / ")}<textarea value={value} disabled={busy || loading} rows={5} onChange={e => change(selected, e.target.value)}/></label>{target.current?.kind === "text" && <button className="admin-small" disabled={busy || loading} onClick={inlineEdit}>Edit directly on page</button>}{target.current?.kind === "src" && <label className="admin-small"><Upload size={14}/> Upload image<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" disabled={busy || loading} onChange={e => {void upload(e.target.files?.[0]);e.target.value = "";}}/></label>}</div>}
      {target.current?.element.closest("a") && <button className="admin-small" disabled={busy || loading} onClick={() => selectAttribute("href")}>Edit link destination</button>}{target.current?.element.tagName === "IMG" && <button className="admin-small" disabled={busy || loading} onClick={() => selectAttribute("alt")}>Edit image alt text</button>}
      <hr/><h3>All content fields</h3><p>Use the collection editor for SEO, menus, lists and content without a direct page match. Structural changes appear in the live layout after publishing.</p><label>Find collection<input value={search} onChange={e => setSearch(e.target.value)} placeholder="Home, services, blog…"/></label><label>Content collection<select value={collection} disabled={busy || loading} onChange={e => void openCollection(e.target.value)}><option value="">Choose collection…</option>{manifest.filter(e => `${e.label} ${e.group}`.toLowerCase().includes(search.toLowerCase()) || e.id === collection).map(e => <option key={e.id} value={e.id}>{e.group} / {e.label}</option>)}</select></label>
      {collection && docs[collection] && <fieldset disabled={busy || loading}><FormEditor value={docs[collection].data} schema={groupSchema(collection)} name={manifest.find(e => e.id === collection)?.label} onChange={data => {inlineCleanup.current(); clearSelection(); updateDocs({...docsRef.current, [collection]: {...docsRef.current[collection], data}});}}/></fieldset>}
      {changed.length > 0 && <button className="admin-small" disabled={busy || loading} onClick={() => {if (window.confirm("Discard all unpublished visual editor changes?")) {clearSelection();updateDocs(Object.fromEntries(Object.entries(docsRef.current).map(([id,d]) => [id,{...d,data:structuredClone(d.baseline)}])));setRevision(revision + 1);setNotice("");}}}>Discard unpublished changes</button>}
    </aside></div>
  </section>;
}
