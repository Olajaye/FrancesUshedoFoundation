"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"; // Assuming you have this utility for classNames
import { ButtonHTMLAttributes, forwardRef } from "react";

// Define button variants using class-variance-authority for easy customization
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-montserrat font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "bg-lilac text-white hover:bg-darkLilac focus:ring-lilac",
        secondary:
          "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
        outline:
          "border-2 border-lilac text-lilac bg-transparent hover:bg-lilac/10 focus:ring-lilac",
        ghost: "text-lilac hover:bg-lilac/10 focus:ring-lilac",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
        icon: "p-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;
