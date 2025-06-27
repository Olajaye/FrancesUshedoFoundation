'use client'
import FadeText from "@/hooks/FadingDualText";
import React, { useEffect, useState } from "react";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

    // Array of slides with different background images and text
  const slides = [
    {
      background: "url('/home/picture2.jpg')",
      quote: "\"In the heart of every child lies a spark of potential. At TFUF, we are committed to nurturing this potential in Nigeria, providing the support and care that every child deserves. Please join us in our journey to create brighter futures.\"",
      cta: "Donate Now"
    },
    {
      background: "url('/home/welcomeHero.png')",
      quote: "\"Education is the most powerful weapon which you can use to change the world. Support our mission to provide quality education to underprivileged children in Nigeria.\"",
      cta: "Sponsor a Child"
    },
    {
      background: "url('/junks/IMG_2792.JPG')",
      quote: "\"Together, we can break the cycle of poverty. Your contribution helps us provide essential resources and opportunities to children in need.\"",
      cta: "Learn More"
    }
  ];

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);


  return (
    // <>
    //   <section className="bg-hero h-[80vh] bg-cover bg-center relative overflow-hidden">
    //     <div className="absolute inset-0 bg-dark-overlay z-10"></div>
    //     <div
    //       className="absolute inset-0 flex flex-col items-center justify-center text-start text-white px-4"
    //       style={{ zIndex: 999 }}
    //     >
    //       <div className="container mx-auto px-4">
    //         <FadeText />


    //         <p className="text-lg mb-8  italic md:max-w-[70%]">
    //         &quot;In the heart of every child lies a spark of potential. At
    //           TFUF, we are committed to nurturing this potential in Nigeria,
    //           providing the support and care that every child deserves. Please
    //           join us in our journey to create brighter futures.&quot;
    //         </p>


    //         <button className="w-32 p-3 bg-lilac text-dark font-lora rounded-xl transition duration-300">
    //           Donate Now
    //         </button>
    //       </div>
    //     </div>
    //   </section>
    // </>
     <>
      <section className="h-[80vh] bg-cover bg-center relative overflow-hidden">
        {/* Background images for all slides (hidden except current) */}
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: slide.background,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 1
            }}
          >
            <div className="absolute inset-0 bg-dark-overlay"></div>
          </div>
        ))}

        {/* Content */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-start text-white px-4"
          style={{ zIndex: 20 }}
        >
          <div className="container mx-auto px-4">
            <FadeText key={currentSlide} /> {/* Key forces re-render on slide change */}

            <p className="text-lg mb-8 italic md:max-w-[70%]">
              {slides[currentSlide].quote}
            </p>

            <button className="w-auto p-3 bg-lilac text-dark font-lora rounded-xl transition duration-300 hover:bg-lilac-dark">
              {slides[currentSlide].cta}
            </button>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-lilac' : 'bg-white'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Hero;
