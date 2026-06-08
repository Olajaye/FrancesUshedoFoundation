import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

const ALLOWED_CURRENCIES = new Set(["gbp", "usd", "eur"]);

export async function POST(req: NextRequest) {
  const { name, email, amount, currency = "GBP", eventId, source } = await req.json();

  if (!name || !email || !amount || isNaN(Number(amount)) || Number(amount) < 1) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const currencyLower = String(currency).toLowerCase();
  if (!ALLOWED_CURRENCIES.has(currencyLower)) {
    return NextResponse.json({ error: "Unsupported currency" }, { status: 400 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const amountInSubunit = Math.round(Number(amount) * 100);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: currencyLower,
          product_data: {
            name: "Donation to The Frances Ushedo Foundation",
            description: `Generous donation from ${name}`,
          },
          unit_amount: amountInSubunit,
        },
        quantity: 1,
      },
    ],
    metadata: { donorName: name, donorEmail: email },
    success_url: `${appUrl}/donate/success?provider=stripe&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/donate/cancel`,
  });

  await prisma.donation.create({
    data: {
      name,
      email,
      amount: Number(amount),
      currency: currency.toUpperCase(),
      provider: "stripe",
      reference: session.id,
      status: "pending",
      ...(eventId && { eventId }),
      ...(source && { source }),
    },
  });

  return NextResponse.json({ url: session.url });
}
