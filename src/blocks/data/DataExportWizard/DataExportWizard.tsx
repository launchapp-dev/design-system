import * as React from "react";
import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Label } from "@/components/Label";
import { RadioGroup, RadioGroupItem } from "@/components/RadioGroup";
import { MultiStepWizard } from "@/components/MultiStepWizard";
import { Progress } from "@/components/Progress";
import { cn } from "@/lib/utils";
import type { WizardStep } from "@/components/MultiStepWizard";

export type ExportFormat = "csv" | "json" | "xlsx" | "xml";

export interface ExportOptions {
  format: ExportFormat;
  fields: string[];
  includeArchived: boolean;
  dateRange?: { from: string; to: string };
  dataTypes: string[];
}

export interface DataExportWizardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  availableFields?: { id: string; label: string; category: string }[];
  availableDataTypes?: { id: string; label: string; count: number }[];
  onExport?: (options: ExportOptions) => void | Promise<void>;
  title?: string;
}

const formatLabel: Record<ExportFormat, string> = {
  csv: "CSV (Comma-separated values)",
  json: "JSON (JavaScript Object Notation)",
  xlsx: "Excel (XLSX)",
  xml: "XML (Extensible Markup Language)",
};

const formatDesc: Record<ExportFormat, string> = {
  csv: "Best for spreadsheets and data analysis tools.",
  json: "Best for developers and programmatic data processing.",
  xlsx: "Best for Excel with formatting preserved.",
  xml: "Best for legacy systems and structured documents.",
};

const CheckIcon = () => (
  <svg className="h-4 w-4 shrink-0 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

function DataExportWizard({
  availableFields = [
    { id: "users", label: "Users", category: "People" },
    { id: "teams", label: "Teams", category: "People" },
    { id: "projects", label: "Projects", category: "Content" },
    { id: "tasks", label: "Tasks", category: "Content" },
    { id: "comments", label: "Comments", category: "Content" },
    { id: "files", label: "Files & Attachments", category: "Assets" },
    { id: "invoices", label: "Invoices", category: "Billing" },
    { id: "payments", label: "Payments", category: "Billing" },
    { id: "audit_logs", label: "Audit Logs", category: "Security" },
  ],
  availableDataTypes = [
    { id: "users", label: "Users", count: 142 },
    { id: "projects", label: "Projects", count: 38 },
    { id: "tasks", label: "Tasks", count: 1204 },
    { id: "files", label: "Files", count: 567 },
    { id: "invoices", label: "Invoices", count: 24 },
  ],
  onExport,
  title = "Export Your Data",
  className,
  ...props
}: DataExportWizardProps) {
  const [format, setFormat] = React.useState<ExportFormat>("csv");
  const [selectedFields, setSelectedFields] = React.useState<Set<string>>(
    new Set(availableFields.map((f) => f.id))
  );
  const [includeArchived, setIncludeArchived] = React.useState(false);
  const [selectedTypes, setSelectedTypes] = React.useState<Set<string>>(
    new Set(availableDataTypes.map((t) => t.id))
  );
  const [isExporting, setIsExporting] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const fieldCategories = React.useMemo(() => {
    const cats = new Map<string, typeof availableFields>();
    for (const field of availableFields) {
      if (!cats.has(field.category)) cats.set(field.category, []);
      cats.get(field.category)!.push(field);
    }
    return Array.from(cats.entries());
  }, [availableFields]);

  function toggleField(id: string) {
    setSelectedFields((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleType(id: string) {
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function handleExport() {
    if (!onExport) return;
    setIsExporting(true);
    setProgress(0);
    const options: ExportOptions = {
      format,
      fields: Array.from(selectedFields),
      includeArchived,
      dataTypes: Array.from(selectedTypes),
    };
    const result = onExport(options);
    if (result instanceof Promise) {
      const interval = setInterval(() => setProgress((p) => Math.min(p + 10, 90)), 300);
      await result.catch(() => {});
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => setIsExporting(false), 500);
    } else {
      setIsExporting(false);
    }
  }

  const steps: WizardStep[] = React.useMemo(
    () => [
      {
        id: "format",
        title: "Format",
        description: "Choose the output format for your export.",
        content: (
          <RadioGroup
            value={format}
            onValueChange={(v) => setFormat(v as ExportFormat)}
            className="space-y-3"
          >
            {(Object.keys(formatLabel) as ExportFormat[]).map((f) => (
              <div key={f} className="flex items-start gap-3 rounded-lg border p-4">
                <RadioGroupItem value={f} id={`fmt-${f}`} className="mt-0.5" />
                <div className="flex-1">
                  <Label htmlFor={`fmt-${f}`} className="cursor-pointer font-medium">
                    {formatLabel[f]}
                  </Label>
                  <p className="mt-0.5 text-sm text-muted-foreground">{formatDesc[f]}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        ),
      },
      {
        id: "fields",
        title: "Fields",
        description: "Select which fields to include in the export.",
        content: (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Checkbox
                id="select-all"
                checked={selectedFields.size === availableFields.length}
                onCheckedChange={(checked) => {
                  if (checked) setSelectedFields(new Set(availableFields.map((f) => f.id)));
                  else setSelectedFields(new Set());
                }}
              />
              <Label htmlFor="select-all" className="cursor-pointer font-medium">
                Select all fields ({availableFields.length})
              </Label>
            </div>
            {fieldCategories.map(([category, fields]) => (
              <div key={category} className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {category}
                </h4>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {fields.map((field) => (
                    <div key={field.id} className="flex items-center gap-2.5 rounded border px-3 py-2">
                      <Checkbox
                        id={`field-${field.id}`}
                        checked={selectedFields.has(field.id)}
                        onCheckedChange={() => toggleField(field.id)}
                      />
                      <Label htmlFor={`field-${field.id}`} className="cursor-pointer text-sm">
                        {field.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <p className="text-sm text-muted-foreground">
              {selectedFields.size} of {availableFields.length} fields selected
            </p>
          </div>
        ),
      },
      {
        id: "filters",
        title: "Filters",
        description: "Filter the data to export.",
        content: (
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Data types to include</h4>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {availableDataTypes.map((type) => (
                  <div
                    key={type.id}
                    className="flex items-center justify-between rounded-lg border px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={`type-${type.id}`}
                        checked={selectedTypes.has(type.id)}
                        onCheckedChange={() => toggleType(type.id)}
                      />
                      <Label htmlFor={`type-${type.id}`} className="cursor-pointer text-sm">
                        {type.label}
                      </Label>
                    </div>
                    <span className="text-xs text-muted-foreground">{type.count} records</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="include-archived"
                checked={includeArchived}
                onCheckedChange={(v) => setIncludeArchived(!!v)}
              />
              <Label htmlFor="include-archived" className="cursor-pointer text-sm">
                Include archived records
              </Label>
            </div>
          </div>
        ),
      },
    ],
    [format, selectedFields, selectedTypes, includeArchived, availableFields, fieldCategories, availableDataTypes]
  );

  return (
    <div className={cn("space-y-4", className)} {...props}>
      {title && <h2 className="text-xl font-semibold">{title}</h2>}
      {isExporting ? (
        <div className="space-y-4 rounded-xl border p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <svg className="h-6 w-6 animate-spin text-primary" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
          <div className="space-y-2">
            <p className="font-medium">Preparing your export…</p>
            <Progress value={progress} className="mx-auto max-w-xs" aria-label={`Export progress: ${progress}%`} />
            <p className="text-sm text-muted-foreground">This may take a few minutes for large exports.</p>
          </div>
        </div>
      ) : (
        <MultiStepWizard
          steps={steps}
          onComplete={handleExport}
          completeLabel="Start Export"
        />
      )}
    </div>
  );
}

DataExportWizard.displayName = "DataExportWizard";

export { DataExportWizard };
