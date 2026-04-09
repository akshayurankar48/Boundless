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
  "Baby Foot Tattoo.jpg",
  "Bal Krishna Tattoo.jpg",
  "Blindfolded Realism Tattoo.jpg",
  "Buddha Tattoo.jpg",
  "Custom Goth Based Tattoo.jpg",
  "Durga Devi Tattoo.jpg",
  "Egypt theme Back Tattoo.jpg",
  "Female Poratrait Tattoo.jpg",
  "Female Warrior Tattoo.jpg",
  "Full Back Heaven Hell Concept Full Back.jpg",
  "Gangster Realism Tattoo.jpg",
  "Hanuman on Chest Tattoo.jpg",
  "Infant Portrait Tattoo.jpg",
  "Infant Portrait on Arm - Side pose.jpg",
  "Money Dont Lie Concept Tattoo.jpg",
  "Mother Father Portrait.jpg",
  "Mother Portrait on chest.jpg",
  "Nature Realism Tattoo.jpg",
  "Nature theme Half Sleeve.jpg",
  "Portrait Tattoo - on Chest.jpg",
  "Portrait Tattoo - on arm.jpg",
  "Portrait Tattoo.jpg",
  "Portrait on female arm.jpg",
  "Raja Rajeshwari Devi Portrait tattoo.jpg",
  "Realism Concept Tattoo.jpg",
  "Samurai Tattoo.jpg",
  "Shiva Half Sleeve Tattoo.jpg",
  "Warcraft Theme Tattoo.jpg",
  "Wolf Tattoo.jpg",
];

// Color tattoos items
const colorTattooImages = [
  "Abstract Color Tattoo.jpg",
  "Butterfly Color tattoo.jpg",
  "Butterfly on Back.jpg",
  "Butterfly with FLower tattoo.jpg",
  "Color Realism Tattoo.jpg",
  "Colorful Flower Tattoo.jpg",
  "Coyote Tattoo.jpg",
  "Demon Hunter.jpg",
  "Dracula Tattoo.jpg",
  "Flower on back Tatto.jpg",
  "Krishna Flute Tattoo.jpg",
  "Line Art With Color Butterflies.jpg",
  "Lord Shiva Tattoo.jpg",
  "Mantis Tattoo.jpg",
  "Mind Heart Concept Tattoo.jpg",
  "Panda with Heart Tattoo.jpg",
  "Red Dragon Tattoo.jpg",
  "Sudarshan Chakra Tattoo.jpg",
  "Trishul Gadha Tattoo.jpg",
  "Trishul with Mantra Tattoo.jpg",
  "Watercolor Compass Tattoo.jpg",
  "Watercolor Feather Tattoo.jpg",
];

// Black and Grey items
const blackGreyImages = [
  "Abstract Armband Tattoo.jpg",
  "Aquman Tattoo.jpg",
  "Back Chakra Tattoo.jpg",
  "Back Mandala Tattoo.jpg",
  "Buddha Tattoo.jpg",
  "Constellation Tattoo.jpg",
  "Custom Compass Tattoo.jpg",
  "Custom Tattoo.jpg",
  "Dic Tattoo.jpg",
  "Eagle Back Tattoo.jpg",
  "Eagle Fist Tattoo.jpg",
  "Floral Arm Tattoo.jpg",
  "Fox Tattoo.jpg",
  "Geometric Armband Tattoo.jpg",
  "God First Tattoo.jpg",
  "Horseshoe Tattoo.jpg",
  "Knee Skull Tattoo.jpg",
  "Knife Tattoo.jpg",
  "Koi Fish Armband Tattoo.jpg",
  "Krishna Tattoo.jpg",
  "Moksha Tattoo.jpg",
  "Pheonix - Rise from ashes.jpg",
  "Pheonix Tattoo.jpg",
  "Rayaridare Tattoo.jpg",
  "Rudra Black and Grey Tattoo.jpg",
  "Rudra Shiva Tattoo.jpg",
  "Sailor Tattoo.jpg",
  "Sailor Theme Tattoo.jpg",
  "Samurai Tattoo.jpg",
  "Satan Tattoo.jpg",
  "Shiva Jotirlinga Tattoo.jpg",
  "Shiva Nandi Tattoo.jpg",
  "Shiva Tattoo.jpg",
  "Shivaji Maharaj Tattoo.jpg",
  "Shivlinga Tattoo.jpg",
  "Shri Raghvendra Swami Tattoo.jpg",
  "Sudarshan Chakra Tattoo.jpg",
  "Tree of life Tattoo.jpg",
  "Trishul Tattoo.jpg",
  "Trishul Waves Custom Tattoo.jpg",
  "Wings on Back Tattoo.jpg",
  "Wolf Tattoo.jpg",
  "Zeus Tattoo.jpg",
  "medusa swati copy.jpg",
];

// Animal tattoos items
const animalTattooImages = [
  "Angel Fish.jpg",
  "Bear - Shoulder Tattoo.jpg",
  "Eagle - Shoulder Tattoo.jpg",
  "Eagle on Arm Tattoo.jpg",
  "Elephant.jpg",
  "Lion - Forest Theme.jpg",
  "Lion - Shoulder Tattoo.jpg",
  "Lion Forearm Tattoo.jpg",
  "Lion Front Forearm.jpg",
  "Lion Half Sleeve.jpg",
  "Lion Mandala.jpg",
  "Lion Roar - Shoulder Tattoo.jpg",
  "Owl.jpg",
  "Pet Dog Tattoo.jpg",
  "Raven Tattoo.jpg",
  "Reindeer Tattoo.jpg",
  "Swan Tattoo.jpg",
  "Wolf Coverup Tattoo.jpg",
  "Wolf Mandala Tattoo.jpg",
  "Wolf Pup Tattoo.jpg",
  "lion Scar Coverup.jpg",
  "lion on fist.jpg",
];

// Small and coverups items
const smallCoverupImages = [
  "1111 constellation.jpg",
  "Adventure Tattoo.jpg",
  "Baby holding Finger.jpg",
  "Back Mandala Tattoo.jpg",
  "Balance on Chest.jpg",
  "Basketball Player Tattoo.jpg",
  "Bull Line Art.jpg",
  "Cartoon Tattoo.jpg",
  "Cat Face Tattoo.jpg",
  "Cat Line Art.jpg",
  "Cybersigilism Tattoo.jpg",
  "Dandelion.jpg",
  "Date Tattoo.jpg",
  "Dragon Tribal.jpg",
  "Dragon.jpg",
  "Dragonfly.jpg",
  "Eagle Coverup.jpg",
  "Eagle Triangle.jpg",
  "Ear Tattoo.jpg",
  "Finger Tattoo.jpg",
  "Flute Feather Tattoo.jpg",
  "Free Soul Script Tattoo.jpg",
  "Geleya.jpg",
  "Gods Plan.jpg",
  "Hindi Script Tattoo.jpg",
  "Holding Hands Line Art.jpg",
  "Koi Fish Tattoo on Shoulder.jpg",
  "Koi Fish Tattoo.jpg",
  "Krishna Scar Cover Up.jpg",
  "Line Art Tattoo.jpg",
  "Lion Scar Tattoo.jpg",
  "Lotus Mandala Tattoo.jpg",
  "Maa Paa Tattoo.jpg",
  "Mandala on Fist Tattoo.jpg",
  "Memto Mori Tattoo.jpg",
  "Moon Tattoo.jpg",
  "Om Taurus.jpg",
  "Om Trishul Tattoo.jpg",
  "Om Trishul.jpg",
  "Owl Coverup Tattoo.jpg",
  "Rayariddare Tattoo.jpg",
  "Rich Risk Tattoo.jpg",
  "Scar Cover Lion.jpg",
  "Scar Cover Uop.jpg",
  "Sparrow Scar Cover up.jpg",
  "Star Coverup Tattoo.jpg",
  "Star on Shoulder.jpg",
  "Still I Rise in Red.jpg",
  "Sun - Moon on Chest Tattoo.jpg",
  "Sun Moon Tattoo.jpg",
  "Sun on Shoulder.jpg",
  "Sunflower Lineart Tattoo.jpg",
  "Sunflower Tattoo.jpg",
  "Sword Lightening Tattoo.jpg",
  "Turtle Coverup Tattoo.jpg",
  "Wild Heart Script Tattoo.jpg",
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
    image: `/images/portfolio/Photos/${basePath}/${filename}`,
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
  ...createPortfolioItems(realismPortraitImages, "realism-portrait", "2 Realism and portraits", true),
  ...createPortfolioItems(colorTattooImages, "color", "3 Color tattoos", true),
  ...createPortfolioItems(blackGreyImages, "black-grey", "4 Black and Grey", true),
  ...createPortfolioItems(animalTattooImages, "animal", "1 Animal Tattoos", true),
  ...createPortfolioItems(smallCoverupImages, "small-coverup", "5 Small and coverups", true),
];
