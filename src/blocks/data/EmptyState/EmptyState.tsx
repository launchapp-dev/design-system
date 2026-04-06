import type * as React from "react";
import { Button, type ButtonProps } from "@/components/Button";
import { cn } from "@/lib/utils";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  primaryAction?: {
    label: string;
    onClick?: () => void;
    href?: string;
  } & Omit<ButtonProps, "children" | "onClick">;
  secondaryAction?: {
    label: string;
    onClick?: () => void;
    href?: string;
  } & Omit<ButtonProps, "children" | "onClick">;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "bordered" | "card";
}

const sizeVariants = {
  sm: {
    wrapper: "p-6",
    icon: "h-10 w-10",
    iconContainer: "h-16 w-16",
    title: "text-base",
    description: "text-sm",
    gap: "gap-2",
  },
  md: {
    wrapper: "p-8",
    icon: "h-12 w-12",
    iconContainer: "h-20 w-20",
    title: "text-lg",
    description: "text-sm",
    gap: "gap-3",
  },
  lg: {
    wrapper: "p-12",
    icon: "h-16 w-16",
    iconContainer: "h-28 w-28",
    title: "text-xl",
    description: "text-base",
    gap: "gap-4",
  },
};

const defaultIcons: Record<string, React.ReactNode> = {
  search: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  inbox: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  ),
  folder: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  ),
  file: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  ),
  users: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  bell: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  ),
  box: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  ),
};

function EmptyState({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  size = "md",
  variant = "default",
  className,
  ref,
  ...props
}: EmptyStateProps & { ref?: React.Ref<HTMLDivElement> }) {
  const styles = sizeVariants[size];

  const renderAction = (
    action: EmptyStateProps["primaryAction"],
    buttonVariant: ButtonProps["variant"] = "default"
  ) => {
    if (!action) return null;

    const { label, onClick, href, ...buttonProps } = action;

    if (href) {
      return (
        <Button asChild variant={buttonVariant} {...buttonProps}>
          <a href={href}>{label}</a>
        </Button>
      );
    }

    return (
      <Button variant={buttonVariant} onClick={onClick} {...buttonProps}>
        {label}
      </Button>
    );
  };

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center text-center",
        styles.wrapper,
        variant === "bordered" && "rounded-lg border border-dashed border-border",
        variant === "card" && "rounded-lg border border-border bg-card shadow-sm",
        className
      )}
      {...props}
    >
      {icon && (
        <div
          className={cn(
            "mb-4 flex items-center justify-center rounded-full bg-muted text-muted-foreground",
            styles.iconContainer
          )}
        >
          <div className={cn(styles.icon)}>{icon}</div>
        </div>
      )}

      <div className={cn("flex flex-col", styles.gap)}>
        <h3 className={cn("font-semibold tracking-tight text-foreground", styles.title)}>
          {title}
        </h3>
        {description && (
          <p className={cn("max-w-sm text-muted-foreground", styles.description)}>
            {description}
          </p>
        )}
      </div>

      {(primaryAction || secondaryAction) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {renderAction(primaryAction, "default")}
          {renderAction(secondaryAction, "outline")}
        </div>
      )}
    </div>
  );
}

EmptyState.displayName = "EmptyState";

export { EmptyState };
export { defaultIcons as emptyStateIcons };
