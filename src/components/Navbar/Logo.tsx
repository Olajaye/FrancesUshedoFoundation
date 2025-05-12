"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link href="/" className={cn("flex items-center gap-2 relative", className)}>
      <Image
        src={"/logoNew.png"}
        alt={"Logo"}
        width={200}
        height={200}
        className="w-auto h-[100px]"
      />
      <span className="text-3xl absolute right-2 bottom-0 font-extrabold font-EduQld text-[#a564af]  hidden md:inline-block">
        TFUF
      </span>
    </Link>
  );
};
