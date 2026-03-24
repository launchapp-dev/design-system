import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { getPluginRegistry } from "../../lib/plugin-system";

const baseBadgeConfig = {
  variants: {
    variant: {
      default: "border-transparent bg-primary text-primary-foreground",
      secondary: "border-transparent bg-secondary text-secondary-foreground",
      outline: "border-border text-foreground",
      destructive: "border-transparent bg-destructive text-destructive-foreground",
    },
  },
  defaultVariants: {
    variant: "default" as const,
  },
} as const;

const baseBadgeClasses =
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

const badgeVariants = cva(baseBadgeClasses, baseBadgeConfig);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Get badge variants with plugin support
 * Returns the base variants merged with any registered plugins
 */
export function getBadgeVariants() {
  const registry = getPluginRegistry();
  const mergedVariants = registry.mergeVariants("Badge", baseBadgeConfig.variants);

  return cva(baseBadgeClasses, {
    ...baseBadgeConfig,
    variants: mergedVariants,
  });
}

/**
 * Badge component. By default, no ARIA role is applied.
 * Pass `role="status"` for live-updating badges (politely announced by screen readers)
 * or `role="alert"` for urgent announcements that require immediate attention.
 */
function Badge({ className, variant, ref, ...props }: BadgeProps & { ref?: React.Ref<HTMLDivElement> }) {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    );
  }
Badge.displayName = "Badge";

export { Badge, badgeVariants };
