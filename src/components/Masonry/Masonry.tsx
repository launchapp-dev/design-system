import * as React from "react";
import { cn } from "../../lib/utils";

export interface MasonryProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5;
}

const colsMap: Record<number, string> = {
  1: "columns-1",
  2: "columns-2",
  3: "columns-3",
  4: "columns-4",
  5: "columns-5",
};

function Masonry({ className, cols = 3, ref, ...props }: MasonryProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn(colsMap[cols], "gap-4", className)}
      {...props}
    />
  );
}
Masonry.displayName = "Masonry";

export { Masonry };
