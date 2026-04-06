import type * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "../../lib/utils";

const AccordionRoot = AccordionPrimitive.Root;

function AccordionItem({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & { ref?: React.Ref<React.ComponentRef<typeof AccordionPrimitive.Item>> }) {
  return (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b border-border", className)}
    {...props}
  />
);
}
AccordionItem.displayName = AccordionPrimitive.Item.displayName;

function AccordionTrigger({ className, children, ref, ...props }: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & { ref?: React.Ref<React.ComponentRef<typeof AccordionPrimitive.Trigger>> }) {
  return (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0 transition-transform duration-200"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);
}
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

function AccordionContent({ className, children, ref, ...props }: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & { ref?: React.Ref<React.ComponentRef<typeof AccordionPrimitive.Content>> }) {
  return (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
);
}
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export type AccordionRootProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>;
export type AccordionItemProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & { ref?: React.Ref<React.ComponentRef<typeof AccordionPrimitive.Item>> };
export type AccordionTriggerProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & { ref?: React.Ref<React.ComponentRef<typeof AccordionPrimitive.Trigger>> };
export type AccordionContentProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & { ref?: React.Ref<React.ComponentRef<typeof AccordionPrimitive.Content>> };

export { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent };
