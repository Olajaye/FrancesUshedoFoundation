import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with The Frances Ushedo Foundation. Reach out to volunteer, partner, or learn more about our work empowering Nigerian children.",
  keywords: ["contact TFUF", "Frances Ushedo Foundation contact", "volunteer Nigeria", "charity partnership"],
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: `Contact Us | ${SITE_NAME}`,
    description: "Reach out to TFUF — volunteer, partner, or ask us anything about our work in Nigeria.",
    url: `${SITE_URL}/contact`,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: `Contact ${SITE_NAME}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact Us | ${SITE_NAME}`,
    description: "Reach out to TFUF — volunteer, partner, or ask us anything.",
    images: [DEFAULT_OG_IMAGE],
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact | ${SITE_NAME}`,
  url: `${SITE_URL}/contact`,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
    ],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      {children}
    </>
  );
}
