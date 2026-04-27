import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { PortfolioContent } from "@/components/portfolio/portfolio-content";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore our curated collection of black & gray realism tattoos. Every piece is selected for its technical perfection and visionary narrative.",
  openGraph: {
    title: "Portfolio | BOUNDLESS TATTOO STUDIO",
    description:
      "Explore our curated collection of black & gray realism tattoos. Every piece is selected for its technical perfection and visionary narrative.",
    images: [
      {
        url: "/images/og/default.jpg",
        width: 1200,
        height: 630,
        alt: "BOUNDLESS TATTOO STUDIO Portfolio",
      },
    ],
  },
};

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main id="main" className="min-h-screen pt-20 pb-20 md:pb-0">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-silver)]">
             Our Portfolio
          </p>
          <h1 className="text-h1 font-serif font-bold text-[var(--text-primary)]">
             Real work from our studio — focused on clean execution, solid detail, and consistent quality.
          </h1>
          {/* <p className="mt-4 max-w-lg text-base text-[var(--text-secondary)]">
            Every piece in our archive is selected for its technical perfection
            and visionary narrative.
          </p> */}
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-24 md:px-8">
          <PortfolioContent />
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
