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
  | "realism-portrait"
  | "color"
  | "black-grey"
  | "animal"
  | "small-coverup";

export const portfolioCategories: { label: string; value: PortfolioCategory }[] = [
  { label: "All Styles", value: "all" },
  { label: "Realism and Portrait", value: "realism-portrait" },
  { label: "Colour Tattoos", value: "color" },
  { label: "Black and Grey", value: "black-grey" },
  { label: "Animal Tattoos", value: "animal" },
  { label: "Small and Coverups", value: "small-coverup" },
];

// Helper function to create slug from filename
const createSlug = (filename: string): string => {
  return filename
    .replace(/\.(jpg|jpeg|png|webp)$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// Helper function to create title from filename
const createTitle = (filename: string): string => {
  return filename
    .replace(/\.(jpg|jpeg|png|webp)$/i, "")
    .replace(/[-_]/g, " ")
    .replace(/copy\s?\d*/gi, "")
    .replace(/\s+/g, " ")
    .trim();
};

// Realism and Portrait items
const realismPortraitImages = [
  "1.jpg",
  "8.jpg",
  "IMG_1237 porrait 2.jpg",
  "IMG_2021 copy 2.jpg",
  "IMG_3480 copy.jpg",
  "Orc 1.jpg",
  "Portrait 1.1 copy.jpg",
  "anil buddha copy.jpg",
  "anjali 1.jpg",
  "arun portrait copy.jpg",
  "bal krishna 2.jpg",
  "durgavi copy.jpg",
  "hanuman 1.jpg",
  "money.jpg",
  "mountains-2 copy.jpg",
  "portrairt 2.jpg",
  "portrait 2 copy.jpg",
  "portrait 2.jpg",
  "portrait 3 copy 1.jpg",
  "portrait 4.jpg",
  "portrait copy.jpg",
  "portrait kid copy.jpg",
  "prashant-2 copy.jpg",
  "rounak copy.jpg",
  "saghar 1.jpg",
  "sameer 1.jpg",
  "sameer copy.jpg",
  "shiva  2.jpg",
  "shreyas copy 1.jpg",
  "shruti 1 copy.jpg",
  "wolf 3.jpg",
];

// Color tattoos items
const colorTattooImages = [
  "IMG_1004 copy-2 copy.jpg",
  "butterflty 1.jpg",
  "butterfly 2 copy.jpg",
  "compass 1.jpg",
  "coyote.jpg",
  "dragon.jpg",
  "flower 1 copy.jpg",
  "flowers 2-2 copy.jpg",
  "jaimini 2.jpg",
  "luv.jpg",
  "niks 1.jpg",
  "niks vamp copy.jpg",
  "panda 1 copy.jpg",
  "pankaja.jpg",
  "praful coverup.jpg",
  "rakshi 1 copy.jpg",
  "rounak.jpg",
  "shiva vinayak.jpg",
  "sudarshan chakra 2 copy.jpg",
  "sukanya 1.jpg",
  "trishul copy.jpg",
  "trishul damru 2.jpg",
];

// Black and Grey items
const blackGreyImages = [
  "eagle fist.jpg",
  "god first.jpg",
  "krishna.jpg",
];

// Animal tattoos items
const animalTattooImages = [
  "2 ace lion.jpg",
  "elephant copy.jpg",
  "goobe copy.jpg",
  "lion 1 cop.jpg",
  "lion 1 copy.jpg",
  "lion 2.jpg",
  "lion 3.jpg",
  "lion abhi.jpg",
  "lion forearm copy.jpg",
  "lion forearm.jpg",
  "lion on fist.jpg",
  "praveen eagle copy.jpg",
  "ramya-2 copy.jpg",
];

// Small and coverups items
const smallCoverupImages = [
  "1111 copy.jpg",
  "2p.jpg",
  "Harsha finger.jpg",
  "Moon retouch.jpg",
  "Om.jpg",
  "Rakshi Free soul.jpg",
  "adventure.jpg",
  "akshay copy.jpg",
  "ankit copy 2.jpg",
  "back mandala.jpg",
  "balance chandan copy 1.jpg",
  "basketball player.jpg",
  "cat line art.jpg",
  "dandelion.jpg",
  "deepsingh 2.jpg",
  "dragon.jpg",
  "dragonfly.jpg",
  "eagle 2.jpg",
  "eagle.jpg",
  "flute feather.jpg",
  "geleya 1.jpg",
  "gods plan copy.jpg",
  "harsha.jpg",
  "holding hands copy 1.jpg",
  "kashi 1.jpg",
  "koi fish 1.jpg",
  "krishna 1.jpg",
  "line art 1.jpg",
  "line art.jpg",
  "lion 2 copy.jpg",
  "lion arogya copy.jpg",
  "lucky.jpg",
  "maa paa.jpg",
  "maa paa.png",
  "mahi koki fish copy 2.jpg",
  "mandala 2 copy 2.jpg",
  "mandala 3.jpg",
  "memto mori copy.jpg",
  "om taurus.jpg",
  "om trishul.jpg",
  "owl coverup1.jpg",
  "praveen copy.jpg",
  "rakshata 1.jpg",
  "rakshi still i rise.jpg",
  "rakshi wild heart.jpg",
  "rayariddare 2.jpg",
  "rich risk1.jpg",
  "saahi.jpg",
  "saahitya 1.jpg",
  "sparrow.jpg",
  "star sharath.jpg",
  "still i rise.jpg",
  "sun moon.jpg",
  "sun shoulder.jpg",
  "sunflower 1.jpg",
  "sunflower.jpg",
  "turtle copy.jpg",
  "yash.jpg",
];

// Generate portfolio items from image arrays
const createPortfolioItems = (
  images: string[],
  category: PortfolioCategory,
  basePath: string,
  featured: boolean = false
): PortfolioItem[] => {
  return images.map((filename, index) => ({
    slug: createSlug(filename),
    title: createTitle(filename),
    category,
    image: `/images/portfolio/Photo/${basePath}/${filename}`,
    altText: `${createTitle(filename)} tattoo`,
    description: `Professional tattoo work by Boundless Tattoo Studio.`,
    placement: "Various",
    sessionTime: "Custom",
    date: "2025",
    featured: featured && index < 3, // Mark first 3 of each category as featured
  }));
};

// Generate all portfolio items
export const portfolioItems: PortfolioItem[] = [
  ...createPortfolioItems(realismPortraitImages, "realism-portrait", "1 Realism and portraits", true),
  ...createPortfolioItems(colorTattooImages, "color", "2 Color tattoos", true),
  ...createPortfolioItems(blackGreyImages, "black-grey", "3 Black and Grey", true),
  ...createPortfolioItems(animalTattooImages, "animal", "4 Animal Tattoos", true),
  ...createPortfolioItems(smallCoverupImages, "small-coverup", "5 Small and coverups", true),
];
