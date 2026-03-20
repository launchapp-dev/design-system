import * as React from "react";
import * as FocusScopePrimitive from "@radix-ui/react-focus-scope";
import { cn } from "@/lib/utils";

export interface FocusScopeProps
  extends React.ComponentPropsWithoutRef<typeof FocusScopePrimitive.Root> {}

function FocusScope({ className, ref, ...props }: FocusScopeProps & { ref?: React.Ref<React.ComponentRef<typeof FocusScopePrimitive.Root>> }) {
  return (
  <FocusScopePrimitive.Root
    ref={ref}
    className={cn(className)}
    {...props}
  />
);
}
FocusScope.displayName = "FocusScope";

export { FocusScope };
