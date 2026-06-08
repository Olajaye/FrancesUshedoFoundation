import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ALLOWED_CURRENCIES = new Set(["NGN", "GHS", "ZAR", "KES", "USD", "EGP"]);

export async function POST(req: NextRequest) {
  const { name, email, amount, currency = "NGN", eventId, source } = await req.json();

  if (!name || !email || !amount || isNaN(Number(amount)) || Number(amount) < 1) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  if (!ALLOWED_CURRENCIES.has(currency)) {
    return NextResponse.json({ error: "Unsupported currency" }, { status: 400 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  // Paystack always expects the smallest currency unit (kobo, pesewas, cents, etc.)
  const amountInSubunit = Math.round(Number(amount) * 100);

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount: amountInSubunit,
      currency,
      callback_url: `${appUrl}/donate/success?provider=paystack`,
      metadata: {
        donorName: name,
        custom_fields: [{ display_name: "Donor Name", variable_name: "donor_name", value: name }],
      },
    }),
  });

  const data = await res.json();

  if (!data.status) {
    return NextResponse.json({ error: data.message || "Paystack initialization failed" }, { status: 502 });
  }

  await prisma.donation.create({
    data: {
      name,
      email,
      amount: Number(amount),
      currency,
      provider: "paystack",
      reference: data.data.reference,
      status: "pending",
      ...(eventId && { eventId }),
      ...(source && { source }),
    },
  });

  return NextResponse.json({ url: data.data.authorization_url, reference: data.data.reference });
}
