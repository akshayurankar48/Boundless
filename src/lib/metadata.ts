import { siteConfig } from "@/data/site-config";

const SITE_URL = "https://vanguardink.art";

export function getLocalBusinessSchema() {
  const { studio, social } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: SITE_URL,
    image: `${SITE_URL}/images/og/default.jpg`,
    telephone: studio.phone,
    email: studio.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: studio.address,
      addressLocality: studio.city,
      addressRegion: studio.state,
      postalCode: studio.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.7265,
      longitude: -73.9986,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "11:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "18:00",
      },
    ],
    sameAs: [social.instagram, social.tiktok, social.twitter],
    priceRange: "$$$",
  };
}

export function getPersonSchema() {
  const { artist } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: artist.name,
    jobTitle: artist.title,
    description: artist.bio,
    worksFor: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
    },
    url: `${SITE_URL}/artist`,
    knowsAbout: [
      "Tattoo Art",
      "Black and Gray Realism",
      "Fine Line Tattooing",
      "Portrait Tattooing",
    ],
  };
}
