"use client";

import { useState, useMemo, useCallback, useTransition } from "react";
import {
  portfolioItems,
  type PortfolioCategory,
} from "@/data/portfolio";
import { GalleryFilter } from "@/components/portfolio/gallery-filter";
import { GalleryGrid } from "@/components/portfolio/gallery-grid";
import { GalleryLightbox } from "@/components/portfolio/gallery-lightbox";
import { GallerySkeleton } from "@/components/portfolio/gallery-skeleton";

const INITIAL_COUNT = 8;

export function PortfolioContent() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [isFiltering, startFilterTransition] = useTransition();

  const filtered = useMemo(() => {
    if (activeCategory === "all") return portfolioItems;
    return portfolioItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const visibleItems = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hasMore = filtered.length > INITIAL_COUNT && !showAll;

  const handleCategoryChange = useCallback((cat: PortfolioCategory) => {
    startFilterTransition(() => {
      setActiveCategory(cat);
      setShowAll(false);
      setLightboxIndex(null);
    });
  }, []);

  const handleItemClick = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const handleNavigate = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  return (
    <>
      <GalleryFilter active={activeCategory} onChange={handleCategoryChange} />
      {isFiltering ? (
        <GallerySkeleton />
      ) : (
        <GalleryGrid items={visibleItems} onItemClick={handleItemClick} />
      )}

      {hasMore && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="border border-[var(--accent-silver)] px-8 py-3 font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent-silver)] transition-colors hover:bg-[var(--accent-silver)] hover:text-[var(--bg-primary)] focus-visible:ring-2 focus-visible:ring-[var(--accent-silver)]/50 focus-visible:outline-none"
          >
            Load More
          </button>
        </div>
      )}

      <GalleryLightbox
        items={visibleItems}
        activeIndex={lightboxIndex}
        onClose={handleCloseLightbox}
        onNavigate={handleNavigate}
      />
    </>
  );
}
