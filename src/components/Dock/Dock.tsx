import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const dockVariants = cva(
  "flex items-end justify-center gap-1 rounded-2xl border border-[hsl(var(--la-border))] p-2",
  {
    variants: {
      variant: {
        default: "bg-[hsl(var(--la-card))/0.8] backdrop-blur-xl shadow-xl",
        glass: "bg-white/10 backdrop-blur-2xl border-white/20",
        dark: "bg-black/50 backdrop-blur-xl border-white/10",
        minimal: "bg-transparent border-0 shadow-none",
      },
      position: {
        bottom: "",
        left: "flex-col",
        right: "flex-col",
      },
    },
    defaultVariants: {
      variant: "default",
      position: "bottom",
    },
  }
);

export interface DockProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dockVariants> {
  magnification?: number;
  range?: number;
}

interface DockContextValue {
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
  magnification: number;
  range: number;
  position: "bottom" | "left" | "right";
}

const DockContext = React.createContext<DockContextValue | null>(null);

const useDockContext = () => {
  const context = React.useContext(DockContext);
  if (!context) {
    throw new Error("Dock components must be used within a Dock");
  }
  return context;
};

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      variant,
      position = "bottom",
      magnification = 1.5,
      range = 100,
      onMouseMove,
      onMouseLeave,
      children,
      ...props
    },
    ref
  ) => {
    const mouseX = React.useRef(0);
    const mouseY = React.useRef(0);

    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.current = e.clientX - rect.left;
        mouseY.current = e.clientY - rect.top;
        onMouseMove?.(e);
      },
      [onMouseMove]
    );

    const handleMouseLeave = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        mouseX.current = -Infinity;
        mouseY.current = -Infinity;
        onMouseLeave?.(e);
      },
      [onMouseLeave]
    );

    return (
      <DockContext.Provider
        value={{ mouseX, mouseY, magnification, range, position: position || "bottom" }}
      >
        <div
          ref={ref}
          className={cn(dockVariants({ variant, position }), className)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          {...props}
        >
          {children}
        </div>
      </DockContext.Provider>
    );
  }
);
Dock.displayName = "Dock";

export interface DockItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label?: string;
  badge?: number | string;
}

const DockItem = React.forwardRef<HTMLButtonElement, DockItemProps>(
  ({ className, icon, label, badge, ...props }, ref) => {
    const { mouseX, mouseY, magnification, range, position } = useDockContext();
    const itemRef = React.useRef<HTMLButtonElement>(null);
    const [scale, setScale] = React.useState(1);

    React.useEffect(() => {
      const item = itemRef.current;
      if (!item) return;

      const updateScale = () => {
        const rect = item.getBoundingClientRect();
        const parentRect = item.parentElement?.getBoundingClientRect();
        if (!parentRect) return;

        let distance: number;
        if (position === "bottom") {
          const centerX = rect.left + rect.width / 2 - parentRect.left;
          distance = Math.abs(mouseX.current - centerX);
        } else {
          const centerY = rect.top + rect.height / 2 - parentRect.top;
          distance = Math.abs(mouseY.current - centerY);
        }

        const newScale = distance < range 
          ? 1 + (magnification - 1) * (1 - distance / range) 
          : 1;
        setScale(newScale);
      };

      updateScale();

      const interval = setInterval(updateScale, 16);
      return () => clearInterval(interval);
    }, [magnification, range, position]);

    return (
      <button
        ref={(node) => {
          (itemRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        className={cn(
          "relative flex flex-col items-center justify-center transition-transform duration-150 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2 rounded-lg",
          className
        )}
        style={{ transform: `scale(${scale})` }}
        title={label}
        {...props}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--la-muted))] text-[hsl(var(--la-foreground))] hover:bg-[hsl(var(--la-accent))] transition-colors">
          {icon}
        </div>
        {badge !== undefined && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[hsl(var(--la-destructive))] px-1 text-xs font-medium text-[hsl(var(--la-destructive-foreground))]">
            {badge}
          </span>
        )}
        {label && (
          <span className="sr-only">{label}</span>
        )}
      </button>
    );
  }
);
DockItem.displayName = "DockItem";

export interface DockDividerProps extends React.HTMLAttributes<HTMLDivElement> {}

const DockDivider = React.forwardRef<HTMLDivElement, DockDividerProps>(
  ({ className, ...props }, ref) => {
    const { position } = useDockContext();
    
    return (
      <div
        ref={ref}
        className={cn(
          "bg-[hsl(var(--la-border))]",
          position === "bottom" ? "mx-1 h-10 w-px" : "my-1 h-px w-10",
          className
        )}
        aria-hidden="true"
        {...props}
      />
    );
  }
);
DockDivider.displayName = "DockDivider";

export interface DockLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const DockLabel = React.forwardRef<HTMLDivElement, DockLabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[hsl(var(--la-popover))] px-2 py-1 text-xs font-medium text-[hsl(var(--la-popover-foreground))] opacity-0 transition-opacity group-hover:opacity-100",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DockLabel.displayName = "DockLabel";

export {
  Dock,
  DockItem,
  DockDivider,
  DockLabel,
  dockVariants,
};
