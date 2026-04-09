import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/apiAuth";

type Params = { params: Promise<{ id: string }> };

// GET /api/admin/events/:id
export async function GET(req: NextRequest, { params }: Params) {
  const authError = await requireAuth(req);
  if (authError) return authError;

  const { id } = await params;

  try {
    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json(event);
  } catch (error) {
    console.error(`GET /api/admin/events/${id}:`, error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT /api/admin/events/:id
export async function PUT(req: NextRequest, { params }: Params) {
  const authError = await requireAuth(req);
  if (authError) return authError;

  const { id } = await params;

  try {
    const body = await req.json();
    const {
      title, category, date, time, location, featured,
      image, description, longDescription, registrationLink,
      speakers, agenda, goals, gallery,
    } = body;

    const event = await prisma.event.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(category !== undefined && { category }),
        ...(date !== undefined && { date }),
        ...(time !== undefined && { time }),
        ...(location !== undefined && { location }),
        ...(featured !== undefined && { featured }),
        ...(image !== undefined && { image }),
        ...(description !== undefined && { description }),
        ...(longDescription !== undefined && { longDescription }),
        ...(registrationLink !== undefined && { registrationLink }),
        ...(speakers !== undefined && { speakers }),
        ...(agenda !== undefined && { agenda }),
        ...(goals !== undefined && { goals }),
        ...(gallery !== undefined && { gallery }),
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error(`PUT /api/admin/events/${id}:`, error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/admin/events/:id
export async function DELETE(req: NextRequest, { params }: Params) {
  const authError = await requireAuth(req);
  if (authError) return authError;

  const { id } = await params;

  try {
    await prisma.event.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`DELETE /api/admin/events/${id}:`, error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}