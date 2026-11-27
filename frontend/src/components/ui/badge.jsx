import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#524480] text-white shadow hover:bg-[#3E3263]",
        secondary:
          "border-transparent bg-[#F3EEFA] text-[#524480] hover:bg-[#EAE2F7]",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-[#2A2345] border-[#DDD3F0]",
        blue: "border-transparent bg-[#E8F2FA] text-[#3B6998]",
        yellow: "border-[#FBEEC2] bg-[#FFF4C4] text-[#7A610A]",
        purple: "border-[#E4D9F7] bg-[#F1E8FB] text-[#5A3F8E]",
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
