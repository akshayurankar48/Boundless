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

// Ordered by folder number (1 Animal → 2 Realism → 3 Color → 4 Black&Grey → 5 Small)
export const portfolioCategories: { label: string; value: PortfolioCategory }[] = [
  { label: "All Styles", value: "all" },
  { label: "Animal Tattoos", value: "animal" },
  { label: "Realism and Portrait", value: "realism-portrait" },
  { label: "Colour Tattoos", value: "color" },
  { label: "Black and Grey", value: "black-grey" },
  { label: "Small and Coverups", value: "small-coverup" },
];

// Strip leading order number from filename (e.g. "1 Angel Fish.jpg" or "20Wolf.jpg" → clean name)
const stripLeadingNumber = (filename: string): string =>
  filename.replace(/^\d+\s*/, "");

// Create URL slug — number stripped, lowercase, hyphens
const createSlug = (filename: string): string =>
  stripLeadingNumber(filename)
    .replace(/\.(jpg|jpeg|png|webp)$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Create display title — number stripped, clean spaces
const createTitle = (filename: string): string =>
  stripLeadingNumber(filename)
    .replace(/\.(jpg|jpeg|png|webp)$/i, "")
    .replace(/[-_]/g, " ")
    .replace(/copy\s?\d*/gi, "")
    .replace(/\s+/g, " ")
    .trim();

// Sort filenames by their leading number; files without a number sort last alphabetically
const sortByNumber = (files: string[]): string[] =>
  [...files].sort((a, b) => {
    const numA = parseInt(a.match(/^(\d+)/)?.[1] ?? "Infinity", 10);
    const numB = parseInt(b.match(/^(\d+)/)?.[1] ?? "Infinity", 10);
    if (numA !== numB) return numA - numB;
    return a.localeCompare(b);
  });

// ─── Animal Tattoos (folder 1) ────────────────────────────────────────────────
const animalTattooImages = [
  "1 Bear - Shoulder Tattoo.jpg",
  "2 Eagle - Shoulder Tattoo.jpg",
  "3 Lion - Shoulder Tattoo.jpg",
  "4 Lion Roar - Shoulder Tattoo.jpg",
  "5 Lion Front Forearm.jpg",
  "6 Eagle on Arm Tattoo.jpg",
  "7 Owl.jpg",
  "8 Lion Half Sleeve.jpg",
  "9 Lion - Forest Theme.jpg",
  "10 Angel Fish.jpg",
  "11 lion on fist.jpg",
  "12 Elephant.jpg",
  "13 lion Scar Coverup.jpg",
  "14 Lion Forearm Tattoo.jpg",
  "15 Lion Mandala.jpg",
  "16 Reindeer Tattoo.jpg",
  "17 Pet Dog Tattoo.jpg",
  "18 Raven Tattoo.jpg",
  "19 Swan Tattoo.jpg",
  "20Wolf Coverup Tattoo.jpg",
  "21 Wolf Pup Tattoo.jpg",
  "22 Wolf Mandala Tattoo.jpg",
];

// ─── Realism and Portraits (folder 2) ────────────────────────────────────────
const realismPortraitImages = [
  "1 Full Back Heaven Hell Concept Full Back.jpg",
  "2 Durga Devi Tattoo.jpg",
  "3 Money Dont Lie Concept Tattoo.jpg",
  "4 Raja Rajeshwari Devi Portrait tattoo.jpg",
  "5 Blindfolded Realism Tattoo.jpg",
  "6 Buddha Tattoo.jpg",
  "7 Custom Goth Based Tattoo.jpg",
  "8 Bal Krishna Tattoo.jpg",
  "9 Hanuman on Chest Tattoo.jpg",
  "10 Female Warrior Tattoo.jpg",
  "11 Gangster Realism Tattoo.jpg",
  "12 Wolf Tattoo.jpg",
  "13 Warcraft Theme Tattoo.jpg",
  "14 Shiva Half Sleeve Tattoo.jpg",
  "15 Samurai Tattoo.jpg",
  "16 Realism Concept Tattoo.jpg",
  "17 Mother Father Portrait.jpg",
  "18 Egypt theme Back Tattoo.jpg",
  "19 Portrait Tattoo - on arm.jpg",
  "20 Baby Foot Tattoo.jpg",
  "21 Infant Portrait on Arm - Side pose.jpg",
  "22 Nature theme Half Sleeve.jpg",
  "23 Infant Portrait Tattoo.jpg",
  "24 Portrait Tattoo.jpg",
  "25 Nature Realism Tattoo.jpg",
  "26 Portrait on female arm.jpg",
  "27 Portrait Tattoo - on Chest.jpg",
  "28 Female Poratrait Tattoo.jpg",
];

// ─── Color Tattoos (folder 3) ─────────────────────────────────────────────────
const colorTattooImages = [
  "1 Color Realism Tattoo.jpg",
  "2 Colorful Flower Tattoo.jpg",
  "3 Demon Hunter.jpg",
  "4 Mantis Tattoo.jpg",
  "5 Abstract Color Tattoo.jpg",
  "6 Coyote Tattoo.jpg",
  "7 Dracula Tattoo.jpg",
  "7 Mind Heart Concept Tattoo.jpg",
  "9 Red Dragon Tattoo.jpg",
  "10 Sudarshan Chakra Tattoo.jpg",
  "11 Flower on back Tatto.jpg",
  "12 Krishna Flute Tattoo.jpg",
  "13 Line Art With Color Butterflies.jpg",
  "14 Lord Shiva Tattoo.jpg",
  "15 Butterfly with FLower tattoo.jpg",
  "16 Butterfly Color tattoo.jpg",
  "17 Watercolor Compass Tattoo.jpg",
  "18 Trishul Gadha Tattoo.jpg",
  "19 Butterfly on Back.jpg",
  "20 Trishul with Mantra Tattoo.jpg",
  "21 Panda with Heart Tattoo.jpg",
  "22 Watercolor Feather Tattoo.jpg",
];

// ─── Black and Grey (folder 4) ───────────────────────────────────────────────
const blackGreyImages = [
  "0 Zeus Tattoo.jpg",
  "1 Samurai Tattoo.jpg",
  "2 Shiva Nandi Tattoo.jpg",
  "3 Pheonix Tattoo.jpg",
  "4 Custom Tattoo.jpg",
  "5 Eagle Fist Tattoo.jpg",
  "6 Knife Tattoo.jpg",
  "7 God First Tattoo.jpg",
  "8 Geometric Armband Tattoo.jpg",
  "9 Floral Arm Tattoo.jpg",
  "10 Aquman Tattoo.jpg",
  "11 Abstract Armband Tattoo.jpg",
  "12 Krishna Tattoo.jpg",
  "13 medusa swati copy.jpg",
  "14 Rudra Shiva Tattoo.jpg",
  "15 Shiva Tattoo.jpg",
  "16 Sailor Theme Tattoo.jpg",
  "17 Koi Fish Armband Tattoo.jpg",
  "18 Moksha Tattoo.jpg",
  "19 Knee Skull Tattoo.jpg",
  "20 Horseshoe Tattoo.jpg",
  "21 Rudra Black and Grey Tattoo.jpg",
  "22 Pheonix - Rise from ashes.jpg",
  "23 Rayaridare Tattoo.jpg",
  "24 Shivlinga Tattoo.jpg",
  "25 Satan Tattoo.jpg",
  "26 Wolf Tattoo.jpg",
  "27 Constellation Tattoo.jpg",
  "28 Sailor Tattoo.jpg",
  "29 Trishul Waves Custom Tattoo.jpg",
  "30 Wings on Back Tattoo.jpg",
  "31 Tree of life Tattoo.jpg",
  "32 Sudarshan Chakra Tattoo.jpg",
  "33 Trishul Tattoo.jpg",
  "34 Shiva Jotirlinga Tattoo.jpg",
  "35 Shivaji Maharaj Tattoo.jpg",
  "36 Shri Raghvendra Swami Tattoo.jpg",
  "37 Dic Tattoo.jpg",
  "38 Back Chakra Tattoo.jpg",
  "39 Back Mandala Tattoo.jpg",
  "40 Fox Tattoo.jpg",
  "41 Custom Compass Tattoo.jpg",
  "42 Buddha Tattoo.jpg",
  "43 Eagle Back Tattoo.jpg",
];

// ─── Small and Coverups (folder 5) ───────────────────────────────────────────
const smallCoverupImages = [
  "0 Lion Scar Tattoo.jpg",
  "1 Sword Lightening Tattoo.jpg",
  "2 Adventure Tattoo.jpg",
  "3 Balance on Chest.jpg",
  "4 Cartoon Tattoo.jpg",
  "5 Bull Line Art.jpg",
  "6 Cybersigilism Tattoo.jpg",
  "7 Dragon.jpg",
  "8 Eagle Coverup.jpg",
  "9 Dragonfly.jpg",
  "10 Line Art Tattoo.jpg",
  "11 Lotus Mandala Tattoo.jpg",
  "12 1111 constellation.jpg",
  "13 Holding Hands Line Art.jpg",
  "14 Back Mandala Tattoo.jpg",
  "15 Cat Line Art.jpg",
  "16 Dandelion.jpg",
  "17 Finger Tattoo.jpg",
  "18 Flute Feather Tattoo.jpg",
  "19 Mandala on Fist Tattoo.jpg",
  "20 Krishna Scar Cover Up.jpg",
  "21 Rich Risk Tattoo.jpg",
  "22 Sun Moon Tattoo.jpg",
  "23 Scar Cover Uop.jpg",
  "24 Turtle Coverup Tattoo.jpg",
  "25 Eagle Triangle.jpg",
  "26 Dragon Tribal.jpg",
  "27 Memto Mori Tattoo.jpg",
  "28 Om Trishul.jpg",
  "29 Om Trishul Tattoo.jpg",
  "30 Sparrow Scar Cover up.jpg",
  "31 Sunflower Tattoo.jpg",
  "32 Sunflower Lineart Tattoo.jpg",
  "33 Still I Rise in Red.jpg",
  "34 Wild Heart Script Tattoo.jpg",
  "35 Hindi Script Tattoo.jpg",
  "36 Gods Plan.jpg",
  "37 Star on Shoulder.jpg",
  "38 Sun - Moon on Chest Tattoo.jpg",
  "39 Sun on Shoulder.jpg",
  "40 Rayariddare Tattoo.jpg",
  "41 Maa Paa Tattoo.jpg",
  "42 Owl Coverup Tattoo.jpg",
  "43 Scar Cover Lion.jpg",
  "44 Geleya.jpg",
  "45 Free Soul Script Tattoo.jpg",
  "46 Date Tattoo.jpg",
  "47 Star Coverup Tattoo.jpg",
  "48 Moon Tattoo.jpg",
  "49 Koi Fish Tattoo.jpg",
  "50 Om Taurus.jpg",
  "51 Baby holding Finger.jpg",
  "52 Basketball Player Tattoo.jpg",
  "53 Cat Face Tattoo.jpg",
  "54 Ear Tattoo.jpg",
  "55 Koi Fish Tattoo on Shoulder.jpg",
];

// Encode a path segment so spaces and special chars are URL-safe
const encodeSeg = (s: string): string =>
  s.split("").map((c) => (c === " " ? "%20" : c)).join("");

// ─── Generator ───────────────────────────────────────────────────────────────
const createPortfolioItems = (
  images: string[],
  category: PortfolioCategory,
  basePath: string,
  featured: boolean = false
): PortfolioItem[] =>
  sortByNumber(images).map((filename, index) => ({
    slug: createSlug(filename),
    title: createTitle(filename),
    category,
    image: `/images/portfolio/Photos/${encodeSeg(basePath)}/${encodeSeg(filename)}`,
    altText: `${createTitle(filename)} tattoo`,
    description: `Professional tattoo work by Boundless Tattoo Studio.`,
    placement: "Various",
    sessionTime: "Custom",
    date: "2025",
    featured: featured && index < 3,
  }));

// Ordered by folder number 1 → 2 → 3 → 4 → 5
export const portfolioItems: PortfolioItem[] = [
  ...createPortfolioItems(animalTattooImages, "animal", "1 Animal Tattoos", true),
  ...createPortfolioItems(realismPortraitImages, "realism-portrait", "2 Realism and portraits", true),
  ...createPortfolioItems(colorTattooImages, "color", "3 Color tattoos", true),
  ...createPortfolioItems(blackGreyImages, "black-grey", "4 Black and Grey", true),
  ...createPortfolioItems(smallCoverupImages, "small-coverup", "5 Small and coverups", true),
];
