export const siteConfig = {
  name: "BOUNDDLESS TATTOOO STUDIO",
  tagline: "Crafting Tattoos That Last a Lifetime",
  description:
    "Clean work, precise execution, and proper hygiene — every tattoo is done with care and professionalism.",
  artist: {
    name: "Sai",
    title: "Founder & Lead Artist",
    specialty: "Black & Gray Realism",
    experience: "10+ Years",
    bio: "I’m a tattoo artist focused on clean, precise work. Every tattoo is done with attention to detail, proper hygiene, and making sure you stay comfortable throughout the process.",
  },
  studio: {
    address: "Shop no 6, HIG 5, Akshay Park",
    city: "Gokul Road Hubballi ",
    // state: "NY",
    zip: "580030",
    phone: "+918861424753",
    email: "akshayurankar48@gmail.com",
    hours: {
      weekdays: "11:00 AM – 8:00 PM",
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
    { label: "The Space", href: "/space" },
    { label: "Artist", href: "/artist" },
    { label: "Contact", href: "/contact" },
  ],
  stats: {
    completedPieces: "500+",
    yearsExperience: "10",
    clientSatisfaction: "100%",
  },
} as const;
