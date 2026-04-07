import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { portfolioItems } from "@/data/portfolio";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { PortfolioDetail } from "@/components/portfolio/portfolio-detail";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return portfolioItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = portfolioItems.find((p) => p.slug === slug);

  if (!item) {
    return { title: "Not Found" };
  }

  return {
    title: item.title,
    description: item.description,
    openGraph: {
      title: `${item.title} | BOUNDDLESS TATTOOO STUDIO`,
      description: item.description,
      type: "article",
      images: [
        {
          url: item.image,
          width: 800,
          height: 800,
          alt: item.altText,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.title} | BOUNDDLESS TATTOOO STUDIO`,
      description: item.description,
      images: [item.image],
    },
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const itemIndex = portfolioItems.findIndex((p) => p.slug === slug);
  const item = portfolioItems[itemIndex];

  if (!item) {
    notFound();
  }

  const relatedItems = portfolioItems
    .filter((p) => p.category === item.category && p.slug !== item.slug)
    .slice(0, 4);

  const prevItem = itemIndex > 0 ? portfolioItems[itemIndex - 1] : null;
  const nextItem = itemIndex < portfolioItems.length - 1 ? portfolioItems[itemIndex + 1] : null;

  return (
    <>
      <Header />
      <main id="main" className="min-h-screen pt-20 pb-20 md:pb-0">
        <PortfolioDetail
          item={item}
          relatedItems={relatedItems}
          prevItem={prevItem}
          nextItem={nextItem}
        />
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
