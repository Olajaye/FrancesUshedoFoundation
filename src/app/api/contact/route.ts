import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const record = await prisma.message.create({
    data: { name: name.trim(), email: email.trim().toLowerCase(), message: message.trim() },
  });

  return NextResponse.json(record, { status: 201 });
}