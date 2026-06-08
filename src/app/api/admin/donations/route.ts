import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/apiAuth";

export async function GET(req: NextRequest) {
  const authError = await requireAuth(req);
  if (authError) return authError;

  try {
    const donations = await prisma.donation.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Attach event titles for donations that have an eventId
    const eventIds = [...new Set(donations.map((d) => d.eventId).filter(Boolean))] as string[];

    let eventMap: Record<string, string> = {};
    if (eventIds.length > 0) {
      const events = await prisma.event.findMany({
        where: { id: { in: eventIds } },
        select: { id: true, title: true },
      });
      eventMap = Object.fromEntries(events.map((e) => [e.id, e.title]));
    }

    const enriched = donations.map((d) => ({
      ...d,
      eventTitle: d.eventId ? (eventMap[d.eventId] ?? null) : null,
    }));

    return NextResponse.json(enriched);
  } catch (error) {
    console.error("GET /api/admin/donations:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
