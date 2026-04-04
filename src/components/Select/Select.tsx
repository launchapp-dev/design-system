import type * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const selectTriggerVariants = cva(
  "flex w-full items-center justify-between gap-2 rounded-md border border-input bg-background text-foreground ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
  {
    variants: {
      size: {
        sm: "h-11 md:h-8 px-3 md:px-2.5 text-sm md:text-xs min-h-[44px] md:min-h-0",
        md: "h-12 md:h-10 px-3 py-3 md:py-2 text-sm min-h-[44px] md:min-h-0",
        lg: "h-12 px-4 text-base min-h-[44px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const SelectRoot = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

function SelectTrigger({ className, size, children, ref, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> &
    VariantProps<typeof selectTriggerVariants> & { ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.Trigger>> }) {
  return (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(selectTriggerVariants({ size }), className)}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
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
        className="shrink-0 opacity-50"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
);
}
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

function SelectScrollUpButton({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton> & { ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.ScrollUpButton>> }) {
  return (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1 text-muted-foreground",
      className
    )}
    {...props}
  >
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
      aria-hidden="true"
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  </SelectPrimitive.ScrollUpButton>
);
}
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

function SelectScrollDownButton({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton> & { ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.ScrollDownButton>> }) {
  return (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1 text-muted-foreground",
      className
    )}
    {...props}
  >
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
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  </SelectPrimitive.ScrollDownButton>
);
}
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

function SelectContent({ className, children, position = "popper", ref, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & { ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.Content>> }) {
  return (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-scale-in data-[state=closed]:animate-fade-out",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
);
}
SelectContent.displayName = SelectPrimitive.Content.displayName;

function SelectLabel({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> & { ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.Label>> }) {
  return (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-xs font-semibold text-muted-foreground", className)}
    {...props}
  />
);
}
SelectLabel.displayName = SelectPrimitive.Label.displayName;

function SelectItem({ className, children, ref, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & { ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.Item>> }) {
  return (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-4 md:py-1.5 pl-10 md:pl-8 pr-3 md:pr-2 text-base md:text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 min-h-[44px] md:min-h-0",
      className
    )}
    {...props}
  >
    <span className="absolute left-3 md:left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
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
          aria-hidden="true"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
);
}
SelectItem.displayName = SelectPrimitive.Item.displayName;

function SelectSeparator({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> & { ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.Separator>> }) {
  return (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
);
}
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export type SelectRootProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>;
export type SelectGroupProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group>;
export type SelectValueProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value>;
export type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & VariantProps<typeof selectTriggerVariants> & { ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.Trigger>> };
export type SelectContentProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & { ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.Content>> };
export type SelectLabelProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> & { ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.Label>> };
export type SelectItemProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & { ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.Item>> };
export type SelectSeparatorProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> & { ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.Separator>> };
export type SelectScrollUpButtonProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton> & { ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.ScrollUpButton>> };
export type SelectScrollDownButtonProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton> & { ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.ScrollDownButton>> };

export type SelectTriggerVariants = VariantProps<typeof selectTriggerVariants>;

export {
  SelectRoot,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
