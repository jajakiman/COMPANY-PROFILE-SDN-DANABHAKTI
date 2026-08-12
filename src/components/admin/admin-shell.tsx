"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { List } from "@phosphor-icons/react";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  // Client-side Session Security Guard
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) {
          router.replace("/login");
        }
      })
      .catch(() => {
        router.replace("/login");
      });
  }, [router]);

  return (
    <div className={`admin-shell ${collapsed ? "sidebar-collapsed" : ""}`}>
      {/* Mobile Top Navigation Header */}
      <header className="admin-mobile-header">
        <div className="admin-mobile-brand">
          <Image
            src="/images/brand/logo-sdn-danabhakti-full.webp"
            alt="Logo SDN Danabhakti"
            width={36}
            height={36}
          />
          <strong>SDN Danabhakti Admin</strong>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="admin-hamburger-btn"
          aria-label="Buka Menu Sidebar"
        >
          <List size={24} weight="bold" />
        </button>
      </header>

      <AdminSidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <main className="admin-main-content">{children}</main>
    </div>
  );
}
