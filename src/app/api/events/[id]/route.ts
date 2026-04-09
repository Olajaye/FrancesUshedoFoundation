import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

// GET /api/events/:id
export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;

  try {
    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json(event);
  } catch (error) {
    console.error(`GET /api/events/${id}:`, error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}