"use client";

import { List, X } from "@phosphor-icons/react";
import { useState } from "react";
import { navigation } from "@/data/site";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="page-shell header-inner">
        <a className="brand" href="#beranda" aria-label="SDN Danabhakti, kembali ke beranda">
          <span className="brand-mark" aria-hidden="true">SD</span>
          <span className="brand-copy">
            <strong>SDN Danabhakti</strong>
            <small>Sekolah Dasar Negeri</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Navigasi utama">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="button button-small header-cta" href="#kontak">
          Hubungi Sekolah
        </a>

        <button
          className="menu-button"
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={24} /> : <List size={26} />}
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={`mobile-nav ${isOpen ? "is-open" : ""}`}
        aria-label="Navigasi mobile"
      >
        <div className="page-shell mobile-nav-inner">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
              {item.label}
            </a>
          ))}
          <a className="button" href="#kontak" onClick={() => setIsOpen(false)}>
            Hubungi Sekolah
          </a>
        </div>
      </nav>
    </header>
  );
}
