import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

export type ColorScaleFunction = (value: number) => string;

export interface ColorScale {
  min: number;
  max: number;
  colors: string[];
  interpolate?: (value: number, min: number, max: number, colors: string[]) => string;
}

const heatmapVariants = cva("grid", {
  variants: {
    size: {
      sm: "gap-0.5 text-[8px]",
      md: "gap-1 text-[10px]",
      lg: "gap-1.5 text-xs",
    },
    cellSize: {
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-6 h-6",
    },
  },
  defaultVariants: {
    size: "md",
    cellSize: "md",
  },
});

const cellVariants = cva("transition-colors duration-200", {
  variants: {
    rounded: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded",
      lg: "rounded-md",
    },
  },
  defaultVariants: {
    rounded: "sm",
  },
});

const defaultColorScales = {
  sequential: ["hsl(var(--la-chart-1) / 0.1)", "hsl(var(--la-chart-1))"],
  diverging: ["hsl(var(--la-chart-5))", "hsl(var(--la-background))", "hsl(var(--la-chart-1))"],
  greens: ["#e8f5e9", "#1b5e20"],
  blues: ["#e3f2fd", "#0d47a1"],
  reds: ["#ffebee", "#b71c1c"],
  purples: ["#f3e5f5", "#4a148c"],
  oranges: ["#fff3e0", "#e65100"],
  heat: ["#ffffcc", "#ff7f00", "#cc0000", "#330000"],
  cool: ["#f7fbff", "#6baed6", "#08519c", "#08306b"],
};

function interpolateColor(value: number, min: number, max: number, colors: string[]): string {
  const normalized = Math.max(0, Math.min(1, (value - min) / (max - min || 1)));
  const lastIndex = colors.length - 1;
  const scaledValue = normalized * lastIndex;
  const lowerIndex = Math.floor(scaledValue);
  const upperIndex = Math.min(lowerIndex + 1, lastIndex);
  const t = scaledValue - lowerIndex;

  if (lowerIndex === upperIndex) {
    return colors[lowerIndex];
  }

  const lower = parseColor(colors[lowerIndex]);
  const upper = parseColor(colors[upperIndex]);
  
  if (!lower || !upper) {
    return colors[Math.round(scaledValue)];
  }

  const r = Math.round(lower.r + (upper.r - lower.r) * t);
  const g = Math.round(lower.g + (upper.g - lower.g) * t);
  const b = Math.round(lower.b + (upper.b - lower.b) * t);

  return `rgb(${r}, ${g}, ${b})`;
}

function parseColor(color: string): { r: number; g: number; b: number } | null {
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    if (hex.length === 3) {
      return {
        r: parseInt(hex[0] + hex[0], 16),
        g: parseInt(hex[1] + hex[1], 16),
        b: parseInt(hex[2] + hex[2], 16),
      };
    }
    if (hex.length === 6) {
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
      };
    }
  }
  
  const rgbMatch = color.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1], 10),
      g: parseInt(rgbMatch[2], 10),
      b: parseInt(rgbMatch[3], 10),
    };
  }
  
  return null;
}

export interface HeatmapCell {
  value: number;
  label?: string;
  row?: number;
  col?: number;
}

export interface HeatmapProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof heatmapVariants> {
  data: HeatmapCell[][];
  colorScale?: ColorScale | keyof typeof defaultColorScales;
  showValues?: boolean;
  formatValue?: (value: number) => string;
  cellRounded?: VariantProps<typeof cellVariants>["rounded"];
  cellClassName?: string;
  xLabels?: string[];
  yLabels?: string[];
  showAxisLabels?: boolean;
  minValue?: number;
  maxValue?: number;
  "aria-label"?: string;
  onCellClick?: (cell: HeatmapCell, row: number, col: number) => void;
  onCellHover?: (cell: HeatmapCell | null, row: number | null, col: number | null) => void;
}

function Heatmap({
  data,
  colorScale = "sequential",
  showValues = false,
  formatValue = (v) => v.toFixed(1),
  size,
  cellSize,
  cellRounded = "sm",
  cellClassName,
  xLabels,
  yLabels,
  showAxisLabels = true,
  minValue,
  maxValue,
  className,
  "aria-label": ariaLabel,
  onCellClick,
  onCellHover,
  ref,
  ...props
}: HeatmapProps & { ref?: React.Ref<HTMLDivElement> }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => containerRef.current!);
  
  const [hoveredCell, setHoveredCell] = React.useState<{ row: number; col: number } | null>(null);

  const flatData = React.useMemo(() => data.flat(), [data]);
  
  const computedMin = React.useMemo(() => {
    if (minValue !== undefined) return minValue;
    return Math.min(...flatData.map((d) => d.value));
  }, [flatData, minValue]);

  const computedMax = React.useMemo(() => {
    if (maxValue !== undefined) return maxValue;
    return Math.max(...flatData.map((d) => d.value));
  }, [flatData, maxValue]);

  const getColor = React.useCallback(
    (value: number): string => {
      let scale: ColorScale;
      
      if (typeof colorScale === "string") {
        const colors = defaultColorScales[colorScale];
        scale = {
          min: computedMin,
          max: computedMax,
          colors,
        };
      } else {
        scale = colorScale;
      }

      const interpolate = scale.interpolate || interpolateColor;
      const min = scale.min ?? computedMin;
      const max = scale.max ?? computedMax;
      
      return interpolate(value, min, max, scale.colors);
    },
    [colorScale, computedMin, computedMax]
  );

  const rows = data.length;
  const cols = data[0]?.length || 0;

  const autoAriaLabel = React.useMemo(() => {
    if (ariaLabel) return ariaLabel;
    return `Heatmap with ${rows} rows and ${cols} columns, values ranging from ${computedMin.toFixed(1)} to ${computedMax.toFixed(1)}`;
  }, [ariaLabel, rows, cols, computedMin, computedMax]);

  const handleCellClick = React.useCallback(
    (row: number, col: number) => {
      if (onCellClick) {
        onCellClick(data[row][col], row, col);
      }
    },
    [data, onCellClick]
  );

  const handleCellHover = React.useCallback(
    (row: number | null, col: number | null) => {
      if (row === null || col === null) {
        setHoveredCell(null);
        onCellHover?.(null, null, null);
      } else {
        setHoveredCell({ row, col });
        onCellHover?.(data[row][col], row, col);
      }
    },
    [data, onCellHover]
  );

  if (!data.length || !data[0]?.length) {
    return (
      <div
        ref={containerRef}
        role="img"
        aria-label="Empty heatmap"
        className={cn("flex items-center justify-center text-muted-foreground", className)}
        style={{ minHeight: 100 }}
        {...props}
      >
        No data
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={autoAriaLabel}
      className={cn("inline-flex flex-col", className)}
      {...props}
    >
      {showAxisLabels && yLabels && yLabels.length > 0 && (
        <div className="flex">
          {xLabels && xLabels.length > 0 && <div className={cn(cellSize, heatmapVariants({ size }))} />}
          {xLabels?.map((label, i) => (
            <div
              key={i}
              className={cn(
                cellSize,
                "flex items-center justify-center text-muted-foreground",
                heatmapVariants({ size })
              )}
            >
              {label}
            </div>
          ))}
        </div>
      )}
      <div className={cn("flex flex-col", heatmapVariants({ size }))}>
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className="flex items-center">
            {showAxisLabels && yLabels && yLabels[rowIndex] && (
              <div
                className={cn(
                  cellSize,
                  "flex items-center justify-end pr-1 text-muted-foreground",
                  heatmapVariants({ size })
                )}
              >
                {yLabels[rowIndex]}
              </div>
            )}
            <div className="flex">
              {row.map((cell, colIndex) => {
                const isHovered =
                  hoveredCell?.row === rowIndex && hoveredCell?.col === colIndex;
                const cellColor = getColor(cell.value);
                
                return (
                  <div
                    key={colIndex}
                    role="gridcell"
                    aria-label={cell.label || `Row ${rowIndex + 1}, Column ${colIndex + 1}: ${formatValue(cell.value)}`}
                    tabIndex={onCellClick ? 0 : undefined}
                    className={cn(
                      cellVariants({ rounded: cellRounded }),
                      cellSize,
                      "flex items-center justify-center cursor-default",
                      isHovered && "ring-2 ring-ring ring-offset-1",
                      onCellClick && "cursor-pointer hover:ring-2 hover:ring-ring hover:ring-offset-1 focus:outline-none focus:ring-2 focus:ring-ring",
                      cellClassName
                    )}
                    style={{ backgroundColor: cellColor }}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleCellClick(rowIndex, colIndex);
                      }
                    }}
                    onMouseEnter={() => handleCellHover(rowIndex, colIndex)}
                    onMouseLeave={() => handleCellHover(null, null)}
                  >
                    {showValues && (
                      <span className="font-medium leading-none" style={{ 
                        color: getContrastColor(cellColor),
                        fontSize: size === "sm" ? "6px" : size === "lg" ? "10px" : "8px"
                      }}>
                        {formatValue(cell.value)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getContrastColor(bgColor: string): string {
  const rgb = parseColor(bgColor);
  if (!rgb) return "white";
  
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.5 ? "hsl(var(--la-foreground))" : "hsl(var(--la-background))";
}

Heatmap.displayName = "Heatmap";

export { Heatmap, heatmapVariants, defaultColorScales, interpolateColor };
