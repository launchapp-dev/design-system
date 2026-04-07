import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Badge } from "@/components/Badge";
import { Checkbox } from "@/components/Checkbox";
import { Label } from "@/components/Label";
import { Separator } from "@/components/Separator";
import { cn } from "@/lib/utils";

export type FilterOperator = "contains" | "equals" | "startsWith" | "endsWith" | "gt" | "lt" | "between";

export interface ColumnFilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface ColumnFilter {
  columnId: string;
  operator: FilterOperator;
  value: string;
  valueTo?: string;
}

export interface ColumnFilterConfig {
  id: string;
  label: string;
  type?: "text" | "number" | "select" | "multiselect" | "date" | "daterange";
  placeholder?: string;
  options?: ColumnFilterOption[];
  operators?: { value: FilterOperator; label: string }[];
}

export interface ColumnFiltersProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: ColumnFilterConfig[];
  filters: ColumnFilter[];
  onFiltersChange: (filters: ColumnFilter[]) => void;
  activeLabel?: string;
  clearAllLabel?: string;
  applyLabel?: string;
}

const defaultOperators: { value: FilterOperator; label: string }[] = [
  { value: "contains", label: "contains" },
  { value: "equals", label: "equals" },
  { value: "startsWith", label: "starts with" },
  { value: "endsWith", label: "ends with" },
];

const numberOperators: { value: FilterOperator; label: string }[] = [
  { value: "equals", label: "equals" },
  { value: "gt", label: "greater than" },
  { value: "lt", label: "less than" },
  { value: "between", label: "between" },
];

function ColumnPopover({
  config,
  filter,
  onChange,
  onClear,
  applyLabel = "Apply",
}: {
  config: ColumnFilterConfig;
  filter?: ColumnFilter;
  onChange: (f: ColumnFilter) => void;
  onClear: () => void;
  applyLabel?: string;
}) {
  const [local, setLocal] = React.useState<ColumnFilter | undefined>(filter);
  React.useEffect(() => { setLocal(filter); }, [filter]);

  const operators = config.operators ?? (config.type === "number" ? numberOperators : defaultOperators);
  const currentOp = local?.operator ?? operators[0].value;

  const handleApply = () => {
    if (!local) return;
    onChange(local);
  };

  const isActive = !!filter && filter.value !== "";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={isActive ? "secondary" : "outline"}
          size="sm"
          className={cn("h-8 gap-1.5", isActive && "ring-1 ring-primary/30")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          {config.label}
          {isActive && (
            <Badge variant="secondary" className="ml-1 h-4 px-1 text-xs">
              {config.type === "multiselect" ? filter?.value.split(",").filter(Boolean).length : 1}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3 space-y-3" align="start">
        <p className="text-sm font-medium">{config.label}</p>

        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Operator</Label>
          <div className="flex flex-wrap gap-1">
            {operators.map((op) => (
              <button
                key={op.value}
                type="button"
                onClick={() => setLocal((l) => l ? { ...l, operator: op.value } : { columnId: config.id, operator: op.value, value: "" })}
                className={cn(
                  "rounded border px-2 py-0.5 text-xs transition-colors",
                  currentOp === op.value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-muted-foreground hover:bg-accent",
                )}
              >
                {op.label}
              </button>
            ))}
          </div>
        </div>

        {config.type === "multiselect" && config.options ? (
          <div className="space-y-1.5 max-h-40 overflow-y-auto">
            {config.options.map((opt) => {
              const selected = local?.value.split(",").includes(opt.value) ?? false;
              return (
                <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={selected}
                    onCheckedChange={(_checked) => {
                      const vals = selected
                        ? (local?.value ?? "").split(",").filter((v) => v !== opt.value)
                        : [...(local?.value ?? "").split(",").filter(Boolean), opt.value];
                      setLocal((l) => l ? { ...l, value: vals.join(",") } : { columnId: config.id, operator: currentOp, value: vals.join(",") });
                    }}
                  />
                  <span className="text-sm">{opt.label}</span>
                  {opt.count !== undefined && (
                    <span className="ml-auto text-xs text-muted-foreground">{opt.count}</span>
                  )}
                </label>
              );
            })}
          </div>
        ) : config.type === "select" && config.options ? (
          <div className="space-y-1.5">
            {config.options.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={`filter-${config.id}`}
                  checked={local?.value === opt.value}
                  onChange={() => setLocal((l) => l ? { ...l, value: opt.value } : { columnId: config.id, operator: currentOp, value: opt.value })}
                  className="accent-primary"
                />
                <span className="text-sm">{opt.label}</span>
                {opt.count !== undefined && (
                  <span className="ml-auto text-xs text-muted-foreground">{opt.count}</span>
                )}
              </label>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            <Input
              type={config.type === "number" || config.type === "date" ? config.type : "text"}
              placeholder={config.placeholder ?? `Enter ${config.label.toLowerCase()}…`}
              value={local?.value ?? ""}
              onChange={(e) => setLocal((l) => l ? { ...l, value: e.target.value } : { columnId: config.id, operator: currentOp, value: e.target.value })}
              className="h-8 text-sm"
            />
            {currentOp === "between" && (
              <div className="flex gap-2">
                <Input
                  type={config.type === "number" ? "number" : "text"}
                  placeholder="From"
                  value={local?.value ?? ""}
                  onChange={(e) => setLocal((l) => l ? { ...l, value: e.target.value } : { columnId: config.id, operator: currentOp, value: e.target.value })}
                  className="h-8 text-sm flex-1"
                />
                <Input
                  type={config.type === "number" ? "number" : "text"}
                  placeholder="To"
                  value={local?.valueTo ?? ""}
                  onChange={(e) => setLocal((l) => l ? { ...l, valueTo: e.target.value } : { columnId: config.id, operator: currentOp, value: "", valueTo: e.target.value })}
                  className="h-8 text-sm flex-1"
                />
              </div>
            )}
          </div>
        )}

        <Separator />

        <div className="flex items-center justify-between gap-2">
          <Button variant="ghost" size="sm" onClick={onClear} className="text-xs h-7">
            Clear
          </Button>
          <Button size="sm" onClick={handleApply} className="text-xs h-7">
            {applyLabel}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function ColumnFilters({
  columns,
  filters,
  onFiltersChange,
  activeLabel = "Filters",
  clearAllLabel = "Clear all",
  applyLabel = "Apply",
  className,
  ...props
}: ColumnFiltersProps) {
  const activeCount = filters.filter((f) => f.value !== "").length;

  const handleChange = (updated: ColumnFilter) => {
    onFiltersChange(
      filters.map((f) => (f.columnId === updated.columnId ? updated : f)),
    );
  };

  const handleClear = (columnId: string) => {
    onFiltersChange(
      filters.map((f) =>
        f.columnId === columnId ? { ...f, value: "", valueTo: undefined } : f,
      ),
    );
  };

  const handleClearAll = () => {
    onFiltersChange(filters.map((f) => ({ ...f, value: "", valueTo: undefined })));
  };

  return (
    <div
      className={cn("flex flex-wrap items-center gap-2", className)}
      role="group"
      aria-label="Column filters"
      {...props}
    >
      <span className="text-sm text-muted-foreground font-medium">{activeLabel}:</span>
      {columns.map((col) => (
        <ColumnPopover
          key={col.id}
          config={col}
          filter={filters.find((f) => f.columnId === col.id)}
          onChange={handleChange}
          onClear={() => handleClear(col.id)}
          applyLabel={applyLabel}
        />
      ))}
      {activeCount > 1 && (
        <Button variant="ghost" size="sm" onClick={handleClearAll} className="h-8 text-xs text-destructive">
          {clearAllLabel}
        </Button>
      )}
    </div>
  );
}

ColumnFilters.displayName = "ColumnFilters";

export { ColumnFilters };
