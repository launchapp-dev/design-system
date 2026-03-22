import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const masonryVariants = cva("flex", {
  variants: {
    columns: {
      2: "flex-col sm:flex-row",
      3: "flex-col sm:flex-row",
      4: "flex-col sm:flex-row md:flex-row",
    },
    gap: {
      none: "gap-0",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
  },
  defaultVariants: {
    columns: 3,
    gap: "md",
  },
});

const masonryColumnCountVariants = cva("flex-1 flex flex-col", {
  variants: {
    gap: {
      none: "gap-0",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
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
}

const Masonry = React.forwardRef<HTMLDivElement, MasonryProps>(
  ({ className, columns = 3, gap = "md", children, ...props }, ref) => {
    const items = React.Children.toArray(children);
    const columnCount = columns ?? 3;
    
    const columnsArray = React.useMemo(() => {
      const cols: React.ReactNode[][] = Array.from(
        { length: columnCount },
        () => []
      );
      
      items.forEach((item, index) => {
        cols[index % columnCount].push(item);
      });
      
      return cols;
    }, [items, columnCount]);

    return (
      <div
        ref={ref}
        className={cn(masonryVariants({ columns, gap }), className)}
        role="list"
        aria-label="Masonry layout"
        {...props}
      >
        {columnsArray.map((columnItems, columnIndex) => (
          <div
            key={columnIndex}
            className={cn(masonryColumnCountVariants({ gap }))}
            role="listitem"
          >
            {columnItems}
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
        role="listitem"
        {...props}
      />
    );
  }
);

MasonryItem.displayName = "MasonryItem";

export {
  Masonry,
  MasonryItem,
  masonryVariants,
  masonryColumnCountVariants,
};
