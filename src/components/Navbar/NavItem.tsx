// "use client";

import Link from "next/link";
import { useState } from "react";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

interface NavItemProps {
  href: string;
  label: string;
  isActive: boolean;
}

// export const NavItem = ({ href, label, isActive }: NavItemProps) => {
//   return (
//     <>
//       <div>
//         <Link
//           href={href}
//           className={
//             "text-2xl font-medium transition-colors text-darckLilac font-roboto"
//           }
//         >
//           {label}
//         </Link>
//         <div
//           className={`h-1 bg-darckLilac ${isActive ? "w-full" : ""}`}
//         ></div>
//       </div>
//     </>
//   );
// };

export const NavItem = ({ href, label, isActive }: NavItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={href}
        className={`text-base font-normal transition-colors font-roboto ${
          isActive || isHovered ? "text-darckLilac" : "text-black"
        }`}
      >
        {label}
      </Link>
      <div
        className={`h-[2px] bg-darckLilac transition-all duration-300 mt-4 ${
          isActive || isHovered ? "w-full" : "w-0"
        }`}
      ></div>
    </div>
  );
};
