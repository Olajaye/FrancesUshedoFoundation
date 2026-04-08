import Image from "next/image";
import Link from "next/link";
import { CalendarX } from "lucide-react";

import Hero from "@/components/Hero/Hero";
import { Navbar } from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { SponsorsCarousel } from "@/components/Sponsors/SponsorCar";
import HomeCard from "@/components/HomeCard/HomeCard";
import EventCard from "@/components/EventCard/EventCard";
import StatCard from "@/components/StatCard/StatCard";
import FeaturedCause from "@/components/FeaturedCause/FeaturedCause";

import {
  Sponsors,
  homeCards,
  homeEvents,
  homeStats,
  featuredCause,
} from "@/constant/constant";

export default function Home() {
  const now = new Date();
  const upcomingEvents = homeEvents
    .filter((event) => new Date(event.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 2);

  return (
    <div>
      <Navbar />
      <Hero />

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {homeCards.map((card, index) => (
              <HomeCard key={index} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-homeAbout bg-cover bg-top">
        <div className="bg-black/70 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 text-white">
              <div className="w-full lg:w-1/2 order-2 lg:order-1">
                <h2 className="text-xl md:text-3xl font-montserrat font-medium mb-4">
                  Welcome to The Frances Ushedo Foundation
                </h2>
                <div className="w-24 h-1 rounded-md bg-darckLilac mb-6" />
                <div className="space-y-4 mb-8">
                  <p className="text-sm md:text-base font-montserrat leading-relaxed">
                    The Frances Ushedo Foundation (TFUF) is a purpose-driven
                    family dedicated to empowering Nigerian children to thrive.
                    Founded by Amanda Ushedo in honor of her late sister,
                    Frances, who passed away from complications from sickle cell
                    disease, the foundation channels personal grief into
                    transformative action.
                  </p>
                  <p className="text-sm md:text-base font-montserrat leading-relaxed">
                    The butterfly emblem symbolizes Frances&apos; fleeting yet
                    impactful life, inspiring TFUF&apos;s mission to address
                    health and educational barriers for vulnerable children.
                    Guided by transparency and passion, TFUF envisions a future
                    where every child can realize their potential.
                  </p>
                </div>
                <Link
                  href="/about"
                  className="inline-block px-5 py-2.5 bg-lilac text-white font-semibold font-montserrat rounded-lg transition-all duration-300 hover:bg-darkLilac"
                >
                  Read More
                </Link>
              </div>

              <div className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2">
                <Image
                  src="/home/tryout3.png"
                  alt="TFUF"
                  width={300}
                  height={400}
                  className="w-auto h-64 md:h-96 rounded-lg object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cause & Upcoming Events */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/2">
              <FeaturedCause {...featuredCause} />
            </div>

            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-gray-800 mb-6">
                Upcoming Events
              </h2>

              {upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <EventCard key={index} {...event} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-10">
                  <div className="bg-lilac/10 p-4 rounded-full mb-4">
                    <CalendarX className="w-8 h-8 text-lilac" />
                  </div>
                  <h3 className="text-lg font-semibold font-montserrat text-dark mb-2">
                    No Upcoming Events
                  </h3>
                  <p className="text-gray-600 font-montserrat max-w-md">
                    There are currently no scheduled events. Please check back
                    soon for updates and upcoming activities.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <SponsorsCarousel sponsors={Sponsors} speed={25} />

      {/* Stats */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="w-full lg:w-1/2 max-w-2xl">
              <h2 className="text-xl md:text-3xl font-montserrat font-semibold text-gray-800 leading-snug mb-4">
                At The Frances Ushedo Foundation, we&apos;re passionate about
                transforming young lives in Nigeria. In our first year,
                we&apos;ve laid a strong foundation for lasting impact.
              </h2>
              <div className="w-20 h-1 bg-darkLilac mb-6" />
              <p className="text-base md:text-lg font-montserrat text-gray-600 leading-relaxed">
                Through targeted health and education programs, we empower
                children and communities to thrive. Join us in building brighter
                futures across Nigeria.
              </p>
            </div>

            <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {homeStats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
