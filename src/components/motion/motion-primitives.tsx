"use client";

import { m, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

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
};

function hiddenState(direction: Direction, distance = 38) {
  if (direction === "left") return { opacity: 0, x: -distance };
  if (direction === "right") return { opacity: 0, x: distance };
  if (direction === "down") return { opacity: 0, y: -distance };
  if (direction === "none") return { opacity: 0 };
  return { opacity: 0, y: distance };
}

function revealTransition(delay: number) {
  return { duration: 0.72, delay, ease };
}

export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  amount = 0.2,
  spring = false,
  eager = false,
}: RevealProps) {
  return (
    <m.div
      className={motionClassName(className)}
      initial={hiddenState(direction)}
      animate={eager ? { opacity: 1, x: 0, y: 0 } : undefined}
      whileInView={eager ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={
        spring
          ? { type: "spring", stiffness: 240, damping: 24, delay }
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
}: RevealProps) {
  return (
    <m.article
      className={motionClassName(className)}
      initial={hiddenState(direction)}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={revealTransition(delay)}
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
}: RevealProps) {
  return (
    <m.li
      className={motionClassName(className)}
      initial={hiddenState(direction, 22)}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.58, delay, ease }}
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
};

export function Stagger({
  children,
  className,
  delay = 0,
  eager = false,
  parallax = 0,
}: StaggerProps) {
  const target = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -parallax]);

  return (
    <m.div
      ref={target}
      className={motionClassName(className)}
      style={parallax ? { y } : undefined}
      initial="hidden"
      animate={eager ? "visible" : undefined}
      whileInView={eager ? undefined : "visible"}
      viewport={{ once: true, amount: 0.25 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: 0.09,
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
        hidden: { opacity: 0, y: 32 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.68, ease },
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
};

export function MaskReveal({ children, className, delay = 0, eager = false }: MaskRevealProps) {
  return (
    <div className={`motion-mask ${className ?? ""}`}>
      <m.div
        className="motion-reveal"
        initial={{ y: "105%" }}
        animate={eager ? { y: 0 } : undefined}
        whileInView={eager ? undefined : { y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.72, delay, ease }}
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
  parallax?: number;
  scaleTo?: number;
};

const clipStates = {
  top: "inset(100% 0 0 0)",
  right: "inset(0 100% 0 0)",
  bottom: "inset(0 0 100% 0)",
  left: "inset(0 0 0 100%)",
};

export function MediaReveal({
  children,
  className,
  delay = 0,
  direction = "bottom",
  interactive = false,
  eager = false,
  parallax = 0,
  scaleTo = 1,
}: MediaRevealProps) {
  const target = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, scaleTo]);

  return (
    <m.div
      ref={target}
      className={motionClassName(className, true)}
      style={parallax || scaleTo !== 1 ? { y, scale } : undefined}
      initial={{ opacity: 0, clipPath: clipStates[direction] }}
      animate={eager ? { opacity: 1, clipPath: "inset(0 0 0 0)" } : undefined}
      whileInView={eager ? undefined : { opacity: 1, clipPath: "inset(0 0 0 0)" }}
      whileHover={
        interactive
          ? { scale: 1.012, transition: { duration: 0.24, ease } }
          : undefined
      }
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </m.div>
  );
}

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  distance?: number;
};

export function Parallax({ children, className, distance = 28 }: ParallaxProps) {
  const target = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <m.span
      ref={target}
      className={className}
      style={{ y }}
      aria-hidden="true"
    >
      {children}
    </m.span>
  );
}

export function ConnectorLine() {
  return (
    <m.div
      className="tree-connectors motion-reveal"
      initial={{ opacity: 0, y: -8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.72, delay: 0.22, ease }}
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
