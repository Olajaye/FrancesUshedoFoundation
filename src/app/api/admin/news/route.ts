import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/apiAuth";

// GET /api/admin/news
export async function GET(req: NextRequest) {
  const authError = await requireAuth(req);
  if (authError) return authError;

  try {
    const news = await prisma.news.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(news);
  } catch (error) {
    console.error("GET /api/admin/news:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/admin/news
export async function POST(req: NextRequest) {
  const authError = await requireAuth(req);
  if (authError) return authError;

  try {
    const body = await req.json();
    const {
      title,
      excerpt,
      category,
      date,
      image = "",
      author,
      authorRole = "",
      authorImage = "",
      featured = false,
      tags = [],
      content,
      stats = [],
      gallery = [],
    } = body;

    if (!title || !excerpt || !category || !date || !author || !content) {
      return NextResponse.json(
        { error: "Missing required fields: title, excerpt, category, date, author, content" },
        { status: 400 },
      );
    }

    const news = await prisma.news.create({
      data: {
        title,
        excerpt,
        category,
        date: new Date(date),
        postedTime: new Date().toISOString(),
        image,
        author,
        authorRole,
        authorImage,
        featured,
        tags,
        content,
        stats,
        gallery,
      },
    });

    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/news:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}