import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const timelineDisplayVariants = cva("flex", {
  variants: {
    orientation: {
      vertical: "flex-col",
      horizontal: "flex-row",
    },
    size: {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
    },
  },
  defaultVariants: {
    orientation: "vertical",
    size: "md",
  },
});

const timelineDisplayItemVariants = cva("relative", {
  variants: {
    orientation: {
      vertical: "pl-8 pb-8 last:pb-0",
      horizontal: "pt-8 pr-4 last:pr-0",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export interface TimelineDisplayItem {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
  icon?: React.ReactNode;
  status?: "pending" | "in-progress" | "completed" | "error";
}

export interface TimelineDisplayProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof timelineDisplayVariants> {
  items: TimelineDisplayItem[];
  animated?: boolean;
  onItemClick?: (item: TimelineDisplayItem) => void;
}

function TimelineDisplay({
  className,
  orientation,
  size,
  items,
  animated = true,
  onItemClick,
  ref,
  ...props
}: TimelineDisplayProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn(timelineDisplayVariants({ orientation, size }), className)}
      role="list"
      aria-label="Timeline"
      {...props}
    >
      {items.map((item, index) => (
        <TimelineDisplayItemComponent
          key={item.id}
          item={item}
          orientation={orientation}
          animated={animated}
          isLast={index === items.length - 1}
          onClick={() => onItemClick?.(item)}
        />
      ))}
    </div>
  );
}

TimelineDisplay.displayName = "TimelineDisplay";

function TimelineDisplayItemComponent({
  item,
  orientation = "vertical",
  animated,
  isLast,
  onClick,
}: {
  item: TimelineDisplayItem;
  orientation?: "vertical" | "horizontal";
  animated?: boolean;
  isLast: boolean;
  onClick?: () => void;
}) {
  const statusColors = {
    pending: "bg-zinc-400",
    "in-progress": "bg-blue-500",
    completed: "bg-green-500",
    error: "bg-red-500",
  };

  const statusIcon = item.icon ?? (
    <div
      className={cn(
        "h-3 w-3 rounded-full",
        statusColors[item.status ?? "pending"]
      )}
    />
  );

  return (
    <div
      className={cn(
        timelineDisplayItemVariants({ orientation }),
        animated && "animate-fade-in",
        onClick && "cursor-pointer"
      )}
      role="listitem"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      tabIndex={onClick ? 0 : undefined}
    >
      {orientation === "vertical" && (
        <>
          <div className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[hsl(var(--la-border))] bg-[hsl(var(--la-background))]">
            {statusIcon}
          </div>
          {!isLast && (
            <div className="absolute left-[11px] top-7 h-full w-0.5 bg-[hsl(var(--la-border))]" />
          )}
        </>
      )}

      {orientation === "horizontal" && (
        <>
          <div className="absolute left-1/2 top-0 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[hsl(var(--la-border))] bg-[hsl(var(--la-background))]">
            {statusIcon}
          </div>
          {!isLast && (
            <div className="absolute left-1/2 top-[11px] h-0.5 w-full -translate-x-1/2 bg-[hsl(var(--la-border))]" />
          )}
        </>
      )}

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-[hsl(var(--la-foreground))]">
            {item.title}
          </span>
          {item.timestamp && (
            <span className="text-xs text-[hsl(var(--la-muted-foreground))]">
              {item.timestamp}
            </span>
          )}
        </div>
        {item.description && (
          <p className="text-sm text-[hsl(var(--la-muted-foreground))]">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}

export { TimelineDisplay, timelineDisplayVariants };
