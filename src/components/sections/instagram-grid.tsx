"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { instagramPosts } from "@/data/instagram-posts";
import { siteConfig } from "@/data/site-config";
import { BLUR_PLACEHOLDER } from "@/lib/image-utils";

export function InstagramGrid() {
  return (
    <section className="bg-[var(--bg-secondary)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          label="Follow the Journey"
          title="On Instagram"
          align="center"
        />

        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
          {instagramPosts.map((post, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden"
              >
                <Image
                  src={post.image}
                  alt={post.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-primary)]/0 transition-all duration-300 group-hover:bg-[var(--bg-primary)]/50">
                  <Instagram
                    size={24}
                    className="text-[var(--text-primary)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent-silver)] transition-colors hover:text-[var(--accent-silver-hover)]"
          >
            <Instagram size={14} />
            Follow @vanguardink
          </a>
        </div>
      </div>
    </section>
  );
}
