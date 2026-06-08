import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse the TFUF photo gallery — moments from our events, outreach programmes, and community impact across Nigeria.",
  keywords: ["TFUF gallery", "Frances Ushedo Foundation photos", "Nigeria charity events", "outreach Nigeria photos"],
  alternates: { canonical: `${SITE_URL}/gallery` },
  openGraph: {
    title: `Gallery | ${SITE_NAME}`,
    description: "Photos from TFUF events, outreach programmes, and community impact across Nigeria.",
    url: `${SITE_URL}/gallery`,
    type: "website",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: `${SITE_NAME} Gallery` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Gallery | ${SITE_NAME}`,
    description: "Photos from TFUF events and outreach programmes across Nigeria.",
    images: [DEFAULT_OG_IMAGE],
  },
};

const gallerySchema = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: `Gallery | ${SITE_NAME}`,
  url: `${SITE_URL}/gallery`,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Gallery", item: `${SITE_URL}/gallery` },
    ],
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }}
      />
      {children}
    </>
  );
}
