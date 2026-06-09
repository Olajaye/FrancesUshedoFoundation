import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEFAULT_LIMIT = 8;

// GET /api/gallery?page=1&limit=8
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const page  = Math.max(1, parseInt(searchParams.get("page")  ?? "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") ?? String(DEFAULT_LIMIT))));
    const skip  = (page - 1) * limit;

    // Fetch all galleries with photos so we can count after filtering
    const all = await prisma.eventGallery.findMany({
      include: {
        event: { select: { id: true, title: true, description: true, date: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    const withPhotos = all.filter(
      (g) => Array.isArray(g.photos) && (g.photos as unknown[]).length > 0,
    );

    const total      = withPhotos.length;
    const totalPages = Math.ceil(total / limit);
    const paged      = withPhotos.slice(skip, skip + limit);

    const data = paged.map((g) => ({
      id:          g.id,
      eventId:     g.eventId,
      title:       g.event.title,
      description: g.event.description,
      date:        g.event.date,
      photos:      g.photos,
      updatedAt:   g.updatedAt,
    }));

    return NextResponse.json({ data, total, page, totalPages, limit });
  } catch (error) {
    console.error("GET /api/gallery:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
