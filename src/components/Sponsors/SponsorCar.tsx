"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Sponsor {
  logo: string;
  name: string;
  alt?: string;
}

interface SponsorsCarouselProps {
  sponsors: Sponsor[];
  speed?: number;
}

export const SponsorsCarousel = ({
  sponsors,
  speed = 35,
}: SponsorsCarouselProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const extendedSponsors = [...sponsors, ...sponsors];

  return (
    <section className="relative py-5 bg-gradient-to-r from-darckLilac via-lilac to-darckLilac overflow-hidden">
      <div className="container mx-auto px-3">
        <div className="text-center mb-7">
          <p className="uppercase tracking-widest text-white/70 text-sm font-medium mb-3">
            Our Partners
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted Collaborators
          </h2>

          <p className="text-white/80 max-w-2xl mx-auto">
            We are proud to work alongside organizations that share our vision
            and commitment to excellence.
          </p>
        </div>
      </div>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex items-center gap-8"
          animate={!isPaused ? { x: ["0%", "-50%"] } : { x: 0 }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          }}
        >
          {extendedSponsors.map((sponsor, index) => (
            <motion.div
              key={`${sponsor.name}-${index}`}
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white border-3 border-darckLilac rounded-xl px-10 py-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center min-w-[180px]">
                <Image
                  src={sponsor.logo}
                  alt={sponsor.alt || sponsor.name}
                  width={120}
                  height={60}
                  className="h-14 w-auto object-contain"
                />

                <p className="mt-4 text-sm font-medium text-dark text-center">
                  {sponsor.name}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorsCarousel;
