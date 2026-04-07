"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { testimonials } from "@/data/testimonials";
import { useIsMobile, useMediaQuery } from "@/hooks/use-media-query";

const AUTOPLAY_INTERVAL = 5000;

function getVisibleCount(isMobile: boolean, isTablet: boolean): number {
  if (isMobile) return 1;
  if (isTablet) return 2;
  return 3;
}

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isMobile = useIsMobile();
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1023px)");

  const visibleCount = getVisibleCount(isMobile, isTablet);
  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  const goTo = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(index, maxIndex));
      setCurrent(next);
    },
    [maxIndex]
  );

  const goNext = useCallback(() => {
    goTo(current >= maxIndex ? 0 : current + 1);
  }, [current, maxIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(current <= 0 ? maxIndex : current - 1);
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

  const visibleTestimonials = testimonials.slice(
    current,
    current + visibleCount
  );

  return (
    <section className="bg-[var(--bg-primary)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          label="Real Stories. Real Tattoos."
          title="What Clients Say"
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

          {/* Carousel track - Simple transition with CSS */}
          <div className="overflow-hidden">
            <div
              className={`grid gap-6 transition-opacity duration-300 ${
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
                />
              ))}
            </div>
          </div>

          {/* Screen reader announcement for slide changes */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {`Showing testimonial ${current + 1} of ${maxIndex + 1}`}
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
};

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="flex h-full flex-col border border-[var(--border-default)] bg-[var(--bg-secondary)] p-8">
      <p className="mb-1 inline-block origin-left font-serif text-3xl text-[var(--accent-silver-muted)]">
        &ldquo;
      </p>
      <p className="flex-1 text-sm italic leading-relaxed text-[var(--text-secondary)]">
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
