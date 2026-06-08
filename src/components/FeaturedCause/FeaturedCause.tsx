import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Target } from "lucide-react";

const CURRENCY_SYMBOLS: Record<string, string> = {
  GBP: "£", USD: "$", EUR: "€", NGN: "₦", GHS: "GH₵", ZAR: "R", KES: "KSh", EGP: "E£",
};

export interface FeaturedCauseProps {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  raised: number;
  donationGoal: number;
  goalCurrency: string;
}

export default function FeaturedCause({
  id,
  title,
  date,
  location,
  description,
  image,
  raised,
  donationGoal,
  goalCurrency,
}: FeaturedCauseProps) {
  const sym = CURRENCY_SYMBOLS[goalCurrency] ?? goalCurrency;
  const progress = Math.min(100, Math.round((raised / donationGoal) * 100));
  const donateHref = `/donate?eventId=${id}&source=event&eventTitle=${encodeURIComponent(title)}`;

  return (
    <div className="bg-gray-100 p-4 md:p-6 rounded-xl shadow-md h-full flex flex-col">
      <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-gray-800 mb-4">
        Featured Cause
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 flex-1">
        {/* Image */}
        <div className="w-full sm:w-2/5 flex-shrink-0">
          <div className="relative w-full h-52 sm:h-full rounded-lg overflow-hidden bg-gray-200">
            <Image
              src={image || "/feture.png"}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 200px"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between gap-4">
          <div>
            <h3 className="text-lg font-montserrat font-semibold text-gray-800 mb-2">{title}</h3>
            <div className="flex flex-col gap-1 text-sm text-gray-500 mb-3">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-lilac shrink-0" />{date}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-lilac shrink-0" />{location}
              </span>
            </div>
            <p className="text-sm font-montserrat text-gray-700 leading-relaxed line-clamp-3">{description}</p>
          </div>

          <div>
            <Link
              href={donateHref}
              className="inline-block px-5 py-2.5 bg-lilac text-dark font-bold font-montserrat rounded-xl text-sm transition duration-300 hover:bg-darckLilac hover:text-white"
            >
              Donate Now
            </Link>

            <div className="mt-4">
              <div className="flex justify-between items-center text-sm font-montserrat text-gray-600 mb-1.5">
                <span className="flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-lilac" />
                  Raised: <span className="font-semibold ml-1">{sym}{raised.toLocaleString()}</span>
                </span>
                <span className="text-gray-400">Goal: {sym}{donationGoal.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2.5">
                <div
                  className="bg-darkLilac h-2.5 rounded-full transition-all duration-500"
                  style={{ width: progress > 0 ? `${progress}%` : "4px" }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1 text-right">{progress}% of goal reached</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturedCausePlaceholder() {
  return (
    <div className="bg-gray-100 p-4 md:p-6 rounded-xl shadow-md h-full flex flex-col items-center justify-center text-center gap-3 min-h-[200px]">
      <Target className="w-10 h-10 text-gray-300" />
      <p className="text-gray-500 font-montserrat text-sm">No featured cause set yet.</p>
      <p className="text-gray-400 text-xs">Admins can mark any event as the featured cause from the dashboard.</p>
    </div>
  );
}
