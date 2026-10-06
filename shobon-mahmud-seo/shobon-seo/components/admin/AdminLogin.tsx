"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, ArrowRight, ShieldCheck } from "lucide-react";
export function AdminLogin({ configured, configurationErrors }: { configured: boolean; configurationErrors: string[] }) {
  const router = useRouter(),
    [password, setPassword] = useState(""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      setPassword("");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not sign in.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <div className="admin-brand">
          <span>SM</span>
          <div>
            Shobon Mahmud<small>Growth workspace</small>
          </div>
        </div>
        <div className="admin-lock">
          <LockKeyhole size={26} />
        </div>
        <p className="admin-eyebrow">YOUR WEBSITE, YOUR CONTROL</p>
        <h1>Welcome back.</h1>
        <p className="admin-muted">
          Sign in to review performance, follow up on enquiries and publish your next update.
        </p>
        {!configured && (
          <div className="admin-notice">
            Login setup is pending. {configurationErrors.join(" ")} Save the settings and redeploy to activate access.
          </div>
        )}
        <form onSubmit={submit}>
          <label htmlFor="admin-password">Admin password</label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            maxLength={256}
          />
          {error && (
            <p role="alert" className="admin-error">
              {error}
            </p>
          )}
          <button className="admin-primary" disabled={busy || !configured}>
            {busy ? "Signing in…" : "Open workspace"}
            <ArrowRight size={17} />
          </button>
        </form>
        <p className="admin-login-note">
          <ShieldCheck size={15} />
          Private access · Secure session
        </p>
        <a href="/">← Back to website</a>
      </div>
    </div>
  );
}
