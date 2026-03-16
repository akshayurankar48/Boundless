"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/section-heading";
import { HorizontalScroll } from "@/components/animations/horizontal-scroll";
import { portfolioItems } from "@/data/portfolio";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIsMobile } from "@/hooks/use-media-query";
import { registerGSAP } from "@/hooks/use-gsap";
import { BLUR_PLACEHOLDER } from "@/lib/image-utils";

const carouselItems = portfolioItems.slice(0, 8);

export function PortfolioCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [hasScrolled, setHasScrolled] = useState(false);

  // Item 7: Fade out scroll indicator after user starts scrolling
  useEffect(() => {
    if (prefersReducedMotion || isMobile || typeof window === "undefined") return;
    registerGSAP();

    let ctx: ReturnType<typeof import("gsap").default.context> | undefined;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current || !indicatorRef.current) return;

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          onUpdate: (self) => {
            if (self.progress > 0.02 && !hasScrolled) {
              setHasScrolled(true);
              gsap.to(indicatorRef.current, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
              });
            }
          },
        });
      }, sectionRef);
    };

    init();

    return () => {
      ctx?.revert();
    };
  }, [prefersReducedMotion, isMobile, hasScrolled]);

  return (
    <section ref={sectionRef} className="relative bg-[var(--bg-primary)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          label="The Portfolio"
          title="Selected Works"
          description="Scroll horizontally to explore our curated collection of permanent art."
        />
      </div>

      <HorizontalScroll>
        {/* Leading spacer on desktop */}
        <div className="hidden h-full w-16 shrink-0 md:block" />

        {carouselItems.map((item) => (
          <Link
            key={item.slug}
            href={`/portfolio/${item.slug}`}
            className="group relative block h-[70vh] w-[280px] shrink-0 overflow-hidden sm:w-[320px] md:h-[80vh] md:w-[400px]"
          >
            <div className="relative h-full w-full">
              <Image
                src={item.image}
                alt={item.altText}
                fill
                sizes="(max-width: 768px) 280px, 400px"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-[var(--bg-primary)]/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--accent-silver)] backdrop-blur-sm">
                  {item.category}
                </span>
              </div>

              {/* Title overlay on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <p className="font-serif text-xl text-[var(--text-primary)]">
                  {item.title}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--accent-silver)]">
                  {item.placement} &middot; {item.sessionTime}
                </p>
              </div>
            </div>
          </Link>
        ))}

        {/* Trailing spacer on desktop */}
        <div className="hidden h-full w-16 shrink-0 md:block" />
      </HorizontalScroll>

      {/* Item 7: Scroll indicator — desktop only */}
      {!isMobile && !prefersReducedMotion && (
        <div
          ref={indicatorRef}
          className="pointer-events-none absolute right-8 bottom-8 hidden items-center gap-2 md:flex"
        >
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
            Scroll
          </span>
          <span className="text-[var(--text-tertiary)]">&rarr;</span>
        </div>
      )}
    </section>
  );
}
