import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "../../lib/utils";

const Separator = React.forwardRef<React.Ref<React.ComponentRef<typeof SeparatorPrimitive.Root>>, React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>>(
  ({ className, orientation = "horizontal", decorative = true ...props }, ref) => {
  return (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
      className
    )}
    {...props}
  />
);
}
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export type SeparatorProps = React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & { ref?: React.Ref<React.ComponentRef<typeof SeparatorPrimitive.Root>> };

export { Separator };
