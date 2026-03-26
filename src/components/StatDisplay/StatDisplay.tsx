import * as React from "react";
import { KPICard, type KPICardProps } from "../KPICard";
import { cn } from "../../lib/utils";

export interface StatDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  items: KPICardProps[];
  cols?: 2 | 3 | 4;
}

const colsVariants: Record<2 | 3 | 4, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

const StatDisplay = React.forwardRef<HTMLDivElement, StatDisplayProps>(
  ({ items, cols = 4, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("grid gap-4", colsVariants[cols], className)}
      {...props}
    >
      {items.map((item, i) => (
        <KPICard key={i} {...item} />
      ))}
    </div>
  );
});
StatDisplay.displayName = "StatDisplay";

export { StatDisplay };
