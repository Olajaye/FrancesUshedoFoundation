"use client";

import { useEffect, useState } from "react";
import { PagesHero } from "@/components/hearderCom/hearder";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Calendar, Clock, MapPin, Loader2, ArrowLeft } from "lucide-react";

interface Speaker {
  name: string;
  title: string;
  image: string;
}

interface AgendaItem {
  time: string;
  activity: string;
}

interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  featured: boolean;
  image: string;
  description: string;
  longDescription: string;
  registrationLink: string;
  speakers: Speaker[];
  agenda: AgendaItem[];
  goals: string[];
}

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then((r) => {
        if (r.status === 404) {
          setMissing(true);
          setLoading(false);
          return null;
        }
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => {
        if (data) {
          setEvent(data);
          setLoading(false);
        }
      })
      .catch(() => {
        setMissing(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-lilac" />
        </div>
        <Footer />
      </>
    );
  }

  if (missing || !event) return notFound();

  return (
    <>
      <Navbar />
      <PagesHero
        img={event.image || "/portfolio/picture1.jpg"}
        title={event.title}
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        {/* Back */}
        <div className="mb-8">
          <Link
            href="/event"
            className="inline-flex items-center gap-1.5 text-lilac hover:text-darkLilac transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Main content ── */}
          <div className="lg:col-span-2">
            {/* Category + badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="bg-lilac/10 text-darkLilac px-4 py-1.5 rounded-full text-sm font-medium">
                {event.category}
              </span>
              {event.featured && (
                <span className="bg-lilac text-white px-4 py-1.5 rounded-full text-sm font-medium">
                  Featured Event
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {event.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-lilac shrink-0" />
                {event.date}
              </span>
              {event.time && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-lilac shrink-0" />
                  {event.time}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-lilac shrink-0" />
                {event.location}
              </span>
            </div>

            {/* Hero image */}
            {event.image && (
              <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
              </div>
            )}

            {/* Short description */}
            {event.description && (
              <p className="text-gray-600 text-lg italic mb-6 border-l-4 border-lilac pl-4">
                {event.description}
              </p>
            )}

            {/* Full description */}
            {event.longDescription && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  About This Event
                </h2>
                <div
                  className="prose max-w-none text-gray-700 leading-relaxed overflow-x-auto break-words [&_img]:max-w-full [&_img]:h-auto [&_table]:min-w-full [&_td]:break-words [&_pre]:whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: event.longDescription }}
                />
              </div>
            )}

            {/* Agenda */}
            {event.agenda.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Event Agenda
                </h2>
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  {event.agenda.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="bg-lilac text-white rounded-lg px-4 py-2 min-w-[100px] text-center text-sm font-medium shrink-0">
                        {item.time}
                      </div>
                      <div className="flex-1 border-l-2 border-lilac pl-5 py-1.5">
                        <p className="font-medium text-gray-900">
                          {item.activity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Goals */}
            {event.goals.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Event Goals
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {event.goals.map((goal, i) => (
                    <div
                      key={i}
                      className="bg-white border border-lilac/20 rounded-xl p-6 text-center hover:shadow-md transition-shadow"
                    >
                      <div className="text-lilac text-3xl font-bold mb-3">
                        #{i + 1}
                      </div>
                      <p className="text-gray-700 text-sm">{goal}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Register card */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Join This Event
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="w-5 h-5 text-lilac shrink-0" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  {event.time && (
                    <div className="flex items-center gap-3 text-gray-600">
                      <Clock className="w-5 h-5 text-lilac shrink-0" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-lilac shrink-0" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <Link
                    href={event.registrationLink || "/donate"}
                    className="block w-full text-center px-6 py-3 bg-lilac text-white font-medium rounded-lg hover:bg-darkLilac transition-colors"
                  >
                    Register for Event
                  </Link>
                  <Link
                    href="/donate"
                    className="block w-full text-center px-6 py-3 border border-lilac text-darkLilac font-medium rounded-lg hover:bg-lilac/10 transition-colors"
                  >
                    Donate to Support
                  </Link>
                </div>
              </div>

              {/* Speakers */}
              {event.speakers.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Featured Speakers
                  </h3>
                  <div className="space-y-4">
                    {event.speakers.map((speaker, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-lilac/10 overflow-hidden shrink-0">
                          {speaker.image && (
                            <Image
                              src={speaker.image}
                              alt={speaker.name}
                              width={48}
                              height={48}
                              className="object-cover w-full h-full"
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {speaker.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {speaker.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Share This Event
                </h3>
                <div className="flex gap-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Share
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(event.title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-sky-100 text-sky-500 rounded-lg hover:bg-sky-200 transition-colors text-sm"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                    Tweet
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
