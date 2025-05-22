"use client";
import BlogCard from "@/components/Blogs/BlogCard";
import SponsorCard from "@/components/Sponsor/Sponsor";
import Hero from "@/components/WelcomeHero/Hero";
import { blogPosts, sponsors } from "@/constant/constant";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function Home() {
  const router = useRouter();
  return (
    <div className="">
      <Hero />

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-darckLilac mb-8">
            Our Partners
          </h2>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{
              delay: 2500,
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

    

      {/* <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-darckLilac mb-8">
            Our Sponsors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsors.map((sponsor, index) => (
              <SponsorCard key={index} {...sponsor} />
            ))}
          </div>
        </div>
      </section> */}

      <section className="bg-picture2 bg-cover h-[75vh] py-12 bg-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/80 "></div>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-start text-white px-4"
          style={{ zIndex: 999 }}
        >
          <div className="container mx-auto px-6 ">
            <div className="flex justify-between items-center">
              <div className="w-[50%]">
                <div className="">
                  <div className="mb-10">
                    <h1 className="text-4xl font-roboto font-medium">
                      Welcome to The Frances Ushedo Foundation
                    </h1>
                    <div className="w-[100px] h-1 rounded-md bg-darckLilac mt-4"></div>
                  </div>

                  <div className="mb-10">
                    <h3>
                      {" "}
                      The Frances Ushedo Foundation (TFUF) is a purpose-driven
                      family dedicated to empowering Nigerian children to
                      thrive. Founded by Amanda Ushedo in honor of her late
                      sister, Frances, who passed away from complications from
                      sickle cell disease, the foundation channels personal
                      grief into transformative action.
                    </h3>
                    {""}
                    <h3 className="mt-3">
                      The butterfly emblem symbolizes Frances’ fleeting yet
                      impactful life, inspiring TFUF’s mission to address health
                      and educational barriers for vulnerable children. Guided
                      by transparency and passion, TFUF envisions a future where
                      every child can realize their potential. Join us in
                      turning adversity into hope and building a legacy of
                      change—one child at a time.
                    </h3>

                    <p>🦋 ✨</p>
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

              <div className="w-[50%] flex justify-center items-center">
                <Image
                  src={"/Untitled-5.jpg"}
                  alt={"Logo"}
                  width={200}
                  height={200}
                  className="w-auto h-[400px] rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-darckLilac mb-8">
            Latest Blog
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
