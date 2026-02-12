"use client";
import { PagesHero } from "@/components/hearderCom/hearder";
import { eventData } from "@/constant/constant";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import React from "react";

const EventDetailPage = () => {
  const { id } = useParams();

  const event = eventData.find((e) => e.id === (id as string));
  console.log(event);

  if (!event) {
    notFound();
  }
  return (
    <>
      <PagesHero img={event.image} title={event.title} />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="">
          {/* Back to Events Link */}
          <div className="mb-8">
            <Link
              href="/event"
              className="inline-flex items-center text-lilac hover:text-darkLilac transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Events
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Event Header */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="bg-lilac/10 text-darkLilac px-4 py-2 rounded-full font-medium">
                    {event.category}
                  </span>
                  <div className="flex items-center text-gray-600">
                    <span className="flex items-center mr-4">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {event.date}
                    </span>
                    <span className="flex items-center mr-4">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {event.time}
                    </span>
                    <span className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {event.location}
                    </span>
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {event.title}
                </h1>

                {event.featured && (
                  <div className="inline-flex items-center bg-lilac text-white px-4 py-2 rounded-lg mb-6">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Featured Event
                  </div>
                )}
              </div>

              {/* Event Image */}
              <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Event Description */}
              <div className="prose max-w-none mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  About This Event
                </h2>
                <div className="text-gray-700 whitespace-pre-line">
                  {event.longDescription}
                </div>
              </div>

              {/* Event Agenda */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Event Agenda
                </h2>
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="space-y-4">
                    {event.agenda.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-lilac text-white rounded-lg px-4 py-2 min-w-[100px] text-center mr-4">
                          {item.time}
                        </div>
                        <div className="flex-1 border-l-2 border-lilac pl-6 py-2">
                          <h3 className="font-medium text-gray-900">
                            {item.activity}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Event Goals */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Event Goals
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {event.goals.map((goal, index) => (
                    <div
                      key={index}
                      className="bg-white border border-lilac/20 rounded-lg p-6 text-center"
                    >
                      <div className="text-lilac text-3xl font-bold mb-2">
                        #{index + 1}
                      </div>
                      <p className="text-gray-700">{goal}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Register Card */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Join This Event
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-3 text-lilac"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{event.time}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-3 text-lilac"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>{event.date}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-3 text-lilac"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className="mt-8 space-y-3">
                    <Link
                      href={event.registrationLink}
                      className="block w-full text-center px-6 py-3 bg-lilac text-white font-medium rounded-lg hover:bg-darkLilac transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-lilac focus:ring-offset-2"
                    >
                      Register for Event
                    </Link>
                    <Link
                      href={event.registrationLink}
                      className="block w-full text-center px-6 py-3 border border-lilac text-darkLilac font-medium rounded-lg hover:bg-lilac/10 transition-colors duration-300"
                    >
                      Donate to Support
                    </Link>
                  </div>
                </div>

                {/* Speakers */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Featured Speakers
                  </h3>
                  <div className="space-y-4">
                    {event.speakers.map((speaker, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                          {speaker.image && (
                            <Image
                              src={speaker.image}
                              alt={speaker.name}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {speaker.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {speaker.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Share Event */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Share This Event
                  </h3>
                  <div className="flex space-x-3">
                    <button className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Share
                    </button>
                    <button className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-400 rounded-lg hover:bg-blue-100 transition-colors">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                      Tweet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Events */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Other Events You Might Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eventData
                .filter((e) => e.id !== event.id)
                .slice(0, 2)
                .map((relatedEvent) => (
                  <Link
                    key={relatedEvent.id}
                    href={`/event/${relatedEvent.id}`}
                    className="group"
                  >
                    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
                      <div className="flex items-center mb-3">
                        <span className="bg-lilac/10 text-darkLilac px-3 py-1 rounded-full text-sm">
                          {relatedEvent.category}
                        </span>
                        <span className="ml-auto text-sm text-gray-600">
                          {relatedEvent.date}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 group-hover:text-lilac transition-colors">
                        {relatedEvent.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                        {relatedEvent.description}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventDetailPage;
