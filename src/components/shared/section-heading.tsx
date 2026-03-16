"use client";

import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

type SectionHeadingProps = {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <ScrollReveal
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-silver)]">
          {label}
        </p>
      )}
      <h2 className="text-h2 font-serif font-bold text-[var(--text-primary)]">
        {title}
      </h2>
      {description && (
        <p className={cn(
          "mt-4 max-w-2xl text-base text-[var(--text-secondary)]",
          align === "center" && "mx-auto"
        )}>
          {description}
        </p>
      )}
    </ScrollReveal>
  );
}
