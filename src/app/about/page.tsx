"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const page = () => {
  return (
    <>
      <section className="bg-about bg-cover h-[45vh] py-12 bg-top relative overflow-hidden">
        <div className="absolute inset-0 bg-black/80 "></div>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-start text-white px-4"
          style={{ zIndex: 999 }}
        >
          <div className="container mx-auto px-6 ">
            <div>
              <h2 className="text-6xl font-serif text-start">About Us</h2>
              <div className="w-[100px] h-2 bg-darckLilac"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 mx-auto py-12">
        <section className="h-auto ">
          {/* <div className="absolute inset-0 bg-black/20 "></div> */}
          <div
            className="flex flex-col items-center py-12 justify-center text-start text-black"
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
                        impactful life, inspiring TFUF’s mission to address
                        health and educational barriers for vulnerable children.
                        Guided by transparency and passion, TFUF envisions a
                        future where every child can realize their potential.
                        Join us in turning adversity into hope and building a
                        legacy of change—one child at a time.
                      </h3>

                      <p>🦋 ✨</p>
                    </div>

                    <div>
                      {/* <button className="w-[150px] p-3 rounded-2xl bg-gradient-to-r from-darckLilac/80  to-lilac hover:bg-gradient-to-br transition-colors duration-700">
                        Read More
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      <div className="bg-gray-800 flex items-center justify-center p-6">
        <ProgressCircles />
      </div>

      <div className="bg-darckLilac flex items-center justify-center p-6">
        <div className="text-center text-white max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="mb-6">
            At The Frances Ushedo Foundation, our mission is to empower
            vulnerable children in Nigeria by providing access to healthcare,
            education, and opportunities for personal growth. We believe that
            every child deserves a chance to thrive, and we are committed to
            making a lasting impact in their lives.
          </p>
          <p>
            Join us in our journey to create brighter futures for the next
            generation. Together, we can make a difference!
          </p>
        </div>
      </div>
    </>
  );
};

export default page;

const ProgressCircles = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger animation once when in view
    threshold: 0.5, // Trigger when 50% of the component is visible
  });

  const progressData = [
    { percentage: 83, label: "Hard Work" },
    { percentage: 100, label: "Pure Love" },
    { percentage: 75, label: "Smart Ideas" },
    { percentage: 65, label: "Good Decisions" },
  ];

  const [counts, setCounts] = useState(progressData.map(() => 0));

  useEffect(() => {
    if (inView) {
      const timers = progressData.map((data, index) =>
        setInterval(() => {
          setCounts((prevCounts) => {
            const newCounts = [...prevCounts];
            if (newCounts[index] < data.percentage) {
              newCounts[index] += 1;
            }
            return newCounts;
          });
        }, 20)
      );

      return () => timers.forEach((timer) => clearInterval(timer));
    }
  }, [inView]);

  const circleStyle = (percentage: string | number) => ({
    background: `conic-gradient(#d154d6 ${percentage}%, #4b5563 0)`,
  });

  return (
    <div ref={ref} className="flex justify-around w-full max-w-4xl">
      {progressData.map((data, index) => (
        <div key={index} className="text-center">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center bg-gray-700"
            style={circleStyle((counts[index] / 100) * 360)}
          >
            <span className="text-white text-2xl font-bold">
              {counts[index]}%
            </span>
          </div>
          <p className="mt-4 text-white text-sm">{data.label}</p>
        </div>
      ))}
    </div>
  );
};
