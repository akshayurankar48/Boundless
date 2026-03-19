import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { HeroSection } from "@/components/hero/hero-section";
import { ArtistIntro } from "@/components/sections/artist-intro";
import { ProcessSteps } from "@/components/sections/process-steps";
import { StudioPreview } from "@/components/sections/studio-preview";
import { CTABanner } from "@/components/sections/cta-banner";
import { LazySection } from "@/components/shared/lazy-section";

const FeaturedWork = dynamic(
  () =>
    import("@/components/sections/featured-work").then((mod) => ({
      default: mod.FeaturedWork,
    }))
);

const Testimonials = dynamic(
  () =>
    import("@/components/sections/testimonials").then((mod) => ({
      default: mod.Testimonials,
    }))
);

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main" className="pb-20 md:pb-0">
        <HeroSection />
        <FeaturedWork />
        <ArtistIntro />
        <LazySection minHeight="600px">
          <ProcessSteps />
        </LazySection>
        <LazySection minHeight="500px">
          <Testimonials />
        </LazySection>
        <LazySection minHeight="400px">
          <StudioPreview />
        </LazySection>
        <LazySection minHeight="300px">
          <CTABanner />
        </LazySection>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
