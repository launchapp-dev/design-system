import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/Breadcrumb";

export interface PageContainerBreadcrumb {
  label: string;
  href?: string;
}

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  breadcrumbs?: PageContainerBreadcrumb[];
  actions?: React.ReactNode;
  children?: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: boolean;
}

const maxWidthVariants = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  "2xl": "max-w-screen-xl",
  full: "max-w-full",
};

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

function PageContainer({
  title,
  description,
  breadcrumbs,
  actions,
  children,
  maxWidth = "xl",
  padding = true,
  className,
  ...props
}: PageContainerProps) {
  const hasHeader = title || breadcrumbs?.length || actions;

  return (
    <div className={cn("mx-auto w-full", maxWidthVariants[maxWidth], className)} {...props}>
      {hasHeader && (
        <div className={cn("mb-6", padding && "px-4 sm:px-6 lg:px-0")}>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <Breadcrumb className="mb-3">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/"
                    className="flex items-center gap-1"
                  >
                    <HomeIcon />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {index === breadcrumbs.length - 1 ? (
                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={crumb.href || "#"}>{crumb.label}</BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          )}

          {(title || description) && (
            <div className="flex items-start justify-between gap-4">
              <div>
                {title && (
                  <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                )}
                {description && (
                  <p className="mt-1 text-muted-foreground">{description}</p>
                )}
              </div>
              {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
            </div>
          )}
        </div>
      )}

      <div className={padding ? "px-4 sm:px-6 lg:px-0" : ""}>{children}</div>
    </div>
  );
}

PageContainer.displayName = "PageContainer";

export { PageContainer };
