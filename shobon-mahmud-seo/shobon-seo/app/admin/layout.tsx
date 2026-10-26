import { DocumentLayout } from "@/components/layout/DocumentLayout";
import type { Metadata } from "next";
import "./admin.css";
import "./control-theme.css";
export const metadata: Metadata = {
  title: "Admin — Shobon Mahmud",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocumentLayout><div className="admin-app">{children}</div></DocumentLayout>;
}
