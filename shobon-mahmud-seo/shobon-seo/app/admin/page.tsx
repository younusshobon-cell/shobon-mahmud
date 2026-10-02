import { authenticated, authConfigured, authConfigurationErrors } from "@/lib/admin/auth";
import { publishingConfigured } from "@/lib/admin/github";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { AdminLogin } from "@/components/admin/AdminLogin";
import manifest from "@/content/manifest.json";
export const dynamic = "force-dynamic";
export default async function AdminPage() {
  if (!(await authenticated()))
    return <AdminLogin configured={authConfigured()} configurationErrors={authConfigurationErrors()} />;
  return <AdminPanel manifest={manifest} publishing={publishingConfigured()} />;
}
