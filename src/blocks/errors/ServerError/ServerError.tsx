import * as React from "react";
import { cn } from "../../../lib/utils";

export interface ServerErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  errorCode?: string;
  errorDetails?: string;
  retryAction?: React.ReactNode;
  homeAction?: React.ReactNode;
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
    <text
      x="50%"
      y="52%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontSize="64"
      fontWeight="bold"
      fill="currentColor"
    >
      500
    </text>
  </svg>
);

const ServerError = React.forwardRef<HTMLDivElement, ServerErrorProps>(
  (
    {
      className,
      title = "Something went wrong",
      description = "We're experiencing an internal server error. Please try again in a few moments.",
      errorCode,
      errorDetails,
      retryAction,
      homeAction,
      illustration,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center",
          className,
        )}
        {...props}
      >
        <div className="mb-8">{illustration ?? defaultIllustration}</div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {title}
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">{description}</p>
        {(errorCode || errorDetails) && (
          <div className="mt-6 rounded-lg border border-border bg-muted/50 px-4 py-3 text-left max-w-sm w-full">
            {errorCode && (
              <p className="text-xs font-medium text-muted-foreground">
                Error code:{" "}
                <span className="font-mono text-foreground">{errorCode}</span>
              </p>
            )}
            {errorDetails && (
              <p className="mt-1 text-xs font-mono text-muted-foreground break-all">
                {errorDetails}
              </p>
            )}
          </div>
        )}
        {(retryAction || homeAction) && (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {retryAction}
            {homeAction}
          </div>
        )}
      </div>
    );
  },
);

ServerError.displayName = "ServerError";

export { ServerError };
