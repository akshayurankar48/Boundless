import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { SectionHeading } from "@/components/shared/section-heading";
import { MapPlaceholder } from "@/components/shared/map-placeholder";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { InquiryForm } from "@/components/contact/inquiry-form";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { siteConfig } from "@/data/site-config";
import { faqItems } from "@/data/faq";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a consultation. Share your vision and let's create something permanent.",
  openGraph: {
    title: "Contact | VANGUARD INK",
    description:
      "Book a consultation. Share your vision and let's create something permanent.",
    images: [
      {
        url: "/images/og/default.jpg",
        width: 1200,
        height: 630,
        alt: "Contact VANGUARD INK",
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
              {studio.city}, {studio.state} {studio.zip}
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
              <p>Mon - Fri: {studio.hours.weekdays}</p>
              <p>Saturday: {studio.hours.saturday}</p>
              <p>Sunday: {studio.hours.sunday}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <MapPlaceholder className="h-48 rounded-lg" />
    </div>
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

        {/* FAQ Section */}
        <section className="border-t border-[var(--border-default)] bg-[var(--bg-secondary)]">
          <div className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
            <SectionHeading
              label="FAQ"
              title="Common Questions"
              description="Everything you need to know before booking your session."
              align="center"
            />

            <ScrollReveal delay={0.1}>
              <Accordion className="divide-y-0">
                {faqItems.map((item, index) => (
                  <AccordionItem
                    key={index}
                    className="border-[var(--border-default)] py-1"
                  >
                    <AccordionTrigger className="py-4 text-base font-medium text-[var(--text-primary)] hover:no-underline hover:text-[var(--accent-silver)]">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[var(--text-secondary)]">
                      <p>{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
