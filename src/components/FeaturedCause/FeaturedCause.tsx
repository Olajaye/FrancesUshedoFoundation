import Image from "next/image";
import Link from "next/link";
import { FeaturedCauseData } from "@/constant/constant";

export default function FeaturedCause({
  title,
  date,
  location,
  description,
  imageSrc,
  raised,
  goal,
  donateHref,
}: FeaturedCauseData) {
  const progress = Math.min(100, Math.round((raised / goal) * 100));

  return (
    <div className="bg-gray-100 p-4 md:p-6 rounded-xl shadow-md h-full flex flex-col">
      <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-gray-800 mb-4">
        Featured Cause
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 flex-1">
        <div className="w-full sm:w-2/5 flex-shrink-0">
          <Image
            src={imageSrc}
            alt={title}
            width={400}
            height={300}
            className="w-full h-52 sm:h-full object-cover rounded-lg"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between gap-4">
          <div>
            <h3 className="text-lg font-montserrat font-semibold text-gray-800 mb-1">
              {title}
            </h3>
            <p className="text-sm font-montserrat text-gray-500 mb-3">
              {date} &bull; {location}
            </p>
            <p className="text-sm font-montserrat text-gray-700 leading-relaxed">
              {description}
            </p>
          </div>

          <div>
            <Link
              href={donateHref}
              className="inline-block px-5 py-2.5 bg-lilac text-dark font-bold font-montserrat rounded-xl text-sm transition duration-300 hover:bg-darckLilac hover:text-white"
            >
              Donate Now
            </Link>

            <div className="mt-4">
              <div className="flex justify-between text-sm font-montserrat text-gray-600 mb-1.5">
                <span>Raised: ${raised.toLocaleString()}</span>
                <span>Goal: ${goal.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-darkLilac h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
