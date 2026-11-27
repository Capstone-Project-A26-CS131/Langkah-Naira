import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#524480] text-white shadow hover:bg-[#3E3263]",
        primary:
          "bg-[#524480] text-white shadow hover:bg-[#3E3263]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-[#DDD3F0] bg-white text-[#2A2345] shadow-sm hover:bg-[#F3EEFA]",
        secondary:
          "bg-[#F3EEFA] text-[#524480] shadow-sm hover:bg-[#EAE2F7]",
        ghost: "text-[#2A2345] hover:bg-[#F3EEFA]",
        link: "text-[#3B6998] underline-offset-4 hover:underline",
        blue: "bg-[#3B6998] text-white shadow hover:bg-[#2C537C]",
        yellow: "bg-[#FFF4C4] text-[#7A610A] border border-[#FBEEC2] shadow hover:bg-[#FFEAA6]",
        green: "bg-[#2EC300] text-slate-900 shadow hover:bg-[#37FA00]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-[11px]",
        lg: "h-11 px-7 text-sm",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
