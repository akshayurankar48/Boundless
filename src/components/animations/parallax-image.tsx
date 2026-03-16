"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIsMobile } from "@/hooks/use-media-query";
import { registerGSAP } from "@/hooks/use-gsap";

type ParallaxImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  speed?: number;
  sizes?: string;
};

export function ParallaxImage({
  src,
  alt,
  width,
  height,
  className,
  speed = 0.3,
  sizes,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (prefersReducedMotion || typeof window === "undefined") return;
    registerGSAP();

    let ctx: ReturnType<typeof import("gsap").default.context> | undefined;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!containerRef.current || !imageRef.current) return;

      const effectiveSpeed = isMobile ? speed * 0.5 : speed;

      ctx = gsap.context(() => {
        gsap.to(imageRef.current, {
          yPercent: effectiveSpeed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }, containerRef);
    };

    init();

    return () => {
      ctx?.revert();
    };
  }, [prefersReducedMotion, isMobile, speed]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className ?? ""}`}>
      <div ref={imageRef} className="h-full w-full scale-[1.2]">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
