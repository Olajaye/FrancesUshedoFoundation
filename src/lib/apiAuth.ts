import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function requireAuth(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null; // null means auth passed
}