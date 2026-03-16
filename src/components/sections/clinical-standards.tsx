"use client";

import { Shield, Syringe, Award, ScanLine } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { clinicalStandards } from "@/data/clinical-standards";

const iconMap = {
  shield: Shield,
  syringe: Syringe,
  award: Award,
  scan: ScanLine,
};

export function ClinicalStandards() {
  return (
    <section className="bg-[var(--bg-primary)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          label="Absolute Safety"
          title="Clinical Standards"
          description="We maintain the highest level of sterility in the industry. Our studio is equipped with medical-grade technology and follows rigorous safety protocols."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {clinicalStandards.map((standard, i) => {
            const Icon = iconMap[standard.icon];
            return (
              <ScrollReveal key={standard.title} delay={i * 0.1}>
                <div className="group border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6 transition-colors hover:border-[var(--border-hover)]">
                  <Icon
                    size={24}
                    className="mb-4 text-[var(--accent-silver)]"
                    strokeWidth={1.5}
                  />
                  <h3 className="mb-2 font-mono text-sm font-semibold text-[var(--text-primary)]">
                    {standard.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    {standard.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
