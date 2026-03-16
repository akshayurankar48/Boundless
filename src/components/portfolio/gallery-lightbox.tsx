"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ArrowUpRight } from "lucide-react";
import type { PortfolioItem } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type GalleryLightboxProps = {
  items: PortfolioItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function GalleryLightbox({
  items,
  activeIndex,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const isOpen = activeIndex !== null;
  const item = activeIndex !== null ? items[activeIndex] : null;
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);

  const goNext = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex + 1) % items.length);
  }, [activeIndex, items.length, onNavigate]);

  const goPrev = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex - 1 + items.length) % items.length);
  }, [activeIndex, items.length, onNavigate]);

  // Store the trigger element before opening, and manage focus
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement;
      // Focus the close button when lightbox opens
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
    } else if (triggerRef.current) {
      // Return focus to the trigger element on close
      (triggerRef.current as HTMLElement).focus?.();
      triggerRef.current = null;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "Escape") onClose();
      // Focus trap: cycle through focusable elements inside dialog
      else if (e.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusable = dialog.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, goNext, goPrev, onClose]);

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title} — image ${(activeIndex ?? 0) + 1} of ${items.length}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-primary)]/95 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Screen reader live region for image announcements */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {item.title}, image {(activeIndex ?? 0) + 1} of {items.length}
          </div>

          {/* Close button */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute right-4 top-4 z-10 p-2 text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)]"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          {/* Navigation arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 p-2 text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)] md:left-6"
            aria-label={`Previous image: ${items[(activeIndex! - 1 + items.length) % items.length]?.title}`}
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 p-2 text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)] md:right-6"
            aria-label={`Next image: ${items[(activeIndex! + 1) % items.length]?.title}`}
          >
            <ChevronRight size={32} />
          </button>

          {/* Content */}
          <motion.div
            key={item.slug}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex max-h-[90vh] w-full max-w-5xl flex-col gap-6 overflow-y-auto px-4 md:flex-row md:items-center md:gap-10 md:px-16"
            onClick={(e) => e.stopPropagation()}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x > 80) goPrev();
              else if (info.offset.x < -80) goNext();
            }}
          >
            {/* Image — pinch-zoom enabled on mobile */}
            <div className="relative aspect-[3/4] w-full shrink-0 md:w-1/2" style={{ touchAction: "pinch-zoom" }}>
              <Image
                src={item.image}
                alt={item.altText}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>

            {/* Info panel */}
            <div className="flex w-full flex-col gap-6 pb-8 md:w-1/2 md:pb-0">
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-silver)]">
                  {item.category.replace("-", " ")}
                </p>
                <h2 className="font-serif text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
                  {item.title}
                </h2>
              </div>

              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {item.description}
              </p>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4">
                <MetadataField label="Placement" value={item.placement} />
                <MetadataField label="Session Time" value={item.sessionTime} />
                <MetadataField label="Style" value={item.category.replace("-", " ")} />
                <MetadataField label="Date" value={item.date} />
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                className={cn(
                  "group/cta mt-2 inline-flex items-center gap-2",
                  "font-mono text-xs uppercase tracking-[0.15em]",
                  "text-[var(--accent-silver)] transition-colors hover:text-[var(--text-primary)]"
                )}
              >
                Want something similar?
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MetadataField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
        {label}
      </p>
      <p className="mt-1 text-sm capitalize text-[var(--text-primary)]">
        {value}
      </p>
    </div>
  );
}
