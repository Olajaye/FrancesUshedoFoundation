import React from "react";
import { Navbar } from "../Navbar/Navbar";
// import { DualTypewriter } from "@/hooks/DualTypewriter";
// import FadingDualText from "../../hooks/FadingDualText";
import FadeText from "../../hooks/FadingDualText";

type Props = {
  className?: string;
};

const Hero = ({ className }: Props) => {
  return (
    <main
      className={`${className} bg-cover bg-center h-[100vh] relative transition-all duration-300`}
    >
      {/* <div className="absolute inset-0 bg-dark-overlay z-10"></div> */}
      <div className="relative z-50 flex flex-col h-[100vh] pb-40">
        <Navbar />
        <div className="h-[100vh] flex items-end justify-start">
          <div className="w-full md:w-[60%]">
            <div className=" bg-transparent backdrop-blur-md rounded-xl p-8 md:p-10 text-white">
             
              <FadeText/>

              <div className="border-l-4 border-darckLilac pl-6 my-6">
                <p className="text-lg md:text-xl italic font-roboto">
                  &quot;In the heart of every child lies a spark of potential.
                  At TFUF, we are committed to nurturing this potential in
                  Nigeria, providing the support and care that every child
                  deserves. Please join us in our journey to create brighter
                  futures.&quot;
                </p>
                <p className="mt-6 text-xl italic text-darckLilac">
                  — Amanda Ushedo, Founder
                </p>
              </div>

              <div className="mt-8">
                <button className="bg-darckLilac hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
                  Join Our Mission
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
