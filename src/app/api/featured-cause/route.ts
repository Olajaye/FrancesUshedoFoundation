import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const event = await prisma.event.findFirst({
    where: { featuredCause: true },
    select: {
      id: true,
      title: true,
      date: true,
      location: true,
      description: true,
      image: true,
      donationGoal: true,
      goalCurrency: true,
    },
  });

  if (!event) {
    return NextResponse.json(null);
  }

  const agg = await prisma.donation.aggregate({
    where: {
      eventId: event.id,
      currency: event.goalCurrency ?? "GBP",
      status: "success",
    },
    _sum: { amount: true },
  });

  return NextResponse.json({
    ...event,
    raised: agg._sum.amount ?? 0,
  });
}
