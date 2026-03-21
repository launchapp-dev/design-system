import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Treemap as RechartsTreemap, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

const treeMapVariants = cva("relative", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface TreeMapNode {
  name: string;
  value: number;
  children?: TreeMapNode[];
  color?: string;
  [key: string]: string | number | TreeMapNode[] | undefined;
}

export interface TreeMapProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof treeMapVariants> {
  data: TreeMapNode[];
  height?: number | string;
  aspectRatio?: number;
  showLabels?: boolean;
  colorScale?: (value: number) => string;
  animated?: boolean;
}

function TreeMap(
  {
    data,
    height = 300,
    aspectRatio,
    showLabels = true,
    colorScale,
    animated = true,
    size,
    className,
    ref,
    ...props
  }: TreeMapProps & { ref?: React.Ref<HTMLDivElement> }
) {
  const [focusedNode, setFocusedNode] = React.useState<string | null>(null);

  const defaultColorScale = React.useCallback((value: number) => {
    const maxValue = Math.max(...data.map((d) => d.value));
    const normalized = value / maxValue;
    const index = Math.floor(normalized * 4) + 1;
    return `hsl(var(--la-chart-${index}))`;
  }, [data]);

  const activeColorScale = colorScale ?? defaultColorScale;

  const renderCustomContent = (props: any) => {
    const { x, y, width, height, name, value, depth } = props;
    const color = activeColorScale(value);
    const isFocused = focusedNode === name;
    const showLabel = showLabels && width > 50 && height > 30;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={color}
          stroke="hsl(var(--la-background))"
          strokeWidth={2}
          className={cn(
            "transition-all cursor-pointer",
            isFocused && "stroke-primary stroke-[3]",
            animated && "animate-in fade-in duration-300"
          )}
          tabIndex={0}
          role="treeitem"
          aria-label={`${name}: ${value}`}
          onFocus={() => setFocusedNode(name)}
          onBlur={() => setFocusedNode(null)}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
            }
          }}
        />
        {showLabel && (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            fill="hsl(var(--la-primary-foreground))"
            className={cn("font-medium", size === "sm" && "text-xs", size === "lg" && "text-base")}
          >
            <tspan x={x + width / 2} dy="-0.5em">
              {name}
            </tspan>
            <tspan x={x + width / 2} dy="1.2em" opacity={0.8}>
              {value.toLocaleString()}
            </tspan>
          </text>
        )}
      </g>
    );
  };

  return (
    <div
      ref={ref}
      className={cn(treeMapVariants({ size }), className)}
      role="tree"
      aria-label="Tree map visualization"
      {...props}
    >
      <ResponsiveContainer width="100%" height={height as number} aspect={aspectRatio}>
        <RechartsTreemap
          data={data}
          dataKey="value"
          aspectRatio={4 / 3}
          stroke="hsl(var(--la-background))"
          fill="hsl(var(--la-chart-1))"
          content={renderCustomContent}
          isAnimationActive={animated}
          animationDuration={animated ? 500 : 0}
        />
      </ResponsiveContainer>
    </div>
  );
}
TreeMap.displayName = "TreeMap";

export { TreeMap, treeMapVariants };
