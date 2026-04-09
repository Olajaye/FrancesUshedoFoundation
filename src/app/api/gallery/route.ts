import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/gallery
// Returns all event galleries that have at least one photo,
// joined with the event's title and description for the public gallery page.
export async function GET() {
  try {
    const galleries = await prisma.eventGallery.findMany({
      include: {
        event: {
          select: {
            id: true,
            title: true,
            description: true,
            date: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Filter out galleries with no photos and shape the response
    const result = galleries
      .filter((g) => Array.isArray(g.photos) && (g.photos as unknown[]).length > 0)
      .map((g) => ({
        id: g.id,
        eventId: g.eventId,
        title: g.event.title,
        description: g.event.description,
        date: g.event.date,
        photos: g.photos,
        updatedAt: g.updatedAt,
      }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/gallery:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
