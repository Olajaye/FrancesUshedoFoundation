import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/apiAuth";

// GET /api/admin/events
export async function GET(req: NextRequest) {
  const authError = await requireAuth(req);
  if (authError) return authError;

  try {
    const events = await prisma.event.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(events);
  } catch (error) {
    console.error("GET /api/admin/events:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/admin/events
export async function POST(req: NextRequest) {
  const authError = await requireAuth(req);
  if (authError) return authError;

  try {
    const body = await req.json();
    const {
      title,
      category,
      date,
      time,
      location,
      featured = false,
      image = "",
      description,
      longDescription,
      registrationLink = "/donate",
      speakers = [],
      agenda = [],
      goals = [],
    } = body;

    if (!title || !category || !date || !time || !location || !description || !longDescription) {
      return NextResponse.json(
        { error: "Missing required fields: title, category, date, time, location, description, longDescription" },
        { status: 400 },
      );
    }

    const event = await prisma.event.create({
      data: {
        title,
        category,
        date,
        time,
        location,
        featured,
        image,
        description,
        longDescription,
        registrationLink,
        speakers,
        agenda,
        goals,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/events:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}