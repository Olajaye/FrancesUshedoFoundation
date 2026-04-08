import Image from "next/image";
import Link from "next/link";
import { HomeCardData } from "@/constant/constant";

export default function HomeCard({ title, text, icon, href }: HomeCardData) {
  return (
    <Link
      href={href}
      className="group block w-full max-w-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 bg-[#ecf2f5] hover:bg-lilac"
    >
      <div className="p-6 md:p-8 text-center flex flex-col items-center h-full">
        <Image
          src={icon}
          alt={`${title} icon`}
          width={100}
          height={100}
          className="mb-4 w-20 md:w-24"
        />
        <h3 className="text-xl md:text-2xl font-montserrat font-medium mb-2 text-black group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="text-sm md:text-base font-montserrat leading-relaxed text-black group-hover:text-white/90 transition-colors">
          {text}
        </p>
      </div>
    </Link>
  );
}
