"use client";

import { useEffect } from "react";

// GSAP is loaded ONLY via dynamic import — never statically.
// This prevents GSAP + ScrollTrigger from entering the initial JS bundle.

let gsapRegistered = false;

export async function registerGSAP() {
  if (typeof window === "undefined" || gsapRegistered) return;
  const gsap = (await import("gsap")).default;
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  gsap.registerPlugin(ScrollTrigger);
  gsapRegistered = true;
}

export function useGSAPCleanup(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    return () => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (
            containerRef.current &&
            containerRef.current.contains(trigger.trigger as Element)
          ) {
            trigger.kill();
          }
        });
      });
    };
  }, [containerRef]);
}
