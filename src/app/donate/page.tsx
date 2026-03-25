"use client";

import { useState } from "react";
import { CreditCard, Globe, Mail, Shield, Check } from "lucide-react";
import { Navbar } from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

interface PaymentOption {
  id: "paystack" | "stripe" | "direct";
  name: string;
  description: string;
  currency: "₦" | "£" | "Custom";
  region: string;
  icon: React.ReactNode;
}

const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: "paystack",
    name: "Pay with Naira (NG)",
    description: "Secure local payments via Paystack",
    currency: "₦",
    region: "Nigeria & Africa",
    icon: <Globe className="w-5 h-5" />,
  },
  {
    id: "stripe",
    name: "Pay in Pounds (GBP)",
    description: "International payments via Stripe",
    currency: "£",
    region: "UK & International",
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    id: "direct",
    name: "Direct Bank Transfer",
    description: "Get our account details to transfer directly",
    currency: "Custom",
    region: "Worldwide",
    icon: <Mail className="w-5 h-5" />,
  },
];

const PaymentMethodSelector = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!selectedMethod) return;

    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);

      switch (selectedMethod) {
        case "paystack":
          // Redirect to Paystack
          window.open("https://paystack.com/pay", "_blank");
          break;
        case "stripe":
          // Redirect to Stripe
          window.open("https://stripe.com/checkout", "_blank");
          break;
        case "direct":
          // Open contact modal or redirect to contact page
          window.location.href = "/contact?method=direct-transfer";
          break;
      }
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-2 py-7">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <Shield className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Select Payment Method
            </h2>
          </div>
          <p className="text-gray-600">
            Choose how you&apos;d like to complete your payment
          </p>
        </div>

        {/* Payment Options */}
        <div className="space-y-4 mb-8">
          {PAYMENT_OPTIONS.map((option) => (
            <div
              key={option.id}
              className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer hover:border-darckLilac hover:bg-lilac/50 ${
                selectedMethod === option.id
                  ? "border-darckLilac bg-lilac/20"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedMethod(option.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-lg ${
                      selectedMethod === option.id
                        ? "bg-lilac/50 text-darckLilac"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {option.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">
                        {option.name}
                      </h3>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                        {option.currency}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {option.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {option.region}
                    </p>
                  </div>
                </div>

                {/* Selection Indicator */}
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedMethod === option.id
                        ? "border-darckLilac bg-lilac"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedMethod === option.id && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Us Option */}
        <div className="mb-8">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Prefer to discuss payment options?
            </p>
            <button
              // onClick={() =>
              //   (window.location.href = "/contact?subject=payment")
              // }
              className="inline-flex items-center gap-2 px-6 py-3 text-darckLilac font-medium border-2 border-darckLilac rounded-lg hover:bg-lilac/20 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Contact Us for Assistance
            </button>
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handlePayment}
            disabled={!selectedMethod || isProcessing}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
              selectedMethod && !isProcessing
                ? "bg-darckLilac/80 hover:bg-darckLilac text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </span>
            ) : selectedMethod === "direct" ? (
              "Get Account Details"
            ) : (
              `Continue to ${selectedMethod === "paystack" ? "Paystack" : "Stripe"}`
            )}
          </button>

          {/* Security Note */}
          <div className="text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
              <Shield className="w-3 h-3" />
              All payments are secure and encrypted
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentMethodSelector;
