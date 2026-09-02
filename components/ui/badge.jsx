import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-amber-600 text-white shadow hover:bg-amber-700",
        approved:
          "border-transparent bg-emerald-500 text-white shadow hover:bg-emerald-600",
        pending:
          "border-transparent bg-amber-500 text-white shadow hover:bg-amber-600 animate-pulse",
        rejected:
          "border-transparent bg-rose-600 text-white shadow hover:bg-rose-700",
        golden:
          "border border-amber-400 bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-950 shadow-md",
        outline: "text-gray-900 border border-gray-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
