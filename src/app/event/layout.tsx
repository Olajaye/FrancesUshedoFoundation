import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Explore upcoming and past events organised by The Frances Ushedo Foundation — fundraisers, health outreach, workshops, and community programmes across Nigeria.",
  keywords: [
    "TFUF events",
    "Frances Ushedo Foundation events",
    "Nigeria charity events",
    "fundraising events Nigeria",
    "community outreach Nigeria",
  ],
  alternates: { canonical: `${SITE_URL}/event` },
  openGraph: {
    title: `Events | ${SITE_NAME}`,
    description: "Upcoming and past TFUF events — fundraisers, health outreach, and community programmes.",
    url: `${SITE_URL}/event`,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: `${SITE_NAME} Events` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Events | ${SITE_NAME}`,
    description: "Upcoming TFUF events — fundraisers, health outreach, and community programmes.",
    images: [DEFAULT_OG_IMAGE],
  },
};

const eventsSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: `Events | ${SITE_NAME}`,
  url: `${SITE_URL}/event`,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Events", item: `${SITE_URL}/event` },
    ],
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsSchema) }}
      />
      {children}
    </>
  );
}
