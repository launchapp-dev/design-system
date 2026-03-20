import * as React from "react";
import { cn } from "../../../lib/utils";

export interface NotFoundProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  homeAction?: React.ReactNode;
  backAction?: React.ReactNode;
  illustration?: React.ReactNode;
}

const defaultIllustration = (
  <svg
    className="w-48 h-48 text-muted-foreground/30"
    fill="none"
    viewBox="0 0 200 200"
    aria-hidden="true"
  >
    <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="4" />
    <text x="50%" y="52%" dominantBaseline="middle" textAnchor="middle" fontSize="64" fontWeight="bold" fill="currentColor">
      404
    </text>
  </svg>
);

const NotFound = React.forwardRef<HTMLDivElement, NotFoundProps>(
  (
    {
      className,
      title = "Page not found",
      description = "Sorry, we couldn't find the page you're looking for. It may have been moved or deleted.",
      homeAction,
      backAction,
      illustration,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center",
          className
        )}
        {...props}
      >
        <div className="mb-8">{illustration ?? defaultIllustration}</div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{title}</h1>
        <p className="mt-4 max-w-md text-muted-foreground">{description}</p>
        {(homeAction || backAction) && (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {homeAction}
            {backAction}
          </div>
        )}
      </div>
    );
  }
);

NotFound.displayName = "NotFound";

export { NotFound };
