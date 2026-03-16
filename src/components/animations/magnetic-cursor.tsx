"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIsMobile } from "@/hooks/use-media-query";
import { registerGSAP } from "@/hooks/use-gsap";

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);

  useEffect(() => {
    if (prefersReducedMotion || isMobile || typeof window === "undefined") return;
    registerGSAP();

    let quickToX: ReturnType<typeof import("gsap").default.quickTo> | undefined;
    let quickToY: ReturnType<typeof import("gsap").default.quickTo> | undefined;

    const init = async () => {
      const gsap = (await import("gsap")).default;

      if (!cursorRef.current) return;

      quickToX = gsap.quickTo(cursorRef.current, "x", {
        duration: 0.3,
        ease: "power2.out",
      });
      quickToY = gsap.quickTo(cursorRef.current, "y", {
        duration: 0.3,
        ease: "power2.out",
      });

      const onMouseMove = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;

        const magneticEl = target.closest("[data-cursor='magnetic']") as HTMLElement | null;

        if (magneticEl) {
          const rect = magneticEl.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const distX = e.clientX - centerX;
          const distY = e.clientY - centerY;

          quickToX?.(centerX + distX * 0.3 - 4);
          quickToY?.(centerY + distY * 0.3 - 4);
        } else {
          quickToX?.(e.clientX - 4);
          quickToY?.(e.clientY - 4);
        }

        const isInteractive = !!(
          target.closest("a") ||
          target.closest("button") ||
          target.closest("[data-cursor='pointer']") ||
          target.closest("[data-cursor='magnetic']")
        );
        setIsHovering(isInteractive);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseenter", handleMouseEnter);
      document.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseenter", handleMouseEnter);
        document.removeEventListener("mouseleave", handleMouseLeave);
      };
    };

    let cleanup: (() => void) | undefined;
    init().then((c) => {
      cleanup = c;
    });

    return () => {
      cleanup?.();
    };
  }, [prefersReducedMotion, isMobile, handleMouseEnter, handleMouseLeave]);

  if (prefersReducedMotion || isMobile) return null;

  return (
    <>
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-50 mix-blend-difference transition-[width,height,border-width] duration-200 ease-out"
        style={{
          width: isHovering ? 40 : 8,
          height: isHovering ? 40 : 8,
          borderRadius: "50%",
          border: `${isHovering ? 1 : 2}px solid var(--accent-silver)`,
          opacity: isVisible ? 1 : 0,
          transform: "translate(-50%, -50%)",
          backgroundColor: isHovering ? "transparent" : "var(--accent-silver)",
        }}
        aria-hidden="true"
      />
    </>
  );
}
