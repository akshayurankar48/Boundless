"use client";

import { useRef, useEffect, type ElementType } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { registerGSAP } from "@/hooks/use-gsap";
import { TIMING, EASING, SCROLL_TRIGGER } from "@/lib/animation-config";

type TextRevealProps = {
  text: string;
  as?: ElementType;
  className?: string;
};

export function TextReveal({
  text,
  as: Tag = "h2",
  className,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || typeof window === "undefined") return;
    registerGSAP();

    let ctx: ReturnType<typeof import("gsap").default.context> | undefined;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const el = containerRef.current;
      if (!el) return;

      const words = el.querySelectorAll(".text-reveal-word");
      if (!words.length) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          words,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: TIMING.slow,
            stagger: TIMING.stagger,
            ease: EASING.default,
            scrollTrigger: {
              trigger: el,
              start: SCROLL_TRIGGER.start,
              once: true,
            },
          }
        );
      }, el);
    };

    init();
    return () => { ctx?.revert(); };
  }, [prefersReducedMotion, text]);

  const words = text.split(" ");

  return (
    <Tag ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="text-reveal-word inline-block"
          style={prefersReducedMotion ? {} : { opacity: 0 }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}
