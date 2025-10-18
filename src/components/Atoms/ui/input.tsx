"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/utils/CN";
import { cva } from "class-variance-authority";

export type InputSize = "default" | "sm" | "lg" | "icon";

const inputVariants = cva(
  "flex h-10 w-full rounded-md border px-3 py-2 text-base text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-gray-900 focus:border-black",
  {
    variants: {
      size: {
        default: "h-13 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
      color: {
        default: "text-gray-100",
        black: "text-black",
      },
    },
    defaultVariants: {
      size: "default",
      color: "default",
    },
  }
);

type InputProps = Omit<React.ComponentProps<"input">, "size"> & {
  size?: InputSize;
  togglePassword?: boolean;
  color?: "default" | "black";
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      size = "default",
      togglePassword = false,
      color = "default",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState<boolean>(true);
    const isPasswordType = type === "password";

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    // Helper function to handle custom class overrides
    const getInputClasses = (baseVariants: string) => {
      if (!className) return baseVariants;

      let modifiedClasses = baseVariants;

      // Remove default rounded classes if custom rounded classes are provided
      const hasCustomRounded = /rounded-[\w-]+/.test(className);
      if (hasCustomRounded) {
        modifiedClasses = modifiedClasses.replace(/rounded-[\w-]+/g, "");
      }

      // Remove default border color classes if custom border classes are provided
      const hasCustomBorder =
        className.includes("border-") &&
        (/border-[a-z]+-\d+/.test(className) ||
          /focus:border-[a-z]+-\d+/.test(className) ||
          /hover:border-[a-z]+-\d+/.test(className));

      if (hasCustomBorder) {
        // Remove specific border-gray-900 and focus:border-black that are hardcoded in inputVariants
        modifiedClasses = modifiedClasses.replace(/\bborder-gray-900\b/g, "");
        modifiedClasses = modifiedClasses.replace(
          /\bfocus:border-black\b/g,
          ""
        );
        modifiedClasses = modifiedClasses.replace(/\s+/g, " ").trim(); // Clean up extra spaces
      }

      return modifiedClasses;
    };

    if (isPasswordType && togglePassword) {
      const baseClasses = inputVariants({
        size: size as InputSize,
        color: color as "default" | "black",
      });
      const finalClasses = getInputClasses(baseClasses);

      return (
        <div className="relative">
          <input
            type={showPassword ? "password" : "text"}
            className={cn(finalClasses, "pr-10", className)}
            ref={ref}
            {...props}
          />
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400 focus:outline-none cursor-pointer"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      );
    }

    const baseClasses = inputVariants({
      size: size as InputSize,
      color: (color as "default" | "black") ?? "default",
    });
    const finalClasses = getInputClasses(baseClasses);

    return (
      <input
        type={type}
        className={cn(finalClasses, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
