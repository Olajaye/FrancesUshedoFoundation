import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/apiAuth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = await requireAuth(req);
  if (authError) return authError;

  const { id } = params;
  const body = await req.json();

  const message = await prisma.message.update({
    where: { id },
    data: { read: body.read },
  });

  return NextResponse.json(message);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = await requireAuth(req);
  if (authError) return authError;

  const { id } = params;
  await prisma.message.delete({ where: { id } });

  return new NextResponse(null, { status: 204 });
}
