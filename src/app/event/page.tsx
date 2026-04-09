"use client";

import { useState, useEffect } from "react";
import { PagesHero } from "@/components/hearderCom/hearder";
import Link from "next/link";
import { Navbar } from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Calendar,
  Clock,
  MapPin,
} from "lucide-react";

interface EventSummary {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  featured: boolean;
  image: string;
  description: string;
  registrationLink: string;
}

interface PaginatedResponse {
  data: EventSummary[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

const LIMIT = 6;

export default function EventsPage() {
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<PaginatedResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(`/api/events?page=${page}&limit=${LIMIT}`)
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json();
      })
      .then((data) => {
        setResult(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [page]);

  const events = result?.data ?? [];
  const totalPages = result?.totalPages ?? 1;

  return (
    <>
      <Navbar />
      <PagesHero img="/portfolio/picture1.jpg" title="Events" />

      <section className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-darkLilac mb-3">
            Foundation Events
          </h1>
          <p className="text-gray-600">
            Join us in our mission to make a difference in the community.
            Register for upcoming events below.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-lilac" />
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-gray-500 mb-4">Failed to load events.</p>
            <button
              onClick={() => setPage(1)}
              className="px-4 py-2 bg-lilac text-white rounded-lg text-sm hover:bg-darkLilac transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && events.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Calendar className="w-12 h-12 text-lilac/40 mb-4" />
            <p className="text-gray-500">
              No events scheduled at the moment. Check back soon.
            </p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && events.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {events.map((event) => (
                <div
                  key={event.id}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden border min-h-[280px] flex flex-col md:flex-row transition-shadow hover:shadow-xl ${
                    event.featured ? "border-lilac border-2" : "border-gray-100"
                  }`}
                >
                  {/* Image */}
                  <div className="md:w-2/5 relative h-48 md:h-auto shrink-0 bg-gray-100">
                    {event.image ? (
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 240px"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Calendar className="w-10 h-10 text-gray-300" />
                      </div>
                    )}
                    {event.featured && (
                      <span className="absolute top-3 left-3 bg-lilac text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 md:p-5 flex flex-col">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="bg-lilac/10 text-darkLilac px-3 py-0.5 rounded-full text-xs font-medium">
                        {event.category}
                      </span>
                    </div>

                    <h2 className="text-base md:text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                      {event.title}
                    </h2>

                    <div className="flex flex-col gap-1 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-lilac shrink-0" />
                        {event.date}
                      </span>
                      {event.time && (
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-lilac shrink-0" />
                          {event.time}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-lilac shrink-0" />
                        {event.location}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm line-clamp-2 flex-grow mb-2 ">
                      {event.description}
                    </p>

                    <div className="flex items-center gap-2 mt-auto">
                      <Link
                        href={event.registrationLink || "/donate"}
                        className="flex-1 text-center px-4 py-2 bg-lilac text-white text-sm font-medium rounded-lg hover:bg-darkLilac transition-colors"
                      >
                        Donate
                      </Link>
                      <Link
                        href={`/event/${event.id}`}
                        className="flex-1 text-center px-4 py-2 border border-lilac text-darkLilac text-sm font-medium rounded-lg hover:bg-lilac/10 transition-colors"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-lilac/10 hover:border-lilac/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (n) => {
                    const near =
                      n === 1 || n === totalPages || Math.abs(n - page) <= 1;
                    const ellipsisBefore = n === page - 2 && n > 2;
                    const ellipsisAfter = n === page + 2 && n < totalPages - 1;

                    if (ellipsisBefore || ellipsisAfter) {
                      return (
                        <span key={n} className="px-1 text-gray-400 text-sm">
                          …
                        </span>
                      );
                    }
                    if (!near) return null;

                    return (
                      <button
                        key={n}
                        onClick={() => setPage(n)}
                        className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                          n === page
                            ? "bg-lilac text-white"
                            : "border border-gray-200 text-gray-600 hover:bg-lilac/10 hover:border-lilac/30"
                        }`}
                      >
                        {n}
                      </button>
                    );
                  },
                )}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-lilac/10 hover:border-lilac/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Results summary */}
            <p className="text-center text-xs text-gray-400 mt-4">
              Showing {(page - 1) * LIMIT + 1}–
              {Math.min(page * LIMIT, result?.total ?? 0)} of {result?.total}{" "}
              event{result?.total !== 1 ? "s" : ""}
            </p>
          </>
        )}
      </section>

      <Footer />
    </>
  );
}
