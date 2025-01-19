import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex max-h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:bg-peerlistHoverBackground md:text-sm overflow-wrap-break-word",
  {
    variants: {
      variant: {
        default: "",
        other:
          "border-none p-0 rounded-none font-semibold shadow-none outline-none focus-visible:ring-0",
        small:
          "border-none p-0 text-xs rounded-none shadow-none outline-none focus-visible:ring-0",
        nofilled:
          "text-xs px-2 py-1.5 shadow-none outline-none focus-visible:ring-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  asChild?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, asChild = false, ...props }, ref) => {
    const Comp = asChild ? "span" : "input";
    return (
      <Comp
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
