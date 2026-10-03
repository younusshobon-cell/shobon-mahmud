"use client";
import { useEffect, useRef, useState } from "react";
import { Upload } from "lucide-react";
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
export function ImageInspector({page, iframe, revision, active, selectedKey, onSelectKey, data, onChange, disabled, onBusy}: {
  page: string; iframe: React.RefObject<HTMLIFrameElement | null>; revision: number; active: boolean; selectedKey: string; onSelectKey: (key: string) => void;
  data: PageImage[]; onChange: (images: PageImage[]) => void; disabled: boolean; onBusy: (busy: boolean) => void;
}) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const selected = selectedKey;
  const [media, setMedia] = useState<{url: string | null; path: string}[]>([]);
  const [busy, setBusy] = useState(false), [error, setError] = useState(""), [notice, setNotice] = useState("");
  const cleanup = useRef<() => void>(() => {}), lock = useRef(false);
  const previews = useRef(new Map<string, {src: string; url: string}>()), draftRef = useRef(data), pageRef = useRef(page);
  draftRef.current = data; pageRef.current = page;
  useEffect(() => {
    let cancelled = false;
    api("/api/admin/media").then(library => {if (!cancelled) setMedia(library.images);}).catch(e => {if (!cancelled) setError(e.message);});
    return () => {cancelled = true; cleanup.current(); for (const url of previews.current.values()) URL.revokeObjectURL(url.url);};
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
      const preview = previews.current.get(JSON.stringify([pageRef.current, key]));
      const src = preview?.src === override.src ? preview.url : override.src;
      if (img.getAttribute("src") !== src) img.setAttribute("src", src);
      img.setAttribute("alt", override.alt); img.removeAttribute("srcset"); img.removeAttribute("sizes");
    }
  }
  useEffect(() => {paint();}, [data]);
  useEffect(() => {attach();}, [page, revision]);
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
    const observer = new MutationObserver(scan); observer.observe(doc.body, {childList: true, subtree: true}); scan();
    cleanup.current = () => {observer.disconnect();};
  }
  const slot = slots.find(item => item.key === selected);
  const current = data.find(item => item.page === page && item.key === selected);
  const src = current?.src ?? slot?.src ?? "", alt = current?.alt ?? slot?.alt ?? "";
  const localPreview = previews.current.get(JSON.stringify([page, selected]));
  function change(next: {src?: string; alt?: string}) {
    if (!slot || lock.current || disabled) return;
    const item = {page, key: selected, src, alt, ...next};
    onChange([...data.filter(v => v.page !== page || v.key !== selected), item]); setError(""); setNotice("Unpublished image change. Review the preview, then publish.");
  }
  async function upload(file?: File) {
    if (!file || !slot || lock.current || disabled) return;
    if (!file.size || file.size > 3 * 1024 * 1024) {setError("Choose a PNG, JPG, WEBP or GIF up to 3 MB. This uploader preserves the original file."); return;}
    lock.current = true; setBusy(true); onBusy(true); setError("");
    try {
      const form = new FormData(); form.append("file", file);
      const result = await api("/api/admin/media", {method: "POST", body: form});
      const identity = JSON.stringify([page, selected]), previous = previews.current.get(identity);
      if (previous) URL.revokeObjectURL(previous.url);
      previews.current.set(identity, {src: result.url, url: URL.createObjectURL(file)});
      lock.current = false; change({src: result.url}); setMedia(values => [...values, {path: result.path, url: result.url}]);
      setNotice("Original image uploaded. Publish image changes to apply it to this page.");
    } catch (e) {setError((e as Error).message);} finally {lock.current = false; setBusy(false); onBusy(false);}
  }
  return <div hidden={!active}>
    {error && <div className="admin-error-box" role="alert">{error}</div>}{notice && <div className="admin-notice" role="status">{notice}</div>}
      <h2>Images on this page</h2><p>Changes update this page on desktop, tablet and mobile. Use the page editor’s Publish button to save text and images.</p>
      <label>Select image<select value={selected} disabled={busy || disabled} onChange={e => onSelectKey(e.target.value)}><option value="">Choose an image…</option>{slots.map(item => <option key={item.key} value={item.key}>{item.label} · {item.alt.slice(0, 55) || "Add an image"}</option>)}</select></label>
      {!slots.length && !busy && <p>This page has no editable images.</p>}
      {slot && <div className="visual-field"><h3>{slot.label}</h3>{src && <img className="admin-image-preview" src={localPreview?.src === src ? localPreview.url : src} alt={alt}/>}
        <label className="admin-small"><Upload size={15}/> Upload replacement<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" disabled={busy || disabled} onChange={e => {void upload(e.target.files?.[0]); e.target.value = "";}}/></label><p>PNG, JPG, WEBP or GIF · up to 3 MB</p>
        <label>Choose from media<select value="" disabled={busy || disabled} onChange={e => {if (e.target.value) {const id = JSON.stringify([page, selected]); const preview = previews.current.get(id); if (preview) URL.revokeObjectURL(preview.url); previews.current.delete(id); change({src: e.target.value});}}}><option value="">Select an uploaded image…</option>{media.filter(item => item.url).map(item => <option key={item.path} value={item.url!}>{item.path.split("/").pop()}</option>)}</select></label>
        <label>Image description (alt text)<input value={alt} disabled={busy || disabled} onChange={e => change({alt: e.target.value})}/></label>
        <button className="admin-small" disabled={busy || disabled || !current} onClick={() => {onChange(data.filter(item => item.page !== page || item.key !== selected)); const id = JSON.stringify([page, selected]), preview = previews.current.get(id); if (preview) URL.revokeObjectURL(preview.url); previews.current.delete(id); setNotice("Original image restored in the draft. Publish to apply.");}}>Restore original image</button>
      </div>}
    </div>;
}
