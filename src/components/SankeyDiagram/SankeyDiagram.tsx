import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChartContainer } from "@/components/Chart";

const sankeyVariants = cva("relative", {
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

export interface SankeyNode {
  name: string;
  color?: string;
}

export interface SankeyLink {
  source: number;
  target: number;
  value: number;
  color?: string;
}

export interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

export interface SankeyDiagramProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof sankeyVariants> {
  data: SankeyData;
  height?: number | string;
  nodeWidth?: number;
  nodePadding?: number;
  showLabels?: boolean;
  showValues?: boolean;
  animated?: boolean;
}

function SankeyDiagram(
  {
    data,
    height = 400,
    nodeWidth = 20,
    nodePadding = 20,
    showLabels = true,
    showValues = true,
    animated = true,
    size,
    className,
    ref,
    ...props
  }: SankeyDiagramProps & { ref?: React.Ref<HTMLDivElement> }
) {
  const [hoveredNode, setHoveredNode] = React.useState<number | null>(null);
  const [hoveredLink, setHoveredLink] = React.useState<number | null>(null);

  const calculateLayout = React.useCallback(() => {
    const { nodes, links } = data;
    const width = 800;
    const heightNum = typeof height === "number" ? height : 400;

    const nodePositions: { x: number; y: number; height: number }[] = [];
    const linkPaths: string[] = [];

    const layers: number[][] = [];
    const visited = new Set<number>();
    const queue: number[] = [];

    nodes.forEach((_, idx) => {
      const hasIncoming = links.some((l) => l.target === idx);
      if (!hasIncoming) {
        queue.push(idx);
      }
    });

    while (queue.length > 0) {
      const layer: number[] = [];
      const nextQueue: number[] = [];

      queue.forEach((idx) => {
        if (!visited.has(idx)) {
          visited.add(idx);
          layer.push(idx);
          links.forEach((link) => {
            if (link.source === idx && !visited.has(link.target)) {
              nextQueue.push(link.target);
            }
          });
        }
      });

      if (layer.length > 0) layers.push(layer);
      queue.length = 0;
      queue.push(...nextQueue);
    }

    const maxLayerSize = Math.max(...layers.map((l) => l.length));
    const availableHeight = heightNum - (maxLayerSize + 1) * nodePadding;

    layers.forEach((layer, layerIdx) => {
      const layerHeight = availableHeight / layer.length;
      const x = (layerIdx / (layers.length - 1 || 1)) * (width - nodeWidth * 2) + nodeWidth;

      layer.forEach((nodeIdx, nodeLayerIdx) => {
        const nodeValue = links
          .filter((l) => l.target === nodeIdx)
          .reduce((sum, l) => sum + l.value, 0);
        const baseValue = Math.max(
          nodeValue,
          links.filter((l) => l.source === nodeIdx).reduce((sum, l) => sum + l.value, 0)
        );

        const nodeHeight = Math.max(20, (baseValue / 100) * (layerHeight - nodePadding));
        const y = nodeLayerIdx * (layerHeight + nodePadding) + nodePadding;

        nodePositions[nodeIdx] = { x, y, height: nodeHeight };
      });
    });

    links.forEach((link, linkIdx) => {
      const sourceNode = nodePositions[link.source];
      const targetNode = nodePositions[link.target];

      if (sourceNode && targetNode) {
        const sourceX = sourceNode.x + nodeWidth;
        const sourceY = sourceNode.y + sourceNode.height / 2;
        const targetX = targetNode.x;
        const targetY = targetNode.y + targetNode.height / 2;

        const controlPoint1X = sourceX + (targetX - sourceX) * 0.5;
        const controlPoint2X = sourceX + (targetX - sourceX) * 0.5;

        linkPaths[linkIdx] = `M ${sourceX},${sourceY} C ${controlPoint1X},${sourceY} ${controlPoint2X},${targetY} ${targetX},${targetY}`;
      }
    });

    return { nodePositions, linkPaths, layers, width, height: heightNum };
  }, [data, height, nodeWidth, nodePadding]);

  const { nodePositions, linkPaths, layers, width, height: svgHeight } = calculateLayout();

  return (
    <div
      ref={ref}
      className={cn(sankeyVariants({ size }), className)}
      role="img"
      aria-label="Sankey diagram visualization"
      {...props}
    >
      <ChartContainer height={height}>
        <svg width="100%" height={svgHeight} viewBox={`0 0 ${width} ${svgHeight}`} role="presentation">
          <defs>
            <linearGradient id="sankey-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--la-chart-1))" stopOpacity={0.5} />
              <stop offset="100%" stopColor="hsl(var(--la-chart-2))" stopOpacity={0.5} />
            </linearGradient>
          </defs>

          {linkPaths.map((path, idx) => {
            const link = data.links[idx];
            const isHovered = hoveredLink === idx;
            const sourceNode = data.nodes[link.source];
            const targetNode = data.nodes[link.target];

            return (
              <path
                key={idx}
                d={path}
                fill="none"
                stroke={link.color ?? "url(#sankey-gradient)"}
                strokeWidth={Math.max(2, link.value / 10)}
                strokeLinecap="round"
                opacity={isHovered ? 1 : 0.3}
                className={cn(
                  "transition-all cursor-pointer",
                  animated && "animate-in fade-in duration-500"
                )}
                onMouseEnter={() => setHoveredLink(idx)}
                onMouseLeave={() => setHoveredLink(null)}
                tabIndex={0}
                role="link"
                aria-label={`${sourceNode.name} to ${targetNode.name}: ${link.value}`}
              />
            );
          })}

          {nodePositions.map((node, idx) => {
            const nodeData = data.nodes[idx];
            const isHovered = hoveredNode === idx;

            return (
              <g key={idx}>
                <rect
                  x={node.x}
                  y={node.y}
                  width={nodeWidth}
                  height={node.height}
                  fill={nodeData.color ?? `hsl(var(--la-chart-${(idx % 5) + 1}))`}
                  rx={4}
                  className={cn(
                    "transition-all cursor-pointer",
                    isHovered && "opacity-100",
                    animated && "animate-in fade-in duration-300"
                  )}
                  onMouseEnter={() => setHoveredNode(idx)}
                  onMouseLeave={() => setHoveredNode(null)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${nodeData.name}`}
                />
                {showLabels && (
                  <text
                    x={node.x + nodeWidth + 8}
                    y={node.y + node.height / 2}
                    fill="hsl(var(--la-foreground))"
                    className={cn(
                      "font-medium",
                      size === "sm" && "text-xs",
                      size === "lg" && "text-base"
                    )}
                    dominantBaseline="middle"
                  >
                    {nodeData.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </ChartContainer>
    </div>
  );
}
SankeyDiagram.displayName = "SankeyDiagram";

export { SankeyDiagram, sankeyVariants };
