import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/apiAuth";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const authError = await requireAuth(req);
  if (authError) return authError;

  const { donationGoal, goalCurrency } = await req.json();

  if (!donationGoal || isNaN(Number(donationGoal)) || Number(donationGoal) <= 0) {
    return NextResponse.json({ error: "A valid donation goal is required" }, { status: 400 });
  }

  // Unconditionally clear every event, then set exactly this one
  await prisma.$transaction(async (tx) => {
    await tx.event.updateMany({ data: { featuredCause: false } });
    await tx.event.update({
      where: { id: params.id },
      data: { featuredCause: true, donationGoal: Number(donationGoal), goalCurrency: goalCurrency ?? "GBP" },
    });
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const authError = await requireAuth(req);
  if (authError) return authError;

  await prisma.event.update({
    where: { id: params.id },
    data: { featuredCause: false, donationGoal: null },
  });

  return NextResponse.json({ success: true });
}
