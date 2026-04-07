import type * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { Button } from "@/components/Button";

export interface EmptyStateCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick?: () => void;
    variant?: "default" | "outline" | "ghost";
  };
  secondaryAction?: {
    label: string;
    onClick?: () => void;
  };
}

function EmptyStateCard({
  title,
  description,
  icon,
  action,
  secondaryAction,
  className,
  ...props
}: EmptyStateCardProps) {
  return (
    <Card ref={null} className={cn("flex flex-col items-center justify-center py-12 text-center", className)} {...props}>
      <CardContent className="flex flex-col items-center gap-4">
        {icon && (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            {icon}
          </div>
        )}
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">{description}</p>
          )}
        </div>
        {(action || secondaryAction) && (
          <div className="flex items-center gap-3 mt-2">
            {secondaryAction && (
              <Button
                variant="outline"
                size="sm"
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.label}
              </Button>
            )}
            {action && (
              <Button
                variant={action.variant || "default"}
                size="sm"
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

EmptyStateCard.displayName = "EmptyStateCard";

export { EmptyStateCard };
