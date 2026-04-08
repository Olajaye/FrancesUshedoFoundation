import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/apiAuth";

type Params = { params: Promise<{ id: string }> };

// PATCH /api/admin/news/:id/toggle-hidden
export async function PATCH(req: NextRequest, { params }: Params) {
  const authError = await requireAuth(req);
  if (authError) return authError;

  const { id } = await params;

  try {
    const { hidden } = await req.json();

    if (typeof hidden !== "boolean") {
      return NextResponse.json(
        { error: "Field 'hidden' must be a boolean" },
        { status: 400 },
      );
    }

    const news = await prisma.news.update({
      where: { id },
      data: { hidden },
    });

    return NextResponse.json(news);
  } catch (error) {
    console.error(`PATCH /api/admin/news/${id}/toggle-hidden:`, error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}