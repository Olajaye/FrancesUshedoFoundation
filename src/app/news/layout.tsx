import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "News",
  description:
    "Latest news and updates from The Frances Ushedo Foundation — stories of impact, programme updates, and announcements from our work in Nigeria.",
  keywords: [
    "TFUF news",
    "Frances Ushedo Foundation news",
    "Nigeria charity news",
    "child health news Nigeria",
    "TFUF updates",
  ],
  alternates: { canonical: `${SITE_URL}/news` },
  openGraph: {
    title: `News | ${SITE_NAME}`,
    description: "Latest stories, programme updates, and announcements from TFUF.",
    url: `${SITE_URL}/news`,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: `${SITE_NAME} News` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `News | ${SITE_NAME}`,
    description: "Latest stories and announcements from The Frances Ushedo Foundation.",
    images: [DEFAULT_OG_IMAGE],
  },
};

const newsListSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: `News | ${SITE_NAME}`,
  url: `${SITE_URL}/news`,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "News", item: `${SITE_URL}/news` },
    ],
  },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsListSchema) }}
      />
      {children}
    </>
  );
}
