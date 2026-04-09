import Image from "next/image";
import Link from "next/link";
import { HomeEventData } from "@/constant/constant";

export default function EventCard({
  id,
  image,
  title,
  date,
  location,
  description,
}: HomeEventData) {
  return (
    <div className="flex items-start gap-3 sm:gap-4 bg-gray-50 rounded-lg p-3 sm:p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex-shrink-0">
        <Image
          src={image}
          alt={title}
          width={112}
          height={112}
          className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-md"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-base sm:text-lg font-montserrat font-semibold text-gray-800 line-clamp-2">
          {title}
        </h3>
        <p className="text-xs sm:text-sm font-montserrat text-gray-500 mt-1">
          {date} &bull; {location}
        </p>
        <p className="text-xs sm:text-sm font-montserrat text-gray-700 mt-2 line-clamp-2 sm:line-clamp-3">
          {description}
        </p>
        <Link
          href={`/event/${encodeURIComponent(id)}`}
          className="text-darkLilac text-sm font-montserrat font-medium mt-2 inline-block hover:underline"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
