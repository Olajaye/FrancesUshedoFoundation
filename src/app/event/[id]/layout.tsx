import { cache } from "react";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";

const getEvent = cache(async (id: string) => {
  try {
    return await prisma.event.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        category: true,
        description: true,
        date: true,
        time: true,
        location: true,
        image: true,
        goals: true,
        updatedAt: true,
      },
    });
  } catch {
    return null;
  }
});

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const event = await getEvent(params.id);

  if (!event) {
    return {
      title: "Event Not Found",
      robots: { index: false },
    };
  }

  const description =
    event.description?.slice(0, 155) ||
    `Join us for ${event.title} on ${event.date} at ${event.location}.`;

  const ogImage = event.image || DEFAULT_OG_IMAGE;

  return {
    title: event.title,
    description,
    keywords: [event.title, event.category, "TFUF event", "Nigeria", event.location],
    alternates: { canonical: `${SITE_URL}/event/${event.id}` },
    openGraph: {
      title: `${event.title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/event/${event.id}`,
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630, alt: event.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
  };
}

export default async function EventDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const event = await getEvent(params.id);

  const schema = event
    ? {
        "@context": "https://schema.org",
        "@type": "Event",
        name: event.title,
        description: event.description,
        startDate: event.date,
        location: {
          "@type": "Place",
          name: event.location,
          address: event.location,
        },
        organizer: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        image: event.image || DEFAULT_OG_IMAGE,
        url: `${SITE_URL}/event/${event.id}`,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Events", item: `${SITE_URL}/event` },
            { "@type": "ListItem", position: 3, name: event.title, item: `${SITE_URL}/event/${event.id}` },
          ],
        },
      }
    : null;

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      {children}
    </>
  );
}
