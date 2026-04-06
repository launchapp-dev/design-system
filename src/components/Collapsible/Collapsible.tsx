import type * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { cn } from "../../lib/utils";

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

function CollapsibleContent({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content> & { ref?: React.Ref<React.ComponentRef<typeof CollapsiblePrimitive.Content>> }) {
  return (
  <CollapsiblePrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
      className
    )}
    {...props}
  />
);
}
CollapsibleContent.displayName = CollapsiblePrimitive.Content.displayName;

export type CollapsibleProps = React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>;
export type CollapsibleTriggerProps = React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger>;
export type CollapsibleContentProps = React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content> & { ref?: React.Ref<React.ComponentRef<typeof CollapsiblePrimitive.Content>> };

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
