"use client";

import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { processSteps } from "@/data/process-steps";

export function ProcessSteps() {

  return (
    <section className="bg-[var(--bg-secondary)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          label="The Process"
          title="From Idea to Tattoo"
          description="A clear and simple process, designed to keep things transparent, comfortable, and easy to understand."
          align="center"
        />

        <div className="relative">
          {/* Connecting line — horizontal on desktop, vertical on mobile */}
          <div
            className="pointer-events-none absolute hidden lg:block"
            style={{
              top: "28px",
              left: "12.5%",
              right: "12.5%",
              height: "1px",
              backgroundColor: "var(--border-hover)",
              transformOrigin: "left center",
            }}
          />
          {/* Vertical line on mobile/tablet */}
          <div
            className="pointer-events-none absolute left-4 top-0 bottom-0 w-px bg-[var(--border-default)] sm:left-6 lg:hidden"
          />
          {/* End cap dot on mobile vertical line */}
          <div className="pointer-events-none absolute left-[13px] bottom-0 h-2 w-2 rounded-full bg-[var(--accent-silver)] sm:left-[21px] lg:hidden" />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.15}>
                <div className="relative pl-10 sm:pl-12 lg:pl-0">
                  {/* Dot on mobile vertical line */}
                  <div className="absolute left-[13px] top-2 h-2 w-2 bg-[var(--accent-silver)] sm:left-[21px] lg:hidden" />
                  <span className="mb-4 block font-mono text-4xl font-bold text-[var(--border-hover)]">
                    {step.number}
                  </span>
                  <h3 className="mb-3 font-serif text-xl font-semibold text-[var(--text-primary)]">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
