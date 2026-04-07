"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { BLUR_PLACEHOLDER } from "@/lib/image-utils";

const studioPreviewImages = [
  {
    src: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=600&q=80",
    alt: "Studio workstation and professional equipment",
  },
  {
    src: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=600&q=80",
    alt: "Clean modern studio interior",
  },
  {
    src: "https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=600&q=80",
    alt: "Artist workspace with curated lighting",
  },
];

function StudioPreviewImage({ img, delay }: { img: { src: string; alt: string }; delay: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <ScrollReveal delay={delay}>
      <div className="relative aspect-[4/3] overflow-hidden">
        {imgError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-elevated)] text-[var(--text-tertiary)]">
            <span className="font-mono text-xs uppercase tracking-wider">Image unavailable</span>
          </div>
        ) : (
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
            className="object-cover"
            onError={() => setImgError(true)}
          />
        )}
      </div>
    </ScrollReveal>
  );
}

export function StudioPreview() {
  return (
    <section className="bg-[var(--bg-secondary)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <ScrollReveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-silver)]">
            The Space
          </p>
          <h2 className="text-h2 font-serif font-bold text-[var(--text-primary)]">
            Clean & Professional Setup
          </h2>
          <p className="mt-4 max-w-lg text-base text-[var(--text-secondary)]">
             A private studio setup focused on hygiene, proper equipment, and a comfortable environment — giving you a calm, distraction-free tattoo experience.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {studioPreviewImages.map((img, i) => (
            <StudioPreviewImage key={img.src} img={img} delay={i * 0.12} />
          ))}
        </div>

        <ScrollReveal className="mt-8">
          <Link
            href="/studio"
            className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent-silver)] transition-colors hover:text-[var(--accent-silver-hover)]"
          >
            Visit the Studio &rarr;
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
