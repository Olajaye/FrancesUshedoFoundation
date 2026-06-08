"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  CreditCard,
  Globe,
  Mail,
  Shield,
  Check,
  Loader2,
  ChevronDown,
  Calendar,
  Clock,
  MapPin,
  ImageIcon,
  ArrowLeft,
} from "lucide-react";
import { Navbar } from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

// ─── types ────────────────────────────────────────────────────────────────────

type Provider = "paystack" | "stripe" | "direct";
type PaystackCurrency = "NGN" | "GHS" | "ZAR" | "KES" | "USD" | "EGP";
type StripeCurrency = "GBP" | "USD" | "EUR";

interface CurrencyOption {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  presets: number[];
}

interface EventDetail {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  image: string;
  description: string;
  goals: string[];
}

// ─── currency config ──────────────────────────────────────────────────────────

const PAYSTACK_CURRENCIES: CurrencyOption[] = [
  {
    code: "NGN",
    name: "Nigerian Naira",
    symbol: "₦",
    flag: "🇳🇬",
    presets: [500, 1000, 5000, 10000, 50000],
  },
  {
    code: "GHS",
    name: "Ghanaian Cedi",
    symbol: "GH₵",
    flag: "🇬🇭",
    presets: [10, 50, 100, 500, 1000],
  },
  {
    code: "ZAR",
    name: "South African Rand",
    symbol: "R",
    flag: "🇿🇦",
    presets: [50, 100, 250, 500, 1000],
  },
  // { code: "KES", name: "Kenyan Shilling",   symbol: "KSh", flag: "🇰🇪", presets: [500, 1000, 2500, 5000, 10000] },
  // { code: "USD", name: "US Dollar",         symbol: "$",   flag: "🇺🇸", presets: [5, 10, 25, 50, 100] },
  // { code: "EGP", name: "Egyptian Pound",    symbol: "E£",  flag: "🇪🇬", presets: [50, 100, 250, 500, 1000] },
];

const STRIPE_CURRENCIES: CurrencyOption[] = [
  {
    code: "GBP",
    name: "British Pound",
    symbol: "£",
    flag: "🇬🇧",
    presets: [5, 10, 25, 50, 100],
  },
  {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    flag: "🇺🇸",
    presets: [5, 10, 25, 50, 100],
  },
  {
    code: "EUR",
    name: "Euro",
    symbol: "€",
    flag: "🇪🇺",
    presets: [5, 10, 25, 50, 100],
  },
];

// ─── sub-components ───────────────────────────────────────────────────────────

function CurrencyDropdown({
  currencies,
  selected,
  open,
  onToggle,
  onSelect,
}: {
  currencies: CurrencyOption[];
  selected: CurrencyOption;
  open: boolean;
  onToggle: () => void;
  onSelect: (code: string) => void;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-2.5 border-2 border-gray-200 rounded-lg hover:border-darckLilac focus:border-darckLilac focus:outline-none text-sm bg-white"
      >
        <span className="flex items-center gap-2">
          <span>{selected.flag}</span>
          <span className="font-medium">{selected.code}</span>
          <span className="text-gray-500">— {selected.name}</span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute z-20 top-full mt-1 w-full bg-white border-2 border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {currencies.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => onSelect(c.code)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-lilac/20 transition-colors ${
                selected.code === c.code
                  ? "bg-lilac/10 text-darckLilac font-medium"
                  : "text-gray-700"
              }`}
            >
              <span>{c.flag}</span>
              <span className="font-medium w-10">{c.code}</span>
              <span className="text-gray-500">{c.name}</span>
              <span className="ml-auto text-gray-400">{c.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function EventPanel({
  event,
  source,
}: {
  event: EventDetail;
  source?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-lilac/20 shadow-sm overflow-hidden lg:sticky lg:top-24">
      {/* Cover image */}
      <div className="relative h-52 bg-gray-100">
        {event.image ? (
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 480px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-gray-300" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <span className="inline-block bg-lilac text-white text-xs font-semibold px-2.5 py-1 rounded-full mb-1">
            {source === "gallery" ? "Gallery" : event.category}
          </span>
          <h2 className="text-white font-bold text-lg leading-tight line-clamp-2">
            {event.title}
          </h2>
        </div>
      </div>

      {/* Details */}
      <div className="p-5 space-y-4">
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-lilac shrink-0" />
            <span>{event.date}</span>
          </div>
          {event.time && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-lilac shrink-0" />
              <span>{event.time}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-lilac shrink-0" />
            <span>{event.location}</span>
          </div>
        </div>

        {event.description && (
          <p className="text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
            {event.description}
          </p>
        )}

        {event.goals.length > 0 && (
          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Event Goals
            </p>
            <ul className="space-y-1.5">
              {event.goals.slice(0, 3).map((g, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <span className="mt-0.5 w-4 h-4 rounded-full bg-lilac/20 text-darckLilac flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  {g}
                </li>
              ))}
            </ul>
          </div>
        )}

        <Link
          href={`/event/${event.id}`}
          className="flex items-center gap-1.5 text-xs text-darckLilac hover:underline pt-1"
        >
          <ArrowLeft className="w-3 h-3" /> View full event details
        </Link>
      </div>
    </div>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function DonatePage() {
  const params = useSearchParams();
  const eventId = params.get("eventId") ?? undefined;
  const source = params.get("source") ?? undefined;

  const [event, setEvent] = useState<EventDetail | null>(null);
  const [eventLoading, setEventLoading] = useState(!!eventId);

  const [provider, setProvider] = useState<Provider | null>(null);
  const [paystackCurrency, setPaystackCurrency] =
    useState<PaystackCurrency>("NGN");
  const [stripeCurrency, setStripeCurrency] = useState<StripeCurrency>("GBP");
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!eventId) return;
    fetch(`/api/events/${eventId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setEvent(data);
      })
      .finally(() => setEventLoading(false));
  }, [eventId]);

  const activeCurrencies =
    provider === "stripe" ? STRIPE_CURRENCIES : PAYSTACK_CURRENCIES;
  const selectedCurrency =
    provider === "stripe"
      ? STRIPE_CURRENCIES.find((c) => c.code === stripeCurrency)!
      : PAYSTACK_CURRENCIES.find((c) => c.code === paystackCurrency)!;

  const presets =
    provider === "stripe" || provider === "paystack"
      ? (selectedCurrency?.presets ?? [])
      : [];
  const symbol = selectedCurrency?.symbol ?? "";
  const finalAmount = customAmount || amount;

  const handlePreset = (val: number) => {
    setAmount(String(val));
    setCustomAmount("");
  };
  const handleCustom = (val: string) => {
    setCustomAmount(val);
    setAmount("");
  };
  const handleCurrencySelect = (code: string) => {
    if (provider === "stripe") setStripeCurrency(code as StripeCurrency);
    else setPaystackCurrency(code as PaystackCurrency);
    setCurrencyOpen(false);
    setAmount("");
    setCustomAmount("");
  };

  const handleSubmit = async () => {
    setError("");
    if (provider === "direct") {
      window.location.href = "/contact?method=direct-transfer";
      return;
    }
    if (!name.trim() || !email.trim() || !finalAmount) {
      setError("Please fill in all fields.");
      return;
    }
    setIsProcessing(true);
    try {
      const endpoint =
        provider === "stripe" ? "/api/donate/stripe" : "/api/donate/paystack";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          amount: Number(finalAmount),
          currency: provider === "stripe" ? stripeCurrency : paystackCurrency,
          ...(eventId && { eventId }),
          ...(source && { source }),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const stepOffset = provider === "paystack" || provider === "stripe" ? 1 : 0;
  const hasEvent = !!eventId;

  const form = (
    <div className="space-y-6">
      {/* Step 1 — Payment Method */}
      <div className="space-y-3">
        <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
          1. Choose Payment Method
        </h2>
        {(
          [
            {
              id: "paystack",
              name: "Pay via Paystack",
              description: "Multiple African currencies",
              region: "Nigeria, Ghana, SA & more",
              icon: <Globe className="w-5 h-5" />,
            },
            {
              id: "stripe",
              name: "Pay via Stripe",
              description: "GBP · USD · EUR",
              region: "UK & International",
              icon: <CreditCard className="w-5 h-5" />,
            },
            {
              id: "direct",
              name: "Direct Bank Transfer",
              description: "Get account details to transfer",
              region: "Worldwide",
              icon: <Mail className="w-5 h-5" />,
            },
          ] as {
            id: Provider;
            name: string;
            description: string;
            region: string;
            icon: React.ReactNode;
          }[]
        ).map((opt) => (
          <div
            key={opt.id}
            onClick={() => {
              setProvider(opt.id);
              setAmount("");
              setCustomAmount("");
              setCurrencyOpen(false);
            }}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-darckLilac hover:bg-lilac/50 ${
              provider === opt.id
                ? "border-darckLilac bg-lilac/20"
                : "border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${provider === opt.id ? "bg-lilac/50 text-darckLilac" : "bg-gray-100 text-gray-600"}`}
                >
                  {opt.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {opt.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {opt.description} · {opt.region}
                  </p>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${provider === opt.id ? "border-darckLilac bg-darckLilac" : "border-gray-300"}`}
              >
                {provider === opt.id && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Step 2 — Currency */}
      {(provider === "paystack" || provider === "stripe") && (
        <div className="space-y-3">
          <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
            2. Choose Currency
          </h2>
          <CurrencyDropdown
            currencies={activeCurrencies}
            selected={selectedCurrency}
            open={currencyOpen}
            onToggle={() => setCurrencyOpen((o) => !o)}
            onSelect={handleCurrencySelect}
          />
        </div>
      )}

      {/* Step 3 — Amount */}
      {(provider === "paystack" || provider === "stripe") && (
        <div className="space-y-3">
          <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
            3. Choose Amount
          </h2>
          <div className="grid grid-cols-5 gap-2">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => handlePreset(p)}
                className={`py-2 rounded-lg text-sm font-medium border-2 transition-colors ${
                  amount === String(p) && !customAmount
                    ? "border-darckLilac bg-lilac/20 text-darckLilac"
                    : "border-gray-200 text-gray-700 hover:border-darckLilac"
                }`}
              >
                {symbol}
                {p.toLocaleString()}
              </button>
            ))}
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm">
              {symbol}
            </span>
            <input
              type="number"
              min="1"
              placeholder="Other amount"
              value={customAmount}
              onChange={(e) => handleCustom(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-darckLilac focus:outline-none text-sm"
            />
          </div>
        </div>
      )}

      {/* Step 4 — Donor Details */}
      {provider && provider !== "direct" && (
        <div className="space-y-3">
          <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
            {stepOffset + 3}. Your Details
          </h2>
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-darckLilac focus:outline-none text-sm"
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-darckLilac focus:outline-none text-sm"
          />
        </div>
      )}

      {error && <p className="text-sm text-red-600 text-center">{error}</p>}

      {/* CTA */}
      <div className="space-y-3">
        <button
          onClick={handleSubmit}
          disabled={!provider || isProcessing}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
            provider && !isProcessing
              ? "bg-darckLilac/80 hover:bg-darckLilac text-white"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Processing…
            </>
          ) : provider === "direct" ? (
            "Get Account Details"
          ) : provider ? (
            `Continue to ${provider === "paystack" ? "Paystack" : "Stripe"}`
          ) : (
            "Select a payment method"
          )}
        </button>

        <div className="text-center">
          <button
            onClick={() => (window.location.href = "/contact?subject=payment")}
            className="inline-flex items-center gap-2 text-sm text-darckLilac hover:underline"
          >
            <Mail className="w-4 h-4" /> Need help? Contact us
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
          <Shield className="w-3 h-3" /> All payments are secure and encrypted
        </p>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        {/* Page header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <Shield className="w-6 h-6 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Make a Donation
            </h1>
          </div>
          <p className="text-gray-500 text-sm">
            Your generosity helps us change lives
          </p>
        </div>

        {hasEvent ? (
          /* Two-column layout when event context is present */
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left — event details */}
            <div>
              {eventLoading ? (
                <div className="bg-white rounded-2xl border border-lilac/20 shadow-sm h-64 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-lilac" />
                </div>
              ) : event ? (
                <EventPanel event={event} source={source} />
              ) : (
                /* Graceful fallback if fetch failed */
                <div className="bg-lilac/10 border border-lilac/30 rounded-2xl p-6 text-sm text-darckLilac">
                  <p className="font-medium">Supporting a foundation event</p>
                  <p className="text-gray-500 text-xs mt-1">
                    Your donation will directly support our programmes.
                  </p>
                </div>
              )}
            </div>

            {/* Right — donation form */}
            <div className="bg-white rounded-2xl border border-lilac/20 shadow-sm p-6">
              {form}
            </div>
          </div>
        ) : (
          /* Single-column layout for general donations */
          <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-lilac/20 shadow-sm p-6">
            {form}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
