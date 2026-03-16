"use client";

import { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { registerGSAP } from "@/hooks/use-gsap";

type CounterProps = {
  target: number | string;
  duration?: number;
  suffix?: string;
  className?: string;
};

function parseTarget(target: number | string): { num: number; suffix: string } {
  if (typeof target === "number") {
    return { num: target, suffix: "" };
  }
  const match = target.match(/^([\d,]+)(.*)/);
  if (match) {
    return {
      num: parseInt(match[1].replace(/,/g, ""), 10),
      suffix: match[2],
    };
  }
  return { num: 0, suffix: target };
}

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

export function Counter({
  target,
  duration = 2,
  suffix: suffixProp,
  className,
}: CounterProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { num, suffix: parsedSuffix } = parseTarget(target);
  const suffix = suffixProp ?? parsedSuffix;
  const [displayValue, setDisplayValue] = useState(
    prefersReducedMotion ? formatNumber(num) : "0"
  );

  useEffect(() => {
    if (prefersReducedMotion || typeof window === "undefined") {
      setDisplayValue(formatNumber(num));
      return;
    }
    registerGSAP();

    let ctx: ReturnType<typeof import("gsap").default.context> | undefined;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!containerRef.current) return;

      const obj = { val: 0 };

      ctx = gsap.context(() => {
        gsap.to(obj, {
          val: num,
          duration,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            setDisplayValue(formatNumber(Math.round(obj.val)));
          },
        });
      }, containerRef);
    };

    init();

    return () => {
      ctx?.revert();
    };
  }, [prefersReducedMotion, num, duration]);

  return (
    <span ref={containerRef} className={className}>
      {displayValue}
      {suffix}
    </span>
  );
}
