"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { testimonials } from "@/data/testimonials";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIsMobile, useMediaQuery } from "@/hooks/use-media-query";
import { registerGSAP } from "@/hooks/use-gsap";

const AUTOPLAY_INTERVAL = 5000;

function getVisibleCount(isMobile: boolean, isTablet: boolean): number {
  if (isMobile) return 1;
  if (isTablet) return 2;
  return 3;
}

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1023px)");

  const visibleCount = getVisibleCount(isMobile, isTablet);
  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  const goTo = useCallback(
    (index: number, dir?: number) => {
      const next = Math.max(0, Math.min(index, maxIndex));
      setDirection(dir ?? (next > current ? 1 : -1));
      setCurrent(next);
    },
    [current, maxIndex]
  );

  const goNext = useCallback(() => {
    goTo(current >= maxIndex ? 0 : current + 1, 1);
  }, [current, maxIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(current <= 0 ? maxIndex : current - 1, -1);
  }, [current, maxIndex, goTo]);

  // Pause autoplay when tab is hidden
  const [isTabHidden, setIsTabHidden] = useState(false);

  useEffect(() => {
    const handleVisibility = () => setIsTabHidden(document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Autoplay
  useEffect(() => {
    if (isPaused || isTabHidden) return;
    const timer = setInterval(goNext, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [goNext, isPaused, isTabHidden]);

  // Drag handler
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      goNext();
    } else if (info.offset.x > threshold) {
      goPrev();
    }
  };

  const slideVariants = prefersReducedMotion
    ? {
        enter: { opacity: 1 },
        center: { opacity: 1 },
        exit: { opacity: 1 },
      }
    : {
        enter: (dir: number) => ({
          x: dir > 0 ? 300 : -300,
          opacity: 0,
        }),
        center: {
          x: 0,
          opacity: 1,
        },
        exit: (dir: number) => ({
          x: dir > 0 ? -300 : 300,
          opacity: 0,
        }),
      };

  const visibleTestimonials = testimonials.slice(
    current,
    current + visibleCount
  );

  return (
    <section className="bg-[var(--bg-primary)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          label="Distinguished Voices"
          title="Client Testimonials"
          align="center"
        />

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left arrow — desktop only */}
          <button
            onClick={goPrev}
            className="absolute top-1/2 left-0 z-10 hidden -translate-y-1/2 border border-[var(--border-default)] bg-[var(--bg-secondary)] p-2 text-[var(--text-secondary)] transition-colors hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] md:block lg:-left-12"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Right arrow — desktop only */}
          <button
            onClick={goNext}
            className="absolute top-1/2 right-0 z-10 hidden -translate-y-1/2 border border-[var(--border-default)] bg-[var(--bg-secondary)] p-2 text-[var(--text-secondary)] transition-colors hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] md:block lg:-right-12"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>

          {/* Carousel track */}
          <div className="overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }
                }
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className={`grid cursor-grab gap-6 active:cursor-grabbing ${
                  visibleCount === 1
                    ? "grid-cols-1"
                    : visibleCount === 2
                      ? "grid-cols-2"
                      : "grid-cols-3"
                }`}
              >
                {visibleTestimonials.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.name}
                    testimonial={testimonial}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 transition-all duration-300 ${
                  i === current
                    ? "w-6 bg-[var(--accent-silver)]"
                    : "w-2 bg-[var(--border-default)] hover:bg-[var(--border-hover)]"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type TestimonialCardProps = {
  testimonial: (typeof testimonials)[number];
  prefersReducedMotion: boolean;
};

function TestimonialCard({
  testimonial,
  prefersReducedMotion,
}: TestimonialCardProps) {
  const quoteMarkRef = useRef<HTMLParagraphElement>(null);
  const quoteTextRef = useRef<HTMLParagraphElement>(null);

  // Item 6: GSAP animation for quote mark + text
  useEffect(() => {
    if (prefersReducedMotion || typeof window === "undefined") return;
    registerGSAP();

    let ctx: ReturnType<typeof import("gsap").default.context> | undefined;

    const init = async () => {
      const gsap = (await import("gsap")).default;

      if (!quoteMarkRef.current || !quoteTextRef.current) return;

      ctx = gsap.context(() => {
        // Quote mark: starts large + transparent, shrinks to final size
        gsap.fromTo(
          quoteMarkRef.current,
          { scale: 2.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
          }
        );

        // Quote text: fades in with a slight delay
        gsap.fromTo(
          quoteTextRef.current,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.25,
            ease: "power2.out",
          }
        );
      });
    };

    init();

    return () => {
      ctx?.revert();
    };
  }, [prefersReducedMotion, testimonial.name]);

  return (
    <div className="flex h-full flex-col border border-[var(--border-default)] bg-[var(--bg-secondary)] p-8">
      <p
        ref={quoteMarkRef}
        className="mb-1 inline-block origin-left font-serif text-3xl text-[var(--accent-silver-muted)]"
        style={prefersReducedMotion ? {} : { opacity: 0 }}
      >
        &ldquo;
      </p>
      <p
        ref={quoteTextRef}
        className="flex-1 text-sm italic leading-relaxed text-[var(--text-secondary)]"
        style={prefersReducedMotion ? {} : { opacity: 0 }}
      >
        {testimonial.quote}
      </p>
      <div className="mt-6 border-t border-[var(--border-default)] pt-4">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">
          {testimonial.name}
        </p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]">
          {testimonial.tattooType}
        </p>
      </div>
    </div>
  );
}
