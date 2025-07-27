"use client";

// import Image from "next/image";
// import FadeText from "@/hooks/FadingDualText";
import React, { useEffect, useState } from "react";

// Array of slides with different background images and text
const slides2 = [
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

// const slides = [
//   {
//     image: "/home/picture2.jpg",
//     alt: "Children smiling in a classroom",
//     title: "The Frances Ushedo Foundation",
//     quote:
//       '"In the heart of every child lies a spark of potential. At TFUF, we are committed to nurturing this potential in Nigeria, providing the support and care that every child deserves. Join us in our journey to create brighter futures."',
//     cta: "Donate Now",
//     ctaHref: "/donate", // Added for actual linking; adjust as needed
//   },
//   {
//     image: "/home/welcomeHero.png",
//     alt: "Group of students learning outdoors",
//     title: "A Beacon of Hope for Future Generations",
//     quote:
//       '"Education is the most powerful weapon which you can use to change the world. Support our mission to provide quality education to underprivileged children in Nigeria."',
//     cta: "Sponsor a Child",
//     ctaHref: "/sponsor",
//   },
//   {
//     image: "/junks/IMG_2792.JPG", // Recommend renaming folder to something professional like /images/
//     alt: "Volunteers helping children in need",
//     title: "Empowering Lives, One Child at a Time",
//     quote:
//       '"Together, we can break the cycle of poverty. Your contribution helps us provide essential resources and opportunities to children in need."',
//     cta: "Learn More",
//     ctaHref: "/about",
//   },
// ];

const Hero = () => {
  // const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSlide2, setCurrentSlide2] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection("next");
      setCurrentSlide2((prev) => (prev + 1) % slides2.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides2.length]);

  // Handle manual slide change via indicators
  const handleIndicatorClick2 = (index: number) => {
    if (index !== currentSlide2) {
      setDirection(index > currentSlide2 ? "next" : "prev");
      setCurrentSlide2(index);
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentSlide((prev) => (prev + 1) % slides.length);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  // const handleIndicatorClick = (index: number) => {
  //   setCurrentSlide(index);
  // };
  return (
    <>
      {/* <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        {" "}
        Adjusted height for better mobile view
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`} 
          >
            Background Image: Used Next.js Image for optimization, lazy loading
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0} 
              quality={85}
            />
            Overlay for text readability
            <div className="absolute inset-0 bg-black/40" />{" "}
            Standardized overlay; adjust opacity as needed 
             Content: Centered, responsive, with animations 
            <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4 md:px-8">
              <div className="container mx-auto max-w-4xl">
                <h1
                  className={`text-4xl md:text-6xl lg:text-7xl font-montserrat font-bold mb-4 md:mb-6 transition-all duration-500 ${
                    index === currentSlide
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`} 
                >
                  {slide.title}
                </h1>
                <p
                  className={`text-base md:text-lg lg:text-xl font-montserrat italic mb-6 md:mb-8 max-w-2xl mx-auto transition-all duration-500 delay-200 ${
                    index === currentSlide
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  {slide.quote}
                </p>
                <a
                  href={slide.ctaHref}
                  className={`inline-block px-6 py-3 md:px-8 md:py-4 bg-lilac text-white font-montserrat font-semibold rounded-lg transition duration-300 hover:bg-darkLilac hover:shadow-lg`}
                >
                  {slide.cta}
                </a>
              </div>
            </div>
          </div>
        ))}
        Indicators: Larger for touch-friendliness, semi-transparent
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleIndicatorClick(index)}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-colors ${
                index === currentSlide
                  ? "bg-lilac"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </section> */}

      <section className="h-[80vh] bg-cover bg-center relative overflow-hidden">
        {/* Slides (background and content) */}
        {slides2.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
              index === currentSlide2
                ? "translate-x-0"
                : direction === "next" && index === currentSlide2 - 1
                ? "-translate-x-full"
                : direction === "prev" && index === currentSlide2 + 1
                ? "translate-x-full"
                : index < currentSlide2
                ? "-translate-x-full"
                : "translate-x-full"
            }`}
            style={{ zIndex: index === currentSlide2 ? 10 : 1 }}
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
                <h2 className="text-5xl md:text-7xl font-montserrat font-semibold md:max-w-[60%]">
                  {slide.text}
                </h2>
                <p className="text-xl mb-7 mt-7 italic md:max-w-[70%]">
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
        <div className="absolute bottom-8 left-0 right-0  z-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-start space-x-2">
              {slides2.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleIndicatorClick2(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide2 ? "bg-lilac" : "bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
