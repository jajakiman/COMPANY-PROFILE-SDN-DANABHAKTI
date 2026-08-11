"use client";

import Image from "next/image";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useRef, useState } from "react";

const loaderSessionKey = "sdn-danabhakti:intro-seen";
const loaderDisplayTime = 2000;
const scrollKeys = new Set(["ArrowDown", "ArrowUp", "End", "Home", "PageDown", "PageUp", " "]);

export function InitialLoader() {
  const [visible, setVisible] = useState(true);
  const releaseLoaderLock = useRef<() => void>(() => {});

  useEffect(() => {
    let hasBeenSeen = false;

    try {
      hasBeenSeen = window.sessionStorage.getItem(loaderSessionKey) === "1";
    } catch {
      // The loader still works when browser storage is unavailable.
    }

    if (hasBeenSeen) {
      const frame = window.requestAnimationFrame(() => setVisible(false));
      return () => window.cancelAnimationFrame(frame);
    }

    document.documentElement.setAttribute("data-intro-loading", "true");
    document.body.classList.add("initial-loader-active");

    let released = false;

    const preventScroll = (event: Event) => event.preventDefault();
    const preventScrollKey = (event: KeyboardEvent) => {
      if (scrollKeys.has(event.key)) event.preventDefault();
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventScrollKey);

    const displayTimer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(loaderSessionKey, "1");
      } catch {
        // Ignore storage failures and finish the visual transition.
      }
      setVisible(false);
    }, loaderDisplayTime);

    const release = () => {
      if (released) return;
      released = true;
      window.clearTimeout(displayTimer);
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventScrollKey);
      document.documentElement.removeAttribute("data-intro-loading");
      document.body.classList.remove("initial-loader-active");
    };

    releaseLoaderLock.current = release;

    return () => {
      release();
      releaseLoaderLock.current = () => {};
    };
  }, []);

  const unlockPage = () => releaseLoaderLock.current();

  return (
    <AnimatePresence
      initial={false}
      onExitComplete={unlockPage}
    >
      {visible ? (
        <m.div
          className="initial-loader"
          role="status"
          aria-live="polite"
          aria-label="Memuat website SDN Danabhakti"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <m.div
            className="initial-loader-content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="initial-loader-mark" aria-hidden="true">
              <Image
                className="initial-loader-logo"
                src="/images/brand/logo-sdn-danabhakti-full.webp"
                alt=""
                width={640}
                height={640}
                sizes="112px"
                loading="eager"
              />
            </span>
            <div className="initial-loader-copy">
              <strong>SDN Danabhakti</strong>
              <span>Sekolah Dasar Negeri</span>
            </div>
            <div
              className="initial-loader-progress"
              aria-hidden="true"
            >
              <m.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: loaderDisplayTime / 1000, ease: "linear" }}
              />
            </div>
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
