import type { Metadata } from "next";
import { Inter, Playfair_Display, Space_Grotesk } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import Providers from "@/components/providers";
import { getLocalBusinessSchema } from "@/lib/metadata";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "optional",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vanguardink.art"),
  title: {
    default: "VANGUARD INK — Black & Gray Realism Tattoo Studio",
    template: "%s | VANGUARD INK",
  },
  description:
    "A sanctuary for black & gray realism. Where precision meets permanence. Custom tattoo artistry in New York City.",
  keywords: [
    "tattoo studio",
    "black and gray tattoo",
    "realism tattoo",
    "fine line tattoo",
    "NYC tattoo artist",
    "custom tattoo",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "VANGUARD INK",
    title: "VANGUARD INK — Black & Gray Realism Tattoo Studio",
    description:
      "A sanctuary for black & gray realism. Where precision meets permanence.",
    images: [
      {
        url: "/images/og/default.jpg",
        width: 1200,
        height: 630,
        alt: "VANGUARD INK — Black & Gray Realism Tattoo Studio",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        {/* Hero poster image preload for instant LCP */}
        <link rel="preload" href="/images/hero/poster.jpg" as="image" fetchPriority="high" />
        {/* Hero video preload — WebM preferred, MP4 fallback */}
        <link rel="preload" href="/videos/hero-ambient.webm" as="video" type="video/webm" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getLocalBusinessSchema()),
          }}
        />
        {/* Cloudflare Turnstile — loaded when site key is configured */}
        {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
          <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
        )}
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${spaceGrotesk.variable} font-sans antialiased grain-overlay`}
      >
        <TooltipProvider>
          <Providers>{children}</Providers>
        </TooltipProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `if(typeof window!=='undefined'&&'serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){})})}`,
          }}
        />
      </body>
    </html>
  );
}
