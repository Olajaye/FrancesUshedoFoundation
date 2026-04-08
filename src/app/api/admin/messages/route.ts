import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/apiAuth";

export async function GET(req: NextRequest) {
  const authError = await requireAuth(req);
  if (authError) return authError;

  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(messages);
}