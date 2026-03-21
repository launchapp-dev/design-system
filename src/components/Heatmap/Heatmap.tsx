import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChartContainer } from "@/components/Chart";

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

export interface HeatmapCell {
  x: string | number;
  y: string | number;
  value: number;
}

export interface HeatmapProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof heatmapVariants> {
  data: HeatmapCell[];
  xLabels?: string[];
  yLabels?: string[];
  colorScale?: (value: number) => string;
  minValue?: number;
  maxValue?: number;
  cellWidth?: number;
  cellHeight?: number;
  showValues?: boolean;
  formatValue?: (value: number) => string;
  height?: number | string;
}

function Heatmap(
  {
    data,
    xLabels = [],
    yLabels = [],
    colorScale,
    minValue: minProp,
    maxValue: maxProp,
    cellWidth = 40,
    cellHeight = 40,
    showValues = true,
    formatValue = (v) => v.toString(),
    height = 300,
    size,
    className,
    ref,
    ...props
  }: HeatmapProps & { ref?: React.Ref<HTMLDivElement> }
) {
  const values = data.map((d) => d.value);
  const minValue = minProp ?? Math.min(...values);
  const maxValue = maxProp ?? Math.max(...values);

  const defaultColorScale = React.useCallback(
    (value: number) => {
      const normalized = (value - minValue) / (maxValue - minValue);
      const hue = (1 - normalized) * 240;
      return `hsl(${hue}, 70%, 50%)`;
    },
    [minValue, maxValue]
  );

  const activeColorScale = colorScale ?? defaultColorScale;

  const xSet = xLabels.length > 0 ? xLabels : [...new Set(data.map((d) => d.x))];
  const ySet = yLabels.length > 0 ? yLabels : [...new Set(data.map((d) => d.y))];

  const grid: (HeatmapCell | null)[][] = ySet.map((yLabel) =>
    xSet.map((xLabel) => {
      const cell = data.find((d) => d.x === xLabel && d.y === yLabel);
      return cell ?? null;
    })
  );

  const [focusedCell, setFocusedCell] = React.useState<{ x: number; y: number } | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent, xIdx: number, yIdx: number) => {
    let newX = xIdx;
    let newY = yIdx;

    switch (e.key) {
      case "ArrowLeft":
        newX = Math.max(0, xIdx - 1);
        break;
      case "ArrowRight":
        newX = Math.min(xSet.length - 1, xIdx + 1);
        break;
      case "ArrowUp":
        newY = Math.max(0, yIdx - 1);
        break;
      case "ArrowDown":
        newY = Math.min(ySet.length - 1, yIdx + 1);
        break;
      default:
        return;
    }

    e.preventDefault();
    setFocusedCell({ x: newX, y: newY });
    const cellElement = document.getElementById(`heatmap-cell-${newX}-${newY}`);
    cellElement?.focus();
  };

  return (
    <div
      ref={ref}
      className={cn(heatmapVariants({ size }), className)}
      role="grid"
      aria-label="Heatmap visualization"
      {...props}
    >
      <ChartContainer height={height}>
        <div className="inline-block">
          <div className="flex">
            <div className="flex flex-col justify-around pr-2" style={{ height: ySet.length * cellHeight }}>
              {ySet.map((label, idx) => (
                <div
                  key={label}
                  className="text-muted-foreground text-right"
                  style={{ height: cellHeight, lineHeight: `${cellHeight}px` }}
                >
                  {label}
                </div>
              ))}
            </div>
            <div>
              <div className="flex mb-1" style={{ marginLeft: cellWidth / 2 }}>
                {xSet.map((label) => (
                  <div
                    key={label}
                    className="text-muted-foreground text-center"
                    style={{ width: cellWidth }}
                  >
                    {label}
                  </div>
                ))}
              </div>
              {grid.map((row, yIdx) => (
                <div key={ySet[yIdx]} className="flex">
                  {row.map((cell, xIdx) => {
                    const isFocused = focusedCell?.x === xIdx && focusedCell?.y === yIdx;
                    return (
                      <div
                        key={xSet[xIdx]}
                        id={`heatmap-cell-${xIdx}-${yIdx}`}
                        tabIndex={isFocused ? 0 : -1}
                        role="gridcell"
                        aria-label={
                          cell
                            ? `${xSet[xIdx]}, ${ySet[yIdx]}: ${formatValue(cell.value)}`
                            : `${xSet[xIdx]}, ${ySet[yIdx]}: no data`
                        }
                        className={cn(
                          "border border-background/20 transition-all",
                          isFocused && "ring-2 ring-primary ring-offset-1"
                        )}
                        style={{
                          width: cellWidth,
                          height: cellHeight,
                          backgroundColor: cell ? activeColorScale(cell.value) : "hsl(var(--la-muted))",
                        }}
                        onFocus={() => setFocusedCell({ x: xIdx, y: yIdx })}
                        onBlur={() => setFocusedCell(null)}
                        onKeyDown={(e) => handleKeyDown(e, xIdx, yIdx)}
                      >
                        {showValues && cell && (
                          <div className="w-full h-full flex items-center justify-center">
                            {formatValue(cell.value)}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </ChartContainer>
    </div>
  );
}
Heatmap.displayName = "Heatmap";

export { Heatmap, heatmapVariants };
