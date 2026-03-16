"use client";

import { useRef, useCallback, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, animate } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioItem } from "@/data/portfolio";
import { BLUR_PLACEHOLDER } from "@/lib/image-utils";

type GalleryItemProps = {
  item: PortfolioItem;
  index: number;
  onClick: () => void;
};

const aspectPatterns = [
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-[2/3]",
  "aspect-square",
];

export function GalleryItem({ item, index, onClick }: GalleryItemProps) {
  const aspect = aspectPatterns[index % aspectPatterns.length];
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [imgError, setImgError] = useState(false);

  const handleViewDetails = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      const el = imageContainerRef.current;
      if (!el) {
        router.push(`/portfolio/${item.slug}`);
        return;
      }

      const rect = el.getBoundingClientRect();

      // Create a clone fixed to the viewport that expands to fill the screen
      const clone = el.cloneNode(true) as HTMLElement;
      clone.style.position = "fixed";
      clone.style.top = `${rect.top}px`;
      clone.style.left = `${rect.left}px`;
      clone.style.width = `${rect.width}px`;
      clone.style.height = `${rect.height}px`;
      clone.style.zIndex = "100";
      clone.style.borderRadius = "0";
      clone.style.overflow = "hidden";
      clone.style.transition = "none";
      clone.style.pointerEvents = "none";
      document.body.appendChild(clone);

      // Animate the clone to fill viewport
      animate(clone, {
        top: "0px",
        left: "0px",
        width: "100vw",
        height: "75vh",
      }, {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
        onComplete: () => {
          router.push(`/portfolio/${item.slug}`);
          // Clean up after navigation starts
          setTimeout(() => {
            clone.remove();
          }, 100);
        },
      });
    },
    [item.slug, router]
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        opacity: { duration: 0.4 },
        y: { duration: 0.4 },
        layout: { duration: 0.5, type: "spring", stiffness: 300, damping: 30 },
      }}
      className="group mb-4 cursor-pointer break-inside-avoid"
      onClick={onClick}
    >
      <motion.div
        ref={imageContainerRef}
        className={`relative overflow-hidden ${aspect}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {imgError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-elevated)] text-[var(--text-tertiary)]">
            <span className="font-mono text-xs uppercase tracking-wider">Image unavailable</span>
          </div>
        ) : (
          <Image
            src={item.image}
            alt={item.altText}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex flex-col justify-end bg-[var(--bg-primary)]/0 p-4 transition-all duration-500 group-hover:bg-[var(--bg-primary)]/60">
          <div className="translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-silver)]">
              {item.category.replace("-", " ")}
            </p>
            <h3 className="font-serif text-lg text-[var(--text-primary)]">
              {item.title}
            </h3>
            <p className="mt-1 font-mono text-xs text-[var(--text-tertiary)]">
              {item.placement}
            </p>
            {/* View Details action */}
            <button
              onClick={handleViewDetails}
              className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--accent-silver)] transition-colors hover:text-[var(--text-primary)]"
            >
              View Details
              <ArrowUpRight size={12} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
