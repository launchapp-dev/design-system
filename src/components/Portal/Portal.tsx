import type * as React from "react";
import * as PortalPrimitive from "@radix-ui/react-portal";
import { cn } from "@/lib/utils";

export interface PortalProps
  extends React.ComponentPropsWithoutRef<typeof PortalPrimitive.Root> {}

function Portal({ className, ref, ...props }: PortalProps & { ref?: React.Ref<React.ComponentRef<typeof PortalPrimitive.Root>> }) {
  return (
  <PortalPrimitive.Root
    ref={ref}
    className={cn(className)}
    {...props}
  />
);
}
Portal.displayName = "Portal";

export { Portal };
