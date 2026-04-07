import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { StudioContent } from "@/components/studio/studio-content";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Visit our sanctuary for black & gray realism. Medical-grade sterilization, premium vegan inks, and an atmosphere designed for artistic transcendence.",
  openGraph: {
    title: "Studio | BOUNDDLESS TATTOOO STUDIO",
    description:
      "Visit our sanctuary for black & gray realism. Medical-grade sterilization, premium vegan inks, and an atmosphere designed for artistic transcendence.",
    images: [
      {
        url: "/images/og/default.jpg",
        width: 1200,
        height: 630,
        alt: "BOUNDDLESS TATTOOO STUDIO Studio",
      },
    ],
  },
};

export default function StudioPage() {
  return (
    <>
      <Header />
      <main id="main" className="min-h-screen pb-20 md:pb-0">
        <StudioContent />
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
