"use client";

import { motion } from "framer-motion";
import { portfolioCategories, type PortfolioCategory } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type GalleryFilterProps = {
  active: PortfolioCategory;
  onChange: (category: PortfolioCategory) => void;
};

export function GalleryFilter({ active, onChange }: GalleryFilterProps) {
  return (
    <div className="relative mb-10 md:mb-14">
      {/* Fade hint for horizontal scroll on mobile */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-8 bg-gradient-to-l from-[var(--bg-primary)] to-transparent md:hidden" />
      {/* Mobile: horizontally scrollable */}
      <div
        role="tablist"
        aria-label="Filter by style"
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide md:flex-wrap md:justify-center md:gap-3 md:overflow-visible md:pb-0"
      >
        {portfolioCategories.map((cat) => {
          const isActive = active === cat.value;
          return (
            <button
              key={cat.value}
              role="tab"
              aria-selected={isActive}
              aria-controls="gallery-grid"
              onClick={() => onChange(cat.value)}
              className={cn(
                "relative shrink-0 px-5 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-colors",
                isActive
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="filter-active"
                  className="absolute inset-0 border border-[var(--accent-silver)] bg-[var(--accent-silver)]/5"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
