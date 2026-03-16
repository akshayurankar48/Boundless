export type InstagramPost = {
  image: string;
  alt: string;
  href: string;
};

// Curated static grid — no API dependency
// Replace these with real Instagram post images and links
// All URLs verified working as of 2026-03-16
export const instagramPosts: InstagramPost[] = [
  {
    image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=400&q=70",
    alt: "Blackwork sleeve tattoo detail",
    href: "https://instagram.com/p/example1",
  },
  {
    image: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=400&q=70",
    alt: "Portrait realism forearm piece",
    href: "https://instagram.com/p/example2",
  },
  {
    image: "https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=400&q=70",
    alt: "Fine line botanical wrist tattoo",
    href: "https://instagram.com/p/example3",
  },
  {
    image: "https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=400&q=70",
    alt: "Geometric mandala back piece",
    href: "https://instagram.com/p/example4",
  },
  {
    image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=400&q=70",
    alt: "Abstract blackwork chest piece",
    href: "https://instagram.com/p/example5",
  },
  {
    image: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=400&q=70",
    alt: "Fluid blackwork half sleeve",
    href: "https://instagram.com/p/example6",
  },
];
