"use client";

import { usePathname } from "next/navigation";
import { m, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 28,
    mass: 0.25,
  });

  // Hide yellow scroll indicator on login and admin pages
  if (pathname.startsWith("/admin") || pathname === "/login") {
    return null;
  }

  return <m.div className="scroll-progress motion-scroll" style={{ scaleX }} aria-hidden="true" />;
}
