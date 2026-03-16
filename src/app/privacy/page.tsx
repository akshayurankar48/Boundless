import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for VANGUARD INK. Learn how we collect, use, and protect your personal information.",
  openGraph: {
    title: "Privacy Policy | VANGUARD INK",
    description:
      "Privacy policy for VANGUARD INK. Learn how we collect, use, and protect your personal information.",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main" className="min-h-screen pt-20 pb-20 md:pb-0">
        <div className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-silver)]">
            Legal
          </p>
          <h1 className="text-h1 font-serif font-bold text-[var(--text-primary)]">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-[var(--text-tertiary)]">
            Last updated: March 2026
          </p>

          <div className="mt-12 space-y-10 text-sm leading-relaxed text-[var(--text-secondary)]">
            <section>
              <h2 className="mb-4 font-serif text-lg font-semibold text-[var(--text-primary)]">
                1. Information We Collect
              </h2>
              <p className="mb-3">
                When you use our website or contact us to book a consultation, we
                may collect the following personal information:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong className="text-[var(--text-primary)]">Contact information:</strong>{" "}
                  Name, email address, and phone number provided through our
                  inquiry form or direct communication.
                </li>
                <li>
                  <strong className="text-[var(--text-primary)]">Tattoo details:</strong>{" "}
                  Information about your desired tattoo including placement,
                  description, and reference images you share with us.
                </li>
                <li>
                  <strong className="text-[var(--text-primary)]">Usage data:</strong>{" "}
                  Anonymous analytics data such as pages visited, time spent on
                  site, and browser type to help us improve our website.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-lg font-semibold text-[var(--text-primary)]">
                2. How We Use Your Information
              </h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Respond to your consultation inquiries and schedule appointments.</li>
                <li>Communicate about your upcoming tattoo session, including design discussions and appointment reminders.</li>
                <li>Send follow-up aftercare instructions related to your tattoo.</li>
                <li>Improve our website experience and services.</li>
              </ul>
              <p className="mt-3">
                We will never sell, rent, or share your personal information with
                third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-lg font-semibold text-[var(--text-primary)]">
                3. Email Communications
              </h2>
              <p>
                When you submit an inquiry through our contact form, we use your
                email address solely to respond to your request and coordinate your
                tattoo consultation. We do not subscribe you to any marketing
                mailing lists. Any communication from {siteConfig.name} will be
                directly related to services you have requested.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-lg font-semibold text-[var(--text-primary)]">
                4. Cookies and Tracking
              </h2>
              <p className="mb-3">
                Our website may use essential cookies to ensure proper functionality
                (e.g., session management and spam prevention via Cloudflare
                Turnstile). We may also use anonymous analytics to understand how
                visitors interact with our site.
              </p>
              <p>
                We do not use advertising cookies or third-party tracking pixels.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-lg font-semibold text-[var(--text-primary)]">
                5. Data Security
              </h2>
              <p>
                We take reasonable measures to protect your personal information
                from unauthorized access, alteration, or destruction. However, no
                method of transmission over the internet is 100% secure. We
                encourage you to avoid sharing highly sensitive information through
                our contact form.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-lg font-semibold text-[var(--text-primary)]">
                6. Data Retention
              </h2>
              <p>
                We retain your contact information and consultation details only as
                long as necessary to provide our services and fulfill legal
                obligations. If you would like your data removed, please contact us
                directly.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-lg font-semibold text-[var(--text-primary)]">
                7. Your Rights
              </h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Request access to the personal data we hold about you.</li>
                <li>Request correction or deletion of your personal data.</li>
                <li>Withdraw consent for us to contact you at any time.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-lg font-semibold text-[var(--text-primary)]">
                8. Contact Us
              </h2>
              <p>
                If you have questions about this privacy policy or wish to exercise
                your data rights, please contact us at{" "}
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
              This privacy policy is a placeholder and should be reviewed by a
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
