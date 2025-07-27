"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Added for smooth animations; install via npm if needed

interface Sponsor {
  logo: string;
  name: string;
  alt?: string; // Optional for better accessibility
}

interface SponsorsProps {
  sponsors: Sponsor[];
  speed?: number; // Optional: Animation speed in seconds
  direction?: "left" | "right"; // Optional: Scroll direction
}

export const SponsorsCarousel = ({
  sponsors,
  speed = 30, // Default scroll duration
  direction = "left", // Default direction
}: SponsorsProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Prevent hydration issues

  // Duplicate sponsors array for seamless infinite loop
  const extendedSponsors = [...sponsors, ...sponsors];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-lilac to-darkLilac overflow-hidden">
      {" "}
      {/* Gradient bg for depth, no white */}
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white text-3xl md:text-4xl font-montserrat font-bold mb-8 md:mb-12"
        >
          Our Esteemed Sponsors
        </motion.h2>
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{
                x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: speed,
                  ease: "linear",
                },
              }}
              style={{
                width: `${extendedSponsors.length * (100 / sponsors.length)}%`,
              }} // For seamless loop
            >
              {extendedSponsors.map((sponsor, index) => (
                <motion.div
                  key={`${sponsor.name}-${index}`}
                  className="flex-shrink-0 w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6 px-4 md:px-6"
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }} // Subtle hover effect
                >
                  <div className="bg-darkLilac/50 rounded-xl p-4 md:p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-darkLilac/70">
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.alt || `${sponsor.name} logo`}
                      width={150}
                      height={80}
                      className="mx-auto mb-3 w-auto h-12 md:h-16 object-contain filter brightness-100 contrast-125" // Enhanced visibility
                    />
                    <p className="text-center text-white text-sm md:text-base font-montserrat font-medium">
                      {sponsor.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          {/* Gradient overlays for smooth edges */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-lilac to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-lilac to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

// Usage Example:
{
  /* <SponsorsCarousel 
  sponsors={[
    { logo: "/sponsors/logo1.png", name: "Sponsor One" },
    { logo: "/sponsors/logo2.png", name: "Sponsor Two" },
    // Add more...
  ]}
  speed={25} // Slower for professionalism
  direction="left"
/> */
}
