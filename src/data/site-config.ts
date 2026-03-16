export const siteConfig = {
  name: "VANGUARD INK",
  tagline: "The Art of the Permanent",
  description:
    "A sanctuary for black & gray realism. Where precision meets permanence.",
  artist: {
    name: "Marcus Thorne",
    title: "Founder & Lead Artist",
    specialty: "Black & Gray Realism",
    experience: "10+ Years",
    bio: "Pushing the boundaries of the human canvas with elite precision and editorial vision. Every line is a statement of identity, every shadow a depth of character.",
  },
  studio: {
    address: "218 Mercer St, Suite 12",
    city: "New York",
    state: "NY",
    zip: "10012",
    phone: "+1 (212) 555-0198",
    email: "akshayurankar48@gmail.com",
    hours: {
      weekdays: "11:00 AM – 8:00 PM",
      saturday: "10:00 AM – 6:00 PM",
      sunday: "By Appointment Only",
    },
  },
  social: {
    instagram: "https://instagram.com/vanguardink",
    tiktok: "https://tiktok.com/@vanguardink",
    twitter: "https://x.com/vanguardink",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Studio", href: "/studio" },
    { label: "Artist", href: "/artist" },
    { label: "Contact", href: "/contact" },
  ],
  stats: {
    completedPieces: "500+",
    yearsExperience: "10",
    clientSatisfaction: "100%",
  },
} as const;
