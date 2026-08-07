"use client";

import { m, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 28,
    mass: 0.25,
  });

  return <m.div className="scroll-progress motion-scroll" style={{ scaleX }} aria-hidden="true" />;
}
