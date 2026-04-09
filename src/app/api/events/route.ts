import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEFAULT_LIMIT = 6;

// GET /api/events?page=1&limit=6
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit = Math.min(
      50,
      Math.max(1, parseInt(searchParams.get("limit") ?? String(DEFAULT_LIMIT))),
    );
    const skip = (page - 1) * limit;

    const [total, data] = await Promise.all([
      prisma.event.count(),
      prisma.event.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          category: true,
          date: true,
          time: true,
          location: true,
          featured: true,
          image: true,
          description: true,
          registrationLink: true,
          createdAt: true,
        },
      }),
    ]);

    return NextResponse.json({
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      limit,
    });
  } catch (error) {
    console.error("GET /api/events:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}