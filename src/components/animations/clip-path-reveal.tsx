"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type Direction = "left" | "right" | "bottom" | "top";

type ClipPathRevealProps = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  once?: boolean;
};

const clipPathFrom: Record<Direction, string> = {
  bottom: "inset(0 0 100% 0)",
  top: "inset(100% 0 0 0)",
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
};

const clipPathTo = "inset(0 0 0 0)";

export function ClipPathReveal({
  children,
  direction = "bottom",
  delay = 0,
  className,
  once = true,
}: ClipPathRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(false);
  const revealedRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion || typeof window === "undefined") {
      setRevealed(true);
      return;
    }

    let ctx: ReturnType<typeof import("gsap").default.context> | undefined;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!containerRef.current || revealedRef.current) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          containerRef.current,
          { clipPath: clipPathFrom[direction] },
          {
            clipPath: clipPathTo,
            duration: 0.8,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              once,
            },
            onComplete: () => {
              revealedRef.current = true;
              setRevealed(true);
            },
          }
        );
      }, containerRef);
    };

    // Safety fallback: if GSAP hasn't triggered after 3s, reveal content anyway
    const fallbackTimer = setTimeout(() => {
      if (!revealedRef.current && containerRef.current) {
        containerRef.current.style.clipPath = clipPathTo;
        revealedRef.current = true;
        setRevealed(true);
      }
    }, 3000);

    init();

    return () => {
      clearTimeout(fallbackTimer);
      ctx?.revert();
    };
  }, [prefersReducedMotion, direction, delay, once]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ clipPath: revealed ? clipPathTo : clipPathFrom[direction] }}
    >
      {children}
    </div>
  );
}
