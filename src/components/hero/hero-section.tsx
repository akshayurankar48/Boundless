"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { registerGSAP } from "@/hooks/use-gsap";

export function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || typeof window === "undefined") return;
    registerGSAP();

    const loadGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.3 });

      // Logo fade in
      tl.fromTo(
        ".hero-logo",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1.0 }
      );

      // Label reveal
      tl.fromTo(
        ".hero-label",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      );

      // Headline words reveal
      tl.fromTo(
        ".hero-word",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
        "-=0.3"
      );

      // Subtitle
      tl.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      );

      // CTA
      tl.fromTo(
        ".hero-cta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.2"
      );

      // Scroll indicator
      tl.fromTo(
        ".hero-scroll",
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.1"
      );

      // Subtle background zoom on load
      gsap.fromTo(
        ".hero-bg",
        { scale: 1 },
        { scale: 1.05, duration: 5, ease: "power1.out" }
      );

      // Parallax on scroll
      gsap.to(".hero-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-container",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    };

    loadGSAP();
  }, [prefersReducedMotion]);

  const headlineWords = ["The", "Art", "of", "the", "Permanent"];

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
            preload="none"
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
        <p className="hero-label mb-4 font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent-silver)] opacity-0">
          Black & Gray Realism Studio
        </p>

        <h1 ref={headlineRef} className="text-display font-serif font-bold text-[var(--text-primary)]">
          {headlineWords.map((word, i) => (
            <span key={i} className="hero-word inline-block opacity-0">
              {word}
              {i < headlineWords.length - 1 ? "\u00A0" : ""}
            </span>
          ))}
        </h1>

        <p className="hero-subtitle mx-auto mt-6 max-w-lg text-base text-[var(--text-secondary)] opacity-0 md:text-lg">
          {siteConfig.description}
        </p>

        <div className="hero-cta mt-10 flex flex-col items-center justify-center gap-4 opacity-0 sm:flex-row">
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
      <motion.div
        className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 md:bottom-12"
        animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={20} className="text-[var(--text-tertiary)]" />
      </motion.div>
    </section>
  );
}
