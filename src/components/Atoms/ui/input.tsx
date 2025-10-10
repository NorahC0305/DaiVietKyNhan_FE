'use client'

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/utils/CN";
import { cva } from "class-variance-authority";

export type InputSize = "default" | "sm" | "lg" | "icon";

const inputVariants = cva(
  "flex h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      size: {
        default: "h-13 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

type InputProps = Omit<React.ComponentProps<"input">, "size"> & {
  size?: InputSize;
  togglePassword?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size = "default", togglePassword = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState<boolean>(true);
    const isPasswordType = type === "password";

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    if (isPasswordType && togglePassword) {
      return (
        <div className="relative">
          <input
            type={showPassword ? "password" : "text"}
            className={cn(inputVariants({ size: size as InputSize }), "pr-10", className)}
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

    return (
      <input
        type={type}
        className={cn(inputVariants({ size: size as InputSize }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
