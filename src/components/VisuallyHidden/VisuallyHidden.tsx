import type * as React from "react";
import * as VisuallyHiddenPrimitive from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/utils";

export interface VisuallyHiddenProps
  extends React.ComponentPropsWithoutRef<typeof VisuallyHiddenPrimitive.Root> {}

function VisuallyHidden({
  className,
  ref,
  ...props
}: VisuallyHiddenProps & {
  ref?: React.Ref<React.ComponentRef<typeof VisuallyHiddenPrimitive.Root>>;
}) {
  return <VisuallyHiddenPrimitive.Root ref={ref} className={cn(className)} {...props} />;
}
VisuallyHidden.displayName = "VisuallyHidden";

export { VisuallyHidden };
