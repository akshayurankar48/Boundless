"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/data/site-config";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  const headlineWords = ["Crafting", "Tattoos", "That", "Last", "a", "Lifetime"];

  return (
    <section className="hero-container relative flex h-screen items-center justify-center overflow-hidden">
      {/* Background video with image fallback */}
      <div className="hero-bg absolute inset-0 z-0">
        {!videoFailed && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/hero/poster.jpg"
            onError={() => setVideoFailed(true)}
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          >
            <source src="/videos/hero-ambient.mp4" type="video/mp4" />
          </video>
        )}
        {videoFailed && (
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=1920&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}
        {/* Single gradient overlay — dark at top/bottom for text readability, transparent in center to show video */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/70 via-[var(--bg-primary)]/30 to-[var(--bg-primary)]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center md:px-8">
        <p className="hero-label mb-4 font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent-silver)]">Professional Tattoo Studio in Hubballi - Karnataka</p>

        <h6 className="font-serif font-bold text-[var(--text-primary)]" style={{ fontSize: '50px' }}>
          {headlineWords.map((word, i) => (
            <span key={i} className="hero-word inline-block">
              {word}
              {i < headlineWords.length - 1 ? "\u00A0" : ""}
            </span>
          ))}
        </h6>

        <p className="hero-subtitle mx-auto mt-6 max-w-lg text-base text-[var(--text-secondary)] md:text-lg">
          {siteConfig.description}
        </p>

        <div className="hero-cta mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="border border-[var(--accent-silver)] px-8 py-3 font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent-silver)] transition-all hover:bg-[var(--accent-silver)] hover:text-[var(--bg-primary)] focus-visible:ring-2 focus-visible:ring-[var(--accent-silver)]/50 focus-visible:outline-none"
          >
            Book a Consultation
          </Link>
          <Link
            href="/portfolio"
            className="px-8 py-3 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] focus-visible:ring-2 focus-visible:ring-[var(--accent-silver)]/50 focus-visible:outline-none"
          >
            Explore Gallery →
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 md:bottom-12">
        <ChevronDown size={20} className="text-[var(--text-tertiary)]" />
      </div>
    </section>
  );
}
