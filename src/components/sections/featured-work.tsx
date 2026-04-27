"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/shared/section-heading";
import { ClipPathReveal } from "@/components/animations/clip-path-reveal";
import { BLUR_PLACEHOLDER } from "@/lib/image-utils";

const featuredImages = [
  { src: "/images/Featured/virat.jpg", alt: "Virat tattoo portrait" },
  { src: "/images/Featured/doberman.jpg", alt: "Doberman tattoo" },
  { src: "/images/Featured/crane.jpg", alt: "Crane tattoo illustration" },
  { src: "/images/Featured/pheonix%20back.jpg", alt: "Phoenix back piece tattoo" },
  { src: "/images/Featured/siddu.jpg", alt: "Siddu tattoo portrait" },
  { src: "/images/Featured/IMG_5774%20copy.jpg", alt: "Tattoo artwork" },
  { src: "/images/Featured/IMG_5796%20copy.jpg", alt: "Tattoo artwork" },
  { src: "/images/Featured/IMG_5893%20copy.jpg", alt: "Tattoo artwork" },
  { src: "/images/Featured/IMG_5929%20copy.jpg", alt: "Tattoo artwork" },
  { src: "/images/Featured/IMG_5940%20copy.jpg", alt: "Tattoo artwork" },
  { src: "/images/Featured/IMG_6193%20copy.jpg", alt: "Tattoo artwork" },
  { src: "/images/Featured/IMG_6539%20copy.jpg", alt: "Tattoo artwork" },
  { src: "/images/Featured/IMG_6700%20copy.jpg", alt: "Tattoo artwork" },
  { src: "/images/Featured/IMG_7142%20copy.jpg", alt: "Tattoo artwork" },
  { src: "/images/Featured/IMG_7229%20copy.jpg", alt: "Tattoo artwork" },
  { src: "/images/Featured/IMG_7322%20copy.jpg", alt: "Tattoo artwork" },
  { src: "/images/Featured/IMG_7913%20copy.jpg", alt: "Tattoo artwork" },
];

const revealDirections = ["bottom", "left", "right"] as const;

function FeaturedItem({ src, alt, index }: { src: string; alt: string; index: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <ClipPathReveal
      direction={revealDirections[index % revealDirections.length]}
      delay={(index % 6) * 0.08}
    >
      <Link href="/portfolio" className="group relative block overflow-hidden">
        <div className="relative aspect-square">
          {imgError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-elevated)] text-[var(--text-tertiary)]">
              <span className="font-mono text-xs uppercase tracking-wider">Image unavailable</span>
            </div>
          ) : (
            <Image
              src={src}
              alt={alt}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          )}
          <div className="absolute inset-0 bg-[var(--bg-primary)]/0 transition-all duration-500 group-hover:bg-[var(--bg-primary)]/40" />
        </div>
      </Link>
    </ClipPathReveal>
  );
}

export function FeaturedWork() {
  return (
    <section className="bg-[var(--bg-primary)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          label="The Portfolio"
          title="Featured Works"
          description="Every piece tells a story"
        />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {featuredImages.map((item, i) => (
            <FeaturedItem key={item.src} src={item.src} alt={item.alt} index={i} />
          ))}
        </div>

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
