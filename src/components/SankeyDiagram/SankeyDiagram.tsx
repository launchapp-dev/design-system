import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const sankeyDiagramVariants = cva("relative", {
  variants: {
    size: {
      sm: "h-48",
      md: "h-72",
      lg: "h-96",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface SankeyNode {
  id: string;
  name: string;
  color?: string;
}

export interface SankeyLink {
  source: string;
  target: string;
  value: number;
  color?: string;
}

export interface SankeyDiagramProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof sankeyDiagramVariants> {
  nodes: SankeyNode[];
  links: SankeyLink[];
  height?: number | string;
  nodeWidth?: number;
  nodePadding?: number;
  showLabels?: boolean;
  showValues?: boolean;
  onNodeClick?: (node: SankeyNode) => void;
  onLinkClick?: (link: SankeyLink) => void;
  "aria-label"?: string;
}

interface LayoutNode extends SankeyNode {
  x: number;
  y: number;
  height: number;
  incomingValue: number;
  outgoingValue: number;
}

interface LayoutLink extends SankeyLink {
  sourceNode: LayoutNode;
  targetNode: LayoutNode;
  sourceY: number;
  targetY: number;
  linkHeight: number;
}

const CHART_COLORS = [
  "hsl(var(--la-chart-1))",
  "hsl(var(--la-chart-2))",
  "hsl(var(--la-chart-3))",
  "hsl(var(--la-chart-4))",
  "hsl(var(--la-chart-5))",
];

function layoutSankey(
  nodes: SankeyNode[],
  links: SankeyLink[],
  width: number,
  height: number,
  nodeWidth: number,
  nodePadding: number
): { layoutNodes: LayoutNode[]; layoutLinks: LayoutLink[] } {
  const nodeMap = new Map<string, LayoutNode>();
  
  nodes.forEach((node, index) => {
    const incomingValue = links
      .filter((l) => l.target === node.id)
      .reduce((sum, l) => sum + l.value, 0);
    const outgoingValue = links
      .filter((l) => l.source === node.id)
      .reduce((sum, l) => sum + l.value, 0);
    const nodeHeight = Math.max(incomingValue, outgoingValue);
    
    nodeMap.set(node.id, {
      ...node,
      x: 0,
      y: 0,
      height: nodeHeight,
      incomingValue,
      outgoingValue,
    });
  });

  const adjacency: Map<string, { sources: string[]; targets: string[] }> = new Map();
  nodes.forEach((node) => {
    adjacency.set(node.id, { sources: [], targets: [] });
  });
  
  links.forEach((link) => {
    adjacency.get(link.source)?.targets.push(link.target);
    adjacency.get(link.target)?.sources.push(link.source);
  });

  const levels: string[][] = [];
  const visited = new Set<string>();
  
  const sources = nodes.filter((n) => adjacency.get(n.id)?.sources.length === 0);
  
  function bfs(startNodes: string[]) {
    const queue: { id: string; level: number }[] = startNodes.map((id) => ({ id, level: 0 }));
    
    while (queue.length > 0) {
      const { id, level } = queue.shift()!;
      if (visited.has(id)) continue;
      visited.add(id);
      
      if (!levels[level]) levels[level] = [];
      if (!levels[level].includes(id)) levels[level].push(id);
      
      const targets = adjacency.get(id)?.targets || [];
      targets.forEach((target) => {
        if (!visited.has(target)) {
          queue.push({ id: target, level: level + 1 });
        }
      });
    }
  }
  
  bfs(sources.map((s) => s.id));
  
  nodes.forEach((node) => {
    if (!visited.has(node.id)) {
      levels[0] = levels[0] || [];
      levels[0].push(node.id);
    }
  });

  const numLevels = levels.length;
  const levelWidth = (width - nodeWidth) / Math.max(numLevels - 1, 1);

  levels.forEach((level, levelIndex) => {
    const totalHeight = level.reduce((sum, id) => sum + (nodeMap.get(id)?.height || 0), 0);
    const totalPadding = (level.length - 1) * nodePadding;
    const scale = totalHeight + totalPadding > height ? (height - totalPadding) / totalHeight : 1;
    
    let currentY = (height - (totalHeight * scale + totalPadding)) / 2;
    
    level.forEach((id) => {
      const node = nodeMap.get(id)!;
      node.x = levelIndex * levelWidth;
      node.y = currentY;
      node.height = node.height * scale;
      currentY += node.height + nodePadding;
    });
  });

  const layoutLinks: LayoutLink[] = links.map((link) => {
    const sourceNode = nodeMap.get(link.source)!;
    const targetNode = nodeMap.get(link.target)!;
    
    const sourceOutgoing = links
      .filter((l) => l.source === link.source)
      .sort((a, b) => a.target.localeCompare(b.target));
    const sourceIndex = sourceOutgoing.findIndex((l) => l.target === link.target);
    const sourceOffset = sourceOutgoing.slice(0, sourceIndex).reduce((sum, l) => sum + l.value, 0);
    const sourceScale = sourceNode.height / Math.max(sourceNode.outgoingValue, 1);
    
    const targetIncoming = links
      .filter((l) => l.target === link.target)
      .sort((a, b) => a.source.localeCompare(b.source));
    const targetIndex = targetIncoming.findIndex((l) => l.source === link.source);
    const targetOffset = targetIncoming.slice(0, targetIndex).reduce((sum, l) => sum + l.value, 0);
    const targetScale = targetNode.height / Math.max(targetNode.incomingValue, 1);
    
    return {
      ...link,
      sourceNode,
      targetNode,
      sourceY: sourceNode.y + sourceOffset * sourceScale,
      targetY: targetNode.y + targetOffset * targetScale,
      linkHeight: link.value * Math.min(sourceScale, targetScale),
    };
  });

  return { layoutNodes: Array.from(nodeMap.values()), layoutLinks };
}

const SankeyDiagram = React.forwardRef<HTMLDivElement, SankeyDiagramProps>(
  ({ nodes,
  links,
  height,
  size,
  nodeWidth = 16,
  nodePadding = 12,
  showLabels = true,
  showValues = true,
  className,
  onNodeClick,
  onLinkClick,
  "aria-label": ariaLabel,
  ...props }, ref) => {
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

  const defaultHeight = size === "sm" ? 192 : size === "lg" ? 384 : 288;
  const svgHeight: number = typeof height === "number" ? height : defaultHeight;
  const svgWidth = containerWidth || 400;

  const { layoutNodes, layoutLinks } = React.useMemo(() => {
    if (!nodes || nodes.length === 0 || !links || links.length === 0) {
      return { layoutNodes: [], layoutLinks: [] };
    }
    return layoutSankey(nodes, links, svgWidth, svgHeight, nodeWidth, nodePadding);
  }, [nodes, links, svgWidth, svgHeight, nodeWidth, nodePadding]);

  const getNodeColor = (node: LayoutNode, index: number): string => {
    return node.color || CHART_COLORS[index % CHART_COLORS.length];
  };

  const getLinkColor = (link: LayoutLink): string => {
    if (link.color) return link.color;
    const sourceIndex = nodes.findIndex((n) => n.id === link.source);
    return CHART_COLORS[sourceIndex % CHART_COLORS.length];
  };

  const autoAriaLabel = React.useMemo(() => {
    if (ariaLabel) return ariaLabel;
    if (!nodes || nodes.length === 0) return "Empty sankey diagram";
    return `Sankey diagram with ${nodes.length} nodes and ${links.length} links`;
  }, [ariaLabel, nodes, links]);

  const totalFlow = React.useMemo(() => {
    return links.reduce((sum, l) => sum + l.value, 0);
  }, [links]);

  const formatValue = (value: number): string => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
  };

  if (!nodes || nodes.length === 0 || !links || links.length === 0) {
    return (
      <div
        ref={ref}
        className={cn(sankeyDiagramVariants({ size }), "flex items-center justify-center bg-muted/30 rounded-[--la-radius]", className)}
        role="img"
        aria-label="Empty sankey diagram"
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
      className={cn(sankeyDiagramVariants({ size }), className)}
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
        <defs>
          {layoutLinks.map((link, index) => {
            const gradientId = `sankey-gradient-${index}`;
            return (
              <linearGradient
                key={gradientId}
                id={gradientId}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  stopColor={getLinkColor(link)}
                  stopOpacity={0.5}
                />
                <stop
                  offset="100%"
                  stopColor={getLinkColor(link)}
                  stopOpacity={0.3}
                />
              </linearGradient>
            );
          })}
        </defs>

        {layoutLinks.map((link, index) => {
          const x0 = link.sourceNode.x + nodeWidth;
          const x1 = link.targetNode.x;
          const y0 = link.sourceY;
          const y1 = link.targetY;
          const linkHeight = Math.max(link.linkHeight, 1);
          
          const curvature = 0.5;
          const xi = (x0 + x1) * curvature;
          
          const path = `M${x0},${y0}C${xi},${y0} ${xi},${y1} ${x1},${y1}L${x1},${y1 + linkHeight}C${xi},${y1 + linkHeight} ${xi},${y0 + linkHeight} ${x0},${y0 + linkHeight}Z`;
          
          return (
            <path
              key={`link-${index}`}
              d={path}
              fill={`url(#sankey-gradient-${index})`}
              className={cn(
                "transition-opacity duration-200",
                onLinkClick && "cursor-pointer hover:opacity-100"
              )}
              onClick={() => onLinkClick?.(link)}
              role="img"
              aria-label={`${link.source} to ${link.target}: ${link.value}`}
            />
          );
        })}

        {layoutNodes.map((node, index) => {
          const nodeColor = getNodeColor(node, index);
          
          return (
            <g key={`node-${node.id}`}>
              <rect
                x={node.x}
                y={node.y}
                width={nodeWidth}
                height={Math.max(node.height, 2)}
                fill={nodeColor}
                rx={2}
                className={cn(
                  "transition-opacity duration-200",
                  onNodeClick && "cursor-pointer hover:opacity-80"
                )}
                onClick={() => onNodeClick?.(node)}
                role="img"
                aria-label={`${node.name}: ${formatValue(Math.max(node.incomingValue, node.outgoingValue))}`}
              />
              {showLabels && (
                <text
                  x={node.x < svgWidth / 2 ? node.x - 8 : node.x + nodeWidth + 8}
                  y={node.y + node.height / 2}
                  textAnchor={node.x < svgWidth / 2 ? "end" : "start"}
                  dominantBaseline="middle"
                  fill="hsl(var(--la-foreground))"
                  className="text-xs font-medium select-none pointer-events-none"
                >
                  {node.name}
                </text>
              )}
              {showValues && (
                <text
                  x={node.x < svgWidth / 2 ? node.x - 8 : node.x + nodeWidth + 8}
                  y={node.y + node.height / 2 + 14}
                  textAnchor={node.x < svgWidth / 2 ? "end" : "start"}
                  dominantBaseline="middle"
                  fill="hsl(var(--la-muted-foreground))"
                  className="text-[10px] select-none pointer-events-none"
                >
                  {formatValue(Math.max(node.incomingValue, node.outgoingValue))}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

SankeyDiagram.displayName = "SankeyDiagram";

export { SankeyDiagram, sankeyDiagramVariants };
