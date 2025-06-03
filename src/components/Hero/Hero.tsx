import FadeText from "@/hooks/FadingDualText";
import React from "react";

const Hero = () => {
  return (
    <>
      <section className="bg-hero h-[80vh] bg-cover bg-center relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-overlay z-10"></div>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-start text-white px-4"
          style={{ zIndex: 999 }}
        >
          <div className="container mx-auto px-4">
            <FadeText />


            <p className="text-lg mb-8  italic md:max-w-[70%]">
            &quot;In the heart of every child lies a spark of potential. At
              TFUF, we are committed to nurturing this potential in Nigeria,
              providing the support and care that every child deserves. Please
              join us in our journey to create brighter futures.&quot;
            </p>


            <button className="w-32 p-3 bg-lilac text-dark font-lora rounded-xl transition duration-300">
              Donate Now
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
