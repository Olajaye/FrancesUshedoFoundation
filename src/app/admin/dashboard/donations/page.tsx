"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Loader2,
  Search,
  CreditCard,
  Globe,
  TrendingUp,
  DollarSign,
  CalendarDays,
  ImageIcon,
  Link2,
  ChevronDown,
  ChevronUp,
  X,
  ExternalLink,
  Mail,
  Hash,
  MapPin,
  Clock,
  Calendar,
  User,
  CheckCircle2,
} from "lucide-react";

interface Donation {
  id: string;
  name: string;
  email: string;
  amount: number;
  currency: string;
  provider: "stripe" | "paystack";
  reference: string;
  status: "pending" | "success" | "failed";
  eventId: string | null;
  eventTitle: string | null;
  source: string | null;
  createdAt: string;
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  NGN: "₦",
  GHS: "GH₵",
  ZAR: "R",
  KES: "KSh",
  USD: "$",
  EGP: "E£",
  GBP: "£",
  EUR: "€",
};

function fmt(amount: number, currency: string) {
  const sym = CURRENCY_SYMBOLS[currency] ?? currency;
  return `${sym}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function StatusBadge({ status }: { status: Donation["status"] }) {
  const map = {
    success: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    failed: "bg-red-100 text-red-600",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${map[status]}`}
    >
      {status}
    </span>
  );
}

function ProviderBadge({ provider }: { provider: Donation["provider"] }) {
  return provider === "stripe" ? (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-600">
      <CreditCard className="w-3 h-3" /> Stripe
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
      <Globe className="w-3 h-3" /> Paystack
    </span>
  );
}

function SourceBadge({ source }: { source: string | null }) {
  if (!source) return <span className="text-gray-400 text-xs">—</span>;
  const map: Record<
    string,
    { icon: React.ReactNode; label: string; cls: string }
  > = {
    event: {
      icon: <CalendarDays className="w-3 h-3" />,
      label: "Event",
      cls: "bg-purple-50 text-purple-600",
    },
    gallery: {
      icon: <ImageIcon className="w-3 h-3" />,
      label: "Gallery",
      cls: "bg-pink-50 text-pink-600",
    },
    direct: {
      icon: <Link2 className="w-3 h-3" />,
      label: "Direct",
      cls: "bg-gray-100 text-gray-600",
    },
  };
  const cfg = map[source] ?? {
    icon: null,
    label: source,
    cls: "bg-gray-100 text-gray-500",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cfg.cls}`}
    >
      {cfg.icon}
      {cfg.label}
    </span>
  );
}

type SortKey = "createdAt" | "amount" | "name";

// ─── Event detail (fetched on demand) ────────────────────────────────────────

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

// ─── Donation detail drawer ───────────────────────────────────────────────────

function DonationDetailDrawer({
  donation,
  onClose,
}: {
  donation: Donation;
  onClose: () => void;
}) {
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loadingEvent, setLoadingEvent] = useState(false);

  useEffect(() => {
    if (!donation.eventId) return;
    setLoadingEvent(true);
    fetch(`/api/admin/events/${donation.eventId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setEvent(data))
      .catch(() => {})
      .finally(() => setLoadingEvent(false));
  }, [donation.eventId]);

  const sym = CURRENCY_SYMBOLS[donation.currency] ?? donation.currency;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <h2 className="text-base font-bold text-gray-900">
            Donation Details
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
          {/* Status banner */}
          <div
            className={`rounded-xl px-4 py-3 flex items-center gap-3 ${
              donation.status === "success"
                ? "bg-green-50 border border-green-200"
                : donation.status === "pending"
                  ? "bg-yellow-50 border border-yellow-200"
                  : "bg-red-50 border border-red-200"
            }`}
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                donation.status === "success"
                  ? "bg-green-100"
                  : donation.status === "pending"
                    ? "bg-yellow-100"
                    : "bg-red-100"
              }`}
            >
              {donation.status === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <DollarSign
                  className={`w-5 h-5 ${donation.status === "pending" ? "text-yellow-600" : "text-red-500"}`}
                />
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">
                {sym}
                {donation.amount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}{" "}
                {donation.currency}
              </p>
              <p
                className={`text-xs font-medium capitalize ${
                  donation.status === "success"
                    ? "text-green-700"
                    : donation.status === "pending"
                      ? "text-yellow-700"
                      : "text-red-600"
                }`}
              >
                {donation.status}
              </p>
            </div>
            <div className="ml-auto">
              <ProviderBadge provider={donation.provider} />
            </div>
          </div>

          {/* Donor info */}
          <section>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Donor
            </p>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="text-sm font-medium text-gray-800">
                  {donation.name}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                <a
                  href={`mailto:${donation.email}`}
                  className="text-sm text-darckLilac hover:underline"
                >
                  {donation.email}
                </a>
              </div>
            </div>
          </section>

          {/* Transaction */}
          <section>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Transaction
            </p>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Reference</span>
                <span className="flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs font-mono text-gray-700 break-all text-right max-w-[200px]">
                    {donation.reference}
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Provider</span>
                <ProviderBadge provider={donation.provider} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Status</span>
                <StatusBadge status={donation.status} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Source</span>
                <SourceBadge source={donation.source} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Date</span>
                <span className="text-xs text-gray-700">
                  {new Date(donation.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  {new Date(donation.createdAt).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </section>

          {/* Event */}
          {donation.eventId && (
            <section>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Event Donated To
              </p>
              {loadingEvent ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-5 h-5 animate-spin text-lilac" />
                </div>
              ) : event ? (
                <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                  {/* Event image */}
                  {event.image ? (
                    <div className="relative w-full h-40">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2.5 py-0.5 rounded-full">
                          {event.category}
                        </span>
                        <p className="text-white font-semibold text-sm mt-1 line-clamp-1">
                          {event.title}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-24 bg-lilac/10 flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-lilac/40" />
                    </div>
                  )}

                  <div className="p-4 space-y-3">
                    {!event.image && (
                      <>
                        <span className="bg-lilac/10 text-darckLilac text-xs px-2.5 py-0.5 rounded-full font-medium">
                          {event.category}
                        </span>
                        <p className="text-sm font-semibold text-gray-900">
                          {event.title}
                        </p>
                      </>
                    )}

                    <div className="space-y-1.5 text-xs text-gray-500">
                      {event.date && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          {event.date}
                        </div>
                      )}
                      {event.time && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 shrink-0" />
                          {event.time}
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          {event.location}
                        </div>
                      )}
                    </div>

                    {event.description && (
                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                        {event.description}
                      </p>
                    )}

                    {Array.isArray(event.goals) && event.goals.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1.5">
                          Goals
                        </p>
                        <ul className="space-y-1">
                          {event.goals.slice(0, 3).map((g, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-1.5 text-xs text-gray-600"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                              {g}
                            </li>
                          ))}
                          {event.goals.length > 3 && (
                            <li className="text-xs text-gray-400 pl-5">
                              +{event.goals.length - 3} more
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                    <a
                      href={`/event/${event.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-darckLilac hover:underline"
                    >
                      View event page <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-4 text-center text-xs text-gray-400">
                  {donation.eventTitle ?? "Event details unavailable"}
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState<Donation | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "success" | "pending" | "failed"
  >("all");
  const [providerFilter, setProviderFilter] = useState<
    "all" | "stripe" | "paystack"
  >("all");
  const [sourceFilter, setSourceFilter] = useState<
    "all" | "event" | "gallery" | "direct"
  >("all");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortAsc, setSortAsc] = useState(false);

  useEffect(() => {
    fetch("/api/admin/donations")
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(setDonations)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const filtered = donations
    .filter((d) => {
      if (statusFilter !== "all" && d.status !== statusFilter) return false;
      if (providerFilter !== "all" && d.provider !== providerFilter)
        return false;
      if (sourceFilter !== "all" && d.source !== sourceFilter) return false;
      const q = search.toLowerCase();
      return (
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.email.toLowerCase().includes(q) ||
        (d.eventTitle ?? "").toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      let cmp = 0;
      if (sortKey === "createdAt")
        cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      else if (sortKey === "amount") cmp = a.amount - b.amount;
      else cmp = a.name.localeCompare(b.name);
      return sortAsc ? cmp : -cmp;
    });

  const successful = donations.filter((d) => d.status === "success");
  const totalByProvider = {
    stripe: successful.filter((d) => d.provider === "stripe"),
    paystack: successful.filter((d) => d.provider === "paystack"),
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc((v) => !v);
    else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  const SortIcon = ({ k }: { k: SortKey }) =>
    sortKey === k ? (
      sortAsc ? (
        <ChevronUp className="w-3.5 h-3.5 inline ml-1" />
      ) : (
        <ChevronDown className="w-3.5 h-3.5 inline ml-1" />
      )
    ) : (
      <span className="w-3.5 h-3.5 inline-block ml-1 opacity-0" />
    );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-lilac" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Failed to load donations.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Donations</h1>
          <p className="text-sm text-gray-500 mt-1">
            {successful.length} successful · {donations.length} total
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-lilac/20 shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Successful</p>
                <p className="text-xl font-bold text-gray-900">
                  {successful.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-lilac/20 shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-yellow-50 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Pending</p>
                <p className="text-xl font-bold text-gray-900">
                  {donations.filter((d) => d.status === "pending").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-lilac/20 shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Stripe</p>
                <p className="text-xl font-bold text-gray-900">
                  {totalByProvider.stripe.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-lilac/20 shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                <Globe className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Paystack</p>
                <p className="text-xl font-bold text-gray-900">
                  {totalByProvider.paystack.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-lilac/20 shadow-sm p-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email or event…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-lilac"
            />
          </div>

          <div className="flex flex-wrap gap-3 text-xs font-medium">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-gray-500">Status:</span>
              {(["all", "success", "pending", "failed"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${statusFilter === f ? "bg-lilac text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-gray-500">Provider:</span>
              {(["all", "stripe", "paystack"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setProviderFilter(f)}
                  className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${providerFilter === f ? "bg-lilac text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-gray-500">Source:</span>
              {(["all", "event", "gallery", "direct"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setSourceFilter(f)}
                  className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${sourceFilter === f ? "bg-lilac text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-lilac/20 shadow-sm overflow-hidden">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
              <DollarSign className="w-10 h-10 opacity-30" />
              <p className="text-sm">No donations found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                    <th
                      className="px-4 py-3 text-left cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort("name")}
                    >
                      Donor <SortIcon k="name" />
                    </th>
                    <th
                      className="px-4 py-3 text-left cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort("amount")}
                    >
                      Amount <SortIcon k="amount" />
                    </th>
                    <th className="px-4 py-3 text-left">Provider</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Source / Event</th>
                    <th
                      className="px-4 py-3 text-left cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort("createdAt")}
                    >
                      Date <SortIcon k="createdAt" />
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((d) => (
                    <tr
                      key={d.id}
                      onClick={() => setSelected(d)}
                      className="hover:bg-lilac/5 transition-colors cursor-pointer"
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{d.name}</p>
                        <p className="text-xs text-gray-400">{d.email}</p>
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-900">
                        {fmt(d.amount, d.currency)}
                        <span className="text-xs text-gray-400 ml-1">
                          {d.currency}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <ProviderBadge provider={d.provider} />
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={d.status} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1">
                          <SourceBadge source={d.source} />
                          {d.eventTitle && (
                            <p
                              className="text-xs text-gray-500 truncate max-w-[180px]"
                              title={d.eventTitle}
                            >
                              {d.eventTitle}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                        {new Date(d.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                        <br />
                        {new Date(d.createdAt).toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {filtered.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
              Showing {filtered.length} of {donations.length} donations
            </div>
          )}
        </div>
      </div>
      {selected && (
        <DonationDetailDrawer
          donation={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
