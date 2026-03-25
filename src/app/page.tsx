"use client";

import Hero from "@/components/Hero/Hero";
import { Sponsors } from "@/constant/constant";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Link from "next/link";
import { useMemo } from "react";
import Button from "@/components/Button/button";
import { SponsorsCarousel } from "@/components/Sponsors/SponsorCar";
import { CalendarX } from "lucide-react";
import { Navbar } from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const cardsData = [
  {
    title: "Become a Volunteer",
    text: "Becoming a volunteer with TFUF brings purpose, connection, and the chance to make lasting positive change.",
    icon: "/junks/checking.png",
    href: "/contact",
  },
  {
    title: "Donate",
    text: "Donating through TFUF empowers change, supports vital causes, and helps build stronger communities for a better future.",
    icon: "/junks/handIcon.png",
    href: "/donate",
  },
  {
    title: "Partner with Us",
    text: "Partnering with TFUF amplifies impact, fosters collaboration, and drives meaningful change for vulnerable children in Nigeria.",
    icon: "/junks/icontry.png",
    href: "/contact",
  },
];

const eventsData = [
  {
    image: "/junks/IMG_2792.JPG",
    title: "Empowering Nigeria’s Youth",
    date: "Aug 25, 2026",
    location: "Kano State, Nigeria",
    description:
      "Get ready for our upcoming fundraiser to support vital health and education programs. Your generosity will help transform young lives across Nigeria.",
  },
  {
    image: "/junks/IMG_2792.JPG",
    title: "Community Health Workshop",
    date: "Aug 25, 2026",
    location: "Lagos State, Nigeria",
    description:
      "We’re planning a workshop to educate families on health practices, including sickle cell awareness. Join us to promote healthier futures for children.",
  },
  {
    image: "/junks/IMG_2792.JPG",
    title: "School Outreach Program",
    date: "Aug 25, 2026",
    location: "Abuja, Nigeria",
    description:
      "Our upcoming school visits will provide resources and support to students in need. Help us empower the next generation through education.",
  },
];

const statsData = [
  {
    icon: "/childrenSupported.jpg", //"/junks/icon11.jpg",
    number: "220+",
    label: "Children Supported",
  },
  {
    icon: "/road.jpg", //"/junks/places.png",
    number: "3",
    label: "States Reached (Lagos, Delta, Kano)",
  },
  {
    icon: "/communityReached.jpg", //"/junks/icon13.jpg",
    number: "12",
    label: "Community Initiatives Launched",
  },
];

export default function Home() {
  const router = useRouter();

  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return eventsData
      .slice(0, 2)
      .filter((event) => new Date(event.date) > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Sort by date ascending
  }, []);

  return (
    <div className="">
      <Navbar />
      <Hero />

      <section className="py-12 md:py-16 bg-[#ffffff]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {cardsData.map((card, index) => (
              <Card key={index} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-homeAbout bg-cover  bg-top relative h-auto ">
        <div
          className="flex flex-col bg-black/70 items-center py-12 justify-center text-start text-white"
          style={{ zIndex: 9999 }}
        >
          <div className="px-4 container mx-auto">
            <div className="lg:flex justify-between items-center">
              <div className="lg:w-[50%] w-[100%] flex justify-center items-center order-2 lg:order-2">
                <Image
                  src={"/home/tryout3.png"}
                  alt={"Logo"}
                  width={200}
                  height={200}
                  className="w-auto h-[400px] rounded-lg"
                />
              </div>

              <div className="lg:w-[50%] w-[100%] order-1 lg:order-1 mt-5">
                <div className="">
                  <div className="mb-10">
                    <h1 className="text-xl md:text-3xl font-montserrat font-medium">
                      Welcome to The Frances Ushedo Foundation
                    </h1>
                    <div className="w-[100px] h-1 rounded-md bg-darckLilac mt-4"></div>
                  </div>

                  <div className="mb-10">
                    <h3 className="text-base font-montserrat">
                      {" "}
                      The Frances Ushedo Foundation (TFUF) is a purpose-driven
                      family dedicated to empowering Nigerian children to
                      thrive. Founded by Amanda Ushedo in honor of her late
                      sister, Frances, who passed away from complications from
                      sickle cell disease, the foundation channels personal
                      grief into transformative action.
                    </h3>
                    {""}
                    <h3 className="mt-3 text-base">
                      The butterfly emblem symbolizes Frances’ fleeting yet
                      impactful life, inspiring TFUF’s mission to address health
                      and educational barriers for vulnerable children. Guided
                      by transparency and passion, TFUF envisions a future where
                      every child can realize their potential. Join us in
                      turning adversity into hope and building a legacy of
                      change—one child at a time.
                    </h3>
                  </div>

                  <div>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => router.push("/about")}
                    >
                      Read More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
            <div className="w-full lg:w-1/2">
              <FeaturedCause />
            </div>

            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-gray-800 mb-6 md:mb-8">
                Upcoming Events
              </h2>
              {upcomingEvents.length > 0 ? (
                <div className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <EventCard key={index} {...event} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-7">
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

      <SponsorsCarousel sponsors={Sponsors} speed={25} />

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            <div className="w-full lg:w-1/2 max-w-2xl">
              <h2 className="text-xl md:text-3xl font-montserrat font-semibold text-gray-800 leading-7 mb-4">
                At The Frances Ushedo Foundation, we’re passionate about
                transforming young lives in Nigeria. In our first year, we’ve
                laid a strong foundation for lasting impact.
              </h2>
              <div className="w-20 h-1 bg-darkLilac mb-6" />

              <p className="text-base md:text-lg font-montserrat text-gray-600 leading-relaxed">
                Through targeted health and education programs, we empower
                children and communities to thrive. Join us in building brighter
                futures across Nigeria.
              </p>
            </div>

            <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 ">
              {statsData.map((stat, index) => (
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

const Card = ({
  title,
  text,
  icon,
  href,
}: {
  title: string;
  text: string;
  icon: string;
  href?: string;
}) => {
  return (
    <Link
      href={href ?? ""}
      className="block w-full max-w-sm md:w-[360px] rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 bg-[#ecf2f5] text-black hover:text-white  hover:bg-lilac"
    >
      <div className="p-6 md:p-8 text-center flex flex-col items-center justify-center h-full">
        <Image
          src={icon}
          alt={`${title} icon`}
          width={100}
          height={100}
          className="mb-4 w-20 md:w-24"
        />
        <h3 className="text-xl md:text-2xl font-montserrat mb-2 hover:text-white ">
          {title}
        </h3>

        <p className="text-sm md:text-base font-montserrat leading-relaxed hover:text-white/90">
          {text}
        </p>
      </div>
    </Link>
  );
};

const EventCard = ({
  image,
  title,
  date,
  location,
  description,
}: {
  image: string;
  title: string;
  date: string;
  location: string;
  description: string;
}) => {
  return (
    <div className="flex items-start gap-4 bg-gray-50 rounded-lg p-4 shadow-sm transition-shadow hover:shadow-md">
      <Image
        src={image}
        alt={title}
        width={120}
        height={120}
        className="w-28 h-28 object-cover rounded-md"
      />
      <div className="flex-1">
        <h3 className="text-lg font-montserrat font-semibold text-gray-800">
          {title}
        </h3>
        <p className="text-sm font-montserrat text-gray-600 mt-1">
          {date} | {location}
        </p>
        <p className="text-sm font-montserrat text-gray-700 mt-2 line-clamp-3">
          {description}
        </p>
        <Link
          href="/event"
          className="text-darkLilac text-sm font-montserrat font-medium mt-2 inline-block hover:underline"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

interface FeaturedCauseProps {
  title?: string;
  date?: string;
  location?: string;
  description?: string;
  imageSrc?: string;
  raised?: number;
  goal?: number;
  donateHref?: string;
}

const FeaturedCause = ({
  title = "Building The Butterfly Clinic",
  date = "1 April 2026",
  location = "Delta State, Nigeria",
  description = "We are raising funds to establish The Butterfly Clinic, a dedicated healthcare centre for children aged 0–18, with priority support for sickle cell patients and families in need.",
  imageSrc = "/feture.png",
  raised = 56880,
  goal = 70000,
  donateHref = "/donate",
}: FeaturedCauseProps) => {
  const progress = Math.min(100, (raised / goal) * 100).toFixed(0); // Dynamic progress calculation

  return (
    <>
      <div className="bg-gray-100 p-4 md:p-6 rounded-xl shadow-md">
        <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-gray-800 mb-3">
          Featured Cause
        </h2>
        <div className="flex flex-col md:flex-row items-centergap-3">
          <div className="w-full md:w-1/2 h-[350px] mr-2">
            <img
              src={imageSrc}
              alt="Featured Cause"
              className="h-[350px] object-cover rounded-lg"
            />
          </div>

          <div className="w-full h-full flex-1">
            <h3 className="text-xl font-montserrat font-semibold text-gray-800 mb-2">
              {title}
            </h3>
            <p className="text-sm font-montserrat text-gray-600 mb-4">
              {date} | {location}
            </p>
            <p className="text-sm font-montserrat text-gray-700 leading-relaxed mb-6">
              {description}
            </p>
            <div className="flex justify-between">
              <Link
                href={donateHref}
                className="w-auto p-3 bg-lilac text-dark font-bold font-montserrat rounded-xl transition duration-300 hover:bg-darckLilac hover:text-white"
              >
                Donate Now
              </Link>
              <Button
                variant="outline"
                size="md"
                // onClick={() => router.push(donateHref)}
              >
                Details
              </Button>
            </div>

            <div className="mt-6">
              <div className="flex justify-between text-sm font-montserrat text-gray-600 mb-2">
                <span>Raised: ${raised.toLocaleString()}</span>{" "}
                {/* Formatted number */}
                <span>Goal: ${goal.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-darkLilac h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const StatCard = ({
  icon,
  number,
  label,
}: {
  icon: string;
  number: string;
  label: string;
}) => (
  <div className="flex flex-col items-center text-center  rounded-lg  transition-all duration-300 hover:shadow-md hover:scale-105 shadow-md shadow-lilac">
    <Image
      src={icon}
      alt={`${label} icon`}
      width={100}
      height={100}
      className=" w-full h-44 mb-3 rounded-t-lg object-cover"
    />
    <h3 className="text-xl font-montserrat font-bold text-darkLilac mb-2">
      {number}
    </h3>
    <p className="text-sm font-montserrat text-gray-700">{label}</p>
  </div>
);
