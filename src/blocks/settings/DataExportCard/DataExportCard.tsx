import type * as React from "react";
import { Button } from "../../../components/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../../components/Card";
import { cn } from "../../../lib/utils";

export interface DataExportCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  lastExportDate?: string | null;
  onExport?: () => void | Promise<void>;
  isExporting?: boolean;
  exportLabel?: string;
}

function DataExportCard({
  title = "Export Your Data",
  description = "Download a copy of all your personal data in a portable format. This may take a few minutes for large accounts.",
  lastExportDate,
  onExport,
  isExporting = false,
  exportLabel = "Request Data Export",
  className,
  ref,
  ...props
}: DataExportCardProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <Card ref={ref} className={cn("max-w-xl", className)} {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {lastExportDate && (
          <p className="text-sm text-muted-foreground">
            Last exported: <time dateTime={lastExportDate}>{lastExportDate}</time>
          </p>
        )}
      </CardContent>
      <CardFooter className="gap-2">
        <Button onClick={onExport} disabled={isExporting}>
          {isExporting ? "Preparing export..." : exportLabel}
        </Button>
        {isExporting && (
          <p className="text-sm text-muted-foreground">
            You will receive an email when your export is ready.
          </p>
        )}
      </CardFooter>
    </Card>
  );
}

DataExportCard.displayName = "DataExportCard";

export { DataExportCard };
