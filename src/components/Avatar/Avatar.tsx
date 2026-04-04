import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../../lib/utils";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-14 w-14",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

function Avatar({
  className,
  size,
  ref,
  ...props
}: AvatarProps & {
  ref?: React.Ref<React.ComponentRef<typeof AvatarPrimitive.Root>>;
}) {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(avatarVariants({ size }), className)}
      {...props}
    />
  );
}
Avatar.displayName = AvatarPrimitive.Root.displayName;

export interface AvatarImageProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {
  alt: string;
}

function AvatarImage({
  className,
  alt,
  ref,
  ...props
}: AvatarImageProps & {
  ref?: React.Ref<React.ComponentRef<typeof AvatarPrimitive.Image>>;
}) {
  if (process.env.NODE_ENV !== "production" && !alt) {
    console.warn(
      "AvatarImage: `alt` prop is required for WCAG 1.1.1 compliance.",
    );
  }
  return (
    <AvatarPrimitive.Image
      ref={ref}
      alt={alt}
      className={cn("aspect-square h-full w-full object-cover", className)}
      {...props}
    />
  );
}
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

function AvatarFallback({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
  ref?: React.Ref<React.ComponentRef<typeof AvatarPrimitive.Fallback>>;
}) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-medium",
        className,
      )}
      {...props}
    />
  );
}
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export type AvatarVariants = VariantProps<typeof avatarVariants>;

export { Avatar, AvatarFallback, AvatarImage };
