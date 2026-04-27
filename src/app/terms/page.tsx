import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for BOUNDLESS TATTOO STUDIO. Booking policies, deposits, cancellations, and studio guidelines.",
  openGraph: {
    title: "Terms of Service | BOUNDLESS TATTOO STUDIO",
    description:
      "Terms of service for BOUNDLESS TATTOO STUDIO. Booking policies, deposits, cancellations, and studio guidelines.",
  },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main id="main" className="min-h-screen pt-20 pb-20 md:pb-0">
        <div className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-silver)]">
            Legal
          </p>
          <h1 className="text-h1 font-serif font-bold text-[var(--text-primary)]">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-[var(--text-tertiary)]">
            Last updated: March 2026
          </p>

          <div className="mt-12 space-y-10 text-sm leading-relaxed text-[var(--text-secondary)]">
            <section>
              <h2 className="mb-4 font-serif text-lg font-semibold text-[var(--text-primary)]">
                1. Booking Policy
              </h2>
              <p>
                All tattoo sessions at {siteConfig.name} are by appointment only.
                Appointments are scheduled after a consultation where we discuss
                your design, placement, sizing, and session plan. We reserve the
                right to decline any project that does not align with our artistic
                standards or studio policies.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-lg font-semibold text-[var(--text-primary)]">
                2. Deposit Policy
              </h2>
              <p className="mb-3">
                A non-refundable deposit is required to secure your appointment.
                The deposit amount will be communicated during your consultation
                and is applied toward the total cost of your tattoo.
              </p>
              <p>
                Deposits guarantee your time slot and compensate for the custom
                design work completed prior to your session.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-lg font-semibold text-[var(--text-primary)]">
                3. Cancellation and Rescheduling
              </h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Cancellations made less than 48 hours before your scheduled
                  appointment will result in forfeiture of your deposit.
                </li>
                <li>
                  Rescheduling is permitted with at least 48 hours notice, subject
                  to availability. Your deposit will transfer to the new date.
                </li>
                <li>
                  No-shows will result in forfeiture of the deposit and may affect
                  future booking eligibility.
                </li>
                <li>
                  {siteConfig.name} reserves the right to reschedule appointments
                  due to unforeseen circumstances. In such cases, your deposit will
                  be fully transferred or refunded.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-lg font-semibold text-[var(--text-primary)]">
                4. Age Requirement
              </h2>
              <p>
                You must be at least 18 years of age to receive a tattoo at{" "}
                {siteConfig.name}. A valid government-issued photo ID is required
                at every appointment. No exceptions will be made.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-lg font-semibold text-[var(--text-primary)]">
                5. Health and Safety
              </h2>
              <p className="mb-3">
                Your safety is our priority. Please inform your artist of any
                medical conditions, allergies, or medications that may affect the
                tattooing process. We reserve the right to refuse service if we
                believe it may pose a health risk.
              </p>
              <p>
                Clients must not be under the influence of alcohol or drugs during
                their session. We maintain medical-grade sterilization standards
                and use premium vegan inks for all tattoos.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-lg font-semibold text-[var(--text-primary)]">
                6. Aftercare Responsibility
              </h2>
              <p>
                Proper aftercare is essential for the longevity and quality of your
                tattoo. We will provide detailed aftercare instructions following
                your session. {siteConfig.name} is not liable for complications
                arising from failure to follow aftercare guidelines, including
                infection, fading, or distortion of the tattoo.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-lg font-semibold text-[var(--text-primary)]">
                7. Liability
              </h2>
              <p className="mb-3">
                Tattooing involves inherent risks including but not limited to
                allergic reactions, scarring, and infection. By booking an
                appointment, you acknowledge these risks and agree that{" "}
                {siteConfig.name} and its artists are not liable for outcomes
                beyond our reasonable control.
              </p>
              <p>
                A consent form must be signed before any tattoo session begins.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-lg font-semibold text-[var(--text-primary)]">
                8. Intellectual Property
              </h2>
              <p>
                All custom designs created by {siteConfig.name} artists remain the
                intellectual property of the studio. We reserve the right to
                photograph and display completed work in our portfolio, website,
                and social media unless otherwise agreed upon in writing.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-lg font-semibold text-[var(--text-primary)]">
                9. Contact Us
              </h2>
              <p>
                If you have questions about these terms, please contact us at{" "}
                <a
                  href={`mailto:${siteConfig.studio.email}`}
                  className="text-[var(--accent-silver)] underline underline-offset-4 transition-colors hover:text-[var(--text-primary)]"
                >
                  {siteConfig.studio.email}
                </a>
                .
              </p>
            </section>

            <p className="border-t border-[var(--border-default)] pt-8 text-xs text-[var(--text-tertiary)]">
              These terms of service are a placeholder and should be reviewed by a
              legal professional before being used in production.
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
