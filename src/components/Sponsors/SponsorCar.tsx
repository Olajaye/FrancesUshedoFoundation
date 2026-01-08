"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Sponsor {
  logo: string;
  name: string;
  alt?: string;
  tier?: "platinum" | "gold" | "silver" | "partner";
}

interface SponsorsProps {
  sponsors: Sponsor[];
  speed?: number;
  direction?: "left" | "right";
  autoPlay?: boolean;
}

export const SponsorsCarousel = ({
  sponsors,
  speed = 40,
  direction = "left",
  autoPlay = true,
}: SponsorsProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeTier] = useState<string>("all");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // const extendedSponsors = [...sponsors, ...sponsors];

  // Filter sponsors by tier if needed
  const filteredSponsors =
    activeTier === "all"
      ? sponsors
      : sponsors.filter((sponsor) => sponsor.tier === activeTier);

  const extendedFilteredSponsors = [...filteredSponsors, ...filteredSponsors];

  const getTierColor = (tier?: string) => {
    switch (tier) {
      case "platinum":
        return "border-white/50 bg-gradient-to-b from-darckLilac/40 via-darckLilac/20 to-lilac/10";
      case "gold":
        return "border-white/50 bg-gradient-to-b from-darckLilac/30 via-darckLilac/15 to-lilac/5";
      case "silver":
        return "border-white/50 bg-gradient-to-b from-darckLilac/20 via-darckLilac/10 to-lilac/5";
      default:
        return "border-white/30 bg-gradient-to-b from-darckLilac/15 via-darckLilac/5 to-transparent";
    }
  };

  return (
    <section
      className="relative h-[60vh] py-4 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #d154d6 0%, #E89EED 50%, #d154d6 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-darckLilac/20 via-transparent to-darckLilac/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="container h-full mx-auto px-4 relative z-10 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-3"
        >
          <div className="inline-flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            <span className="text-white/90 font-medium tracking-wider uppercase text-xs md:text-sm">
              Partners
            </span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-white">
            Trusted Collaborators
          </h2>

          <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto leading-tight">
            Partnering with visionary organizations worldwide
          </p>
        </motion.div>

        <div
          ref={containerRef}
          className="relative flex-1  flex items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            height: "400px",
          }}
        >
          <div className="overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 w-full">
            <motion.div
              className="flex h-full items-center"
              animate={
                autoPlay && !isPaused
                  ? {
                      x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
                    }
                  : {}
              }
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: speed,
                  ease: "linear",
                },
              }}
              style={{
                width: `${
                  extendedFilteredSponsors.length *
                  (100 / filteredSponsors.length)
                }%`,
              }}
            >
              {extendedFilteredSponsors.map((sponsor, index) => (
                <motion.div
                  key={`${sponsor.name}-${index}`}
                  className="flex-shrink-0 h-full p-2"
                  style={{
                    width: `${100 / filteredSponsors.length}%`,
                    maxWidth: "200px",
                  }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <div
                    className={`h-full rounded-lg border ${getTierColor(
                      sponsor.tier
                    )} p-3 md:p-4 transition-all duration-300 hover:border-white/50 hover:bg-white/10 flex flex-col items-center justify-center`}
                  >
                    <div className="relative mb-2 w-full aspect-square">
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                        <div className="relative w-full h-full flex items-center justify-center p-4">
                          <Image
                            src={sponsor.logo}
                            alt={sponsor.alt || `${sponsor.name} logo`}
                            width={80}
                            height={40}
                            className="w-auto h-32 object-contain transition-all duration-300 group-hover:scale-110"
                          />
                        </div>
                      </div>

                      {sponsor.tier && (
                        <div className="absolute -top-1 -right-1">
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm ${
                              sponsor.tier === "platinum"
                                ? "bg-white/30 text-white border border-white/40"
                                : sponsor.tier === "gold"
                                ? "bg-white/25 text-white border border-white/30"
                                : sponsor.tier === "silver"
                                ? "bg-white/20 text-white border border-white/20"
                                : "bg-white/15 text-white border border-white/15"
                            }`}
                          >
                            {sponsor.tier.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="text-center text-xs md:text-sm font-medium text-white/90 mt-1 line-clamp-2">
                      {sponsor.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="absolute rounded-md inset-y-0 left-0 w-16 bg-gradient-to-r from-darckLilac via-darckLilac/95 to-transparent pointer-events-none" />
          <div className="absolute rounded-md inset-y-0 right-0 w-16 bg-gradient-to-l from-darckLilac via-darckLilac/95 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Bottom wave effect */}
      <div className="absolute bottom-0 left-0 right-0 h-4 overflow-hidden">
        <div
          className="absolute -bottom-2 left-0 right-0 h-8 bg-white backdrop-blur-sm"
          style={{
            clipPath: "polygon(0% 100%, 100% 100%, 0% 0%, 0% 100%)",
          }}
        />
      </div>
      <div className="absolute top-0 left-0 right-0 h-4 overflow-hidden">
        <div
          className="absolute -top-4 left-0 right-0 h-8 bg-white backdrop-blur-sm"
          style={{
            clipPath: "polygon(100% 100%, 100% 100%, 0% 100%, 0% 100%)",
          }}
        />
      </div>
    </section>
  );
};
