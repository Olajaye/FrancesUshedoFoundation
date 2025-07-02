"use client";

// import FadeText from "@/hooks/FadingDualText";
import React, { useEffect, useState } from "react";


const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);

  // Array of slides with different background images and text
  const slides = [
    {
      background: "url('/home/picture2.jpg')",
      text: "The Frances Ushedo Foundation",
      quote:
        '"In the heart of every child lies a spark of potential. At TFUF, we are committed to nurturing this potential in Nigeria, providing the support and care that every child deserves. Please join us in our journey to create brighter futures."',
      cta: "Donate Now",
    },
    {
      background: "url('/home/welcomeHero.png')",
      text: "A Beacon of Hope for Future Generations",
      quote:
        '"Education is the most powerful weapon which you can use to change the world. Support our mission to provide quality education to underprivileged children in Nigeria."',
      cta: "Sponsor a Child",
    },
    {
      background: "url('/junks/IMG_2792.JPG')",
      text: "Empowering Lives, One Child at a Time",
      quote:
        '"Together, we can break the cycle of poverty. Your contribution helps us provide essential resources and opportunities to children in need."',
      cta: "Learn More",
    },
  ];

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection("next");
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Handle manual slide change via indicators
  const handleIndicatorClick = (index: number) => {
    if (index !== currentSlide) {
      setDirection(index > currentSlide ? "next" : "prev");
      setCurrentSlide(index);
    }
  };

  return (
    <section className="h-[80vh] bg-cover bg-center relative overflow-hidden">
      {/* Slides (background and content) */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
            index === currentSlide
              ? "translate-x-0"
              : direction === "next" && index === currentSlide - 1
              ? "-translate-x-full"
              : direction === "prev" && index === currentSlide + 1
              ? "translate-x-full"
              : index < currentSlide
              ? "-translate-x-full"
              : "translate-x-full"
          }`}
          style={{ zIndex: index === currentSlide ? 10 : 1 }}
        >
          {/* Background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: slide.background,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-dark-overlay"></div>
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-start text-white px-4">
            <div className="container mx-auto px-4">
              {/* <FadeText /> */}
              <h2 className="text-7xl font-montserrat font-semibold md:max-w-[60%]">{slide.text}</h2>
              <p className="text-lg mb-8 italic md:max-w-[70%]">
                {slide.quote}
              </p>
              <button className="w-auto p-3 bg-lilac text-dark font-bold font-montserrat rounded-xl transition duration-300 hover:bg-darckLilac hover:text-white">
                {slide.cta}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleIndicatorClick(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-lilac" : "bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;