"use client";

import { m, useScroll, useSpring, useTransform } from "motion/react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const viewportMargin = "-8% 0px -8% 0px";

function useResponsiveMotionDistance(distance: number) {
  const [viewport, setViewport] = useState<"mobile" | "tablet" | "desktop" | null>(null);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    const tablet = window.matchMedia("(max-width: 1100px)");
    const updateViewport = () => {
      setViewport(mobile.matches ? "mobile" : tablet.matches ? "tablet" : "desktop");
    };

    updateViewport();
    mobile.addEventListener("change", updateViewport);
    tablet.addEventListener("change", updateViewport);
    return () => {
      mobile.removeEventListener("change", updateViewport);
      tablet.removeEventListener("change", updateViewport);
    };
  }, []);

  if (viewport === null) return 0;
  const sign = Math.sign(distance) || 1;
  const magnitude = Math.abs(distance);
  if (viewport === "mobile") return sign * Math.min(magnitude * 0.25, 14);
  if (viewport === "tablet") return sign * Math.min(magnitude * 0.55, 32);
  return distance;
}

function motionClassName(className?: string, media = false) {
  return ["motion-reveal", media ? "motion-media" : "", className]
    .filter(Boolean)
    .join(" ");
}

type Direction = "up" | "down" | "left" | "right" | "none";

type RevealProps = {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  amount?: number;
  spring?: boolean;
  eager?: boolean;
  replay?: boolean;
};

function hiddenState(direction: Direction, distance = 56) {
  if (direction === "left") return { opacity: 0, x: -distance };
  if (direction === "right") return { opacity: 0, x: distance };
  if (direction === "down") return { opacity: 0, y: -distance };
  if (direction === "none") return { opacity: 0 };
  return { opacity: 0, y: distance };
}

function revealTransition(delay: number) {
  return { duration: 0.9, delay, ease };
}

export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  amount = 0.2,
  spring = false,
  eager = false,
  replay = false,
}: RevealProps) {
  return (
    <m.div
      className={motionClassName(className)}
      initial={hiddenState(direction)}
      animate={eager ? { opacity: 1, x: 0, y: 0 } : undefined}
      whileInView={eager ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: !replay, amount, margin: viewportMargin }}
      transition={
        spring
          ? { type: "spring", stiffness: 160, damping: 22, delay }
          : revealTransition(delay)
      }
    >
      {children}
    </m.div>
  );
}

export function RevealArticle({
  children,
  className,
  direction = "up",
  delay = 0,
  amount = 0.2,
  replay = false,
}: RevealProps) {
  return (
    <m.article
      className={motionClassName(className)}
      initial={hiddenState(direction, 32)}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: !replay, amount, margin: viewportMargin }}
      transition={{ duration: 0.78, delay, ease }}
    >
      {children}
    </m.article>
  );
}

export function RevealListItem({
  children,
  className,
  direction = "right",
  delay = 0,
  amount = 0.5,
  replay = false,
}: RevealProps) {
  return (
    <m.li
      className={motionClassName(className)}
      initial={hiddenState(direction, 24)}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: !replay, amount, margin: viewportMargin }}
      transition={{ duration: 0.72, delay, ease }}
    >
      {children}
    </m.li>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  eager?: boolean;
  parallax?: number;
  replay?: boolean;
};

export function Stagger({
  children,
  className,
  delay = 0,
  eager = false,
  parallax = 0,
  replay = false,
}: StaggerProps) {
  const responsiveParallax = useResponsiveMotionDistance(parallax);
  const target = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, responsiveParallax]);
  const y = useSpring(parallaxY, { stiffness: 90, damping: 24, mass: 0.35 });

  return (
    <m.div
      ref={target}
      className={motionClassName(className)}
      style={parallax ? { y } : undefined}
      initial="hidden"
      animate={eager ? "visible" : undefined}
      whileInView={eager ? undefined : "visible"}
      viewport={{ once: !replay, amount: 0.25, margin: viewportMargin }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: 0.12,
          },
        },
      }}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({ children, className }: Pick<StaggerProps, "children" | "className">) {
  return (
    <m.div
      className={motionClassName(className)}
      variants={{
        hidden: { opacity: 0, y: 48 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.86, ease },
        },
      }}
    >
      {children}
    </m.div>
  );
}

type MaskRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  eager?: boolean;
  replay?: boolean;
};

export function MaskReveal({
  children,
  className,
  delay = 0,
  eager = false,
  replay = false,
}: MaskRevealProps) {
  return (
    <div className={`motion-mask ${className ?? ""}`}>
      <m.div
        className="motion-reveal"
        initial={{ opacity: 0, y: "110%" }}
        animate={eager ? { opacity: 1, y: 0 } : undefined}
        whileInView={eager ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: !replay, amount: 0.7, margin: viewportMargin }}
        transition={{ duration: 0.95, delay, ease }}
      >
        {children}
      </m.div>
    </div>
  );
}

type MediaRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "top" | "right" | "bottom" | "left";
  interactive?: boolean;
  eager?: boolean;
  revealDistance?: number;
  scrollParallax?: number;
  replay?: boolean;
};

export function MediaReveal({
  children,
  className,
  delay = 0,
  direction = "bottom",
  interactive = false,
  eager = false,
  revealDistance = 56,
  scrollParallax = 0,
  replay = false,
}: MediaRevealProps) {
  const responsiveParallax = useResponsiveMotionDistance(scrollParallax);
  const target = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });
  const rawParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [responsiveParallax / 2, -responsiveParallax / 2],
  );
  const parallaxY = useSpring(rawParallaxY, { stiffness: 90, damping: 24, mass: 0.35 });
  const offset =
    direction === "left"
      ? { x: -revealDistance, y: 0 }
      : direction === "right"
        ? { x: revealDistance, y: 0 }
        : direction === "top"
          ? { x: 0, y: -revealDistance }
          : { x: 0, y: revealDistance };
  const visibleState = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
  };

  return (
    <m.div
      ref={target}
      className={motionClassName(className, true)}
      initial={{ opacity: 0, ...offset, scale: 0.94 }}
      animate={eager ? visibleState : undefined}
      whileInView={eager ? undefined : visibleState}
      whileHover={
        interactive
          ? { scale: 1.012, transition: { duration: 0.24, ease } }
          : undefined
      }
      viewport={{ once: !replay, amount: 0.16, margin: viewportMargin }}
      transition={{ duration: 1.1, delay, ease }}
    >
      {scrollParallax ? (
        <m.div className="motion-parallax-layer" style={{ y: parallaxY }}>
          {children}
        </m.div>
      ) : children}
    </m.div>
  );
}

type ScrollParallaxProps = {
  children: ReactNode;
  className?: string;
  distance?: number;
};

export function ScrollParallax({ children, className, distance = 28 }: ScrollParallaxProps) {
  const responsiveDistance = useResponsiveMotionDistance(distance);
  const target = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    [responsiveDistance / 2, -responsiveDistance / 2],
  );
  const y = useSpring(rawY, { stiffness: 90, damping: 24, mass: 0.35 });

  return (
    <m.div
      ref={target}
      className={["motion-parallax-layer", className].filter(Boolean).join(" ")}
      style={{ y }}
    >
      {children}
    </m.div>
  );
}

export function ConnectorLine() {
  return (
    <m.div
      className="tree-connectors motion-reveal"
      initial={{ opacity: 0, y: -24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5, margin: viewportMargin }}
      transition={{ duration: 0.85, delay: 0.18, ease }}
      aria-hidden="true"
    >
      <span className="tree-connector-leader" />
      <span className="tree-connector-rail" />
      <span className="tree-connector-branch tree-connector-branch-first">
        <i />
      </span>
      <span className="tree-connector-branch tree-connector-branch-middle">
        <i />
      </span>
      <span className="tree-connector-branch tree-connector-branch-last">
        <i />
      </span>
    </m.div>
  );
}
