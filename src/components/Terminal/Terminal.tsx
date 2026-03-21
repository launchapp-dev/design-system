import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const terminalVariants = cva(
  "overflow-hidden rounded-lg border border-border bg-[#1e1e1e] font-mono text-[#d4d4d4]",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const terminalTitlebarVariants = cva(
  "flex items-center gap-2 border-b border-border/50 bg-[#2d2d2d] px-4 py-2",
  {
    variants: {
      size: {
        sm: "py-1.5",
        md: "py-2",
        lg: "py-2.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface TerminalLine {
  type: "input" | "output" | "error" | "warning" | "info" | "success";
  content: string;
  timestamp?: string;
}

export interface TerminalProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof terminalVariants> {
  lines?: TerminalLine[];
  title?: string;
  showTimestamps?: boolean;
  typingSpeed?: number;
  typing?: boolean;
  onTypingComplete?: () => void;
  prompt?: string;
  scrollable?: boolean;
  maxLines?: number;
  animate?: boolean;
}

function TerminalIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" y2="19" />
    </svg>
  );
}

function Terminal({
  lines = [],
  title = "Terminal",
  showTimestamps = false,
  typingSpeed = 30,
  typing = false,
  onTypingComplete,
  prompt = "$",
  scrollable = true,
  maxLines,
  animate = false,
  size,
  className,
  ref,
  ...props
}: TerminalProps & { ref?: React.Ref<HTMLDivElement> }) {
  const [displayedLines, setDisplayedLines] = React.useState<TerminalLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = React.useState(0);
  const [currentCharIndex, setCurrentCharIndex] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const prefersReducedMotion = React.useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const shouldAnimate = (typing || animate) && !prefersReducedMotion;

  React.useEffect(() => {
    if (!shouldAnimate || lines.length === 0) {
      setDisplayedLines(lines);
      return;
    }

    if (currentLineIndex >= lines.length) {
      onTypingComplete?.();
      return;
    }

    const currentLine = lines[currentLineIndex];
    const fullContent = currentLine.content;

    if (currentCharIndex < fullContent.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          newLines[currentLineIndex] = {
            ...currentLine,
            content: fullContent.slice(0, currentCharIndex + 1),
          };
          return newLines;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [shouldAnimate, lines, currentLineIndex, currentCharIndex, typingSpeed, onTypingComplete]);

  React.useEffect(() => {
    if (containerRef.current && scrollable) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedLines, scrollable]);

  const linesToShow = maxLines
    ? displayedLines.slice(-maxLines)
    : displayedLines;

  const getLineStyle = (type: TerminalLine["type"]) => {
    switch (type) {
      case "input":
        return "text-[#4ec9b0]";
      case "error":
        return "text-[#f14c4c]";
      case "warning":
        return "text-[#cca700]";
      case "info":
        return "text-[#3794ff]";
      case "success":
        return "text-[#89d185]";
      default:
        return "text-[#d4d4d4]";
    }
  };

  return (
    <div
      ref={ref}
      className={cn(terminalVariants({ size }), className)}
      role="region"
      aria-label={title}
      {...props}
    >
      <div className={terminalTitlebarVariants({ size })}>
        <div className="flex gap-1.5" aria-hidden="true">
          <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex flex-1 items-center justify-center gap-2 text-xs text-[#808080]">
          <TerminalIcon />
          <span>{title}</span>
        </div>
        <div className="w-16" aria-hidden="true" />
      </div>
      <div
        ref={containerRef}
        className={cn(
          "p-4",
          scrollable && "max-h-80 overflow-y-auto"
        )}
      >
        <pre className="whitespace-pre-wrap break-words">
          {linesToShow.map((line, index) => (
            <div key={index} className="flex flex-wrap gap-2">
              {showTimestamps && line.timestamp && (
                <span className="text-[#808080] shrink-0">{line.timestamp}</span>
              )}
              {line.type === "input" && (
                <span className="text-[#4ec9b0] shrink-0">{prompt}</span>
              )}
              <span className={getLineStyle(line.type)}>
                {line.content}
                {shouldAnimate &&
                  index === currentLineIndex &&
                  line.content.length < (lines[currentLineIndex]?.content?.length || 0) && (
                    <span
                      className="inline-block ml-0.5 h-4 w-2 animate-cursor-blink bg-[#d4d4d4]"
                      aria-hidden="true"
                    />
                  )}
              </span>
            </div>
          ))}
          {lines.length === 0 && (
            <div className="flex items-center gap-2">
              <span className="text-[#4ec9b0]">{prompt}</span>
              <span
                className="inline-block h-4 w-2 animate-cursor-blink bg-[#d4d4d4]"
                aria-hidden="true"
              />
            </div>
          )}
        </pre>
      </div>
    </div>
  );
}

Terminal.displayName = "Terminal";

export { Terminal, terminalVariants };
