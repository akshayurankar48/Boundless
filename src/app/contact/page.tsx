import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { InquiryForm } from "@/components/contact/inquiry-form";
import { siteConfig } from "@/data/site-config";
import { faqItems } from "@/data/faq";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a consultation. Share your vision and let's create something permanent.",
  openGraph: {
    title: "Contact | BOUNDLESS TATTOO STUDIO",
    description:
      "Book a consultation. Share your vision and let's create something permanent.",
    images: [
      {
        url: "/images/og/default.jpg",
        width: 1200,
        height: 630,
        alt: "Contact BOUNDLESS TATTOO STUDIO",
      },
    ],
  },
};

function StudioInfo() {
  const { studio } = siteConfig;

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-silver)]">
          Visit the Studio
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-silver)]" />
            <p className="text-sm text-[var(--text-secondary)]">
              {studio.address}
              <br />
              {studio.city} {studio.zip}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 shrink-0 text-[var(--accent-silver)]" />
            <a
              href={`tel:${studio.phone.replace(/\s/g, "")}`}
              className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-silver)]"
            >
              {studio.phone}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 shrink-0 text-[var(--accent-silver)]" />
            <a
              href={`mailto:${studio.email}`}
              className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-silver)]"
            >
              {studio.email}
            </a>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-silver)]">
          Hours
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 shrink-0 text-[var(--accent-silver)]" />
            <div className="text-sm text-[var(--text-secondary)]">
              <p>Mon - Sat: {studio.hours.weekdays}</p>
              <p>Sunday: {studio.hours.sunday}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqCard({ index, question, answer }: { index: number; question: string; answer: string }) {
  return (
    <ScrollReveal delay={0.05 * index}>
      <div className="group relative border-t border-[var(--border-default)] py-8 transition-colors hover:border-[var(--accent-silver)]/30">
        {/* Number */}
        <span className="mb-4 block font-serif text-3xl font-bold text-[var(--accent-silver)]/20 transition-colors group-hover:text-[var(--accent-silver)]/40 md:text-4xl">
          {String(index + 1).padStart(2, "0")}
        </span>
        {/* Question */}
        <h3 className="mb-3 font-serif text-lg text-[var(--text-primary)] md:text-xl">
          {question}
        </h3>
        {/* Answer */}
        <p className="max-w-prose text-sm leading-relaxed text-[var(--text-secondary)]">
          {answer}
        </p>
      </div>
    </ScrollReveal>
  );
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main" className="min-h-screen pt-20 pb-20 md:pb-0">
        {/* Hero + Form Section */}
        <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <ScrollReveal>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-silver)]">
              Get in Touch
            </p>
            <h1 className="text-h1 font-serif font-bold text-[var(--text-primary)]">
              Book a Consultation
            </h1>
            <p className="mt-4 max-w-lg text-base text-[var(--text-secondary)]">
              Share your vision. Every masterpiece starts with a conversation.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-2 lg:gap-20">
            <ScrollReveal delay={0.1}>
              <InquiryForm />
            </ScrollReveal>

            <ScrollReveal delay={0.2} direction="right">
              <StudioInfo />
            </ScrollReveal>
          </div>
        </section>

        {/* FAQ Section — numbered card grid */}
        <section className="border-t border-[var(--border-default)] bg-[var(--bg-secondary)]">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
            {/* Header */}
            <ScrollReveal>
              <div className="mb-12 md:mb-16">
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-silver)]">
                  Before You Visit
                </p>
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <h2 className="text-h2 font-serif font-bold text-[var(--text-primary)]">
                    Questions &amp; Answers
                  </h2>
                  <p className="max-w-xs text-sm text-[var(--text-tertiary)] md:text-right">
                    Everything you need to know before your session
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Two-column numbered grid */}
            <div className="grid gap-x-16 md:grid-cols-2 lg:gap-x-24">
              {faqItems.map((item, i) => (
                <FaqCard
                  key={i}
                  index={i}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
