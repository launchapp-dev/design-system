import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const masonryVariants = cva("flex", {
  variants: {
    columns: {
      1: "",
      2: "gap-4",
      3: "gap-4",
      4: "gap-4",
      5: "gap-4",
    },
    gap: {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
    },
  },
  defaultVariants: {
    columns: 3,
    gap: "md",
  },
});

const masonryColumnVariants = cva("flex-1 flex flex-col", {
  variants: {
    gap: {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
    },
  },
  defaultVariants: {
    gap: "md",
  },
});

export interface MasonryProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof masonryVariants> {
  children: React.ReactNode[];
  sequential?: boolean;
}

interface MasonryItemProps {
  children: React.ReactNode;
  originalIndex: number;
}

const MasonryItem = React.forwardRef<
  HTMLDivElement,
  MasonryItemProps & React.HTMLAttributes<HTMLDivElement>
>(({ children, originalIndex, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("break-inside-avoid", className)}
    data-masonry-index={originalIndex}
    {...props}
  >
    {children}
  </div>
));
MasonryItem.displayName = "MasonryItem";

function distributeItems<T>(
  items: T[],
  columnCount: number,
  sequential: boolean
): T[][] {
  const columns: T[][] = Array.from({ length: columnCount }, () => []);

  if (sequential) {
    items.forEach((item, index) => {
      columns[index % columnCount].push(item);
    });
  } else {
    const columnHeights = new Array(columnCount).fill(0);
    items.forEach((item, _index) => {
      const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
      columns[shortestColumn].push(item);
      columnHeights[shortestColumn] += 1;
    });
  }

  return columns;
}

const Masonry = React.forwardRef<HTMLDivElement, MasonryProps>(
  (
    { className, columns = 3, gap = "md", children, sequential = false, ...props },
    ref
  ) => {
    const items = React.useMemo(() => {
      const childArray = React.Children.toArray(children);
      return childArray.map((child, index) => ({
        child,
        originalIndex: index,
      }));
    }, [children]);

    const columnCount = typeof columns === "number" ? columns : 3;
    const distributedItems = React.useMemo(
      () => distributeItems(items, columnCount, sequential),
      [items, columnCount, sequential]
    );

    return (
      <div
        ref={ref}
        className={cn(masonryVariants({ gap }), className)}
        role="grid"
        aria-label="Masonry grid layout"
        {...props}
      >
        {distributedItems.map((columnItems, columnIndex) => (
          <div
            key={columnIndex}
            className={cn(
              masonryColumnVariants({ gap }),
              columnCount > 1 ? "" : "w-full"
            )}
            role="row"
          >
            {columnItems.map(({ child, originalIndex }) => (
              <MasonryItem key={originalIndex} originalIndex={originalIndex}>
                {child}
              </MasonryItem>
            ))}
          </div>
        ))}
      </div>
    );
  }
);
Masonry.displayName = "Masonry";

const MasonryCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "elevated" | "outlined";
  }
>(({ className, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-[--la-radius] bg-card text-card-foreground overflow-hidden",
      {
        default: "border border-border",
        elevated: "shadow-md",
        outlined: "border-2 border-border bg-transparent",
      }[variant],
      className
    )}
    {...props}
  />
));
MasonryCard.displayName = "MasonryCard";

export type MasonryVariantsProps = VariantProps<typeof masonryVariants>;

export type MasonryVariants = VariantProps<typeof masonryVariants>;
export type MasonryColumnVariants = VariantProps<typeof masonryColumnVariants>;

export {
  Masonry,
  MasonryCard,
  MasonryItem,
  masonryVariants,
  masonryColumnVariants,
};
