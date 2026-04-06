import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const heatmapVariants = cva("relative", {
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

const cellVariants = cva(
  "transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
  {
    variants: {
      borderRadius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-[--la-radius]",
        lg: "rounded-lg",
      },
    },
    defaultVariants: {
      borderRadius: "sm",
    },
  }
);

export interface HeatmapCell {
  value: number;
  label?: string;
  rowLabel?: string;
  colLabel?: string;
  color?: string;
}

export interface HeatmapProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof heatmapVariants> {
  data: HeatmapCell[][];
  rowLabels?: string[];
  colLabels?: string[];
  cellSize?: number | { width: number; height: number };
  cellGap?: number;
  colorScale?: "sequential" | "diverging" | "spectral" | "viridis" | "custom";
  customColorScale?: { min: string; mid?: string; max: string };
  minValue?: number;
  maxValue?: number;
  showValues?: boolean;
  showLabels?: boolean;
  formatValue?: (value: number) => string;
  onCellClick?: (cell: HeatmapCell, rowIndex: number, colIndex: number) => void;
  onCellHover?: (cell: HeatmapCell | null, rowIndex: number | null, colIndex: number | null) => void;
  showTooltip?: boolean;
  tooltipContent?: (cell: HeatmapCell) => React.ReactNode;
  "aria-label"?: string;
  borderRadius?: VariantProps<typeof cellVariants>["borderRadius"];
}

interface NormalizedData {
  cells: (HeatmapCell & { normalizedValue: number })[][];
  rows: number;
  cols: number;
  min: number;
  max: number;
}

function normalizeData(
  data: HeatmapCell[][],
  explicitMin?: number,
  explicitMax?: number
): NormalizedData {
  const rows = data.length;
  const cols = rows > 0 ? data[0].length : 0;

  const allValues = data.flat().map((c) => c.value);
  const dataMin = Math.min(...allValues);
  const dataMax = Math.max(...allValues);
  const min = explicitMin ?? dataMin;
  const max = explicitMax ?? dataMax;
  const range = max - min || 1;

  const cells = data.map((row) =>
    row.map((cell) => ({
      ...cell,
      normalizedValue: (cell.value - min) / range,
    }))
  );

  return { cells, rows, cols, min, max };
}

function getSequentialColor(normalized: number): string {
  const clamped = Math.max(0, Math.min(1, normalized));
  const hue = 220 - clamped * 180;
  const saturation = 60 + clamped * 20;
  const lightness = 90 - clamped * 40;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function getDivergingColor(normalized: number): string {
  const clamped = Math.max(0, Math.min(1, normalized));
  if (clamped < 0.5) {
    const t = clamped * 2;
    const hue = 0;
    const saturation = 70;
    const lightness = 95 - t * 30;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  } else {
    const t = (clamped - 0.5) * 2;
    const hue = 150;
    const saturation = 60 + t * 20;
    const lightness = 90 - t * 30;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
}

function getSpectralColor(normalized: number): string {
  const clamped = Math.max(0, Math.min(1, normalized));
  const hue = 260 - clamped * 260;
  const saturation = 70 + clamped * 15;
  const lightness = 85 - clamped * 30;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function getViridisColor(normalized: number): string {
  const clamped = Math.max(0, Math.min(1, normalized));
  const hue = 270 - clamped * 150;
  const saturation = 50 + clamped * 40;
  const lightness = 85 - clamped * 45;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function getCustomColor(
  normalized: number,
  scale: { min: string; mid?: string; max: string }
): string {
  const clamped = Math.max(0, Math.min(1, normalized));
  
  if (scale.mid) {
    if (clamped < 0.5) {
      return scale.min;
    } else if (clamped > 0.5) {
      return scale.max;
    }
    return scale.mid;
  }
  
  return clamped < 0.5 ? scale.min : scale.max;
}

function getCellColor(
  normalized: number,
  colorScale: HeatmapProps["colorScale"],
  customColorScale?: { min: string; mid?: string; max: string },
  cellColor?: string
): string {
  if (cellColor) return cellColor;

  switch (colorScale) {
    case "diverging":
      return getDivergingColor(normalized);
    case "spectral":
      return getSpectralColor(normalized);
    case "viridis":
      return getViridisColor(normalized);
    case "custom":
      return customColorScale
        ? getCustomColor(normalized, customColorScale)
        : getSequentialColor(normalized);
    default:
      return getSequentialColor(normalized);
  }
}

const Heatmap = React.forwardRef<HTMLDivElement, HeatmapProps>(
  (
    {
      data,
      rowLabels,
      colLabels,
      cellSize = 32,
      cellGap = 2,
      colorScale = "sequential",
      customColorScale,
      minValue,
      maxValue,
      showValues = false,
      showLabels = true,
      formatValue = (v) => v.toLocaleString(),
      onCellClick,
      onCellHover,
      showTooltip = true,
      tooltipContent,
      className,
      size,
      borderRadius = "sm",
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const [hoveredCell, setHoveredCell] = React.useState<{
      row: number;
      col: number;
    } | null>(null);

    const normalized = React.useMemo(() => {
      return normalizeData(data, minValue, maxValue);
    }, [data, minValue, maxValue]);

    const cellWidth =
      typeof cellSize === "number" ? cellSize : cellSize.width;
    const cellHeight =
      typeof cellSize === "number" ? cellSize : cellSize.height;

    const _gridWidth = normalized.cols * cellWidth + (normalized.cols - 1) * cellGap;
    const _gridHeight = normalized.rows * cellHeight + (normalized.rows - 1) * cellGap;

    const defaultTooltip = (cell: HeatmapCell): React.ReactNode => (
      <div className="text-xs">
        {cell.label && <div className="font-medium">{cell.label}</div>}
        <div>
          {cell.rowLabel && cell.colLabel
            ? `${cell.rowLabel} × ${cell.colLabel}: `
            : ""}
          {formatValue(cell.value)}
        </div>
      </div>
    );

    const handleCellMouseEnter = (rowIndex: number, colIndex: number) => {
      setHoveredCell({ row: rowIndex, col: colIndex });
      onCellHover?.(data[rowIndex][colIndex], rowIndex, colIndex);
    };

    const handleCellMouseLeave = () => {
      setHoveredCell(null);
      onCellHover?.(null, null, null);
    };

    const handleCellClick = (rowIndex: number, colIndex: number) => {
      onCellClick?.(data[rowIndex][colIndex], rowIndex, colIndex);
    };

    const autoAriaLabel = React.useMemo(() => {
      if (ariaLabel) return ariaLabel;
      if (normalized.rows === 0 || normalized.cols === 0)
        return "Empty heatmap";
      return `Heatmap with ${normalized.rows} rows and ${normalized.cols} columns, values range from ${normalized.min} to ${normalized.max}`;
    }, [ariaLabel, normalized]);

    if (!data || data.length === 0 || data[0].length === 0) {
      return (
        <div
          ref={ref}
          className={cn(
            heatmapVariants({ size }),
            "flex items-center justify-center bg-muted/30 rounded-[--la-radius] p-8",
            className
          )}
          role="img"
          aria-label="Empty heatmap"
          {...props}
        >
          <p className="text-muted-foreground">No data available</p>
        </div>
      );
    }

    const renderCell = (
      cell: HeatmapCell & { normalizedValue: number },
      rowIndex: number,
      colIndex: number
    ) => {
      const isHovered =
        hoveredCell?.row === rowIndex && hoveredCell?.col === colIndex;
      const color = getCellColor(
        cell.normalizedValue,
        colorScale,
        customColorScale,
        cell.color
      );

      const cellElement = (
        <div
          key={`${rowIndex}-${colIndex}`}
          role="gridcell"
          tabIndex={0}
          aria-label={`${cell.label || `Cell ${rowIndex + 1},${colIndex + 1}`}: ${formatValue(cell.value)}`}
          className={cn(
            cellVariants({ borderRadius }),
            "flex items-center justify-center",
            onCellClick && "cursor-pointer",
            isHovered && "ring-2 ring-ring ring-offset-1"
          )}
          style={{
            width: cellWidth,
            height: cellHeight,
            backgroundColor: color,
          }}
          onClick={() => handleCellClick(rowIndex, colIndex)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleCellClick(rowIndex, colIndex);
            }
          }}
          onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
          onMouseLeave={handleCellMouseLeave}
        >
          {showValues && (
            <span className="font-medium text-[0.65em] leading-none">
              {formatValue(cell.value)}
            </span>
          )}
        </div>
      );

      if (showTooltip) {
        return (
          <TooltipPrimitive.Root key={`${rowIndex}-${colIndex}`}>
            <TooltipPrimitive.Trigger asChild>
              {cellElement}
            </TooltipPrimitive.Trigger>
            <TooltipPrimitive.Portal>
              <TooltipPrimitive.Content
                sideOffset={4}
                className="z-50 overflow-hidden rounded-md border border-border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
              >
                {tooltipContent
                  ? tooltipContent(cell)
                  : defaultTooltip(cell)}
              </TooltipPrimitive.Content>
            </TooltipPrimitive.Portal>
          </TooltipPrimitive.Root>
        );
      }

      return cellElement;
    };

    return (
      <TooltipPrimitive.Provider>
        <div
          ref={ref}
          className={cn(heatmapVariants({ size }), className)}
          role="img"
          aria-label={autoAriaLabel}
          {...props}
        >
          <div className="flex">
            {showLabels && rowLabels && rowLabels.length > 0 && (
              <div
                className="flex flex-col pr-2"
                style={{ gap: cellGap }}
                aria-hidden="true"
              >
                {rowLabels.map((label, index) => (
                  <div
                    key={`row-label-${index}`}
                    className="flex items-center justify-end text-muted-foreground pr-2"
                    style={{
                      height: cellHeight,
                      minWidth: `${Math.max(...rowLabels.map((l) => l.length))}ch`,
                    }}
                  >
                    {label}
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col">
              {showLabels && colLabels && colLabels.length > 0 && (
                <div
                  className="flex pb-2"
                  style={{
                    gap: cellGap,
                    marginBottom: cellGap,
                  }}
                  aria-hidden="true"
                >
                  {colLabels.map((label, index) => (
                    <div
                      key={`col-label-${index}`}
                      className="flex items-end justify-center text-muted-foreground"
                      style={{ width: cellWidth }}
                    >
                      <span className="transform -rotate-45 origin-left translate-x-2 translate-y-1">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div
                className="grid"
                role="grid"
                style={{
                  gridTemplateColumns: `repeat(${normalized.cols}, ${cellWidth}px)`,
                  gridTemplateRows: `repeat(${normalized.rows}, ${cellHeight}px)`,
                  gap: cellGap,
                }}
              >
                {normalized.cells.map((row, rowIndex) =>
                  row.map((cell, colIndex) =>
                    renderCell(cell, rowIndex, colIndex)
                  )
                )}
              </div>
            </div>
          </div>

          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {hoveredCell &&
              `Hovered: ${data[hoveredCell.row][hoveredCell.col].label || `Row ${hoveredCell.row + 1}, Column ${hoveredCell.col + 1}`}, value: ${formatValue(data[hoveredCell.row][hoveredCell.col].value)}`}
          </div>
        </div>
      </TooltipPrimitive.Provider>
    );
  }
);

Heatmap.displayName = "Heatmap";

export type HeatmapVariants = VariantProps<typeof heatmapVariants>;
export type CellVariants = VariantProps<typeof cellVariants>;

export { Heatmap, heatmapVariants, cellVariants };
