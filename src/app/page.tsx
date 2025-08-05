"use client";

// import SponsorCard from "@/components/Sponsor/Sponsor";
import Hero from "@/components/Hero/Hero";
import { Sponsors } from "@/constant/constant"; //blogPosts,  sponsors
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Link from "next/link";
import { useMemo } from "react";
import Button from "@/components/Button/button";
import { SponsorsCarousel } from "@/components/Sponsors/SponsorCar";

const cardsData = [
  {
    title: "Become a Volunteer",
    text: "Becoming a volunteer with TFUF brings purpose, connection, and the chance to make lasting positive change.",
    icon: "/junks/handIcon.png",
    href: "/volunteer",
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
    icon: "/junks/handIcon.png",
    href: "/partner",
  },
];

const eventsData = [
  {
    image: "/junks/IMG_2792.JPG", // Placeholder; recommend unique images per event
    title: "Empowering Nigeria’s Youth",
    date: "Aug 25, 2025",
    location: "Kano State, Nigeria",
    description:
      "Get ready for our upcoming fundraiser to support vital health and education programs. Your generosity will help transform young lives across Nigeria.",
  },
  {
    image: "/junks/IMG_2792.JPG",
    title: "Community Health Workshop",
    date: "Aug 25, 2025",
    location: "Lagos State, Nigeria",
    description:
      "We’re planning a workshop to educate families on health practices, including sickle cell awareness. Join us to promote healthier futures for children.",
  },
  {
    image: "/junks/IMG_2792.JPG",
    title: "School Outreach Program",
    date: "Aug 25, 2025", // Changed 2018 to 2025 assuming typo; otherwise, it would be filtered out
    location: "Abuja, Nigeria",
    description:
      "Our upcoming school visits will provide resources and support to students in need. Help us empower the next generation through education.",
  },
];
const statsData = [
  {
    icon: "/junks/icon11.jpg", // Updated path for organization
    number: "120k",
    label: "Children Helped",
  },
  {
    icon: "/junks/icon12.jpg",
    number: "79",
    label: "Water Wells",
  },
  {
    icon: "/junks/icon13.jpg",
    number: "253",
    label: "Volunteers",
  },
];
export default function Home() {
  const router = useRouter();
  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return eventsData
      .filter((event) => new Date(event.date) > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Sort by date ascending
  }, []);
  return (
    <div className="">
      <Hero />

      {/* Cards */}
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
        {/* <div className="absolute inset-0 bg-black/20 "></div> */}
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
                    <h1 className="text-4xl font-montserrat font-medium">
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

                    {/* <p>🦋 ✨</p> */}
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

      {/* Upcoming Even */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-gray-800 mb-6 md:mb-8">
                Upcoming Events
              </h2>
              {upcomingEvents.length > 0 ? (
                <div className="space-y-6">
                  {upcomingEvents.map((event, index) => (
                    <EventCard key={index} {...event} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 font-montserrat">
                  No upcoming events at the moment. Check back soon!
                </p>
              )}
            </div>

            <div className="w-full md:w-1/2">
              <FeaturedCause />
            </div>
          </div>
        </div>
      </section>

      {/*  Partners Section */}
      {/* <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-darckLilac mb-8">
            Our Partners
          </h2>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            speed={800}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="relative group px-4 py-8"
          >
            {sponsors.map((sponsor, index) => (
              <SwiperSlide key={index}>
                <SponsorCard {...sponsor} />
              </SwiperSlide>
            ))}

         
          </Swiper>
        </div>
      </section> */}

      <SponsorsCarousel
        sponsors={Sponsors}
        speed={25} // Slower for professionalism
        direction="left"
      />

      {/* <div className="container mx-auto">
        <div className="flex items-end justify-between py-40 p-6">
          <div className="text-center max-w-2xl">
            <h1 className="text-4xl font-semibold text-[#262626] text-left leading-snug">
              At The Frances Ushedo Foundation, we’re passionate about
              transforming young lives in Nigeria. In our first year, we’ve laid
              a strong foundation for lasting impact.
            </h1>
            <div className="mt-4">
              <hr className="border-t-2 border-darckLilac w-16" />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Through targeted health and education programs, we empower
              children and communities to thrive. Join us in building brighter
              futures across Nigeria.
            </p>
          </div>
          <div className="flex justify-center gap-8">
            <StatCard
              icon="/junks/handIcon.png" // Placeholder, replace with actual icon
              number="120k"
              label="Children Helped"
            />
            <StatCard
              icon="/junks/loveOnHand.png" // Placeholder, replace with actual icon
              number="79"
              label="Water Wells"
            />
            <StatCard
              icon="/junks/Slove.png" // Placeholder, replace with actual icon
              number="253"
              label="Volunteers"
            />
          </div>
        </div>
      </div> */}
      <section className="py-16 md:py-24 bg-white">
        {" "}
        {/* Wrapped in section, reduced padding for balance */}
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            {/* Text Content: Left-aligned, responsive text sizes */}
            <div className="w-full lg:w-1/2 max-w-2xl">
              <h2 className="text-xl md:text-3xl font-montserrat font-semibold text-gray-800 leading-7 mb-4">
                {" "}
                {/* Changed to h2 for semantics */}
                At The Frances Ushedo Foundation, we’re passionate about
                transforming young lives in Nigeria. In our first year, we’ve
                laid a strong foundation for lasting impact.
              </h2>
              <div className="w-20 h-1 bg-darkLilac mb-6" />{" "}
              {/* Fixed typo, increased width */}
              <p className="text-base md:text-lg font-montserrat text-gray-600 leading-relaxed">
                Through targeted health and education programs, we empower
                children and communities to thrive. Join us in building brighter
                futures across Nigeria.
              </p>
            </div>

            {/* Stats: Grid for better mobile stacking, with hover effects */}
            <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
              {statsData.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>
          </div>
        </div>
      </section>
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
      className="block w-full max-w-sm md:w-[360px] rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 bg-[#ecf2f5] text-black hover:text-white  hover:bg-lilac" // Made clickable, added hover effects for engagement
    >
      <div className="p-6 md:p-8 text-center flex flex-col items-center justify-center h-full">
        <Image
          src={icon}
          alt={`${title} icon`} // Dynamic alt for accessibility
          width={100} // Optimized size
          height={100}
          className="mb-4 w-20 md:w-24" // Responsive size
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
      {" "}
      {/* Added card styling for elevation */}
      <Image
        src={image}
        alt={title}
        width={120}
        height={120}
        className="w-28 h-28 object-cover rounded-md" // Rounded for modern look
      />
      <div className="flex-1">
        <h3 className="text-lg font-montserrat font-semibold text-gray-800">
          {title}
        </h3>
        <p className="text-sm font-montserrat text-gray-600 mt-1">
          {date} | {location}
        </p>
        <p className="text-sm font-montserrat text-gray-700 mt-2 line-clamp-3">
          {" "}
          {/* Used line-clamp for better truncation */}
          {description}
        </p>
        <Link
          href="/news"
          className="text-darkLilac text-sm font-montserrat font-medium mt-2 inline-block hover:underline"
        >
          {" "}
          {/* Fixed typo, added hover */}
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
  title = "Fundraiser for Kids",
  date = "Aug 25, 2025", // Updated to future date based on current context
  location = "Ball Room New York",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempus vestibulum mauris.",
  imageSrc = "/home/tryout3.png",
  raised = 56880,
  goal = 70000,
  donateHref = "/donate",
}: FeaturedCauseProps) => {
  const progress = Math.min(100, (raised / goal) * 100).toFixed(0); // Dynamic progress calculation
  const router = useRouter();
  return (
    <div className="bg-gray-100 p-6 md:p-8 rounded-xl shadow-md">
      {" "}
      {/* Increased padding, rounded-xl for softer look */}
      <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-gray-800 mb-6">
        Featured Cause
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* <Image
          src={"/home/tryout3.png"}
          alt={`${title} image`} 
          width={400}
          height={350}
          
          className="w-full md:w-1/2 h-[250px] md:h-[350px] object-cover rounded-lg"
        /> */}
        <img
          src={imageSrc}
          alt="Featured Cause"
          className="w-full md:w-1/2 h-[350px] object-cover rounded-lg mb-4 md:mb-0 md:mr-4"
        />

        <div className="w-full md:w-1/2">
          <h3 className="text-xl font-montserrat font-semibold text-gray-800 mb-2">
            {title}
          </h3>
          <p className="text-sm font-montserrat text-gray-600 mb-4">
            {date} | {location}
          </p>
          <p className="text-sm font-montserrat text-gray-700 leading-relaxed mb-6">
            {description}
          </p>
          {/* <Link
            href={donateHref}
            className="inline-block bg-darkLilac text-white px-6 py-3 rounded-full font-montserrat font-medium transition duration-300 hover:bg-lilac hover:shadow-md" // Fixed typo, added hover
          >
            Donate Now
          </Link> */}
          <Button
            variant="outline"
            size="md"
            onClick={() => router.push(donateHref)} // Dynamic routing
          >
            Donate Now
          </Button>
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
  <div className="flex flex-col items-center text-center  rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105">
    {" "}
    {/* Added card styling */}
    <Image
      src={icon}
      alt={`${label} icon`} // Dynamic alt
      width={100}
      height={100}
      className="mb-1 w-12 h-12 md:w-44 md:h-44"
    />
    <h3 className="text-xl font-montserrat font-bold text-darkLilac mb-2">
      {number}
    </h3>
    <p className="text-sm font-montserrat text-gray-700">{label}</p>
  </div>
);
