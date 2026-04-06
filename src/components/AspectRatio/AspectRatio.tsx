import type * as React from "react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import { cn } from "@/lib/utils";

function AspectRatio({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> & { ref?: React.Ref<React.ComponentRef<typeof AspectRatioPrimitive.Root>> }) {
  return (
  <AspectRatioPrimitive.Root
    ref={ref}
    className={cn(className)}
    {...props}
  />
);
}
AspectRatio.displayName = AspectRatioPrimitive.Root.displayName;

export type AspectRatioProps = React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> & { ref?: React.Ref<React.ComponentRef<typeof AspectRatioPrimitive.Root>> };

export { AspectRatio };
