import type * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";

export interface GaugeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: number;
  max?: number;
  min?: number;
  unit?: string;
  description?: string;
  thresholds?: { label: string; value: number; color?: string }[];
  color?: string;
}

function GaugeCard({
  title,
  value,
  max = 100,
  min = 0,
  unit = "%",
  description,
  thresholds,
  color = "var(--primary)",
  className,
  ...props
}: GaugeCardProps) {
  const clampedValue = Math.max(min, Math.min(max, value));
  const percent = ((clampedValue - min) / (max - min)) * 100;

  const getThresholdColor = (val: number) => {
    if (!thresholds) return color;
    const sorted = [...thresholds].sort((a, b) => a.value - b.value);
    for (let i = sorted.length - 1; i >= 0; i--) {
      if (val >= sorted[i].value) return sorted[i].color || color;
    }
    return color;
  };

  const displayColor = getThresholdColor(clampedValue);

  const radius = 40;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference * 0.5;

  return (
    <Card ref={null} className={cn("", className)} {...props}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {description && <CardDescription className="text-xs">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative flex h-32 w-32 items-center justify-center">
          <svg
            width="100"
            height="60"
            viewBox="0 0 100 60"
            className="overflow-visible"
            aria-hidden="true"
          >
            <path
              d="M 10 55 A 40 40 0 0 1 90 55"
              fill="none"
              stroke="var(--muted)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M 10 55 A 40 40 0 0 1 90 55"
              fill="none"
              stroke={displayColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference * 0.5}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
            <span className="text-2xl font-bold">{clampedValue}</span>
            <span className="text-xs text-muted-foreground">{unit}</span>
          </div>
        </div>

        {thresholds && thresholds.length > 0 && (
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {thresholds.map((t) => (
              <div key={t.label} className="flex items-center gap-1.5 text-xs">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: t.color || displayColor }}
                />
                <span className="text-muted-foreground">
                  {t.label}: {t.value}
                  {unit}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

GaugeCard.displayName = "GaugeCard";

export { GaugeCard };
