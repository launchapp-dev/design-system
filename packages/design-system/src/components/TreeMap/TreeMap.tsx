import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const treeMapVariants = cva("relative", {
  variants: {
    size: {
      sm: "h-48",
      md: "h-64",
      lg: "h-96",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface TreeMapNode {
  id: string;
  name: string;
  value: number;
  color?: string;
  children?: TreeMapNode[];
}

export interface TreeMapProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof treeMapVariants> {
  data: TreeMapNode[];
  height?: number | string;
  colorScheme?: "primary" | "secondary" | "chart" | "diverging";
  showLabels?: boolean;
  showValues?: boolean;
  onNodeClick?: (node: TreeMapNode) => void;
  "aria-label"?: string;
}

interface LayoutNode extends TreeMapNode {
  x: number;
  y: number;
  width: number;
  height: number;
  depth: number;
}

const CHART_COLORS = [
  "hsl(var(--la-chart-1))",
  "hsl(var(--la-chart-2))",
  "hsl(var(--la-chart-3))",
  "hsl(var(--la-chart-4))",
  "hsl(var(--la-chart-5))",
];

function squarify(
  nodes: TreeMapNode[],
  x: number,
  y: number,
  width: number,
  height: number,
  depth: number = 0
): LayoutNode[] {
  if (nodes.length === 0) return [];

  const totalValue = nodes.reduce((sum, n) => sum + n.value, 0);
  if (totalValue === 0) return [];

  const sortedNodes = [...nodes].sort((a, b) => b.value - a.value);
  const layoutNodes: LayoutNode[] = [];

  function layoutRow(
    row: TreeMapNode[],
    x: number,
    y: number,
    width: number,
    height: number,
    horizontal: boolean
  ): LayoutNode[] {
    const rowValue = row.reduce((sum, n) => sum + n.value, 0);
    const ratio = (horizontal ? height : width) / rowValue;
    
    return row.map((node) => {
      const nodeWidth = horizontal ? width : node.value * ratio;
      const nodeHeight = horizontal ? node.value * ratio : height;
      const layoutNode: LayoutNode = {
        ...node,
        x,
        y,
        width: nodeWidth,
        height: nodeHeight,
        depth,
      };
      if (horizontal) {
        y += nodeHeight;
      } else {
        x += nodeWidth;
      }
      return layoutNode;
    });
  }

  function worst(row: TreeMapNode[], sideLength: number): number {
    if (row.length === 0) return Infinity;
    const rowValue = row.reduce((sum, n) => sum + n.value, 0);
    const rowArea = rowValue / totalValue;
    const rowWidth = rowArea / sideLength;
    
    const minRatio = Math.min(...row.map((n) => n.value / rowValue)) / rowWidth;
    const maxRatio = Math.max(...row.map((n) => n.value / rowValue)) / rowWidth;
    
    return Math.max(minRatio * minRatio, maxRatio * maxRatio);
  }

  const horizontal = width >= height;
  const sideLength = horizontal ? height : width;
  
  let currentX = x;
  let currentY = y;
  let remainingNodes = [...sortedNodes];
  let remainingValue = totalValue;

  while (remainingNodes.length > 0) {
    const row: TreeMapNode[] = [];
    let rowValue = 0;
    
    for (const node of remainingNodes) {
      const testRow = [...row, node];
      const testRowValue = rowValue + node.value;
      const currentWorst = worst(row, sideLength * (rowValue / remainingValue));
      const testWorst = worst(testRow, sideLength * (testRowValue / remainingValue));
      
      if (row.length === 0 || testWorst <= currentWorst) {
        row.push(node);
        rowValue = testRowValue;
      } else {
        break;
      }
    }

    if (row.length === 0) break;

    const rowArea = rowValue / totalValue;
    const rowWidth = horizontal ? width : rowArea * (horizontal ? totalValue / height : totalValue / width);
    const rowHeight = horizontal ? rowArea * (horizontal ? totalValue / width : totalValue / height) : height;

    const rowNodes = layoutRow(
      row,
      currentX,
      currentY,
      horizontal ? width : rowWidth,
      horizontal ? rowHeight : height,
      horizontal
    );
    layoutNodes.push(...rowNodes);

    if (horizontal) {
      currentY += rowHeight;
      height -= rowHeight;
    } else {
      currentX += rowWidth;
      width -= rowWidth;
    }

    remainingNodes = remainingNodes.filter((n) => !row.includes(n));
    remainingValue -= rowValue;
  }

  return layoutNodes;
}

function flattenNodes(
  nodes: TreeMapNode[],
  x: number,
  y: number,
  width: number,
  height: number,
  depth: number = 0
): LayoutNode[] {
  const layoutNodes: LayoutNode[] = [];
  
  const layout = squarify(nodes, x, y, width, height, depth);
  
  for (const node of layout) {
    layoutNodes.push(node);
    
    if (node.children && node.children.length > 0 && node.width > 40 && node.height > 40) {
      const padding = 4;
      const childNodes = flattenNodes(
        node.children,
        node.x + padding,
        node.y + padding,
        node.width - padding * 2,
        node.height - padding * 2,
        depth + 1
      );
      layoutNodes.push(...childNodes);
    }
  }
  
  return layoutNodes;
}

function TreeMap({
  data,
  height,
  size,
  colorScheme = "chart",
  showLabels = true,
  showValues = true,
  className,
  onNodeClick,
  "aria-label": ariaLabel,
  ref,
  ...props
}: TreeMapProps & { ref?: React.Ref<HTMLDivElement> }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);

  React.useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setContainerWidth(entries[0].contentRect.width);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const defaultHeight = size === "sm" ? 192 : size === "lg" ? 384 : 256;
  const svgHeight: number = typeof height === "number" ? height : defaultHeight;
  const svgWidth = containerWidth || 400;

  const layoutNodes = React.useMemo(() => {
    if (!data || data.length === 0) return [];
    const padding = 0;
    return flattenNodes(data, padding, padding, svgWidth - padding * 2, svgHeight - padding * 2);
  }, [data, svgWidth, svgHeight]);

  const getNodeColor = (node: LayoutNode, index: number): string => {
    if (node.color) return node.color;

    if (colorScheme === "primary") {
      const opacity = 0.4 + (node.value / Math.max(...data.map((d) => d.value))) * 0.5;
      return `hsl(var(--la-primary) / ${opacity.toFixed(2)})`;
    }
    if (colorScheme === "secondary") {
      const opacity = 0.4 + (node.value / Math.max(...data.map((d) => d.value))) * 0.5;
      return `hsl(var(--la-secondary) / ${opacity.toFixed(2)})`;
    }
    if (colorScheme === "diverging") {
      const totalValue = data.reduce((sum, n) => sum + n.value, 0);
      const ratio = node.value / totalValue;
      if (ratio > 0.2) return "hsl(var(--la-chart-3))";
      if (ratio > 0.1) return "hsl(var(--la-chart-2))";
      return "hsl(var(--la-chart-5))";
    }
    
    return CHART_COLORS[index % CHART_COLORS.length];
  };

  const autoAriaLabel = React.useMemo(() => {
    if (ariaLabel) return ariaLabel;
    if (!data || data.length === 0) return "Empty tree map";
    const total = data.reduce((sum, n) => sum + n.value, 0);
    return `Tree map with ${data.length} nodes, total value ${total.toLocaleString()}`;
  }, [ariaLabel, data]);

  const totalValue = React.useMemo(() => {
    return data.reduce((sum, n) => sum + n.value, 0);
  }, [data]);

  const formatValue = (value: number): string => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
  };

  if (!data || data.length === 0) {
    return (
      <div
        ref={ref}
        className={cn(treeMapVariants({ size }), "flex items-center justify-center bg-muted/30 rounded-[--la-radius]", className)}
        role="img"
        aria-label="Empty tree map"
        {...props}
      >
        <p className="text-sm text-muted-foreground">No data available</p>
      </div>
    );
  }

  return (
    <div
      ref={(node) => {
        containerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      className={cn(treeMapVariants({ size }), className)}
      role="img"
      aria-label={autoAriaLabel}
      {...props}
    >
      <svg
        width="100%"
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="overflow-visible"
      >
        {layoutNodes.map((node, index) => {
          const percentage = ((node.value / totalValue) * 100).toFixed(1);
          const showLabel = showLabels && node.width > 50 && node.height > 30;
          const showValueLabel = showValues && node.width > 40 && node.height > 20;
          
          return (
            <g key={`${node.id}-${index}`}>
              <rect
                x={node.x}
                y={node.y}
                width={Math.max(0, node.width)}
                height={Math.max(0, node.height)}
                fill={getNodeColor(node, index)}
                stroke="hsl(var(--la-background))"
                strokeWidth={2}
                rx={4}
                className={cn(
                  "transition-opacity duration-200",
                  onNodeClick && "cursor-pointer hover:opacity-80"
                )}
                onClick={() => onNodeClick?.(node)}
                role="img"
                aria-label={`${node.name}: ${node.value} (${percentage}%)`}
              />
              {showLabel && (
                <text
                  x={node.x + node.width / 2}
                  y={node.y + node.height / 2 - (showValueLabel ? 6 : 0)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="hsl(var(--la-card-foreground))"
                  className="text-xs font-medium select-none pointer-events-none"
                  style={{ fontSize: Math.min(12, Math.min(node.width / 5, node.height / 3)) }}
                >
                  {node.name.length > Math.floor(node.width / 8) 
                    ? `${node.name.slice(0, Math.floor(node.width / 8) - 2)}...`
                    : node.name}
                </text>
              )}
              {showValueLabel && (
                <text
                  x={node.x + node.width / 2}
                  y={node.y + node.height / 2 + 10}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="hsl(var(--la-muted-foreground))"
                  className="text-[10px] select-none pointer-events-none"
                >
                  {formatValue(node.value)}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

TreeMap.displayName = "TreeMap";

export { TreeMap, treeMapVariants };
