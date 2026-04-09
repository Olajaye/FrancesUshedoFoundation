import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/apiAuth";

type Params = { params: Promise<{ id: string }> };

// GET /api/admin/events/:id/gallery
export async function GET(req: NextRequest, { params }: Params) {
  const authError = await requireAuth(req);
  if (authError) return authError;

  const { id } = await params;

  try {
    const gallery = await prisma.eventGallery.findUnique({
      where: { eventId: id },
    });

    // Return empty photos array if no gallery exists yet
    return NextResponse.json(gallery ?? { eventId: id, photos: [] });
  } catch (error) {
    console.error(`GET /api/admin/events/${id}/gallery:`, error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT /api/admin/events/:id/gallery
export async function PUT(req: NextRequest, { params }: Params) {
  const authError = await requireAuth(req);
  if (authError) return authError;

  const { id } = await params;

  try {
    const { photos } = await req.json();

    if (!Array.isArray(photos)) {
      return NextResponse.json({ error: "photos must be an array" }, { status: 400 });
    }

    // Verify event exists
    const event = await prisma.event.findUnique({ where: { id }, select: { id: true } });
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const gallery = await prisma.eventGallery.upsert({
      where: { eventId: id },
      create: { eventId: id, photos },
      update: { photos },
    });

    return NextResponse.json(gallery);
  } catch (error) {
    console.error(`PUT /api/admin/events/${id}/gallery:`, error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/admin/events/:id/gallery
export async function DELETE(req: NextRequest, { params }: Params) {
  const authError = await requireAuth(req);
  if (authError) return authError;

  const { id } = await params;

  try {
    await prisma.eventGallery.delete({ where: { eventId: id } });
    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 204 }); // already gone
  }
}
