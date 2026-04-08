import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/apiAuth";

type Params = { params: Promise<{ id: string }> };

// GET /api/admin/news/:id
export async function GET(req: NextRequest, { params }: Params) {
  const authError = await requireAuth(req);
  if (authError) return authError;

  const { id } = await params;

  try {
    const news = await prisma.news.findUnique({ where: { id } });
    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }
    return NextResponse.json(news);
  } catch (error) {
    console.error(`GET /api/admin/news/${id}:`, error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT /api/admin/news/:id
export async function PUT(req: NextRequest, { params }: Params) {
  const authError = await requireAuth(req);
  if (authError) return authError;

  const { id } = await params;

  try {
    const body = await req.json();
    const {
      title,
      excerpt,
      category,
      date,
      image,
      author,
      authorRole,
      authorImage,
      featured,
      tags,
      content,
      stats,
      gallery,
    } = body;

    const news = await prisma.news.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(excerpt !== undefined && { excerpt }),
        ...(category !== undefined && { category }),
        ...(date !== undefined && { date: new Date(date) }),
        ...(image !== undefined && { image }),
        ...(author !== undefined && { author }),
        ...(authorRole !== undefined && { authorRole }),
        ...(authorImage !== undefined && { authorImage }),
        ...(featured !== undefined && { featured }),
        ...(tags !== undefined && { tags }),
        ...(content !== undefined && { content }),
        ...(stats !== undefined && { stats }),
        ...(gallery !== undefined && { gallery }),
      },
    });

    return NextResponse.json(news);
  } catch (error) {
    console.error(`PUT /api/admin/news/${id}:`, error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/admin/news/:id
export async function DELETE(req: NextRequest, { params }: Params) {
  const authError = await requireAuth(req);
  if (authError) return authError;

  const { id } = await params;

  try {
    await prisma.news.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`DELETE /api/admin/news/${id}:`, error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}