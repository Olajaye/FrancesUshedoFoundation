import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about The Frances Ushedo Foundation — founded by Amanda Ushedo to honour her late sister Frances. Our mission: empowering Nigerian children through health and education.",
  keywords: [
    "about Frances Ushedo Foundation",
    "Amanda Ushedo",
    "sickle cell disease Nigeria",
    "child charity Nigeria",
    "TFUF mission",
  ],
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: `About Us | ${SITE_NAME}`,
    description:
      "Founded in memory of Frances Ushedo, our foundation empowers Nigerian children to thrive through targeted health and education programmes.",
    url: `${SITE_URL}/about`,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: `About ${SITE_NAME}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `About Us | ${SITE_NAME}`,
    description: "Founded in memory of Frances Ushedo — empowering Nigerian children through health and education.",
    images: [DEFAULT_OG_IMAGE],
  },
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: `About | ${SITE_NAME}`,
  url: `${SITE_URL}/about`,
  description:
    "The Frances Ushedo Foundation (TFUF) is a purpose-driven family dedicated to empowering Nigerian children to thrive, founded by Amanda Ushedo in honour of her late sister Frances.",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
    ],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      {children}
    </>
  );
}
