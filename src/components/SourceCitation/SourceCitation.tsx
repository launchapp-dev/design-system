import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sourceCitationVariants = cva(
  "inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground hover:bg-muted/80",
        primary: "bg-primary/10 text-primary hover:bg-primary/20",
        outline: "border border-border text-muted-foreground hover:bg-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SourceCitationProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof sourceCitationVariants> {
  number: number;
  href?: string;
  title?: string;
  source?: string;
}

function SourceCitation({
  number,
  href,
  title,
  source,
  variant = "default",
  className,
  children,
  ...props
}: SourceCitationProps & { ref?: React.Ref<HTMLAnchorElement> }) {
  const content = (
    <>
      <sup className="text-[10px]">{number}</sup>
      {children ?? (source && <span className="truncate max-w-[100px]">{source}</span>)}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(sourceCitationVariants({ variant }), className)}
        title={title ?? source}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <span
      className={cn(sourceCitationVariants({ variant }), className)}
      title={title ?? source}
      {...props}
    >
      {content}
    </span>
  );
}
SourceCitation.displayName = "SourceCitation";

export interface SourceCitationListProps
  extends React.HTMLAttributes<HTMLOListElement> {
  sources: Source[];
}

export interface Source {
  id: string;
  number: number;
  title: string;
  url?: string;
  snippet?: string;
  favicon?: string;
}

function SourceCitationList({
  sources,
  className,
  ...props
}: SourceCitationListProps & { ref?: React.Ref<HTMLOListElement> }) {
  return (
    <ol
      className={cn(
        "flex flex-col gap-2 rounded-lg border bg-muted/30 p-3 text-xs",
        className
      )}
      aria-label="Sources"
      {...props}
    >
      {sources.map((source) => (
        <li key={source.id} className="flex items-start gap-2">
          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-medium">
            {source.number}
          </span>
          <div className="flex-1 min-w-0">
            {source.url ? (
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline line-clamp-1"
              >
                {source.favicon && (
                  <img
                    src={source.favicon}
                    alt=""
                    className="mr-1 inline h-3 w-3 rounded-sm"
                    aria-hidden="true"
                  />
                )}
                {source.title}
              </a>
            ) : (
              <span className="font-medium line-clamp-1">{source.title}</span>
            )}
            {source.snippet && (
              <p className="mt-0.5 text-muted-foreground line-clamp-2">
                {source.snippet}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
SourceCitationList.displayName = "SourceCitationList";

export interface SourceCitationInlineProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof sourceCitationVariants> {
  number: number;
}

function SourceCitationInline({
  number,
  variant = "default",
  className,
  ...props
}: SourceCitationInlineProps & { ref?: React.Ref<HTMLSpanElement> }) {
  return (
    <span
      className={cn(
        sourceCitationVariants({ variant }),
        "cursor-default",
        className
      )}
      role="footnote"
      aria-label={`Source ${number}`}
      {...props}
    >
      <sup>{number}</sup>
    </span>
  );
}
SourceCitationInline.displayName = "SourceCitationInline";

export {
  SourceCitation,
  SourceCitationList,
  SourceCitationInline,
  sourceCitationVariants,
};
