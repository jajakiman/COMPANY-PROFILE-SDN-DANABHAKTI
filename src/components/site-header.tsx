"use client";

import { List, X } from "@phosphor-icons/react";
import { AnimatePresence, m } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { navigation, whatsapp } from "@/data/site";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      menuButtonRef.current?.focus();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const iconTransition = { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const };
  const menuItemVariants = {
    closed: { opacity: 0, x: -10, y: 0 },
    open: { opacity: 1, x: 0, y: 0 },
  };

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
              loading="eager"
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

        <a
          className="button button-small header-cta"
          href={whatsapp.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Hubungi Sekolah
        </a>

        <m.button
          ref={menuButtonRef}
          className="menu-button"
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          tabIndex={0}
          onClick={() => setIsOpen((current) => !current)}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
        >
          <span className="menu-button-icon" aria-hidden="true">
            <AnimatePresence initial={false} mode="wait">
              {isOpen ? (
                <m.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90, scale: 0.72 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.72 }}
                  transition={iconTransition}
                >
                  <X size={24} />
                </m.span>
              ) : (
                <m.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90, scale: 0.72 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.72 }}
                  transition={iconTransition}
                >
                  <List size={26} />
                </m.span>
              )}
            </AnimatePresence>
          </span>
        </m.button>
      </m.div>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <m.nav
            id="mobile-navigation"
            className="mobile-nav motion-reveal"
            aria-label="Navigasi mobile"
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
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
                  variants={menuItemVariants}
                >
                  {item.label}
                </m.a>
              ))}
              <m.a
                className="button motion-menu-item"
                href={whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                variants={{ closed: { opacity: 0, x: 0, y: 8 }, open: { opacity: 1, x: 0, y: 0 } }}
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
