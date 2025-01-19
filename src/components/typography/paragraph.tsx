import { cn } from "@/lib/utils";
import * as React from "react";

type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement> & {
  size?: "large" | "base" | "small" | "tiny";
};

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, size = "large", ...props }, ref) => {
    const sizeClasses = {
      large: "text-lg font-normal",
      base: "text-base font-normal",
      small: "text-sm font-normal",
      tiny: "text-xs font-normal",
    };

    return (
      <p ref={ref} className={cn(sizeClasses[size], className)} {...props} />
    );
  }
);
Paragraph.displayName = "Paragraph";

export { Paragraph };
