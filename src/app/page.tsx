"use client";

import SponsorCard from "@/components/Sponsor/Sponsor";
import Hero from "@/components/Hero/Hero";
import { sponsors } from "@/constant/constant"; //blogPosts,
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  return (
    <div className="">
      <Hero />

      <div className=" container mx-auto  ">
        <div className="flex justify-center items-center py-10">
          <div className="flex gap-6">
            <Card
              title="Become a Volunteer"
              text="Becoming a volunteer with TFUF brings purpose, connection, and the chance to make lasting positive change."
              icon="/junks/handIcon.png"
            />
            <Card
              title="Donate"
              text="Donating through TFUF empowers change, supports vital causes, and helps build stronger communities for a better future."
              icon="/junks/loveOnHand.png"
            />
            <Card
              title="Partner with Us"
              text="Partnering with TFUF amplifies impact, fosters collaboration, and drives meaningful change for vulnerable children in Nigeria."
              icon="/junks/Slove.png"
            />
          </div>
        </div>
      </div>

      {/*  Partners Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-darckLilac mb-8">
            Our Partners
          </h2>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            // navigation
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

            {/* Custom Navigation Arrows */}
            {/* <div className="swiper-button-prev !-left-4 lg:!-left-8 !text-darckLilac"></div> */}
            {/* <div className="swiper-button-next !-right-4 lg:!-right-8 !text-darckLilac"></div> */}
          </Swiper>
        </div>
      </section>

      <section className="bg-homeAbout bg-cover  bg-center relative h-auto ">
        {/* <div className="absolute inset-0 bg-black/20 "></div> */}
        <div
          className="flex flex-col bg-black/80 items-center py-12 justify-center text-start text-white"
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
                    <h1 className="text-4xl font-roboto font-medium">
                      Welcome to The Frances Ushedo Foundation
                    </h1>
                    <div className="w-[100px] h-1 rounded-md bg-darckLilac mt-4"></div>
                  </div>

                  <div className="mb-10">
                    <h3 className="text-base">
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
                    <button
                      onClick={() => router.push("/about")}
                      className="w-[150px] p-3 rounded-2xl bg-gradient-to-r from-darckLilac/80  to-lilac hover:bg-gradient-to-br transition-colors duration-700"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto mt-10 p-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Upcoming Events
            </h2>
            <EventCard
              image="/junks/IMG_2792.JPG"
              title="Empowering Nigeria’s Youth"
              date="Aug 25, 2025"
              location="Kano State, Nigeria"
              description="Get ready for our upcoming fundraiser to support vital health and education programs. Your generosity will help transform young lives across Nigeria."
            />
            <EventCard
              image="/junks/IMG_2792.JPG"
              title="Community Health Workshop"
              date="Aug 25, 2025"
              location="Lagos State, Nigeria"
              description="We’re planning a workshop to educate families on health practices, including sickle cell awareness. Join us to promote healthier futures for children.
"
            />
            <EventCard
              image="/junks/IMG_2792.JPG"
              title="School Outreach Program"
              date="Aug 25, 2018"
              location="Abuja, Nigeria"
              description="Our upcoming school visits will provide resources and support to students in need. Help us empower the next generation through education."
            />
          </div>
          <div className="w-full md:w-1/2">
            <FeaturedCause />
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="flex items-end justify-between py-40 p-6">
          <div className="text-center max-w-2xl">
            <h1 className="text-4xl font-semibold text-[#262626] text-left leading-snug">
              At The Frances Ushedo Foundation, we’re passionate about transforming young lives in Nigeria. In our first year, we’ve laid a strong foundation for lasting impact.
            </h1>
            <div className="mt-4">
              <hr className="border-t-2 border-darckLilac w-16" />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Through targeted health and education programs, we empower children and communities to thrive. Join us in building brighter futures across Nigeria.
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
      </div>
    </div>
  );
}

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
}) => (
  <div className="mb-6 flex space-x-3 items-center">
    <img src={image} alt={title} className="w-32 h-32 object-cover mb-2" />
    <div className="text-gray-800">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">
        {date} | {location}
      </p>
      <p className="text-sm mt-1">{description.slice(0, 90)}....</p>
      <Link  href="/news" className="text-darckLilac text-sm mt-1 inline-block">
        Read More
      </Link>
    </div>
  </div>
);

const FeaturedCause = () => (
  <div className="bg-gray-100 p-6 rounded-lg">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured Cause</h2>
    <div className="flex flex-col md:flex-row items-center">
      <img
        src="/home/tryout3.png"
        alt="Featured Cause"
        className="w-full md:w-1/2 h-[350px] object-cover mb-4 md:mb-0 md:mr-4"
      />
      <div className="w-full md:w-1/2">
        <h3 className="font-semibold text-lg">Fundraiser for Kids</h3>
        <p className="text-sm text-gray-600">
          Aug 25, 2018 | Ball Room New York
        </p>
        <p className="text-sm mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempus
          vestibulum mauris.
        </p>
        <button className="bg-darckLilac text-white px-4 py-2 rounded-full mt-4">
          Donate Now
        </button>
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Raised: $56,880</span>
            <span>Goal: $70,000</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2.5">
            <div
              className="bg-darckLilac h-2.5 rounded-full"
              style={{ width: "83%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Card = ({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon: string;
}) => {
  return (
    <div
      className={`w-[350px] h-72 rounded-2xl p-6 text-center flex flex-col justify-center items-center bg-lilac`}
    >
      <img src={icon} alt="hand" className="w-32" />
      <h3 className="text-2xl font-bold mb-2 font-montserrat">{title}</h3>
      <p className="text-sm leading-5 font-montserrat">{text}</p>
    </div>
  );
};

const StatCard = ({
  icon,
  number,
  label,
}: {
  icon: string;
  number: number | string;
  label: string;
}) => {
  return (
    <div className="text-center">
      {/* <div className="text-4xl text-orange-500 mb-2">{icon}</div>{" "} */}
      <img src={icon} alt="hand" className="w-24 h-20" />
      {/* Icon placeholder */}
      <div className="text-3xl font-bold text-gray-800">{number}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
};
