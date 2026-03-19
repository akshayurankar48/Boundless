"use client";

import { useState, useMemo, useCallback, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  portfolioItems,
  portfolioCategories,
  type PortfolioCategory,
} from "@/data/portfolio";
import { GalleryFilter } from "@/components/portfolio/gallery-filter";
import { GalleryGrid } from "@/components/portfolio/gallery-grid";
import { GalleryLightbox } from "@/components/portfolio/gallery-lightbox";
import { GallerySkeleton } from "@/components/portfolio/gallery-skeleton";

const INITIAL_COUNT = 8;

const validCategories = new Set(portfolioCategories.map((c) => c.value));

function getCategoryFromParams(params: URLSearchParams): PortfolioCategory {
  const cat = params.get("category");
  if (cat && validCategories.has(cat as PortfolioCategory)) {
    return cat as PortfolioCategory;
  }
  return "all";
}

export function PortfolioContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = getCategoryFromParams(searchParams);
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
      const params = new URLSearchParams();
      if (cat !== "all") params.set("category", cat);
      router.replace(`/portfolio${params.toString() ? `?${params}` : ""}`, { scroll: false });
      setShowAll(false);
      setLightboxIndex(null);
    });
  }, [router]);

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

      {/* Live region for filter changes */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Showing ${filtered.length} ${activeCategory === "all" ? "" : activeCategory + " "}piece${filtered.length !== 1 ? "s" : ""}`}
      </div>

      <div id="gallery-grid" role="tabpanel">
        {isFiltering ? (
          <GallerySkeleton />
        ) : (
          <GalleryGrid items={visibleItems} onItemClick={handleItemClick} />
        )}
      </div>

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
