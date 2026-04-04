import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../../lib/utils";

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
  {
    variants: {
      size: {
        sm: "h-6 w-11 md:h-4 md:w-7 min-h-[44px] md:min-h-0 p-2 md:p-0",
        md: "h-7 w-12 md:h-5 md:w-9 min-h-[44px] md:min-h-0 p-2 md:p-0",
        lg: "h-7 w-12 min-h-[44px] p-2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const switchThumbVariants = cva(
  "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform",
  {
    variants: {
      size: {
        sm: "h-3 w-3 data-[state=checked]:translate-x-5 md:data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-2 md:data-[state=unchecked]:translate-x-0",
        md: "h-4 w-4 data-[state=checked]:translate-x-5 md:data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-2 md:data-[state=unchecked]:translate-x-0",
        lg: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {}

function Switch({
  className,
  size,
  ref,
  ...props
}: SwitchProps & {
  ref?: React.Ref<React.ComponentRef<typeof SwitchPrimitive.Root>>;
}) {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      className={cn(switchVariants({ size }), className)}
      {...props}
    >
      <SwitchPrimitive.Thumb className={cn(switchThumbVariants({ size }))} />
    </SwitchPrimitive.Root>
  );
}

Switch.displayName = SwitchPrimitive.Root.displayName;

export type SwitchVariants = VariantProps<typeof switchVariants>;
export type SwitchThumbVariants = VariantProps<typeof switchThumbVariants>;

export { Switch };
