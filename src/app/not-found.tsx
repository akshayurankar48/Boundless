"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg-primary)]">
      {/* Giant "404" watermark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
      >
        <span className="font-serif text-[20rem] font-bold leading-none text-[var(--text-primary)]/[0.03] md:text-[30rem]">
          404
        </span>
      </motion.div>

      {/* Tattoo needle SVG illustration */}
      <motion.svg
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 2, delay: 0.3 }}
        className="pointer-events-none absolute right-[5%] top-[15%] h-64 w-64 rotate-[25deg] text-[var(--accent-silver)] md:h-96 md:w-96"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
      >
        {/* Needle body */}
        <line x1="40" y1="160" x2="160" y2="40" />
        <line x1="42" y1="158" x2="162" y2="38" />
        {/* Needle tip */}
        <line x1="160" y1="40" x2="170" y2="30" strokeWidth="0.3" />
        {/* Grip rings */}
        <ellipse cx="70" cy="130" rx="8" ry="4" transform="rotate(-45 70 130)" />
        <ellipse cx="80" cy="120" rx="8" ry="4" transform="rotate(-45 80 120)" />
        <ellipse cx="90" cy="110" rx="8" ry="4" transform="rotate(-45 90 110)" />
        {/* Ink drops */}
        <circle cx="165" cy="35" r="2" fill="currentColor" opacity="0.5" />
        <circle cx="172" cy="42" r="1.5" fill="currentColor" opacity="0.3" />
        <circle cx="168" cy="48" r="1" fill="currentColor" opacity="0.2" />
      </motion.svg>

      {/* Decorative broken line (like a tattoo stencil gone wrong) */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-1/2 left-0 right-0 -translate-y-1/2"
      >
        <div className="mx-auto h-px max-w-2xl bg-gradient-to-r from-transparent via-[var(--accent-silver)]/10 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-silver)]"
        >
          Lost in the ink
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl font-bold text-[var(--text-primary)] md:text-7xl"
        >
          Wrong Canvas
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="mx-auto mt-6 max-w-sm text-base leading-relaxed text-[var(--text-secondary)]"
        >
          This page doesn&apos;t exist &mdash; like a tattoo without a story.
          Let&apos;s get you back to where the art lives.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-[var(--accent-silver)] px-8 py-3 font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent-silver)] transition-colors hover:bg-[var(--accent-silver)] hover:text-[var(--bg-primary)] focus-visible:ring-2 focus-visible:ring-[var(--accent-silver)]/50 focus-visible:outline-none"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-tertiary)] transition-colors hover:text-[var(--accent-silver)]"
          >
            View Portfolio
            <ArrowUpRight size={14} />
          </Link>
        </motion.div>

        {/* Fun tattoo-style footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]/50"
        >
          Error 404 &middot; No regrets, just redirects
        </motion.p>
      </div>
    </div>
  );
}
