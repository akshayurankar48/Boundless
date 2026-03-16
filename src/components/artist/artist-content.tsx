"use client";

import Image from "next/image";
import Link from "next/link";
import { ParallaxImage } from "@/components/animations/parallax-image";
import { TextReveal } from "@/components/animations/text-reveal";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { ClipPathReveal } from "@/components/animations/clip-path-reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Counter } from "@/components/animations/counter";
import { siteConfig } from "@/data/site-config";

const styleShowcase = [
  {
    name: "Blackwork",
    slug: "blackwork",
    image:
      "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&q=80",
    description:
      "Bold, saturated black fills and intricate linework. From geometric patterns to abstract forms, blackwork commands attention through contrast and density.",
  },
  {
    name: "Realism",
    slug: "realism",
    image:
      "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=800&q=80",
    description:
      "Photorealistic rendering in black and gray. Every pore, every shadow mapped with surgical precision. Our signature specialty.",
  },
  {
    name: "Fine Line",
    slug: "fine-line",
    image:
      "https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=800&q=80",
    description:
      "Single-needle technique creating impossibly thin, precise strokes. Delicate botanicals, script, and minimalist compositions.",
  },
  {
    name: "Geometric",
    slug: "geometric",
    image:
      "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=800&q=80",
    description:
      "Sacred geometry, mandalas, and mathematical precision. Where architectural symmetry meets organic flow on the human canvas.",
  },
];

const milestones = [
  {
    year: "2014",
    title: "The First Line",
    description:
      "Began apprenticeship under master tattooist in Brooklyn. Two years of intensive study in traditional and contemporary techniques.",
  },
  {
    year: "2016",
    title: "Going Solo",
    description:
      "Completed apprenticeship and began independent practice, quickly building a reputation for meticulous black and gray realism.",
  },
  {
    year: "2019",
    title: "Vanguard Ink Founded",
    description:
      "Opened the studio on Mercer Street with a vision to create a sanctuary where clinical precision meets artistic transcendence.",
  },
  {
    year: "2022",
    title: "Industry Recognition",
    description:
      "Awarded 'Best Black & Gray Realism' at the NYC Tattoo Convention. Featured in multiple international tattoo publications.",
  },
  {
    year: "2025",
    title: "500+ Pieces Complete",
    description:
      "Reached the milestone of 500 completed works, each one a unique collaboration between artist and collector.",
  },
];

export function ArtistContent() {
  const { artist, stats } = siteConfig;

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--bg-primary)] pt-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-5 md:gap-16 md:py-24">
            {/* Portrait */}
            <div className="md:col-span-2">
              <ParallaxImage
                src="https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&q=80"
                alt={artist.name}
                width={800}
                height={1067}
                className="aspect-[3/4] w-full"
                sizes="(max-width: 768px) 100vw, 40vw"
                speed={0.15}
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center md:col-span-3">
              <ScrollReveal direction="right">
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-silver)]">
                  The Artist
                </p>
                <TextReveal
                  text={artist.name}
                  as="h1"
                  className="text-h1 font-serif font-bold text-[var(--text-primary)]"
                />
                <p className="mt-3 font-mono text-sm uppercase tracking-wider text-[var(--text-tertiary)]">
                  {artist.title} &middot; {artist.specialty}
                </p>

                <div className="mt-8 space-y-4 text-base leading-relaxed text-[var(--text-secondary)]">
                  <p>{artist.bio}</p>
                  <p>
                    With over a decade of dedicated practice, Marcus has refined
                    a technique that bridges the gap between fine art and body
                    art. His work is defined by an obsessive attention to detail,
                    a deep understanding of skin as a medium, and an unwavering
                    commitment to the craft.
                  </p>
                  <p>
                    Each piece begins with extensive consultation, ensuring that
                    the final work is not merely decoration but a deeply personal
                    expression of the collector&apos;s identity. This
                    collaborative approach has earned Marcus a loyal following and
                    international recognition.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-[var(--bg-secondary)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            <ScrollReveal direction="left">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-silver)]">
                The Philosophy
              </p>
              <blockquote className="font-serif text-2xl leading-relaxed text-[var(--text-primary)] md:text-3xl">
                &ldquo;A tattoo is not an addition to the body &mdash; it is a
                revelation of what was always there, waiting to surface.&rdquo;
              </blockquote>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="space-y-4 text-base leading-relaxed text-[var(--text-secondary)]">
                <p>
                  Marcus approaches each piece as a dialogue between artist and
                  canvas. The skin is not a passive surface but an active
                  collaborator &mdash; its texture, tone, and movement inform
                  every decision from placement to technique.
                </p>
                <p>
                  This philosophy extends beyond the needle. From the initial
                  consultation to the final heal check, every interaction is
                  designed to honor both the art and the person wearing it. There
                  are no rush jobs, no compromises, no shortcuts.
                </p>
                <p>
                  The result is work that doesn&apos;t just sit on the skin
                  &mdash; it belongs there. Pieces that age with grace, that tell
                  stories, that become inseparable from the identity of their
                  owner.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Style Showcase */}
      <section className="bg-[var(--bg-primary)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            label="Specializations"
            title="Mastery Across Styles"
            description="While black and gray realism is the signature, Marcus brings the same level of precision and artistry to every style."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {styleShowcase.map((style, i) => (
              <ScrollReveal key={style.slug} delay={i * 0.1}>
                <Link
                  href={`/portfolio?style=${style.slug}`}
                  className="group block"
                >
                  <ClipPathReveal direction="bottom" delay={i * 0.1}>
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={style.image}
                        alt={style.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent-silver)]">
                          {style.name}
                        </p>
                      </div>
                    </div>
                  </ClipPathReveal>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {style.description}
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[var(--bg-secondary)] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-3 gap-8">
            <ScrollReveal className="text-center" delay={0}>
              <p className="font-serif text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
                <Counter target={10} suffix="+" />
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
                Years Experience
              </p>
            </ScrollReveal>
            <ScrollReveal className="text-center" delay={0.1}>
              <p className="font-serif text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
                <Counter target={500} suffix="+" />
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
                Completed Pieces
              </p>
            </ScrollReveal>
            <ScrollReveal className="text-center" delay={0.2}>
              <p className="font-serif text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
                <Counter target={100} suffix="%" />
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
                Client Satisfaction
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[var(--bg-primary)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            label="The Journey"
            title="Milestones"
            align="center"
          />

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--border-default)] md:left-1/2 md:-translate-x-px" />

            <div className="space-y-12 md:space-y-16">
              {milestones.map((milestone, i) => {
                const isEven = i % 2 === 0;
                return (
                  <ScrollReveal
                    key={milestone.year}
                    delay={i * 0.1}
                    direction={isEven ? "left" : "right"}
                  >
                    <div className="relative pl-12 md:pl-0">
                      {/* Dot */}
                      <div className="absolute left-[13px] top-1 h-2 w-2 bg-[var(--accent-silver)] md:left-1/2 md:-translate-x-1" />

                      <div
                        className={`md:w-[45%] ${
                          isEven
                            ? "md:mr-auto md:pr-12 md:text-right"
                            : "md:ml-auto md:pl-12"
                        }`}
                      >
                        <p className="font-mono text-sm font-bold text-[var(--accent-silver)]">
                          {milestone.year}
                        </p>
                        <h3 className="mt-1 font-serif text-xl font-bold text-[var(--text-primary)]">
                          {milestone.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--bg-secondary)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-8">
          <ScrollReveal>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent-silver)]">
              Start Your Piece
            </p>
            <h2 className="text-h1 font-serif font-bold text-[var(--text-primary)]">
              Let&apos;s Create Together
            </h2>
            <p className="mx-auto mt-6 max-w-md text-base text-[var(--text-secondary)]">
              Every piece is a collaboration. Share your vision and let&apos;s
              craft something permanent, something meaningful, something yours.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/portfolio"
                className="border border-[var(--accent-silver)] bg-[var(--accent-silver)] px-8 py-3 font-mono text-xs uppercase tracking-[0.15em] text-[var(--bg-primary)] transition-all hover:bg-transparent hover:text-[var(--accent-silver)] focus-visible:ring-2 focus-visible:ring-[var(--accent-silver)]/50 focus-visible:outline-none"
              >
                View Full Portfolio
              </Link>
              <Link
                href="/contact"
                className="border border-[var(--border-default)] px-8 py-3 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)] transition-all hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] focus-visible:ring-2 focus-visible:ring-[var(--accent-silver)]/50 focus-visible:outline-none"
              >
                Book a Consultation
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
