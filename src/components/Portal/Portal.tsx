import * as React from "react";
import * as PortalPrimitive from "@radix-ui/react-portal";
import { cn } from "@/lib/utils";

export interface PortalProps
  extends React.ComponentPropsWithoutRef<typeof PortalPrimitive.Root> {}

const Portal = React.forwardRef<
  React.ElementRef<typeof PortalPrimitive.Root>,
  PortalProps
>(({ className, ...props }, ref) => (
  <PortalPrimitive.Root
    ref={ref}
    className={cn(className)}
    {...props}
  />
));
Portal.displayName = "Portal";

export { Portal };
