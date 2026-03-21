import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const masonryVariants = cva("flex", {
  variants: {
    cols: {
      1: "flex-col",
      2: "flex-row [&>*]:w-1/2",
      3: "flex-row [&>*]:w-1/3",
      4: "flex-row [&>*]:w-1/4",
      5: "flex-row [&>*]:w-1/5",
      6: "flex-row [&>*]:w-1/6",
    },
    gap: {
      none: "[&>*]:gap-0",
      sm: "[&>*]:gap-2",
      md: "[&>*]:gap-4",
      lg: "[&>*]:gap-6",
      xl: "[&>*]:gap-8",
    },
  },
  defaultVariants: {
    cols: 3,
    gap: "md",
  },
});

export interface MasonryProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof masonryVariants> {
  children: React.ReactNode[];
  sequential?: boolean;
}

const Masonry = React.forwardRef<HTMLDivElement, MasonryProps>(
  ({ className, cols = 3, gap = "md", children, sequential = false, ...props }, ref) => {
    const childArray = React.useMemo(
      () => React.Children.toArray(children).filter(Boolean),
      [children]
    );

    const columns = React.useMemo(() => {
      const colCount = cols ?? 3;
      const colsArray: React.ReactNode[][] = Array.from(
        { length: colCount },
        () => []
      );

      if (sequential) {
        childArray.forEach((child, index) => {
          colsArray[index % colCount].push(child);
        });
      } else {
        const heights = Array(colCount).fill(0);
        childArray.forEach((child) => {
          const minHeightIndex = heights.indexOf(Math.min(...heights));
          colsArray[minHeightIndex].push(child);
          heights[minHeightIndex] += 1;
        });
      }

      return colsArray;
    }, [childArray, cols, sequential]);

    const gapValue = {
      none: "0",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
    }[gap ?? "md"];

    return (
      <div
        ref={ref}
        className={cn(masonryVariants({ cols, gap }), className)}
        {...props}
      >
        {columns.map((column, colIndex) => (
          <div
            key={colIndex}
            className="flex flex-col"
            style={{ gap: gapValue }}
          >
            {column.map((item, itemIndex) => (
              <React.Fragment key={`${colIndex}-${itemIndex}`}>
                {item}
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    );
  }
);
Masonry.displayName = "Masonry";

export interface MasonryItemProps extends React.HTMLAttributes<HTMLDivElement> {}

const MasonryItem = React.forwardRef<HTMLDivElement, MasonryItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("break-inside-avoid", className)}
        {...props}
      />
    );
  }
);
MasonryItem.displayName = "MasonryItem";

export { Masonry, MasonryItem, masonryVariants };
