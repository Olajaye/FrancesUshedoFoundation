import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL,                  lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE_URL}/about`,       lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/contact`,     lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/donate`,      lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/gallery`,     lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${SITE_URL}/event`,       lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_URL}/news`,        lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
  ];

  let eventRoutes: MetadataRoute.Sitemap = [];
  try {
    const events = await prisma.event.findMany({
      select: { id: true, updatedAt: true },
      orderBy: { createdAt: "desc" },
    });
    eventRoutes = events.map((e) => ({
      url: `${SITE_URL}/event/${e.id}`,
      lastModified: e.updatedAt,
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch {
    // DB unavailable — skip dynamic event routes
  }

  let newsRoutes: MetadataRoute.Sitemap = [];
  try {
    const articles = await prisma.news.findMany({
      where: { hidden: false },
      select: { id: true, updatedAt: true },
      orderBy: { date: "desc" },
    });
    newsRoutes = articles.map((a) => ({
      url: `${SITE_URL}/news/${a.id}`,
      lastModified: a.updatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    // DB unavailable — skip dynamic news routes
  }

  return [...staticRoutes, ...eventRoutes, ...newsRoutes];
}
