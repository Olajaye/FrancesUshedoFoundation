"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { LuLayoutDashboard } from "react-icons/lu";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <Image
        src={"/logo transp bg-01.png"}
        alt={"Logo"}
        width={200}
        height={200}
        className="w-auto h-[100px]"
      />
      {/* <span className="font-semibold text-xl hidden md:inline-block">
        The Frances Ushedo Foundation
      </span> */}
    </Link>
  );
};
