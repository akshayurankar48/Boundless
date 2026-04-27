"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { HeroSection } from "@/components/hero/hero-section";
import { FeaturedWork } from "@/components/sections/featured-work";
import { ArtistIntro } from "@/components/sections/artist-intro";
import { ProcessSteps } from "@/components/sections/process-steps";
import { Testimonials } from "@/components/sections/testimonials";
import { CTABanner } from "@/components/sections/cta-banner";

export function ClientOnlyPage() {
  return (
    <>
      <Header />
      <main id="main" className="pb-20 md:pb-0">
        <HeroSection />
        <FeaturedWork />
        <ArtistIntro />
        <ProcessSteps />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
