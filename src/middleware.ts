import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Dashboard auth guard ───────────────────────────────────────────────────
  if (pathname.startsWith("/admin/dashboard")) {
    const token = req.cookies.get("admin_token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    try {
      const payload = await verifyToken(token);
      if (!payload) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  const response = NextResponse.next();

  // ── Prevent search engines from indexing admin and API routes ──────────────
  if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  // ── Prevent indexing of payment-flow pages ─────────────────────────────────
  if (pathname.startsWith("/donate/success") || pathname.startsWith("/donate/cancel")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/:path*",
    "/donate/success",
    "/donate/cancel",
  ],
};
