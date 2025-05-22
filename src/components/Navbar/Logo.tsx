"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2 relative w-[27%]", className)}
    >
      <Image
        src={"/logoNew.png"}
        alt={"Logo"}
        width={200}
        height={200}
        className="w-auto h-[80px]"
      />
      <span className="text-base absolute right-5 bottom-0 font-normal font-roboto text-black italic hidden lg:inline-block">
        The Frances Ushedo Foundation
      </span>
    </Link>
  );
};
