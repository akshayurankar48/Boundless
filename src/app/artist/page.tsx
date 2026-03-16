import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { ArtistContent } from "@/components/artist/artist-content";
import { siteConfig } from "@/data/site-config";
import { getPersonSchema } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Artist",
  description: `Meet ${siteConfig.artist.name} — ${siteConfig.artist.specialty} specialist with ${siteConfig.artist.experience} of experience.`,
  openGraph: {
    title: `${siteConfig.artist.name} — ${siteConfig.artist.title}`,
    description: `Meet ${siteConfig.artist.name} — ${siteConfig.artist.specialty} specialist with ${siteConfig.artist.experience} of experience.`,
    images: [
      {
        url: "/images/og/default.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.artist.name} — ${siteConfig.artist.title}`,
      },
    ],
  },
};

export default function ArtistPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPersonSchema()),
        }}
      />
      <Header />
      <main id="main" className="min-h-screen pb-20 md:pb-0">
        <ArtistContent />
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
