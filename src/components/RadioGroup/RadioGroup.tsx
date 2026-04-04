import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../../lib/utils";

const radioGroupVariants = cva("grid gap-2", {
  variants: {
    orientation: {
      vertical: "grid-cols-1",
      horizontal: "grid-flow-col auto-cols-max items-center",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export interface RadioGroupProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
      "orientation"
    >,
    VariantProps<typeof radioGroupVariants> {}

function RadioGroup({
  className,
  orientation,
  ref,
  ...props
}: RadioGroupProps & {
  ref?: React.Ref<React.ComponentRef<typeof RadioGroupPrimitive.Root>>;
}) {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={cn(radioGroupVariants({ orientation }), className)}
      orientation={orientation ?? "vertical"}
      {...props}
    />
  );
}

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const radioGroupItemVariants = cva(
  "aspect-square rounded-full border border-primary text-primary ring-offset-background transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-5 w-5 md:h-3.5 md:w-3.5 min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0 p-2.5 md:p-0",
        md: "h-6 w-6 md:h-4 md:w-4 min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0 p-2.5 md:p-0",
        lg: "h-6 w-6 min-h-[44px] min-w-[44px] p-2.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioGroupItemVariants> {}

function RadioGroupItem({
  className,
  size,
  ref,
  ...props
}: RadioGroupItemProps & {
  ref?: React.Ref<React.ComponentRef<typeof RadioGroupPrimitive.Item>>;
}) {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(radioGroupItemVariants({ size }), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <svg
          aria-hidden="true"
          viewBox="0 0 8 8"
          className={cn(
            "fill-current",
            size === "sm"
              ? "h-1.5 w-1.5 md:h-1.5 md:w-1.5"
              : size === "lg"
                ? "h-2.5 w-2.5"
                : "h-2 w-2 md:h-2 md:w-2",
          )}
        >
          <circle cx="4" cy="4" r="4" />
        </svg>
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export type RadioGroupVariants = VariantProps<typeof radioGroupVariants>;
export type RadioGroupItemVariants = VariantProps<
  typeof radioGroupItemVariants
>;

export { RadioGroup, RadioGroupItem };
