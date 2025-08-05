"use client";
import { PagesHero } from "@/components/hearderCom/hearder";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const page = () => {
  return (
    <>
      {/* <section className="bg-about bg-cover h-[35vh] py-12 bg-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/80 "></div>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-start text-white px-4"
          style={{ zIndex: 999 }}
        >
          <div className="container mx-auto px-6 ">
            <div>
              <h2 className="text-6xl font-montserrat font-semibold text-start">
                About Us
              </h2>
              <div className="w-[100px] h-2 bg-darckLilac"></div>
            </div>
          </div>
        </div>
      </section> */}

      <PagesHero img={"/about/IMG_3137.jpg"} title={"About Us"} />

      <section className="container px-4 mx-auto py-6">
        <section className="h-auto ">
          {/* <div className="absolute inset-0 bg-black/20 "></div> */}
          <div
            className="flex flex-col items-center py-12 justify-center text-start text-black"
            style={{ zIndex: 9999 }}
          >
            <div className="container mx-auto">
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
                      <h1 className="md:text-4xl text-2xl font-montserrat font-medium">
                        Welcome to The Frances Ushedo Foundation
                      </h1>
                      <div className="w-[100px] h-1 rounded-md bg-darckLilac mt-4"></div>
                    </div>

                    <div className="mb-10">
                      <h3 className="text-base font-montserrat font-medium">
                        {" "}
                        At TFUF, we are more than just an organisation;
                        we&apos;re a family committed to making a difference.
                        Founded by Amanda Ushedo, driven by a deep passion for
                        helping others, we are a charity that stands on the
                        principles of transparency, genuinity, and impact. Our
                        vision is clear: a world where every child in Nigeria
                        has the support they need to unlock their full
                        potential.
                      </h3>
                      {""}
                      <h3 className="mt-3 text-base font-montserrat font-medium">
                        The foundation is named in loving memory of
                        Amanda&apos;s sister, Frances, who tragically passed
                        away from sickle cell disease at a very young age. The
                        butterfly in our logo symbolizes Frances&apos;s brief
                        yet beautiful life, reminding us of the fragility and
                        beauty of every child&apos;s journey.
                      </h3>
                      <h3 className="mt-3 text-base font-montserrat font-medium">
                        Amanda&apos;s inspiration to establish TFUF was deeply
                        personal; through some profound experiences a calling
                        within her was ignited, to support children facing
                        health and educational challenges, ensuring that no
                        child&apos;s life is overlooked or forgotten.
                      </h3>
                      <h3 className="mt-3 text-base font-montserrat font-medium">
                        Through TFUF, we strive to honor Frances&apos;s memory
                        by providing essential health and educational support to
                        babies, children, and young adults in need. Our mission
                        is to transform personal loss into collective hope,
                        creating a lasting impact on the lives of the less
                        fortunate.
                      </h3>
                      <h3 className="mt-3 text-base font-montserrat font-medium">
                        We invite you to join us on this rewarding journey.
                        Together, we can transform lives, one child at a
                        time.&quot;
                      </h3>

                      {/* <p>🦋 ✨ 🦋 ✨ 🦋 ✨ 🦋 ✨</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section className="bg-gray-800 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <ProgressCircles />
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-12">
            {/* Mission: Left column, responsive text */}
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-gray-800 mb-4 md:mb-6">
                Our Mission
              </h2>
              <p className="text-lg md:text-xl font-montserrat font-medium italic text-gray-700 leading-relaxed">
                <span className="text-darkLilac text-4xl font-bold">
                  &ldquo;
                </span>{" "}
                {/* Fixed typo, used proper quote char */}
                Dedicated to improving the lives of babies, children, and young
                adults in Nigeria, we focus on two critical areas: health and
                education. We believe that every child deserves a chance to
                thrive, and our mission is to make that a reality. Through
                targeted programs and compassionate outreach, we strive to
                create opportunities for better health, learning, and growth.
                <span className="text-darkLilac text-4xl font-bold">
                  &rdquo;
                </span>
              </p>
            </div>

            {/* Vision: Right column, matching styles */}
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-gray-800 mb-4 md:mb-6">
                Our Vision
              </h2>
              <p className="text-lg md:text-xl font-montserrat font-medium italic text-gray-700 leading-relaxed">
                <span className="text-darkLilac text-4xl font-bold">
                  &ldquo;
                </span>
                At The Frances Ushedo Foundation, we are committed to making a
                difference in the lives of children and young adults in Nigeria.
                Our mission is to empower the next generation through health and
                education initiatives that foster growth, learning, and
                well-being. We believe that every child deserves a chance to
                thrive, and we work tirelessly to create opportunities for a
                brighter future.
                <span className="text-darkLilac text-4xl font-bold">
                  &rdquo;
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;

const ProgressCircles = () => {
  const [, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3, // Lowered for earlier trigger
  });
  const progressData = [
    { percentage: 83, label: "Hard Work" },
    { percentage: 100, label: "Pure Love" },
    { percentage: 75, label: "Smart Ideas" },
    { percentage: 65, label: "Good Decisions" },
  ];

  const [counts, setCounts] = useState<number[]>(progressData.map(() => 0));

  useEffect(() => {
    if (inView) {
      const duration = 1500; // Total animation duration in ms
      const steps = 50; // Number of steps for smoother animation
      const timers = progressData.map((data, index) =>
        setInterval(() => {
          setCounts((prev) => {
            const newCounts = [...prev];
            const increment = data.percentage / steps;
            if (newCounts[index] < data.percentage) {
              newCounts[index] = Math.min(
                newCounts[index] + increment,
                data.percentage
              );
            }
            return newCounts;
          });
        }, duration / steps)
      );

      return () => timers.forEach(clearInterval);
    }
  }, [inView]);

  const circumference = 2 * Math.PI * 45; // Calculated once

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 justify-items-center">
      {" "}
      {/* Grid for better responsiveness */}
      {progressData.map((data, index) => {
        const strokeDashoffset =
          circumference - (counts[index] / 100) * circumference;

        return (
          <div key={data.label} className="text-center">
            <svg
              className="w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 mx-auto" // Responsive sizes
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#4b5563" // Gray background stroke
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#d154d6" // Lilac progress stroke
                strokeWidth="4"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                style={{ transition: "stroke-dashoffset 0.3s ease" }} // Smooth transition
              />
              <text
                x="50"
                y="50"
                textAnchor="middle"
                dy=".3em"
                className="text-white text-lg md:text-xl font-montserrat font-bold"
                fill="white"
              >
                {Math.round(counts[index])}% {/* Rounded for clean display */}
              </text>
            </svg>
            <p className="mt-4 text-white text-base md:text-lg font-montserrat font-semibold">
              {data.label}
            </p>
          </div>
        );
      })}
    </div>
  );
};
