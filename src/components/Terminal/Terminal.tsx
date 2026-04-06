import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

export interface TerminalLine {
  type?: "input" | "output" | "error";
  content: string;
  timestamp?: number;
}

const terminalVariants = cva(
  "relative rounded-lg border font-mono text-sm overflow-hidden",
  {
    variants: {
      theme: {
        dark: "bg-zinc-950 border-zinc-800 text-zinc-100",
        light: "bg-zinc-50 border-zinc-200 text-zinc-900",
      },
      size: {
        sm: "p-3 text-xs",
        md: "p-4 text-sm",
        lg: "p-6 text-base",
      },
    },
    defaultVariants: {
      theme: "dark",
      size: "md",
    },
  }
);

export interface TerminalProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof terminalVariants> {
  lines?: TerminalLine[];
  typingSpeed?: number;
  showCursor?: boolean;
  showLineNumbers?: boolean;
  header?: React.ReactNode;
}

const Terminal = React.forwardRef<HTMLDivElement, TerminalProps>(
  (
    {
      className,
      theme,
      size,
      lines = [],
      typingSpeed = 50,
      showCursor = true,
      showLineNumbers = false,
      header,
      children,
      ...props
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const prefersReducedMotion = React.useMemo(
      () =>
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      []
    );

    React.useEffect(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, []);

    return (
      <div
        ref={ref}
        className={cn(terminalVariants({ theme, size }), className)}
        {...props}
      >
        {header && (
          <div className="border-b border-inherit px-4 py-2 flex items-center justify-between">
            {header}
          </div>
        )}
        <div
          ref={containerRef}
          className="overflow-auto max-h-[400px] scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent"
        >
          <div className="p-4 space-y-1">
            {lines.map((line, index) => (
              <TerminalLineComponent
                key={index}
                line={line}
                index={index}
                showLineNumbers={showLineNumbers}
                typingSpeed={typingSpeed}
                showCursor={
                  showCursor &&
                  index === lines.length - 1 &&
                  line.type === "input"
                }
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
            {children}
          </div>
        </div>
      </div>
    );
  }
);
Terminal.displayName = "Terminal";

interface TerminalLineComponentProps {
  line: TerminalLine;
  index: number;
  showLineNumbers: boolean;
  typingSpeed: number;
  showCursor: boolean;
  prefersReducedMotion: boolean;
}

function TerminalLineComponent({
  line,
  index,
  showLineNumbers,
  typingSpeed,
  showCursor,
  prefersReducedMotion,
}: TerminalLineComponentProps) {
  const [displayedContent, setDisplayedContent] = React.useState(
    prefersReducedMotion ? line.content : ""
  );
  const [isTyping, setIsTyping] = React.useState(!prefersReducedMotion);

  React.useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedContent(line.content);
      return;
    }

    setDisplayedContent("");
    setIsTyping(true);
    let i = 0;

    const interval = setInterval(() => {
      i++;
      setDisplayedContent(line.content.slice(0, i));
      if (i >= line.content.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [line.content, typingSpeed, prefersReducedMotion]);

  const prefix =
    line.type === "input" ? ">" : line.type === "error" ? "✗" : " ";

  const prefixClass =
    line.type === "error"
      ? "text-destructive"
      : line.type === "input"
        ? "text-primary"
        : "text-muted-foreground/50";

  const contentClass =
    line.type === "error" ? "text-destructive" : "";

  return (
    <div className="flex items-start gap-2 group">
      {showLineNumbers && (
        <span className="select-none text-muted-foreground/40 w-6 text-right flex-shrink-0">
          {index + 1}
        </span>
      )}
      <span
        className={cn("flex-shrink-0 select-none", prefixClass)}
        aria-hidden="true"
      >
        {prefix}
      </span>
      <span className={cn("break-all", contentClass)}>
        {displayedContent}
        {isTyping && (
          <span
            aria-hidden="true"
            className="animate-cursor-blink border-r-2 border-current ml-0.5"
          />
        )}
        {showCursor && !isTyping && (
          <span
            aria-hidden="true"
            className="animate-cursor-blink border-r-2 border-current ml-0.5"
          />
        )}
      </span>
      <span className="sr-only">{line.content}</span>
    </div>
  );
}

const terminalHeaderVariants = cva("flex items-center gap-2", {
  variants: {
    variant: {
      default: "",
      dots: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface TerminalHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof terminalHeaderVariants> {
  title?: string;
}

function TerminalHeader({
  className,
  variant,
  title,
  ...props
}: TerminalHeaderProps) {
  const content = variant === "dots" ? (
    <div className="flex items-center gap-1.5">
      <div className="w-3 h-3 rounded-full bg-red-500/80" />
      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
      <div className="w-3 h-3 rounded-full bg-green-500/80" />
    </div>
  ) : null;

  return (
    <div className={cn(terminalHeaderVariants({ variant }), className)} {...props}>
      {content}
      {title && <span className="text-xs text-muted-foreground">{title}</span>}
    </div>
  );
}
TerminalHeader.displayName = "TerminalHeader";

export type TerminalVariants = VariantProps<typeof terminalVariants>;
export type TerminalHeaderVariants = VariantProps<typeof terminalHeaderVariants>;

export { Terminal, TerminalHeader, terminalVariants, terminalHeaderVariants };
