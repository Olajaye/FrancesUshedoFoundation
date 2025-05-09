import React from "react";
import { Navbar } from "../Navbar/Navbar";
// import { Typewriter } from "@/hooks/typewriter";
import { DualTypewriter } from "@/hooks/DualTypewriter";

type Props = {
  className?: string;
};

const Hero = ({ className }: Props) => {
  return (
    <main
      className={`${className} bg-hero bg-cover bg-center min-h-screen relative transition-all duration-300`}
    >
      <div className="absolute inset-0 bg-dark-overlay z-10"></div>

      <div className="relative z-50">
        {" "}
        {/* Higher than overlay's z-10 */}
        <Navbar />
        <div className="flex flex-col items-center justify-center md:p-24 py-10 ">
          {/* <h1 className="text-4xl md:text-7xl font-bold font-sans text-white text-center shadow-lilac rounded-lg p-2 shadow-sm">
            <Typewriter text="The Frances Ushedo Foundation" speed={80} />
          </h1> */}
          <h1 className="text-4xl md:text-7xl font-bold font-EduQld text-darckLilac text-center rounded-lg p-2  min-h-[2.5em] max-w-[70%]">
            <DualTypewriter
              texts={[
                "The Frances Ushedo Foundation",
                " A Beacon of Hope for Future Generations",
              ]}
              speed={80}
              delay={2000}
            />
          </h1>

          {/* <h3 className="bg-darckLilac text-white mt-7 p-2 text-base md:text-xl font-extrabold rounded-lg font-sans shadow-inner">
            A Beacon of Hope for Future Generations
          </h3> */}
          <div className="mt-7 md:max-w-[40%]">
            <p className="text-lg md:text-2xl text-white  italic font-EduQld">
              &quot;In the heart of every child lies a spark of potential. At
              TFUF, we are committed to nurturing this potential in Nigeria,
              providing the support and care that every child deserves. Please
              join us in our journey to create brighter futures.&quot;
            </p>
            <p className="mt-10 text-2xl text-white italic text-right">
              — Amanda Ushedo, Founder
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
