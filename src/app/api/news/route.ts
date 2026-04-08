import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEFAULT_LIMIT = 6;

// GET /api/news?page=1&limit=6
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit = Math.min(
      50,
      Math.max(1, parseInt(searchParams.get("limit") ?? String(DEFAULT_LIMIT))),
    );
    const skip = (page - 1) * limit;

    const where = { hidden: false };

    const [total, data] = await Promise.all([
      prisma.news.count({ where }),
      prisma.news.findMany({
        where,
        orderBy: { date: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          excerpt: true,
          category: true,
          date: true,
          postedTime: true,
          image: true,
          author: true,
          authorRole: true,
          authorImage: true,
          featured: true,
          tags: true,
          createdAt: true,
          updatedAt: true,
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
    console.error("GET /api/news:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}