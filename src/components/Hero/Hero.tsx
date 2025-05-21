'use client'
import React, { useEffect, useMemo, useState } from "react";
// import { DualTypewriter } from "@/hooks/DualTypewriter";
// import FadingDualText from "../../hooks/FadingDualText";



const Hero = () => {
  const backgroundImages = useMemo(
    () => [
      "/Untitled-3.jpg",
      "/Untitled-4.jpg",
      "/Untitled-5.jpg",
    ],
    []
  );

  const zoomInOut = `
  @keyframes zoomInOut {
    0% { transform: scale(1); }
    50% { transform: scale(1.075); }
    100% { transform: scale(1); }
  }`; 

  // Set initial background image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Change the background image every 5 seconds (5000ms)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000); // Change image every 5 seconds

    // Clear the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);
  return (
    // <main
    //   className={`${className} bg-cover bg-center h-[100vh] relative transition-all duration-300`}
    // >
    //   <div className="absolute inset-0 bg-dark-overlay z-10"></div>
    //   <div className="relative z-50 flex flex-col h-[100vh] pb-40">
    //     <Navbar />
    //     <div className="h-[100vh] flex items-end justify-start">
    //       <div className="w-full md:w-[60%]">

    //         {/* <div className=" bg-darckLilac rounded-xl p-8 md:p-10 text-white">
    //           <FadeText/>
    //           <div className="border-l-4 border-darckLilac pl-6 my-6">
    //             <p className="text-lg md:text-xl italic font-roboto">
    //               &quot;In the heart of every child lies a spark of potential.
    //               At TFUF, we are committed to nurturing this potential in
    //               Nigeria, providing the support and care that every child
    //               deserves. Please join us in our journey to create brighter
    //               futures.&quot;
    //             </p>
    //             <p className="mt-6 text-xl italic text-darckLilac">
    //               — Amanda Ushedo, Founder
    //             </p>
    //           </div>

    //           <div className="mt-8">
    //             <button className="bg-darckLilac hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
    //               Join Our Mission
    //             </button>
    //           </div>
    //         </div> */}
    //       </div>
    //     </div>
    //   </div>
    // </main>
    <>
    <style jsx global>{zoomInOut}</style>
    <section className='overflow-hidden mt-[105px]'>
      <div
        className="relative w-full h-[100vh] bg-cover bg-top overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
          animation: 'zoomInOut 20s ease-out infinite', 
        }}
      >
        {/* Overlay for contrast */}
        <div className="absolute inset-0 bg-dark-overlay opacity-40"></div>

        {/* Hero content */}
        {/* <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-5xl font-bold leading-tight mb-4 font-lora">
             Unlock Your <span className='text-primary'>Potential</span> with Expert<span className='text-primary'> Guidance</span> 
          </h1>
          <p className="text-lg mb-8 font-lora md:max-w-[70%]">
             
             Unlock your full potential with guidance from our experts. Explore a wide range of industries and subjects to find the perfect match for you.
          </p>
          <Link href={'/find-inspiration'} className="px-6 py-3 bg-primary text-dark font-lora rounded-lg transition duration-300">
            Find Expert Guidance
          </Link>
        </div> */}
      </div>
    </section>

  </>
  );
};

export default Hero;
