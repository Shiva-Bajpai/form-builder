import { cn } from "@/lib/utils";
import * as React from "react";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  size?: "large" | "base" | "small" | "tiny";
};

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size = "large", ...props }, ref) => {
    const sizeClasses = {
      large: "text-4xl font-bold",
      base: "text-3xl font-bold",
      small: "text-2xl font-bold",
      tiny: "text-xl font-bold",
    };

    return (
      <h1 ref={ref} className={cn(sizeClasses[size], className)} {...props} />
    );
  }
);
Heading.displayName = "Heading";

export { Heading };
