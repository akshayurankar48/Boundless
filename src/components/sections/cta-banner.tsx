"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

export function CTABanner() {
  return (
    <section className="bg-[var(--bg-primary)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <ScrollReveal className="text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent-silver)]">
            Begin Your Legacy
          </p>
          <h2 className="text-h1 font-serif font-bold text-[var(--text-primary)]">
             Ready to Get Inked?
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base text-[var(--text-secondary)]">
             Whether it's your first or your fifteenth — bring the idea, we'll bring the execution.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="border border-[var(--accent-silver)] bg-[var(--accent-silver)] px-8 py-3 font-mono text-xs uppercase tracking-[0.15em] text-[var(--bg-primary)] transition-all hover:bg-transparent hover:text-[var(--accent-silver)] focus-visible:ring-2 focus-visible:ring-[var(--accent-silver)]/50 focus-visible:outline-none"
            >
              Book a Consultation
            </Link>
            <Link
              href="/portfolio"
              className="border border-[var(--border-default)] px-8 py-3 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)] transition-all hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] focus-visible:ring-2 focus-visible:ring-[var(--accent-silver)]/50 focus-visible:outline-none"
            >
              View Portfolio
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
