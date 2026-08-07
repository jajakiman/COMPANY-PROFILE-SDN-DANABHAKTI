"use client";

import { List, X } from "@phosphor-icons/react";
import { AnimatePresence, m } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { navigation } from "@/data/site";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <m.div
        className="page-shell header-inner motion-reveal"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
      >
        <a className="brand" href="#beranda" aria-label="SDN Danabhakti, kembali ke beranda">
          <span className="brand-mark" aria-hidden="true">
            <Image
              className="brand-logo"
              src="/images/brand/logo-sdn-danabhakti-full.webp"
              alt=""
              width={640}
              height={640}
              priority
            />
          </span>
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
      </m.div>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <m.nav
            id="mobile-navigation"
            className="mobile-nav motion-reveal"
            aria-label="Navigasi mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <m.div
              className="page-shell mobile-nav-inner"
              initial="closed"
              animate="open"
              variants={{
                closed: {},
                open: { transition: { staggerChildren: 0.045 } },
              }}
            >
              {navigation.map((item) => (
                <m.a
                  key={item.href}
                  className="motion-menu-item"
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  variants={{ closed: { opacity: 0, x: -10 }, open: { opacity: 1, x: 0 } }}
                >
                  {item.label}
                </m.a>
              ))}
              <m.a
                className="button motion-menu-item"
                href="#kontak"
                onClick={() => setIsOpen(false)}
                variants={{ closed: { opacity: 0, y: 8 }, open: { opacity: 1, y: 0 } }}
              >
                Hubungi Sekolah
              </m.a>
            </m.div>
          </m.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
