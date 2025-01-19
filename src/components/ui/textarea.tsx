import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-[8px] border border-input bg-transparent p-2 text-base placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-0 disabled:cursor-not-allowed max-md:text-xs resize-none disabled:bg-peerlistHoverBackground md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
