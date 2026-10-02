"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Search,
  Globe,
  FileText,
  Settings,
  MapPin,
  Briefcase,
  BookOpen,
  ImagePlus,
  ArrowUpRight,
  LogOut,
  Save,
  Plus,
  Download,
  LayoutDashboard,
  CheckCircle2,
  Trash2,
  Menu,
  X,
  RotateCcw,
} from "lucide-react";
import {
  FormEditor,
  blank,
  groupSchema,
  title,
  type Value,
} from "./FormEditor";
import { AnalyticsDashboard } from "./AnalyticsDashboard";
import { ContentStudio } from "./ContentStudio";
type Entry = { id: string; label: string; group: string; path: string };
type Document = { id: string; sha: string; data: Value };
const groups = [
  "Overview",
  "Analytics",
  "Pages",
  "Site settings",
  "Page copy",
  "Blog",
  "Services",
  "Industries",
  "Locations",
  "Portfolio",
  "FAQs",
  "Media",
];
const icons: Record<string, typeof Globe> = {
  Overview: LayoutDashboard,
  Analytics: BarChart3,
  Pages: FileText,
  "Site settings": Settings,
  "Page copy": FileText,
  Blog: BookOpen,
  Services: Globe,
  Industries: Briefcase,
  Locations: MapPin,
  Portfolio: Briefcase,
  FAQs: FileText,
  Media: ImagePlus,
};
async function api(url: string, options?: RequestInit) {
  const response = await fetch(url, options),
    data = await response.json();
  if (!response.ok) throw new Error(data.error ?? "Request failed.");
  return data;
}
export function AdminPanel({
  manifest,
  publishing,
}: {
  manifest: Entry[];
  publishing: boolean;
}) {
  const router = useRouter(),
    [group, setGroup] = useState("Overview"),
    [active, setActive] = useState<Entry | null>(null),
    [doc, setDoc] = useState<Document | null>(null),
    [draft, setDraft] = useState<Value | null>(null),
    [search, setSearch] = useState(""),
    [record, setRecord] = useState(0),
    [busy, setBusy] = useState(false),
    [loading, setLoading] = useState(false),
    [message, setMessage] = useState(""),
    [error, setError] = useState(""),
    [commit, setCommit] = useState(""),
    [advanced, setAdvanced] = useState(false),
    [json, setJson] = useState(""),
    [mobile, setMobile] = useState(false),
    [studioDirty, setStudioDirty] = useState(false),
    [studioBusy, setStudioBusy] = useState(false),
    [studioAdvanced, setStudioAdvanced] = useState(false);
  const loadId = useRef(0),
    dirty = studioDirty || (doc !== null && JSON.stringify(draft) !== JSON.stringify(doc.data));
  useEffect(() => {
    function warn(e: BeforeUnloadEvent) {
      if (dirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    }
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  function discard() {
    if (busy || studioBusy) return false;
    return !dirty || window.confirm("Discard your unpublished changes?");
  }
  async function open(entry: Entry) {
    if (!discard()) return;
    const id = ++loadId.current;
    setActive(entry);
    setGroup(entry.group);
    setDoc(null);
    setDraft(null);
    setRecord(0);
    setAdvanced(false);
    setSearch("");
    setError("");
    setMessage("");
    setLoading(true);
    setMobile(false);
    try {
      const result = await api(
        "/api/admin/content?id=" + encodeURIComponent(entry.id),
      );
      if (id !== loadId.current) return;
      setDoc(result);
      setDraft(result.data);
      setJson(JSON.stringify(result.data, null, 2));
    } catch (e) {
      if (id === loadId.current) setError((e as Error).message);
    } finally {
      if (id === loadId.current) setLoading(false);
    }
  }
  function navigate(next: string) {
    if (!discard()) return;
    loadId.current++;
    setGroup(next);
    setStudioDirty(false);
    setStudioAdvanced(false);
    setActive(null);
    setDoc(null);
    setDraft(null);
    setAdvanced(false);
    setSearch("");
    setError("");
    setMessage("");
    setLoading(false);
    setMobile(false);
  }
  function update(value: Value) {
    setDraft(value);
    setJson(JSON.stringify(value, null, 2));
    setMessage("");
  }
  async function publish() {
    if (!doc || !active || draft === null) return;
    if (
      !window.confirm(
        "Publish these changes to your live website? Vercel will deploy them after the repo update.",
      )
    )
      return;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const result = await api("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: active.id, sha: doc.sha, data: draft }),
      });
      setDoc({ ...doc, sha: result.sha, data: structuredClone(draft) });
      setCommit(result.url);
      setMessage(
        "Saved to GitHub. Your website will update when Vercel finishes deploying.",
      );
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function logout() {
    if (!discard()) return;
    await api("/api/admin/session", { method: "DELETE" });
    router.refresh();
  }
  function exportDraft() {
    if (draft === null) return;
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(draft, null, 2)], { type: "application/json" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = (active?.id ?? "content") + ".json";
    a.click();
    URL.revokeObjectURL(url);
  }
  const visible = manifest.filter(
    (x) =>
      x.group === group &&
      `${x.label} ${x.id}`.toLowerCase().includes(search.toLowerCase()),
  );
  const schema = active ? groupSchema(active.id) : null;
  return (
    <div className="admin-workspace">
      <aside className={`admin-sidebar ${mobile ? "is-open" : ""}`}>
        <div className="admin-brand">
          <span>SM</span>
          <div>
            Shobon Mahmud<small>Content studio</small>
          </div>
          <button
            className="admin-mobile-close"
            onClick={() => setMobile(false)}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>
        <p className="admin-nav-label">WORKSPACE</p>
        <nav>
          {groups.map((g) => {
            const Icon = icons[g];
            return (
              <button
                key={g}
                className={group === g ? "active" : ""}
                onClick={() => navigate(g)}
              >
                <Icon size={18} />
                <span>{g}</span>
                {g !== "Overview" && g !== "Media" && (
                  <small>{manifest.filter((x) => x.group === g).length}</small>
                )}
              </button>
            );
          })}
        </nav>
        <div className="admin-sidebar-bottom">
          <a href="/" target="_blank" rel="noopener noreferrer">
            <Globe size={17} />
            View website
            <ArrowUpRight size={15} />
          </a>
          <button onClick={logout}>
            <LogOut size={17} />
            Sign out
          </button>
          <div className="admin-account">
            <span>S</span>
            <div>
              Site administrator<small>Private workspace</small>
            </div>
          </div>
        </div>
      </aside>
      {mobile && (
        <button
          aria-label="Close navigation"
          className="admin-backdrop"
          onClick={() => setMobile(false)}
        />
      )}
      <div className="admin-main">
        <header className="admin-topbar">
          <button
            className="admin-mobile-menu"
            onClick={() => setMobile(true)}
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>
          <div>
            <span>Workspace</span>
            <span className="admin-slash">/</span>
            {group}
          </div>
          <a
            href="https://shobon-mahmud.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            shobon-mahmud.vercel.app
            <ArrowUpRight size={14} />
          </a>
        </header>
        <div className="admin-content">
          {!publishing && (
            <div className="admin-notice">
              Publishing setup is pending. Add ADMIN_GITHUB_TOKEN in Vercel with
              Contents read/write access to this repository.
            </div>
          )}
          {error && (
            <div className="admin-error-box" role="alert">
              {error}
            </div>
          )}
          {message && (
            <div className="admin-success" role="status">
              <CheckCircle2 size={18} />
              <span>
                {message}
                {commit && (
                  <a href={commit} target="_blank" rel="noopener noreferrer">
                    View saved commit ↗
                  </a>
                )}
              </span>
            </div>
          )}
          {group === "Overview" ? (
            <>
              <div className="admin-page-heading">
                <div>
                  <p className="admin-eyebrow">CONTENT STUDIO</p>
                  <h1>Your website, at a glance.</h1>
                  <p className="admin-muted">
                    Make a small update or tell a bigger story. Everything
                    starts here.
                  </p>
                </div>
                <a
                  className="admin-secondary"
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open website
                  <ArrowUpRight size={16} />
                </a>
              </div>
              <div className="admin-stat-grid">
                {["Blog", "Services", "Locations", "Portfolio"].map((g) => {
                  const Icon = icons[g];
                  return (
                    <button key={g} onClick={() => navigate(g)}>
                      <Icon size={20} />
                      <strong>{g}</strong>
                      <span>
                        {g === "Blog"
                          ? "Articles & categories"
                          : g === "Portfolio"
                            ? "Case studies & filters"
                            : "Content & search visibility"}
                      </span>
                      <ArrowUpRight size={16} />
                    </button>
                  );
                })}
              </div>
              <div className="admin-overview-grid">
                <section className="admin-card">
                  <h2>What would you like to update?</h2>
                  <p className="admin-muted">
                    Choose an area to start editing.
                  </p>
                  <div className="admin-quick-links">
                    {["Analytics", "Pages", "Blog", "Site settings", "Page copy", "FAQs", "Media"].map(
                      (g) => {
                        const Icon = icons[g];
                        return (
                          <button key={g} onClick={() => navigate(g)}>
                            <Icon size={19} />
                            <div>
                              <strong>{g}</strong>
                              <small>
                                {g === "Site settings"
                                  ? "Profile, navigation & social links"
                                  : g === "Page copy"
                                    ? "Headings, buttons & page SEO"
                                    : g === "FAQs"
                                      ? "Answers across your website"
                                      : "Upload or replace original images"}
                              </small>
                            </div>
                            <ArrowUpRight size={16} />
                          </button>
                        );
                      },
                    )}
                  </div>
                </section>
                <section className="admin-card admin-publishing-card">
                  <span className="admin-status-dot" />
                  <p className="admin-eyebrow">REPOSITORY PUBLISHING</p>
                  <h2>Edit. Review. Publish.</h2>
                  <p>
                    Your edits are saved as GitHub commits. Vercel deploys the
                    updated website, including new pages and sitemap entries.
                  </p>
                  <div>
                    1<span>Choose and edit your content.</span>
                  </div>
                  <div>
                    2<span>Review your draft before publishing.</span>
                  </div>
                  <div>
                    3<span>Publish and wait for deployment.</span>
                  </div>
                  <a
                    href="https://github.com/younusshobon-cell/shobon-mahmud/commits/main"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View change history ↗
                  </a>
                </section>
              </div>
            </>
          ) : group === "Analytics" ? (
            <AnalyticsDashboard />
          ) : (group === "Blog" || group === "Pages") && !active && !studioAdvanced ? (
            <ContentStudio key={group} kind={group === "Blog" ? "blog" : "pages"} publishing={publishing} onDirty={setStudioDirty} onBusy={setStudioBusy} onAdvanced={() => {if(discard()) {setStudioDirty(false); setStudioAdvanced(true);}}}/>
          ) : group === "Media" ? (
            <MediaManager />
          ) : (
            <>
              <div className="admin-page-heading">
                <div>
                  <p className="admin-eyebrow">
                    {active ? "CONTENT EDITOR" : "MANAGE CONTENT"}
                  </p>
                  <h1>{active?.label ?? group}</h1>
                  <p className="admin-muted">
                    {active
                      ? "Edit your draft, then publish when you are ready."
                      : "Select a collection or page to manage its content."}
                  </p>
                </div>
                {active && doc && (
                  <div className="admin-heading-actions">
                    <span
                      className={`admin-draft-status ${dirty ? "is-dirty" : ""}`}
                    >
                      {dirty ? "Unpublished changes" : "Up to date"}
                    </span>
                    <button
                      className="admin-primary"
                      onClick={publish}
                      disabled={busy || !dirty || !publishing}
                    >
                      <Save size={16} />
                      {busy ? "Publishing…" : "Publish changes"}
                    </button>
                  </div>
                )}
              </div>
              {!active ? (
                <>
                  <label className="admin-search">
                    <Search size={17} />
                    <input
                      placeholder="Find a page or collection…"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </label>
                  <div className="admin-collection-grid">
                    {visible.map((x) => (
                      <button
                        className="admin-collection-card"
                        key={x.id}
                        onClick={() => open(x)}
                      >
                        <FileText size={20} />
                        <strong>
                          {x.label.replace("Raw Posts", "Blog posts")}
                        </strong>
                        <span>
                          {x.group === "Page copy"
                            ? "Page text, links & SEO copy"
                            : "Structured content collection"}
                        </span>
                        <ArrowUpRight size={17} />
                      </button>
                    ))}
                  </div>
                  {!visible.length && (
                    <p className="admin-empty">
                      No collections match your search.
                    </p>
                  )}
                </>
              ) : loading ? (
                <div className="admin-card admin-empty">
                  Loading the latest content from GitHub…
                </div>
              ) : doc && draft !== null && schema ? (
                <>
                  <div className="admin-editor-tools">
                    <button
                      onClick={() => {
                        if (discard()) open(active);
                      }}
                      className="admin-small"
                    >
                      <RotateCcw size={14} />
                      Reload latest
                    </button>
                    <button onClick={exportDraft} className="admin-small">
                      <Download size={14} />
                      Export JSON
                    </button>
                    <button
                      className="admin-small"
                      onClick={() => setAdvanced(!advanced)}
                    >
                      {advanced ? "Visual editor" : "JSON editor"}
                    </button>
                    <span>Changes stay in this draft until published.</span>
                  </div>
                  {advanced ? (
                    <div className="admin-card">
                      <h2>Advanced JSON editor</h2>
                      <p className="admin-muted">
                        Apply valid JSON to your draft before publishing.
                      </p>
                      <textarea
                        className="admin-json"
                        value={json}
                        spellCheck={false}
                        onChange={(e) => setJson(e.target.value)}
                      />
                      <button
                        className="admin-secondary"
                        onClick={() => {
                          try {
                            update(JSON.parse(json));
                            setError("");
                          } catch {
                            setError(
                              "This JSON is invalid. Fix the syntax before applying.",
                            );
                          }
                        }}
                      >
                        Apply JSON to draft
                      </button>
                    </div>
                  ) : Array.isArray(draft) ? (
                    <div className="admin-record-layout">
                      <div className="admin-record-list">
                        <div className="admin-field-heading">
                          <h3>{draft.length} entries</h3>
                          <button
                            className="admin-small"
                            onClick={() => {
                              const s = schema as {
                                items?: Parameters<typeof blank>[0];
                              };
                              const next = blank(s.items ?? { type: "string" });
                              if (
                                next &&
                                typeof next === "object" &&
                                !Array.isArray(next) &&
                                "slug" in next
                              )
                                next.slug = "new-entry-" + Date.now();
                              update([...draft, next]);
                              setRecord(draft.length);
                            }}
                          >
                            <Plus size={14} />
                            New
                          </button>
                        </div>
                        {draft.map((v, i) => (
                          <button
                            key={i}
                            className={record === i ? "active" : ""}
                            onClick={() => setRecord(i)}
                          >
                            <strong>{title(v, i)}</strong>
                            <small>
                              {v && typeof v === "object" && !Array.isArray(v)
                                ? String(v.slug ?? `Entry ${i + 1}`)
                                : `Entry ${i + 1}`}
                            </small>
                          </button>
                        ))}
                      </div>
                      <section className="admin-card admin-edit-card">
                        {draft[record] !== undefined ? (
                          <>
                            <div className="admin-record-heading">
                              <h2>{title(draft[record], record)}</h2>
                              <div>
                                <button
                                  className="admin-small"
                                  onClick={() => {
                                    const next = structuredClone(draft[record]);
                                    if (
                                      next &&
                                      typeof next === "object" &&
                                      !Array.isArray(next) &&
                                      "slug" in next
                                    )
                                      next.slug = String(next.slug) + "-copy";
                                    update([...draft, next]);
                                    setRecord(draft.length);
                                  }}
                                >
                                  Duplicate
                                </button>
                                <button
                                  className="admin-small admin-danger"
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        "Delete this entry from your draft?",
                                      )
                                    ) {
                                      update(
                                        draft.filter((_, i) => i !== record),
                                      );
                                      setRecord(Math.max(0, record - 1));
                                    }
                                  }}
                                >
                                  <Trash2 size={14} />
                                  Delete
                                </button>
                              </div>
                            </div>
                            <FormEditor
                              value={draft[record]}
                              onChange={(v) =>
                                update(
                                  draft.map((x, i) => (i === record ? v : x)),
                                )
                              }
                              schema={
                                (
                                  schema as {
                                    items: Parameters<typeof blank>[0];
                                  }
                                ).items
                              }
                            />
                          </>
                        ) : (
                          <p className="admin-empty">Add an entry to start.</p>
                        )}
                      </section>
                    </div>
                  ) : (
                    <section className="admin-card admin-edit-card">
                      <FormEditor
                        value={draft}
                        onChange={update}
                        schema={schema}
                      />
                    </section>
                  )}
                </>
              ) : null}
            </>
          )}
          <footer className="admin-footer">
            Shobon Mahmud · Content studio<span>GitHub + Vercel</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
function MediaManager() {
  const [images, setImages] = useState<{ path: string; url: string | null }[]>(
      [],
    ),
    [target, setTarget] = useState(""),
    [sha, setSha] = useState(""),
    [file, setFile] = useState<File | null>(null),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [message, setMessage] = useState(""),
    [url, setUrl] = useState(""),
    [preview, setPreview] = useState("");
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    api("/api/admin/media")
      .then((x) => setImages(x.images))
      .catch((e) => setError(e.message));
  }, []);
  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);
  async function select(path: string) {
    setTarget(path);
    setSha("");
    setError("");
    if (path) {
      try {
        const result = await api(
          "/api/admin/media?path=" + encodeURIComponent(path),
        );
        setSha(result.sha);
      } catch (e) {
        setError((e as Error).message);
      }
    }
  }
  async function upload() {
    if (!file) return;
    if (target && !window.confirm("Replace this image on your live website?"))
      return;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const form = new FormData();
      form.set("file", file);
      if (target) {
        form.set("target", target);
        form.set("sha", sha);
      }
      const result = await api("/api/admin/media", {
        method: "POST",
        body: form,
      });
      setUrl(result.url ?? "");
      setMessage(
        "Image saved to the repo. Vercel will deploy it with its original uploaded quality.",
      );
      setFile(null);
      if (input.current) input.current.value = "";
      if (target) setSha(result.sha);
      else setImages((x) => [...x, { path: result.path, url: result.url }]);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">MEDIA LIBRARY</p>
          <h1>Make it visual.</h1>
          <p className="admin-muted">
            Upload a new image or replace an existing website photo.
          </p>
        </div>
      </div>
      {error && (
        <div className="admin-error-box" role="alert">
          {error}
        </div>
      )}
      {message && (
        <div className="admin-success" role="status">
          <CheckCircle2 size={18} />
          <span>
            {message}
            {url && (
              <>
                <code>{url}</code>
                <button onClick={() => navigator.clipboard.writeText(url)}>
                  Copy image path
                </button>
              </>
            )}
          </span>
        </div>
      )}
      <div className="admin-overview-grid">
        <section className="admin-card">
          <h2>Upload an image</h2>
          <label className="admin-field">
            Destination
            <select value={target} onChange={(e) => select(e.target.value)}>
              <option value="">New image in media library</option>
              {images
                .filter((x) => !x.path.startsWith("public/uploads"))
                .map((x) => (
                  <option key={x.path}>{x.path}</option>
                ))}
            </select>
          </label>
          <label className="admin-upload">
            <ImagePlus size={30} />
            <strong>{file?.name ?? "Choose an image"}</strong>
            <span>PNG, JPG, WEBP or GIF · Up to 3 MB</span>
            <input
              ref={input}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>
          {preview && (
            <img
              className="admin-image-preview"
              src={preview}
              alt="Selected upload preview"
            />
          )}
          <p className="admin-muted">
            Existing portraits and hero images are replaced directly. For a new
            image, copy its path into an image field in your content.
          </p>
          <button
            className="admin-primary"
            onClick={upload}
            disabled={!file || busy || (Boolean(target) && !sha)}
          >
            <ImagePlus size={16} />
            {busy ? "Uploading…" : "Save image to website"}
          </button>
        </section>
        <section className="admin-card">
          <h2>Website images</h2>
          <div className="admin-media-list">
            {images.map((x) => (
              <div key={x.path}>
                <ImagePlus size={17} />
                <div>
                  <strong>{x.path.split("/").pop()}</strong>
                  <small>{x.url ?? "Original portrait asset"}</small>
                </div>
                {x.url ? (
                  <a
                    href={x.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${x.path}`}
                  >
                    <ArrowUpRight size={16} />
                  </a>
                ) : (
                  <button onClick={() => select(x.path)}>Replace</button>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
