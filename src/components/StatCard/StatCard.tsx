import Image from "next/image";
import { HomeStatData } from "@/constant/constant";

export default function StatCard({ icon, number, label }: HomeStatData) {
  return (
    <div className="flex flex-col items-center text-center rounded-lg shadow-md shadow-lilac transition-all duration-300 hover:shadow-lg hover:scale-105">
      <Image
        src={icon}
        alt={label}
        width={200}
        height={176}
        className="w-full h-44 rounded-t-lg object-cover"
      />
      <div className="py-3 px-2">
        <p className="text-xl font-montserrat font-bold text-darkLilac mb-1">
          {number}
        </p>
        <p className="text-sm font-montserrat text-gray-700">{label}</p>
      </div>
    </div>
  );
}
