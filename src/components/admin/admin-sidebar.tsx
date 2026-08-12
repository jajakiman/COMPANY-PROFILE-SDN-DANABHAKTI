"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  ChartPie,
  Newspaper,
  ImageSquare,
  ArrowSquareOut,
  SignOut,
  X,
} from "@phosphor-icons/react";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";

type AdminSidebarProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
};

export function AdminSidebar({
  collapsed,
  mobileOpen,
  onCloseMobile,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } catch {
      router.push("/");
    } finally {
      setLoggingOut(false);
      setShowLogoutConfirm(false);
    }
  };

  const navItems = [
    { label: "Statistik Dashboard", href: "/admin", icon: ChartPie },
    { label: "Kelola Berita", href: "/admin/berita", icon: Newspaper },
    { label: "Kelola Galeri", href: "/admin/galeri", icon: ImageSquare },
  ];

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      {mobileOpen && (
        <div
          className="admin-mobile-backdrop"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        id="admin-sidebar"
        className={`admin-sidebar ${collapsed ? "collapsed" : ""} ${
          mobileOpen ? "mobile-open" : ""
        }`}
      >
        <div className="admin-sidebar-header">
          {collapsed ? (
            <div className="admin-collapsed-header-box">
              <Link href="/admin" className="admin-brand" onClick={onCloseMobile}>
                <Image
                  src="/images/brand/logo-sdn-danabhakti-full.webp"
                  alt="Logo SDN Danabhakti"
                  width={42}
                  height={42}
                  className="admin-brand-logo"
                />
              </Link>
            </div>
          ) : (
            <div className="admin-expanded-header-box">
              <Link href="/admin" className="admin-brand" onClick={onCloseMobile}>
                <Image
                  src="/images/brand/logo-sdn-danabhakti-full.webp"
                  alt="Logo SDN Danabhakti"
                  width={44}
                  height={44}
                  className="admin-brand-logo"
                />
                <div className="admin-brand-text">
                  <strong>SDN Danabhakti</strong>
                  <small>Panel Admin Sekolah</small>
                </div>
              </Link>

              <button
                type="button"
                onClick={onCloseMobile}
                className="admin-close-toggle mobile-only"
                aria-label="Tutup menu sidebar"
              >
                <X size={18} weight="bold" />
              </button>
            </div>
          )}
        </div>

        {/* Middle Navigation */}
        <nav className="admin-sidebar-nav">
          {!collapsed && <span className="admin-nav-label">NAVIGASI UTAMA</span>}
          <ul>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onCloseMobile}
                    className={`admin-nav-item ${isActive ? "active" : ""}`}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon size={22} weight={isActive ? "bold" : "regular"} />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>

          {!collapsed && (
            <span className="admin-nav-label" style={{ marginTop: "24px" }}>
              PRATINJAU WEBSITES
            </span>
          )}
          <ul>
            <li>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="admin-nav-item"
                title={collapsed ? "Buka Website Utama" : undefined}
              >
                <ArrowSquareOut size={22} />
                {!collapsed && <span>Buka Website Utama</span>}
              </a>
            </li>
          </ul>
        </nav>

        {/* Bottom Footer: User Info & Logout */}
        <div className="admin-sidebar-footer">
          {!collapsed && (
            <div className="admin-user-info">
              <div className="admin-user-avatar">AD</div>
              <strong>Admin Sekolah</strong>
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            className="admin-logout-button"
            title="Keluar dari Panel Admin"
          >
            <SignOut size={20} weight="bold" />
            {!collapsed && <span>Keluar</span>}
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Animated Modal */}
      <ConfirmDialog
        isOpen={showLogoutConfirm}
        title="Konfirmasi Keluar (Logout)"
        message="Apakah Anda yakin ingin keluar dari Panel Admin SDN Danabhakti?"
        confirmText="Ya, Keluar"
        cancelText="Batal"
        variant="logout"
        isLoading={loggingOut}
        onConfirm={handleLogout}
        onClose={() => setShowLogoutConfirm(false)}
      />
    </>
  );
}
