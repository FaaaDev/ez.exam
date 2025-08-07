import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive relative z-10",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border hover:border-border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  hasRing = true,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    hasRing?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <div className="relative group">
      {hasRing && (
        <div
          className={`w-full ${
            size == "lg" ? "h-9" : size == "icon" ? "h-7.5" : "h-6"
          } absolute inset-0 top-3 rounded-md ${
            variant === "outline"
              ? "bg-[#d9d9d9]"
              : variant === "default"
              ? "bg-[#ff4400]"
              : "bg-[#d9d9d9]"
          }`}
        />
      )}
      <Comp
        data-slot="button"
        className={cn(
          buttonVariants({ variant, size, className }),
          "relative top-0",
          hasRing && !props.disabled ? "group-hover:top-1" : "",
          props.disabled ? "group-hover:cursor-not-allowed" : "group-hover:cursor-pointer"
        )}
        {...props}
      />
    </div>
  );
}

export { Button, buttonVariants };
