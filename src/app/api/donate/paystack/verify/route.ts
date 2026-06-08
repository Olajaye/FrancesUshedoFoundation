import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const reference = req.nextUrl.searchParams.get("reference");

  if (!reference) {
    return NextResponse.json({ error: "Missing reference" }, { status: 400 });
  }

  const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
  });

  const data = await res.json();

  if (!data.status || data.data.status !== "success") {
    return NextResponse.json({ success: false, message: data.data?.gateway_response || "Payment not successful" });
  }

  await prisma.donation.updateMany({
    where: { reference },
    data: { status: "success" },
  });

  return NextResponse.json({ success: true, amount: data.data.amount / 100, currency: data.data.currency });
}
