import Image from "next/image";

export const PagesHero = ({ img, title }: { img: string; title: string }) => {
  return (
    <section className="relative h-[40vh] md:h-[40vh] overflow-hidden">
      <Image
        src={img}
        alt={title}
        fill
        className="object-cover object-center"
        quality={85}
        priority
      />

      <div className="absolute inset-0 bg-black/70" />

      <div className="absolute inset-0 flex items-center justify-start px-4 md:px-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-montserrat font-bold text-white">
            {title}
          </h1>
          <div className="w-[100px] h-2 bg-darckLilac"></div>
          <div className="w-24 h-1 bg-darkLilac mt-4" />
        </div>
      </div>
    </section>
  );
};
