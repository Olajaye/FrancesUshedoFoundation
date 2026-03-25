import React from "react";
import { PagesHero } from "@/components/hearderCom/hearder";
import Link from "next/link";
import { eventData } from "@/constant/constant";
import { Navbar } from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Image from "next/image";

const page = () => {
  return (
    <>
      <Navbar />
      <PagesHero img={"/portfolio/picture1.jpg"} title={"Event"} />

      <section className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="flex flex-col space-y-12 md:space-y-16">
          <div className="flex flex-col lg:flex-row justify-start space-y-8 lg:space-y-0 lg:space-x-8">
            <main className="flex-1">
              <EventCalendar />
            </main>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default page;

const EventCalendar = () => {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-darkLilac mb-4">
          Foundation Events
        </h1>
        <p className="text-gray-600">
          Join us in our mission to make a difference in the community. Register
          for upcoming events below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {eventData.map((event) => (
          <div
            key={event.id}
            className={`bg-white rounded-xl shadow-lg overflow-hidden border min-h-[320px] ${
              event.featured ? "border-lilac border-2" : "border-gray-100"
            }`}
          >
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-2/5 relative h-40 md:h-auto">
                <Image
                  width={100}
                  height={100}
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:w-3/5 p-2 md:p-3 flex flex-col">
                <div className="flex flex-wrap items-center text-xs md:text-sm text-gray-500 mb-3 gap-2">
                  <span className="bg-lilac/10 text-darkLilac px-3 py-1 rounded-full">
                    {event.category}
                  </span>
                  <span className="hidden md:inline">•</span>
                  <span className="flex items-center gap-1">
                    📅 {event.date}
                  </span>
                  <span className="hidden md:inline">•</span>
                  <span className="flex items-center gap-1">
                    ⏰ {event.time}
                  </span>
                  <span className="hidden md:inline">•</span>
                  <span className="flex items-center gap-1">
                    📍 {event.location}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {event.title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6 line-clamp-3 flex-grow">
                  {event.description}
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap items-center justify-end gap-2 md:gap-3 mt-auto">
                  <Link
                    href={event.registrationLink}
                    className="px-4 py-2 md:px-6 md:py-3 bg-lilac text-white font-medium rounded-lg hover:bg-darkLilac transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-lilac focus:ring-offset-2 text-sm md:text-base flex-1 md:flex-none text-center"
                  >
                    Donate
                  </Link>
                  <Link
                    href={`/event/${event.id}`}
                    className="px-4 py-2 md:px-6 md:py-3 border border-lilac text-darkLilac font-medium rounded-lg hover:bg-lilac/10 transition-colors duration-300 text-sm md:text-base flex-1 md:flex-none text-center"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
