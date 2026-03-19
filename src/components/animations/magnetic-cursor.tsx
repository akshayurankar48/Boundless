"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIsMobile } from "@/hooks/use-media-query";
import { registerGSAP } from "@/hooks/use-gsap";

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (prefersReducedMotion || isMobile || typeof window === "undefined") return;
    registerGSAP();

    let cleanup: (() => void) | undefined;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const el = cursorRef.current;
      if (!el) return;

      // Use GSAP quickTo for position — no React state, no re-renders
      const quickToX = gsap.quickTo(el, "x", { duration: 0.25, ease: "power2.out" });
      const quickToY = gsap.quickTo(el, "y", { duration: 0.25, ease: "power2.out" });

      // Track hover state without React — mutate DOM directly
      let hovering = false;
      let visible = false;

      const setCursorStyle = (hover: boolean) => {
        if (hover === hovering) return;
        hovering = hover;
        if (hover) {
          el.style.width = "40px";
          el.style.height = "40px";
          el.style.borderWidth = "1px";
          el.style.backgroundColor = "transparent";
        } else {
          el.style.width = "8px";
          el.style.height = "8px";
          el.style.borderWidth = "2px";
          el.style.backgroundColor = "var(--accent-silver)";
        }
      };

      const setVisible = (v: boolean) => {
        if (v === visible) return;
        visible = v;
        el.style.opacity = v ? "1" : "0";
      };

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
          quickToX(centerX + distX * 0.3 - 4);
          quickToY(centerY + distY * 0.3 - 4);
        } else {
          quickToX(e.clientX - 4);
          quickToY(e.clientY - 4);
        }

        const isInteractive = !!(
          target.closest("a") ||
          target.closest("button") ||
          target.closest("[data-cursor='pointer']") ||
          target.closest("[data-cursor='magnetic']")
        );
        setCursorStyle(isInteractive);
      };

      const onEnter = () => setVisible(true);
      const onLeave = () => setVisible(false);

      document.addEventListener("mousemove", onMouseMove, { passive: true });
      document.addEventListener("mouseenter", onEnter);
      document.addEventListener("mouseleave", onLeave);

      cleanup = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseenter", onEnter);
        document.removeEventListener("mouseleave", onLeave);
      };
    };

    init();

    return () => { cleanup?.(); };
  }, [prefersReducedMotion, isMobile]);

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
        className="pointer-events-none fixed left-0 top-0 z-50 mix-blend-difference"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          border: "2px solid var(--accent-silver)",
          opacity: 0,
          transform: "translate(-50%, -50%)",
          backgroundColor: "var(--accent-silver)",
          transition: "width 0.15s ease-out, height 0.15s ease-out, border-width 0.15s ease-out, background-color 0.15s ease-out",
          willChange: "transform",
        }}
        aria-hidden="true"
      />
    </>
  );
}
