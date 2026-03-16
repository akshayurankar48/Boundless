"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIsMobile } from "@/hooks/use-media-query";
import { registerGSAP } from "@/hooks/use-gsap";

type HorizontalScrollProps = {
  children: ReactNode;
  className?: string;
};

export function HorizontalScroll({ children, className }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (prefersReducedMotion || isMobile || typeof window === "undefined") return;
    registerGSAP();

    let ctx: ReturnType<typeof import("gsap").default.context> | undefined;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!containerRef.current || !trackRef.current) return;

      const track = trackRef.current;
      const scrollWidth = track.scrollWidth - window.innerWidth;

      ctx = gsap.context(() => {
        gsap.to(track, {
          x: -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${scrollWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }, containerRef);
    };

    init();

    return () => {
      ctx?.revert();
    };
  }, [prefersReducedMotion, isMobile]);

  // Mobile: horizontal overflow scroll
  if (isMobile || prefersReducedMotion) {
    return (
      <div className={`overflow-x-auto ${className ?? ""}`}>
        <div className="flex w-max gap-6 px-4 py-8">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative h-screen overflow-hidden ${className ?? ""}`}>
      <div ref={trackRef} className="flex h-full w-max items-center gap-8">
        {children}
      </div>
    </div>
  );
}
