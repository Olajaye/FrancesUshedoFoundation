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

interface SponsorsCarouselProps {
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
}: SponsorsCarouselProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTier = "all";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredSponsors =
    activeTier === "all"
      ? sponsors
      : sponsors.filter((sponsor) => sponsor.tier === activeTier);

  const extendedSponsors = [...filteredSponsors, ...filteredSponsors];

  if (!isMounted) return null;

  return (
    <section className="relative min-h-[500px] py-8 overflow-hidden bg-gradient-to-r from-darckLilac via-lilac to-darckLilac">
      <div className="container mx-auto px-4 h-full relative z-10 flex flex-col justify-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            <span className="text-white/90 font-medium uppercase text-sm">
              Partners
            </span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Trusted Collaborators
          </h2>
          <p className="text-white/80 text-base max-w-xl mx-auto">
            Partnering with visionary organizations worldwide
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          ref={containerRef}
          className="relative h-[300px] flex items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="w-full overflow-hidden rounded-xl bg-white/40 backdrop-blur-sm border border-white/70">
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
                width: `${(extendedSponsors.length / filteredSponsors.length) * 100}%`,
              }}
            >
              {extendedSponsors.map((sponsor, index) => (
                <motion.div
                  key={`${sponsor.name}-${index}`}
                  className="flex-shrink-0 h-full px-2"
                  style={{
                    width: `${100 / filteredSponsors.length}%`,
                    maxWidth: "200px",
                  }}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <div className="h-full rounded-lg bg-white/10 border border-white/20 p-4 flex flex-col items-center justify-center hover:bg-white/20 transition-colors">
                    <div className="relative w-full aspect-square mb-3">
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center p-4">
                        <Image
                          src={sponsor.logo}
                          alt={sponsor.alt || `${sponsor.name} logo`}
                          width={100}
                          height={60}
                          className="w-auto h-20 object-contain"
                        />
                      </div>
                      {sponsor.tier && (
                        <div className="absolute -top-2 -right-2">
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              sponsor.tier === "platinum"
                                ? "bg-white/30 text-white"
                                : sponsor.tier === "gold"
                                  ? "bg-yellow-500/30 text-yellow-100"
                                  : sponsor.tier === "silver"
                                    ? "bg-gray-400/30 text-gray-100"
                                    : "bg-blue-500/30 text-blue-100"
                            }`}
                          >
                            {sponsor.tier.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="text-center text-sm font-medium text-white">
                      {sponsor.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsCarousel;

// "use client";

// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";

// interface Sponsor {
//   logo: string;
//   name: string;
//   alt?: string;
//   tier?: "platinum" | "gold" | "silver" | "partner";
// }

// interface SponsorsProps {
//   sponsors: Sponsor[];
//   speed?: number;
//   direction?: "left" | "right";
//   autoPlay?: boolean;
// }

// export const SponsorsCarousel = ({
//   sponsors,
//   speed = 40,
//   direction = "left",
//   autoPlay = true,
// }: SponsorsProps) => {
//   const [isMounted, setIsMounted] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const [activeTier] = useState<string>("all");
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   if (!isMounted) return null;

//   const filteredSponsors =
//     activeTier === "all"
//       ? sponsors
//       : sponsors.filter((sponsor) => sponsor.tier === activeTier);

//   const extendedFilteredSponsors = [...filteredSponsors, ...filteredSponsors];

//   const getTierColor = (tier?: string) => {
//     switch (tier) {
//       case "platinum":
//         return "border-white/50 bg-gradient-to-b from-darckLilac/40 via-darckLilac/20 to-lilac/10";
//       case "gold":
//         return "border-white/50 bg-gradient-to-b from-darckLilac/30 via-darckLilac/15 to-lilac/5";
//       case "silver":
//         return "border-white/50 bg-gradient-to-b from-darckLilac/20 via-darckLilac/10 to-lilac/5";
//       default:
//         return "border-white/30 bg-gradient-to-b from-darckLilac/15 via-darckLilac/5 to-transparent";
//     }
//   };

//   return (
//     <section
//       className="relative h-[50vh] py-4 overflow-hidden"
//       style={{
//         background:
//           "linear-gradient(135deg, #d154d6 0%, #E89EED 50%, #d154d6 100%)",
//       }}
//     >
//       <div className="container h-full mx-auto px-4 relative z-10 flex flex-col justify-center">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-3"
//         >
//           <div className="inline-flex items-center justify-center gap-3">
//             <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
//             <span className="text-white/90 font-medium tracking-wider uppercase text-xs md:text-sm">
//               Partners
//             </span>
//             <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
//           </div>

//           <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-white">
//             Trusted Collaborators
//           </h2>

//           <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto leading-tight">
//             Partnering with visionary organizations worldwide
//           </p>
//         </motion.div>

//         <div
//           ref={containerRef}
//           className="relative flex-1  flex items-center"
//           onMouseEnter={() => setIsPaused(true)}
//           onMouseLeave={() => setIsPaused(false)}
//           style={{
//             height: "500px",
//           }}
//         >
//           <div className="overflow-hidden rounded-xl bg-white/20 backdrop-blur-sm border border-white w-full">
//             <motion.div
//               className="flex h-full items-center"
//               animate={
//                 autoPlay && !isPaused
//                   ? {
//                       x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
//                     }
//                   : {}
//               }
//               transition={{
//                 x: {
//                   repeat: Infinity,
//                   repeatType: "loop",
//                   duration: speed,
//                   ease: "linear",
//                 },
//               }}
//               style={{
//                 width: `${
//                   extendedFilteredSponsors.length *
//                   (100 / filteredSponsors.length)
//                 }%`,
//               }}
//             >
//               {extendedFilteredSponsors.map((sponsor, index) => (
//                 <motion.div
//                   key={`${sponsor.name}-${index}`}
//                   className="flex-shrink-0 h-full p-2"
//                   style={{
//                     width: `${100 / filteredSponsors.length}%`,
//                     maxWidth: "200px",
//                   }}
//                   whileHover={{
//                     scale: 1.05,
//                     transition: { duration: 0.3 },
//                   }}
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.5, delay: index * 0.05 }}
//                 >
//                   <div
//                     className={`h-full rounded-lg border ${`border-white bg-white`} p-3 md:p-4 transition-all duration-300 hover:border-white hover:bg-white flex flex-col items-center justify-center`}
//                   >
//                     <div className="relative mb-2 w-full aspect-square">
//                       <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
//                         <div className="relative w-full h-full flex items-center justify-center p-4">
//                           <Image
//                             src={sponsor.logo}
//                             alt={sponsor.alt || `${sponsor.name} logo`}
//                             width={80}
//                             height={40}
//                             className="w-auto h-32 object-contain transition-all duration-300 group-hover:scale-110"
//                           />
//                         </div>
//                       </div>

//                       {sponsor.tier && (
//                         <div className="absolute -top-1 -right-1">
//                           <span
//                             className={`text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm ${
//                               sponsor.tier === "platinum"
//                                 ? "bg-white/30 text-white border border-white/40"
//                                 : sponsor.tier === "gold"
//                                   ? "bg-white/25 text-white border border-white/30"
//                                   : sponsor.tier === "silver"
//                                     ? "bg-white/20 text-white border border-white/20"
//                                     : "bg-white/15 text-white border border-white/15"
//                             }`}
//                           >
//                             {sponsor.tier.charAt(0).toUpperCase()}
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     <p className="text-center text-xs md:text-sm font-medium text-white/90 mt-1 line-clamp-2">
//                       {sponsor.name}
//                     </p>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
// export default SponsorsCarousel;
