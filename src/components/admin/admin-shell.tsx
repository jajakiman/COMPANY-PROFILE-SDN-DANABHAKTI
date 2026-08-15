"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { List, SidebarSimple } from "@phosphor-icons/react";

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

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    const compact = window.matchMedia("(min-width: 768px) and (max-width: 1199px)");

    const handleViewportChange = () => {
      if (mobile.matches) {
        setCollapsed(false);
        return;
      }

      setMobileOpen(false);
      setCollapsed(compact.matches);
    };

    handleViewportChange();
    mobile.addEventListener("change", handleViewportChange);
    compact.addEventListener("change", handleViewportChange);
    return () => {
      mobile.removeEventListener("change", handleViewportChange);
      compact.removeEventListener("change", handleViewportChange);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.classList.add("admin-drawer-open");
    return () => document.body.classList.remove("admin-drawer-open");
  }, [mobileOpen]);

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
          aria-expanded={mobileOpen}
          aria-controls="admin-sidebar"
        >
          <List size={24} weight="bold" />
        </button>
      </header>

      <AdminSidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="admin-sidebar-control-rail" aria-hidden="false">
        <button
          type="button"
          onClick={() => setCollapsed((current) => !current)}
          className="admin-collapse-toggle"
          aria-label={collapsed ? "Buka sidebar" : "Kecilkan sidebar"}
          aria-expanded={!collapsed}
          aria-controls="admin-sidebar"
          title={collapsed ? "Buka Sidebar" : "Kecilkan Sidebar"}
        >
          <SidebarSimple size={20} weight="bold" />
        </button>
      </div>

      <main className="admin-main-content">{children}</main>
    </div>
  );
}
