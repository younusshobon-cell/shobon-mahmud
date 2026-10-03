"use client";
import { useEffect, useRef, useState } from "react";
import { ImagePlus, Save, RotateCcw, Eye, Upload, Monitor, Tablet, Smartphone } from "lucide-react";
import type { PageImage } from "@/components/content/EditableImage";
type Slot = {key: string; src: string; alt: string; label: string};
async function api(url: string, options?: RequestInit) {
  const response = await fetch(url, options), data = await response.json();
  if (!response.ok) throw new Error(data.error || "Request failed.");
  return data;
}
function srcOf(img: HTMLImageElement | null) {
  if (!img) return "";
  const src = img.getAttribute("src") || "";
  try {const url = new URL(src, location.origin); return url.pathname === "/_next/image" ? url.searchParams.get("url") || src : src;} catch {return src;}
}
export function PageImages({initialPage = "/", publishing, onDirty, onBusy}: {initialPage?: string; publishing: boolean; onDirty: (value: boolean) => void; onBusy: (value: boolean) => void}) {
  const [pages, setPages] = useState<string[]>([]), [page, setPage] = useState(initialPage);
  const [draft, setDraft] = useState<PageImage[]>([]), [baseline, setBaseline] = useState<PageImage[]>([]), [sha, setSha] = useState("");
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const previewWidth = {desktop: 1280, tablet: 820, mobile: 390}[viewport];
  const [slots, setSlots] = useState<Slot[]>([]), [selected, setSelected] = useState("");
  const [media, setMedia] = useState<{url: string | null; path: string}[]>([]);
  const [busy, setBusy] = useState(true), [error, setError] = useState(""), [notice, setNotice] = useState(""), [revision, setRevision] = useState(0);
  const iframe = useRef<HTMLIFrameElement>(null), cleanup = useRef<() => void>(() => {}), lock = useRef(true);
  const previews = useRef(new Map<string, string>()), draftRef = useRef(draft), pageRef = useRef(page);
  draftRef.current = draft; pageRef.current = page;
  const dirty = JSON.stringify(draft) !== JSON.stringify(baseline);
  useEffect(() => {onDirty(dirty);}, [dirty, onDirty]);
  useEffect(() => {onBusy(busy); lock.current = busy;}, [busy, onBusy]);
  useEffect(() => {
    let cancelled = false;
    Promise.all([api("/api/admin/visual"), api("/api/admin/content?id=page-images"), api("/api/admin/media")])
      .then(([catalog, doc, library]) => {if (!cancelled) {setPages(catalog.pages); setDraft(doc.data); setBaseline(doc.data); setSha(doc.sha); setMedia(library.images);}})
      .catch(e => {if (!cancelled) setError(e.message);})
      .finally(() => {if (!cancelled) {setBusy(false); lock.current = false;}});
    return () => {cancelled = true; cleanup.current(); for (const url of previews.current.values()) URL.revokeObjectURL(url);};
  }, []);
  function paint() {
    const doc = iframe.current?.contentDocument; if (!doc) return;
    for (const element of doc.querySelectorAll<HTMLElement>("[data-page-image-slot], img[data-page-image-key]")) {
      if (element.tagName === "IMG" && element.closest("[data-page-image-slot]")) continue;
      const key = element.dataset.pageImageSlot || element.dataset.pageImageKey || "";
      const override = draftRef.current.find(item => item.page === pageRef.current && item.key === key);
      if (!override) {
        if (element.tagName === "IMG") {
          const original = element.dataset.originalSrc;
          if (original && element.getAttribute("src") !== original) {element.setAttribute("src", original); element.removeAttribute("srcset");}
          element.setAttribute("alt", element.dataset.originalAlt || "");
        } else {
          const original = element.querySelector<HTMLElement>("[data-page-image-original]");
          if (original) {original.hidden = false; original.style.display = "";}
          const replacement = element.querySelector<HTMLElement>("[data-page-image-replacement], [data-admin-draft-image]");
          if (replacement) replacement.hidden = true;
          element.hidden = element.dataset.hasOriginalAside !== "true";
          if (element.parentElement) {
            element.parentElement.style.gridTemplateColumns = "";
            if (element.hidden) element.parentElement.classList.remove("lg:grid-cols-[1.35fr_1fr]");
          }
        }
        continue;
      }
      let img = element.tagName === "IMG" ? element as HTMLImageElement : element.querySelector<HTMLImageElement>("img[data-page-image-replacement], img[data-admin-draft-image]");
      if (!img && element.tagName !== "IMG") {
        img = doc.createElement("img"); img.setAttribute("data-admin-draft-image", "true");
        img.className = "h-auto w-full rounded-[28px]"; element.appendChild(img);
      }
      if (!img) continue;
      if (element.tagName !== "IMG") {
        element.hidden = false;
        for (const child of element.children) if (child !== img) (child as HTMLElement).style.display = "none";
        const grid = element.parentElement;
        if (grid) {grid.style.gridTemplateColumns = ""; grid.classList.add("lg:grid-cols-[1.35fr_1fr]");}
      }
      img.hidden = false;
      const src = previews.current.get(JSON.stringify([pageRef.current, key])) || override.src;
      if (img.getAttribute("src") !== src) img.setAttribute("src", src);
      img.setAttribute("alt", override.alt); img.removeAttribute("srcset"); img.removeAttribute("sizes");
    }
  }
  useEffect(() => {paint();}, [draft]);
  function attach() {
    cleanup.current(); setSlots([]);
    const doc = iframe.current?.contentDocument;
    if (!doc || new URL(iframe.current?.contentWindow?.location.href || location.origin).pathname !== pageRef.current) return;
    function scan() {
      const next: Slot[] = [], seen = new Set<string>();
      for (const element of doc!.querySelectorAll<HTMLElement>("[data-page-image-slot], img[data-page-image-key]")) {
        if (element.tagName === "IMG" && element.closest("[data-page-image-slot]")) continue;
        const key = element.dataset.pageImageSlot || element.dataset.pageImageKey || "";
        if (seen.has(key)) continue; seen.add(key);
        const img = element.tagName === "IMG" ? element as HTMLImageElement : element.querySelector("img");
        next.push({key, src: element.dataset.originalSrc || srcOf(element.querySelector<HTMLImageElement>("[data-page-image-original] img")) || srcOf(img), alt: element.dataset.originalAlt ?? img?.alt ?? "", label: key === "hero" || element.closest(".hero-surface") ? "Hero image" : `Page image ${next.length + 1}`});
      }
      setSlots(previous => JSON.stringify(previous) === JSON.stringify(next) ? previous : next);
      paint();
    }
    const click = (event: MouseEvent) => {
      if ((event.target as Element)?.closest("a")) event.preventDefault();
      const element = (event.target as Element)?.closest<HTMLElement>("[data-page-image-slot], [data-page-image-key]");
      if (!element || lock.current) return;
      event.preventDefault(); event.stopPropagation();
      setSelected(element.closest<HTMLElement>("[data-page-image-slot]")?.dataset.pageImageSlot || element.dataset.pageImageKey || "");
    };
    const submit = (event: Event) => event.preventDefault();
    doc.addEventListener("click", click, true); doc.addEventListener("submit", submit, true);
    const observer = new MutationObserver(scan); observer.observe(doc.body, {childList: true, subtree: true}); scan();
    cleanup.current = () => {observer.disconnect(); doc.removeEventListener("click", click, true); doc.removeEventListener("submit", submit, true);};
  }
  const slot = slots.find(item => item.key === selected);
  const current = draft.find(item => item.page === page && item.key === selected);
  const src = current?.src ?? slot?.src ?? "", alt = current?.alt ?? slot?.alt ?? "";
  function change(next: {src?: string; alt?: string}) {
    if (!slot || lock.current) return;
    const item = {page, key: selected, src, alt, ...next};
    setDraft(values => [...values.filter(v => v.page !== page || v.key !== selected), item]); setError(""); setNotice("Unpublished image change. Review the preview, then publish.");
  }
  async function upload(file?: File) {
    if (!file || !slot || lock.current) return;
    if (!file.size || file.size > 3 * 1024 * 1024) {setError("Choose a PNG, JPG, WEBP or GIF up to 3 MB. This uploader preserves the original file."); return;}
    lock.current = true; setBusy(true); setError("");
    try {
      const form = new FormData(); form.append("file", file);
      const result = await api("/api/admin/media", {method: "POST", body: form});
      const identity = JSON.stringify([page, selected]), previous = previews.current.get(identity);
      if (previous) URL.revokeObjectURL(previous);
      previews.current.set(identity, URL.createObjectURL(file));
      lock.current = false; change({src: result.url}); setMedia(values => [...values, {path: result.path, url: result.url}]);
      setNotice("Original image uploaded. Publish image changes to apply it to this page.");
    } catch (e) {setError((e as Error).message);} finally {lock.current = false; setBusy(false);}
  }
  async function publish() {
    if (lock.current || !sha || !dirty || !publishing) return;
    lock.current = true; setBusy(true); setError("");
    try {
      const result = await api("/api/admin/content", {method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id: "page-images", sha, data: draft})});
      setSha(result.sha); setBaseline(structuredClone(draft)); setNotice("Published. Your live pages update when deployment finishes. Reload preview after deployment.");
    } catch (e) {setError((e as Error).message);} finally {lock.current = false; setBusy(false);}
  }
  return <section className="visual-studio">
    <div className="visual-toolbar"><div><h1><ImagePlus size={22}/> Page images</h1><p>One edit updates desktop, tablet and mobile. Switch preview size to review each layout.</p></div><button className="admin-primary" disabled={busy || !dirty || !sha || !publishing} onClick={publish}><Save size={16}/>{busy ? "Working…" : "Publish image changes"}</button></div>
    {error && <div className="admin-error-box" role="alert">{error}</div>}{notice && <div className="admin-success" role="status">{notice}</div>}
    <div className="visual-controls"><label>Page<select value={page} disabled={busy} onChange={e => {setPage(e.target.value); setSelected(""); setSlots([]);}}>{pages.map(path => <option key={path} value={path}>{path === "/" ? "Home /" : path}</option>)}</select></label><button className="admin-small" aria-pressed={viewport === "desktop"} onClick={() => setViewport("desktop")}><Monitor size={15}/> Desktop</button><button className="admin-small" aria-pressed={viewport === "tablet"} onClick={() => setViewport("tablet")}><Tablet size={15}/> Tablet</button><button className="admin-small" aria-pressed={viewport === "mobile"} onClick={() => setViewport("mobile")}><Smartphone size={15}/> Mobile</button><button className="admin-small" disabled={busy} onClick={() => setRevision(v => v + 1)}><RotateCcw size={15}/> Reload preview</button><a href={page} target="_blank" rel="noopener noreferrer" className="admin-small"><Eye size={15}/> Live page</a><span>{dirty ? "Unpublished changes" : "Up to date"}</span></div>
    <div className="visual-workspace"><div className="visual-canvas responsive-preview-canvas"><iframe style={{width: previewWidth, maxWidth: "none"}} ref={iframe} key={`${page}:${revision}`} src={`${page}?admin-preview=1`} title={`Image preview of ${page}`} onLoad={attach} sandbox="allow-same-origin allow-scripts"/></div><aside className="visual-inspector">
      <h2>Images on this page</h2><p>Changes apply only to the selected page. Uploads keep their original quality.</p>
      <label>Select image<select value={selected} disabled={busy} onChange={e => setSelected(e.target.value)}><option value="">Choose an image…</option>{slots.map(item => <option key={item.key} value={item.key}>{item.label} · {item.alt.slice(0, 55) || "Add an image"}</option>)}</select></label>
      {!slots.length && !busy && <p>This page has no editable images.</p>}
      {slot && <div className="visual-field"><h3>{slot.label}</h3>{src && <img className="admin-image-preview" src={previews.current.get(JSON.stringify([page, selected])) || src} alt={alt}/>}
        <label className="admin-small"><Upload size={15}/> Upload replacement<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" disabled={busy || !sha} onChange={e => {void upload(e.target.files?.[0]); e.target.value = "";}}/></label><p>PNG, JPG, WEBP or GIF · up to 3 MB</p>
        <label>Choose from media<select value="" disabled={busy || !sha} onChange={e => {if (e.target.value) {const id = JSON.stringify([page, selected]); const preview = previews.current.get(id); if (preview) URL.revokeObjectURL(preview); previews.current.delete(id); change({src: e.target.value});}}}><option value="">Select an uploaded image…</option>{media.filter(item => item.url).map(item => <option key={item.path} value={item.url!}>{item.path.split("/").pop()}</option>)}</select></label>
        <label>Image description (alt text)<input value={alt} disabled={busy || !sha} onChange={e => change({alt: e.target.value})}/></label>
        <button className="admin-small" disabled={busy || !current} onClick={() => {setDraft(values => values.filter(item => item.page !== page || item.key !== selected)); const id = JSON.stringify([page, selected]), preview = previews.current.get(id); if (preview) URL.revokeObjectURL(preview); previews.current.delete(id); setRevision(v => v + 1); setNotice("Original image restored in the draft. Publish to apply.");}}>Restore original image</button>
      </div>}
      {dirty && <button className="admin-small" disabled={busy} onClick={() => {setDraft(structuredClone(baseline)); for (const url of previews.current.values()) URL.revokeObjectURL(url); previews.current.clear(); setRevision(v => v + 1); setNotice("Draft changes discarded.");}}>Discard image changes</button>}
    </aside></div>
  </section>;
}
