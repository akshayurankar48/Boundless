"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { TIMING, EASING } from "@/lib/animation-config";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  once?: boolean;
};

const directionMap = {
  up: { y: 30 },
  down: { y: -30 },
  left: { x: 30 },
  right: { x: -30 },
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = TIMING.slow,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "200px 0px -10px 0px" });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={
        isInView
          ? { x: 0, y: 0 }
          : directionMap[direction]
      }
      transition={{
        duration,
        delay,
        ease: EASING.smooth,
      }}
    >
      {children}
    </motion.div>
  );
}
