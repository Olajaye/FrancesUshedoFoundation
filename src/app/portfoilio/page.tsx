import Gallery from "@/components/Gallery/Gallery";
import React from "react";

const page = () => {
  return (
    <>
      <section className="bg-portfoilio bg-cover h-[45vh] py-12 bg-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/80"></div>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-start text-white px-4"
          style={{ zIndex: 999 }}
        >
          <div className="container mx-auto px-6 ">
            <div>
              <h2 className="text-6xl font-serif text-start">Portfoilio</h2>
              <div className="w-[100px] h-2 bg-darckLilac"></div>
            </div>
          </div>
        </div>
      </section>


      <section className="container px-4 mx-auto py-12">
        <Gallery />
      </section>
    </>
  );
};

export default page;
