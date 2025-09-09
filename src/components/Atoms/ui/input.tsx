import * as React from "react";

import { cn } from "@/utils/helpers/CN";
import { cva } from "class-variance-authority";

export type InputSize = "default" | "sm" | "lg" | "icon";

const inputVariants = cva(
  "flex h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default: "bg-black/30 text-holder hover:bg-black/40 border-faded",
      },
      size: {
        default: "h-13 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type InputProps = Omit<React.ComponentProps<"input">, "size"> & {
  size?: InputSize;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size = "default", ...props }, ref) => {
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
