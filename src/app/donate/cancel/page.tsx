"use client";

import { XCircle } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function DonateCancelPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
        <div className="text-center space-y-6 max-w-md">
          <XCircle className="w-16 h-16 text-gray-400 mx-auto" />
          <h1 className="text-3xl font-bold text-gray-900">Payment Cancelled</h1>
          <p className="text-gray-600">
            Your payment was cancelled. No charge was made. You can try again whenever you&apos;re ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/donate"
              className="px-8 py-3 bg-darckLilac text-white rounded-lg font-medium hover:bg-darckLilac/90 transition-colors"
            >
              Try Again
            </Link>
            <Link
              href="/"
              className="px-8 py-3 border-2 border-darckLilac text-darckLilac rounded-lg font-medium hover:bg-lilac/20 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
