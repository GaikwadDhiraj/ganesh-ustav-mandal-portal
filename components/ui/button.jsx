import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:pointer-events-none disabled:opacity-50 active:scale-95 cursor-pointer shadow-sm",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-orange-600 via-amber-600 to-amber-500 text-white hover:from-orange-700 hover:to-amber-600 shadow-orange-500/20",
        golden:
          "bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-gray-950 font-bold hover:brightness-110 shadow-amber-500/30 border border-amber-300",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 shadow-red-600/20",
        outline:
          "border-2 border-amber-600 text-amber-700 bg-transparent hover:bg-amber-50",
        secondary:
          "bg-amber-100 text-amber-900 hover:bg-amber-200",
        ghost:
          "hover:bg-amber-100/50 text-gray-700 hover:text-amber-900 shadow-none",
        link: "text-orange-600 underline-offset-4 hover:underline shadow-none",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-lg px-3 text-xs",
        lg: "h-13 rounded-2xl px-8 text-base font-bold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
