export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://frances-ushedo-foundation.vercel.app";

export const SITE_NAME = "The Frances Ushedo Foundation";

export const SITE_DESCRIPTION =
  "Empowering Nigerian children through health and education. The Frances Ushedo Foundation channels personal grief into transformative action — honouring Frances Ushedo's memory by giving every child the chance to thrive.";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/home/tryout3.png`;

export const TWITTER_HANDLE = "@TFUFoundation";

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: SITE_NAME,
  alternateName: "TFUF",
  url: SITE_URL,
  logo: `${SITE_URL}/logo/logoImg.png`,
  description: SITE_DESCRIPTION,
  foundingDate: "2024",
  areaServed: "Nigeria",
  knowsAbout: ["Child Health", "Education", "Sickle Cell Disease", "Nigeria"],
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "general enquiries",
    url: `${SITE_URL}/contact`,
  },
};

export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/news?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};
