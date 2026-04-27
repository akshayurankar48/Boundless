"use client";

import { useState, useRef } from "react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Counter } from "@/components/animations/counter";
import { siteConfig } from "@/data/site-config";

export function ArtistIntro() {
  const { artist } = siteConfig;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section className="bg-[var(--bg-secondary)] py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 md:grid-cols-2 md:gap-16 md:px-8">
        {/* Video */}
        <ScrollReveal direction="left">
          <div className="relative aspect-[3/4] overflow-hidden">
            {!videoFailed && (
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onError={() => setVideoFailed(true)}
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src="/videos/artist.mp4" type="video/mp4" />
              </video>
            )}
            {videoFailed && (
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-elevated)] text-[var(--text-tertiary)]">
                <span className="font-mono text-xs uppercase tracking-wider">Video unavailable</span>
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Content */}
        <ScrollReveal className="flex flex-col justify-center" direction="right">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-silver)]">
            The Artist
          </p>
          <h2 className="text-h2 font-serif font-bold text-[var(--text-primary)]">
            {artist.name}
          </h2>
          <p className="mt-2 font-mono text-sm uppercase tracking-wider text-[var(--text-tertiary)]">
            {artist.specialty}
          </p>
          <p className="mt-6 text-base leading-relaxed text-[var(--text-secondary)]">
            {artist.bio}
          </p>
          {/* Stats bar */}
          <div className="mt-8 grid grid-cols-3 gap-6 border-t border-[var(--border-default)] pt-8">
            <div>
              <p className="font-serif text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
                <Counter target={5} suffix="+" />
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
                Years
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
                <Counter target={2500} suffix="+" />
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
                Tattoos crafted
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
                <Counter target={100} suffix="%" />
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
                Focus
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
