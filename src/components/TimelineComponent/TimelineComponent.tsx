import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const timelineVariants = cva("relative", {
  variants: {
    orientation: {
      vertical: "flex flex-col",
      horizontal: "flex flex-row",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    orientation: "vertical",
    size: "md",
  },
});

const timelineItemVariants = cva("relative", {
  variants: {
    orientation: {
      vertical: "flex gap-4 pb-8 last:pb-0",
      horizontal: "flex flex-col items-center pb-0 pr-8 last:pr-0",
    },
    animate: {
      none: "",
      fade: "opacity-0 animate-fade-up motion-reduce:animate-none motion-reduce:opacity-100",
      slide: "opacity-0 animate-slide-in-from-left motion-reduce:animate-none motion-reduce:opacity-100",
    },
  },
  defaultVariants: {
    orientation: "vertical",
    animate: "none",
  },
});

const timelineDotVariants = cva(
  "shrink-0 rounded-full border-2 border-primary bg-background flex items-center justify-center",
  {
    variants: {
      orientation: {
        vertical: "h-4 w-4",
        horizontal: "h-4 w-4",
      },
      status: {
        default: "border-primary bg-background",
        completed: "bg-primary border-primary",
        pending: "border-muted-foreground bg-background",
        error: "border-destructive bg-destructive",
      },
    },
    defaultVariants: {
      orientation: "vertical",
      status: "default",
    },
  }
);

export interface TimelineItemData {
  id: string;
  title: string;
  description?: string;
  date?: string;
  icon?: React.ReactNode;
  status?: "default" | "completed" | "pending" | "error";
}

export interface TimelineProps
  extends React.HTMLAttributes<HTMLOListElement>,
    VariantProps<typeof timelineVariants> {
  items: TimelineItemData[];
  animate?: "none" | "fade" | "slide";
  animatedOnScroll?: boolean;
}

function Timeline({
  items,
  orientation = "vertical",
  size,
  animate = "none",
  animatedOnScroll = false,
  className,
  ref,
  ...props
}: TimelineProps & { ref?: React.Ref<HTMLOListElement> }) {
  const itemRefs = React.useRef<(HTMLLIElement | null)[]>([]);

  React.useEffect(() => {
    if (!animatedOnScroll || animate === "none") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0");
            entry.target.classList.add("motion-reduce:opacity-100");
          }
        });
      },
      { threshold: 0.1 }
    );

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, [animatedOnScroll, animate]);

  return (
    <ol
      ref={ref}
      role="list"
      aria-label="Timeline"
      className={cn(timelineVariants({ orientation, size }), className)}
      {...props}
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          className={cn(
            timelineItemVariants({ orientation, animate }),
            animatedOnScroll && animate !== "none" && "opacity-0"
          )}
          style={{
            animationDelay: animate !== "none" ? `${index * 100}ms` : undefined,
          }}
        >
          {orientation === "vertical" ? (
            <>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    timelineDotVariants({ orientation, status: item.status }),
                    "z-10"
                  )}
                  aria-hidden="true"
                >
                  {item.icon && (
                    <span className="h-3 w-3 flex items-center justify-center text-primary-foreground">
                      {item.icon}
                    </span>
                  )}
                </div>
                {index < items.length - 1 && (
                  <div
                    className="w-0.5 flex-1 bg-border mt-2"
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="flex-1 pt-0.5">
                {item.date && (
                  <time
                    className="text-xs text-muted-foreground mb-1 block"
                    dateTime={item.date}
                  >
                    {item.date}
                  </time>
                )}
                <h3 className="font-medium text-foreground">{item.title}</h3>
                {item.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.description}
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    timelineDotVariants({ orientation, status: item.status }),
                    "z-10"
                  )}
                  aria-hidden="true"
                >
                  {item.icon && (
                    <span className="h-3 w-3 flex items-center justify-center text-primary-foreground">
                      {item.icon}
                    </span>
                  )}
                </div>
                {index < items.length - 1 && (
                  <div
                    className="h-0.5 w-full flex-1 bg-border ml-2 mt-2"
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="pt-4 min-w-[120px]">
                {item.date && (
                  <time
                    className="text-xs text-muted-foreground mb-1 block"
                    dateTime={item.date}
                  >
                    {item.date}
                  </time>
                )}
                <h3 className="font-medium text-foreground text-sm">{item.title}</h3>
                {item.description && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.description}
                  </p>
                )}
              </div>
            </>
          )}
        </li>
      ))}
    </ol>
  );
}

Timeline.displayName = "Timeline";

export { Timeline, timelineVariants, timelineItemVariants, timelineDotVariants };
