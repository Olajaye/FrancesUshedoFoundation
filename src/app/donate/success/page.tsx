"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const CURRENCY_SYMBOLS: Record<string, string> = {
  NGN: "₦", GHS: "GH₵", ZAR: "R", KES: "KSh", USD: "$", EGP: "E£", GBP: "£", EUR: "€",
};

export default function DonateSuccessPage() {
  const params = useSearchParams();
  const provider = params.get("provider");
  const reference = params.get("reference");
  const [currency, setCurrency] = useState<string>(provider === "stripe" ? "GBP" : "NGN");

  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [amount, setAmount] = useState<number | null>(null);

  const currencySymbol = CURRENCY_SYMBOLS[currency] ?? currency;

  useEffect(() => {
    if (provider === "paystack" && reference) {
      fetch(`/api/donate/paystack/verify?reference=${reference}`)
        .then((r) => r.json())
        .then((d) => {
          setStatus(d.success ? "success" : "failed");
          if (d.success) { setAmount(d.amount); setCurrency(d.currency ?? "NGN"); }
        })
        .catch(() => setStatus("failed"));
    } else if (provider === "stripe") {
      // Stripe session confirmed by redirect — webhook updates DB async
      setStatus("success");
    } else {
      setStatus("failed");
    }
  }, [provider, reference]);

  return (
    <>
      <Navbar />
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
        {status === "loading" && (
          <div className="text-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-darckLilac mx-auto" />
            <p className="text-gray-600">Verifying your payment…</p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center space-y-6 max-w-md">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h1 className="text-3xl font-bold text-gray-900">Thank You!</h1>
            <p className="text-gray-600">
              Your donation{amount ? ` of ${currencySymbol}${amount.toLocaleString()}` : ""} was received successfully.
              The Frances Ushedo Foundation is grateful for your generosity.
            </p>
            <Link
              href="/"
              className="inline-block mt-4 px-8 py-3 bg-darckLilac text-white rounded-lg font-medium hover:bg-darckLilac/90 transition-colors"
            >
              Return Home
            </Link>
          </div>
        )}

        {status === "failed" && (
          <div className="text-center space-y-6 max-w-md">
            <XCircle className="w-16 h-16 text-red-500 mx-auto" />
            <h1 className="text-3xl font-bold text-gray-900">Payment Unsuccessful</h1>
            <p className="text-gray-600">
              We could not confirm your payment. Please try again or contact us for assistance.
            </p>
            <Link
              href="/donate"
              className="inline-block mt-4 px-8 py-3 bg-darckLilac text-white rounded-lg font-medium hover:bg-darckLilac/90 transition-colors"
            >
              Try Again
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
