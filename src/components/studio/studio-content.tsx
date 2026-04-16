"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TextReveal } from "@/components/animations/text-reveal";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { ClipPathReveal } from "@/components/animations/clip-path-reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { ClinicalStandards } from "@/components/sections/clinical-standards";
import { siteConfig } from "@/data/site-config";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { MapPlaceholder } from "@/components/shared/map-placeholder";

const studioImages = [
  {
    src: "/images/studio/IMG_7992.JPEG",
    alt: "Boundless Tattoo studio space",
  },
  {
    src: "/images/studio/IMG_7980.JPEG",
    alt: "Boundless Tattoo studio interior",
  },
  {
    src: "/images/studio/IMG_7984.JPEG",
    alt: "Boundless Tattoo studio environment",
  },
  {
    src: "/images/studio/IMG_7988.JPEG",
    alt: "Boundless Tattoo studio setup",
  },
];

export function StudioContent() {
  const { studio } = siteConfig;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] md:h-[80vh] overflow-hidden">
        {/* Background video with image fallback */}
        <div className="absolute inset-0 z-0">
          {!videoFailed && (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=1600&q=80"
              onError={() => setVideoFailed(true)}
              className="absolute inset-0 h-full w-full object-cover opacity-60"
            >
              <source src="/videos/studio.webm" type="video/webm" />
              <source src="/videos/studio.mp4" type="video/mp4" />
            </video>
          )}
          {videoFailed && (
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=1600&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-16 md:pb-24">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            {/* <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-silver)]">
              The Studio
            </p> */}
            {/* <TextReveal
              text="Private, Clean & Focused"
              as="h1"
              className="text-h1 font-serif font-bold text-[var(--text-primary)]"
            /> */}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-[var(--bg-primary)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <ScrollReveal>
            <div className="mx-auto max-w-4xl space-y-8 text-center">
              <p className="font-serif text-2xl leading-relaxed text-[var(--text-secondary)] md:text-3xl lg:text-3xl">
                A private studio setup designed for a calm, distraction-free tattoo experience. The space is maintained with proper hygiene, clean equipment, and a comfortable environment throughout your session.
              </p>
              <p className="font-serif text-2xl leading-relaxed text-[var(--text-secondary)] md:text-3xl lg:text-3xl">
                Clean work, precise execution, and proper hygiene &mdash; every tattoo is done with care and professionalism.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Studio Gallery */}
      <section className="bg-[var(--bg-secondary)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            label="The Environment"
            title="Designed for the Craft"
            description="Every corner of our studio is intentionally designed to support the art of tattooing at the highest level."
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ClipPathReveal direction="left" delay={0}>
              <div className="relative aspect-[4/3]">
                <Image
                  src={studioImages[0].src}
                  alt={studioImages[0].alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </ClipPathReveal>

            <ClipPathReveal direction="right" delay={0.1}>
              <div className="relative aspect-[4/3]">
                <Image
                  src={studioImages[1].src}
                  alt={studioImages[1].alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </ClipPathReveal>

            <ClipPathReveal direction="left" delay={0.2}>
              <div className="relative aspect-[4/3]">
                <Image
                  src={studioImages[2].src}
                  alt={studioImages[2].alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </ClipPathReveal>

            <ClipPathReveal direction="right" delay={0.3}>
              <div className="relative aspect-[4/3]">
                <Image
                  src={studioImages[3].src}
                  alt={studioImages[3].alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </ClipPathReveal>
          </div>
        </div>
      </section>

      {/* Clinical Standards */}
      <ClinicalStandards />

      {/* Location */}
      <section className="bg-[var(--bg-secondary)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            label="Find Us"
            title="Visit the Studio"
          />

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            <ScrollReveal direction="left">
              <div className="space-y-8">
                {/* Address */}
                <div className="flex gap-4">
                  <MapPin
                    size={20}
                    className="mt-1 shrink-0 text-[var(--accent-silver)]"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="mb-1 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
                      Address
                    </p>
                    <p className="text-base text-[var(--text-primary)]">
                      {studio.address}
                    </p>
                    <p className="text-base text-[var(--text-secondary)]">
                      {studio.city} {studio.zip}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4">
                  <Clock
                    size={20}
                    className="mt-1 shrink-0 text-[var(--accent-silver)]"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="mb-1 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
                      Studio Hours
                    </p>
                    <div className="space-y-1 text-base text-[var(--text-secondary)]">
                      <p>
                        <span className="text-[var(--text-primary)]">
                          Mon&ndash;Sat:
                        </span>{" "}
                        {studio.hours.weekdays}
                      </p>
                      <p>
                        <span className="text-[var(--text-primary)]">
                          Sunday:
                        </span>{" "}
                        {studio.hours.sunday}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex gap-4">
                  <Phone
                    size={20}
                    className="mt-1 shrink-0 text-[var(--accent-silver)]"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="mb-1 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
                      Contact
                    </p>
                    <p className="text-base">
                      <a
                        href={`tel:${studio.phone}`}
                        className="text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                      >
                        {studio.phone}
                      </a>
                    </p>
                    <p className="text-base">
                      <a
                        href={`mailto:${studio.email}`}
                        className="text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                      >
                        {studio.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Map */}
            <ScrollReveal direction="right">
              <MapPlaceholder className="aspect-[4/3]" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--bg-primary)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-8">
          <ScrollReveal>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent-silver)]">
              Your Journey Begins Here
            </p>
            <h2 className="text-h1 font-serif font-bold text-[var(--text-primary)]">
              Book a Consultation
            </h2>
            <p className="mx-auto mt-6 max-w-md text-base text-[var(--text-secondary)]">
              Every masterpiece starts with a conversation. Visit us in person or
              schedule a consultation to discuss your vision.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="border border-[var(--accent-silver)] bg-[var(--accent-silver)] px-8 py-3 font-mono text-xs uppercase tracking-[0.15em] text-[var(--bg-primary)] transition-all hover:bg-transparent hover:text-[var(--accent-silver)] focus-visible:ring-2 focus-visible:ring-[var(--accent-silver)]/50 focus-visible:outline-none"
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
