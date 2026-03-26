import * as React from "react";
import * as ToolbarPrimitive from "@radix-ui/react-toolbar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const toolbarButtonVariants = cva(
  "inline-flex items-center justify-center rounded px-2 py-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-transparent hover:bg-accent hover:text-accent-foreground",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "h-7 px-2 text-xs",
        md: "h-9 px-3 text-sm",
        lg: "h-10 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const toolbarToggleItemVariants = cva(
  "inline-flex items-center justify-center rounded px-2 py-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      size: {
        sm: "h-7 px-2 text-xs",
        md: "h-9 px-3 text-sm",
        lg: "h-10 px-4 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

function ToolbarRoot({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root> & { ref?: React.Ref<React.ComponentRef<typeof ToolbarPrimitive.Root>> }) {
  return (
  <ToolbarPrimitive.Root
    ref={ref}
    className={cn(
      "flex items-center gap-1 rounded-md border border-border bg-background p-1",
      className
    )}
    {...props}
  />
);
}
ToolbarRoot.displayName = ToolbarPrimitive.Root.displayName;

export interface ToolbarButtonProps
  extends React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Button>,
    VariantProps<typeof toolbarButtonVariants> {}

function ToolbarButton({ className, variant, size, ref, ...props }: ToolbarButtonProps & { ref?: React.Ref<React.ComponentRef<typeof ToolbarPrimitive.Button>> }) {
  return (
  <ToolbarPrimitive.Button
    ref={ref}
    className={cn(toolbarButtonVariants({ variant, size }), className)}
    {...props}
  />
);
}
ToolbarButton.displayName = ToolbarPrimitive.Button.displayName;

function ToolbarLink({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Link> & { ref?: React.Ref<React.ComponentRef<typeof ToolbarPrimitive.Link>> }) {
  return (
  <ToolbarPrimitive.Link
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded px-3 py-1 text-sm font-medium text-foreground underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      className
    )}
    {...props}
  />
);
}
ToolbarLink.displayName = ToolbarPrimitive.Link.displayName;

function ToolbarSeparator({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator> & { ref?: React.Ref<React.ComponentRef<typeof ToolbarPrimitive.Separator>> }) {
  return (
  <ToolbarPrimitive.Separator
    ref={ref}
    className={cn("mx-1 w-px self-stretch bg-border", className)}
    {...props}
  />
);
}
ToolbarSeparator.displayName = ToolbarPrimitive.Separator.displayName;

function ToolbarToggleGroup({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleGroup> & { ref?: React.Ref<React.ComponentRef<typeof ToolbarPrimitive.ToggleGroup>> }) {
  return (
  <ToolbarPrimitive.ToggleGroup
    ref={ref}
    className={cn("flex items-center gap-0.5", className)}
    {...props}
  />
);
}
ToolbarToggleGroup.displayName = ToolbarPrimitive.ToggleGroup.displayName;

export interface ToolbarToggleItemProps
  extends React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleItem>,
    VariantProps<typeof toolbarToggleItemVariants> {}

function ToolbarToggleItem({ className, size, ref, ...props }: ToolbarToggleItemProps & { ref?: React.Ref<React.ComponentRef<typeof ToolbarPrimitive.ToggleItem>> }) {
  return (
  <ToolbarPrimitive.ToggleItem
    ref={ref}
    className={cn(toolbarToggleItemVariants({ size }), className)}
    {...props}
  />
);
}
ToolbarToggleItem.displayName = ToolbarPrimitive.ToggleItem.displayName;

export type ToolbarButtonVariants = VariantProps<typeof toolbarButtonVariants>;
export type ToolbarToggleItemVariants = VariantProps<typeof toolbarToggleItemVariants>;

export {
  ToolbarRoot,
  ToolbarButton,
  ToolbarLink,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
  toolbarButtonVariants,
  toolbarToggleItemVariants,
};
