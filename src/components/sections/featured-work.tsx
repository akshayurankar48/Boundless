"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/shared/section-heading";
import { ClipPathReveal } from "@/components/animations/clip-path-reveal";
import { portfolioItems, type PortfolioItem } from "@/data/portfolio";
import { BLUR_PLACEHOLDER } from "@/lib/image-utils";

const revealDirections = ["bottom", "left", "right", "bottom", "left", "right"] as const;

function FeaturedItem({ item, index }: { item: PortfolioItem; index: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <ClipPathReveal
      direction={revealDirections[index % revealDirections.length]}
      delay={index * 0.1}
      className={index === 0 || index === 3 ? "row-span-2" : ""}
    >
      <Link
        href={`/portfolio/${item.slug}`}
        className="group relative block overflow-hidden"
      >
        <div
          className={`relative ${
            index === 0 || index === 3 ? "aspect-[3/4]" : "aspect-square"
          }`}
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
              loading="lazy"
              sizes="(max-width: 768px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[var(--bg-primary)]/0 transition-all duration-500 group-hover:bg-[var(--bg-primary)]/40" />
          <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--accent-silver)]">
              {item.category}
            </p>
            <p className="mt-1 font-serif text-lg text-[var(--text-primary)]">
              {item.title}
            </p>
          </div>
        </div>
      </Link>
    </ClipPathReveal>
  );
}

export function FeaturedWork() {
  const featured = portfolioItems.filter((item) => item.featured).slice(0, 6);

  return (
    <section className="bg-[var(--bg-primary)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          label="The Portfolio"
          title="Featured Works"
          description="Curated masterpieces from our resident laboratory. Each piece is a bespoke commission, designed for the editorial aesthetic."
        />

        {/* Staggered grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {featured.map((item, i) => (
            <FeaturedItem key={item.slug} item={item} index={i} />
          ))}
        </div>

        {/* View all link */}
        <div className="mt-12 text-center">
          <Link
            href="/portfolio"
            className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent-silver)] transition-colors hover:text-[var(--accent-silver-hover)]"
          >
            View All Masterpieces →
          </Link>
        </div>
      </div>
    </section>
  );
}
