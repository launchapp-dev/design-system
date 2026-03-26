import * as React from "react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import { cn } from "@/lib/utils";

const AspectRatio = React.forwardRef<React.Ref<React.ComponentRef<typeof AspectRatioPrimitive.Root>>, React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>>(
  ({ className ...props }, ref) => {
  return (
  <AspectRatioPrimitive.Root
    ref={ref}
    className={cn(className)}
    {...props}
  />
);
}
);
AspectRatio.displayName = AspectRatioPrimitive.Root.displayName;

export type AspectRatioProps = React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> & { ref?: React.Ref<React.ComponentRef<typeof AspectRatioPrimitive.Root>> };

export { AspectRatio };
