"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import type { PortfolioItem } from "@/data/portfolio";
import { GalleryItem } from "@/components/portfolio/gallery-item";

type GalleryGridProps = {
  items: PortfolioItem[];
  onItemClick: (index: number) => void;
};

export function GalleryGrid({ items, onItemClick }: GalleryGridProps) {
  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center py-24 text-center"
      >
        <ImageOff
          size={40}
          strokeWidth={1}
          className="mb-4 text-[var(--text-tertiary)]"
        />
        <p className="font-serif text-xl text-[var(--text-primary)]">
          No pieces found
        </p>
        <p className="mt-2 max-w-sm text-sm text-[var(--text-secondary)]">
          No work matches this filter yet. Try selecting a different category or
          check back soon for new additions.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="columns-2 gap-4 md:columns-3 md:gap-5">
      <AnimatePresence mode="popLayout">
        {items.map((item, i) => (
          <GalleryItem
            key={item.slug}
            item={item}
            index={i}
            onClick={() => onItemClick(i)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
