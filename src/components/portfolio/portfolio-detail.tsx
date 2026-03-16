"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { PortfolioItem } from "@/data/portfolio";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { ScrollProgress } from "@/components/animations/scroll-progress";

type PortfolioDetailProps = {
  item: PortfolioItem;
  relatedItems: PortfolioItem[];
};

export function PortfolioDetail({ item, relatedItems }: PortfolioDetailProps) {
  return (
    <article>
      <ScrollProgress />
      {/* Hero Image — matches expand-to-navigate animation from gallery */}
      <motion.div
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative h-[60vh] w-full md:h-[75vh]"
      >
        <Image
          src={item.image}
          alt={item.altText}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Link
            href="/portfolio"
            className="group/back -mt-8 mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)]"
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover/back:-translate-x-1"
            />
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Heading */}
        <ScrollReveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-silver)]">
            {item.category.replace("-", " ")}
          </p>
          <h1 className="text-h1 font-serif font-bold text-[var(--text-primary)]">
            {item.title}
          </h1>
        </ScrollReveal>

        {/* Metadata grid */}
        <ScrollReveal delay={0.1}>
          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-b border-[var(--border-default)] py-8 md:grid-cols-4">
            <MetaField label="Style" value={item.category.replace("-", " ")} />
            <MetaField label="Placement" value={item.placement} />
            <MetaField label="Session Time" value={item.sessionTime} />
            <MetaField label="Date" value={item.date} />
          </div>
        </ScrollReveal>

        {/* Description */}
        <ScrollReveal delay={0.15}>
          <div className="mt-10">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-silver)]">
              The Story
            </p>
            <p className="max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
              {item.description}
            </p>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.2}>
          <div className="mt-12 border-t border-[var(--border-default)] pt-10">
            <p className="mb-4 font-serif text-xl text-[var(--text-primary)]">
              Want something similar?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-[var(--accent-silver)] px-8 py-3 font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent-silver)] transition-colors hover:bg-[var(--accent-silver)] hover:text-[var(--bg-primary)] focus-visible:ring-2 focus-visible:ring-[var(--accent-silver)]/50 focus-visible:outline-none"
            >
              Book a Consultation
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </ScrollReveal>

        {/* Related Work */}
        {relatedItems.length > 0 && (
          <ScrollReveal delay={0.1}>
            <div className="mt-20 pb-24">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-silver)]">
                Related Work
              </p>
              <h2 className="mb-10 font-serif text-2xl font-bold text-[var(--text-primary)]">
                More {item.category.replace("-", " ")} pieces
              </h2>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {relatedItems.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/portfolio/${related.slug}`}
                    className="group relative aspect-[3/4] overflow-hidden"
                  >
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end bg-[var(--bg-primary)]/0 p-3 transition-all duration-500 group-hover:bg-[var(--bg-primary)]/60">
                      <div className="translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="font-serif text-sm text-[var(--text-primary)]">
                          {related.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </article>
  );
}

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
        {label}
      </p>
      <p className="mt-2 text-sm capitalize text-[var(--text-primary)]">
        {value}
      </p>
    </div>
  );
}
