export type PortfolioItem = {
  slug: string;
  title: string;
  category: PortfolioCategory;
  image: string;
  altText: string;
  description: string;
  placement: string;
  sessionTime: string;
  date: string;
  featured: boolean;
};

export type PortfolioCategory =
  | "all"
  | "blackwork"
  | "realism"
  | "fine-line"
  | "geometric"
  | "portrait";

export const portfolioCategories: { label: string; value: PortfolioCategory }[] = [
  { label: "All Styles", value: "all" },
  { label: "Blackwork", value: "blackwork" },
  { label: "Realism", value: "realism" },
  { label: "Fine Line", value: "fine-line" },
  { label: "Geometric", value: "geometric" },
  { label: "Portrait", value: "portrait" },
];

// Placeholder portfolio — replace with real images later
export const portfolioItems: PortfolioItem[] = [
  {
    slug: "obsidian-veil",
    title: "Obsidian Veil",
    category: "blackwork",
    image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&q=80",
    altText: "Full sleeve blackwork tattoo with architectural geometry and solid black fills",
    description:
      "Full sleeve blackwork piece inspired by architectural geometry. Seven sessions of meticulous linework and solid black fills.",
    placement: "Full Sleeve",
    sessionTime: "42 hours",
    date: "2025-11",
    featured: true,
  },
  {
    slug: "silent-portrait",
    title: "Silent Portrait",
    category: "portrait",
    image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&q=80",
    altText: "Hyper-realistic portrait tattoo rendered in micro-detail grayscale on inner forearm",
    description:
      "Hyper-realistic portrait rendered in micro-detail grayscale. Every pore, every shadow mapped with surgical precision.",
    placement: "Inner Forearm",
    sessionTime: "18 hours",
    date: "2025-09",
    featured: true,
  },
  {
    slug: "fractal-mind",
    title: "Fractal Mind",
    category: "geometric",
    image: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=800&q=80",
    altText: "Sacred geometry mandala back piece with fractal depth illusion",
    description:
      "Sacred geometry mandala with fractal depth illusion. Mathematical precision meets organic flow.",
    placement: "Back Piece",
    sessionTime: "36 hours",
    date: "2025-08",
    featured: true,
  },
  {
    slug: "whisper-line",
    title: "Whisper Line",
    category: "fine-line",
    image: "https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=800&q=80",
    altText: "Delicate botanical fine line wrist tattoo with single-needle technique",
    description:
      "Delicate botanical fine line work. Single-needle technique creating impossibly thin, precise strokes.",
    placement: "Wrist",
    sessionTime: "3 hours",
    date: "2025-12",
    featured: true,
  },
  {
    slug: "void-walker",
    title: "Void Walker",
    category: "blackwork",
    image: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=800&q=80",
    altText: "Abstract blackwork chest tattoo with heavy saturated blacks and negative space design",
    description:
      "Abstract blackwork depicting the threshold between form and void. Heavy saturated blacks with negative space design.",
    placement: "Chest",
    sessionTime: "24 hours",
    date: "2025-07",
    featured: true,
  },
  {
    slug: "titan-core",
    title: "Titan Core",
    category: "realism",
    image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&q=80",
    altText: "Photorealistic anatomical heart tattoo in black and gray on ribcage",
    description:
      "Photorealistic anatomical heart rendered in black and gray. Every valve, every vein captured in lifelike detail.",
    placement: "Ribcage",
    sessionTime: "15 hours",
    date: "2025-10",
    featured: true,
  },
  {
    slug: "geometric-spine",
    title: "Geometric Spine Realism",
    category: "geometric",
    image: "https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=800&q=80",
    altText: "Geometric spine tattoo combining architectural frameworks with organic realism",
    description:
      "Spine piece combining geometric frameworks with organic realism. Architectural symmetry down the vertebral column.",
    placement: "Full Spine",
    sessionTime: "30 hours",
    date: "2025-06",
    featured: false,
  },
  {
    slug: "neon-pulse",
    title: "Neon Pulse",
    category: "realism",
    image: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=800&q=80",
    altText: "Realistic eye tattoo with geometric overlays showing individual iris fibers",
    description:
      "Realistic eye with geometric overlays. The iris rendered in such detail you can see the individual fibers.",
    placement: "Upper Arm",
    sessionTime: "12 hours",
    date: "2025-05",
    featured: false,
  },
  {
    slug: "chrome-statues",
    title: "Chrome Statues",
    category: "realism",
    image: "https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=800&q=80",
    altText: "Classical sculpture realism thigh tattoo in contemporary black and gray technique",
    description:
      "Classical sculpture realism — Michelangelo's David reimagined in contemporary black and gray technique.",
    placement: "Thigh",
    sessionTime: "20 hours",
    date: "2025-04",
    featured: false,
  },
  {
    slug: "liquid-mercury",
    title: "Liquid Mercury",
    category: "blackwork",
    image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&q=80",
    altText: "Fluid abstract blackwork half sleeve simulating liquid metal with smooth gradients",
    description:
      "Fluid abstract blackwork simulating liquid metal. Smooth gradients and organic shapes in pure black ink.",
    placement: "Half Sleeve",
    sessionTime: "28 hours",
    date: "2025-03",
    featured: false,
  },
  {
    slug: "fine-botanical",
    title: "Fine Botanical",
    category: "fine-line",
    image: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=800&q=80",
    altText: "Minimalist botanical ankle tattoo with ferns and wildflowers in single-needle precision",
    description:
      "Minimalist botanical illustration. Ferns and wildflowers in single-needle precision.",
    placement: "Ankle",
    sessionTime: "4 hours",
    date: "2025-02",
    featured: false,
  },
  {
    slug: "portrait-of-time",
    title: "Portrait of Time",
    category: "portrait",
    image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&q=80",
    altText: "Aging portrait series showing three stages of life in photorealistic grayscale on full back",
    description:
      "Aging portrait series — three stages of life captured in photorealistic grayscale on a single canvas.",
    placement: "Full Back",
    sessionTime: "48 hours",
    date: "2025-01",
    featured: false,
  },
];
