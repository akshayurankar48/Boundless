import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { portfolioItems, type PortfolioCategory } from "@/data/portfolio";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { BLUR_PLACEHOLDER } from "@/lib/image-utils";

const styleData: Record<
  Exclude<PortfolioCategory, "all">,
  { label: string; description: string }
> = {
  "realism-portrait": {
    label: "Realism and Portrait",
    description:
      "Photorealistic rendering and hyper-realistic portraits in black and gray. Every detail captured with surgical precision.",
  },
  color: {
    label: "Colour Tattoos",
    description:
      "Vibrant color work bringing your tattoo to life with bold, saturated hues and smooth gradients.",
  },
  "black-grey": {
    label: "Black and Grey",
    description:
      "Classic black and grey technique with smooth shading and tonal depth.",
  },
  animal: {
    label: "Animal Tattoos",
    description:
      "Realistic animal portraits and wildlife designs capturing the spirit and power of nature.",
  },
  "small-coverup": {
    label: "Small and Coverups",
    description:
      "Delicate small pieces and expert coverups transforming old tattoos into new art.",
  },
};

const validStyles = Object.keys(styleData) as Exclude<PortfolioCategory, "all">[];

type Props = {
  params: Promise<{ style: string }>;
};

export async function generateStaticParams() {
  return validStyles.map((style) => ({ style }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { style } = await params;
  const data = styleData[style as Exclude<PortfolioCategory, "all">];

  if (!data) {
    return { title: "Not Found" };
  }

  const title = `${data.label} Tattoos`;
  const description = `${data.description} Browse our ${data.label.toLowerCase()} tattoo portfolio at BOUNDDLESS TATTOOO STUDIO.`;

  return {
    title,
    description,
    openGraph: {
      title: `${data.label} Tattoos | BOUNDDLESS TATTOOO STUDIO`,
      description,
      type: "website",
      images: [
        {
          url: "/images/og/default.jpg",
          width: 1200,
          height: 630,
          alt: `${data.label} Tattoos at BOUNDDLESS TATTOOO STUDIO`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.label} Tattoos | BOUNDDLESS TATTOOO STUDIO`,
      description,
    },
  };
}

const aspectPatterns = [
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-[2/3]",
  "aspect-square",
];

export default async function StylePortfolioPage({ params }: Props) {
  const { style } = await params;
  const data = styleData[style as Exclude<PortfolioCategory, "all">];

  if (!data) {
    notFound();
  }

  const items = portfolioItems.filter(
    (item) => item.category === (style as PortfolioCategory)
  );

  return (
    <>
      <Header />
      <main id="main" className="min-h-screen pt-20 pb-20 md:pb-0">
        {/* Header */}
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <Link
            href="/portfolio"
            className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-tertiary)] transition-colors hover:text-[var(--accent-silver)]"
          >
            <ArrowLeft size={14} />
            All Styles
          </Link>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-silver)]">
            Style Collection
          </p>
          <h1 className="text-h1 font-serif font-bold text-[var(--text-primary)]">
            {data.label}.
          </h1>
          <p className="mt-4 max-w-lg text-base text-[var(--text-secondary)]">
            {data.description}
          </p>
        </div>

        {/* Grid */}
        <div className="mx-auto max-w-7xl px-4 pb-24 md:px-8">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="font-serif text-xl text-[var(--text-primary)]">
                Coming Soon
              </p>
              <p className="mt-2 max-w-sm text-sm text-[var(--text-secondary)]">
                New {data.label.toLowerCase()} pieces are being added to the
                collection. Check back soon.
              </p>
            </div>
          ) : (
            <div className="columns-2 gap-4 md:columns-3 md:gap-5">
              {items.map((item, i) => {
                const aspect = aspectPatterns[i % aspectPatterns.length];
                return (
                  <Link
                    key={item.slug}
                    href={`/portfolio/${item.slug}`}
                    className="group mb-4 block break-inside-avoid"
                  >
                    <div
                      className={`relative overflow-hidden ${aspect} transition-transform duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.02]`}
                    >
                      <Image
                        src={item.image}
                        alt={item.altText}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        placeholder="blur"
                        blurDataURL={BLUR_PLACEHOLDER}
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex flex-col justify-end bg-[var(--bg-primary)]/0 p-4 transition-all duration-500 group-hover:bg-[var(--bg-primary)]/60">
                        <div className="translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                          <h3 className="font-serif text-lg text-[var(--text-primary)]">
                            {item.title}
                          </h3>
                          <p className="mt-1 font-mono text-xs text-[var(--text-tertiary)]">
                            {item.placement}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Browse other styles */}
          <div className="mt-16 border-t border-[var(--border-default)] pt-12">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
              Explore Other Styles
            </p>
            <div className="flex flex-wrap gap-3">
              {validStyles
                .filter((s) => s !== style)
                .map((s) => (
                  <Link
                    key={s}
                    href={`/portfolio/styles/${s}`}
                    className="border border-[var(--border-default)] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-silver)] hover:text-[var(--accent-silver)]"
                  >
                    {styleData[s].label}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
