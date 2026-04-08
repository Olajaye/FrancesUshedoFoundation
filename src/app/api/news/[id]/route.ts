import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

// GET /api/news/:id
export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;

  try {
    const news = await prisma.news.findUnique({
      where: { id, hidden: false },
    });

    if (!news) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(news);
  } catch (error) {
    console.error(`GET /api/news/${id}:`, error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
