import * as React from "react";
import * as FocusScopePrimitive from "@radix-ui/react-focus-scope";
import { cn } from "@/lib/utils";

export interface FocusScopeProps
  extends React.ComponentPropsWithoutRef<typeof FocusScopePrimitive.Root> {}

const FocusScope = React.forwardRef<
  React.ElementRef<typeof FocusScopePrimitive.Root>,
  FocusScopeProps
>(({ className, ...props }, ref) => (
  <FocusScopePrimitive.Root
    ref={ref}
    className={cn(className)}
    {...props}
  />
));
FocusScope.displayName = "FocusScope";

export { FocusScope };
