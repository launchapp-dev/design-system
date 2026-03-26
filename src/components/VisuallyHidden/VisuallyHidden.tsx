import * as React from "react";
import * as VisuallyHiddenPrimitive from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/utils";

export interface VisuallyHiddenProps
  extends React.ComponentPropsWithoutRef<typeof VisuallyHiddenPrimitive.Root> {}

const VisuallyHidden = React.forwardRef<React.Ref<React.ComponentRef<typeof VisuallyHiddenPrimitive.Root>>, VisuallyHiddenProps>(
  ({ className ...props }, ref) => {
  return (
  <VisuallyHiddenPrimitive.Root
    ref={ref}
    className={cn(className)}
    {...props}
  />
);
}
);
VisuallyHidden.displayName = "VisuallyHidden";

export { VisuallyHidden };
