import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const terminalVariants = cva(
  "rounded-[--la-radius] font-mono overflow-hidden border",
  {
    variants: {
      theme: {
        dark: "bg-[#1e1e1e] border-[#333] text-[#d4d4d4]",
        light: "bg-[#fafafa] border-[hsl(var(--la-border))] text-[#1e1e1e]",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      theme: "dark",
      size: "md",
    },
  }
);

const terminalHeaderVariants = cva(
  "flex items-center gap-2 px-3 border-b",
  {
    variants: {
      theme: {
        dark: "bg-[#2d2d2d] border-[#333]",
        light: "bg-[#f0f0f0] border-[hsl(var(--la-border))]",
      },
      size: {
        sm: "py-1.5",
        md: "py-2",
        lg: "py-2.5",
      },
    },
    defaultVariants: {
      theme: "dark",
      size: "md",
    },
  }
);

const terminalContentVariants = cva(
  "overflow-auto",
  {
    variants: {
      size: {
        sm: "p-2",
        md: "p-3",
        lg: "p-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface TerminalLine {
  type: "input" | "output" | "error" | "info";
  content: string;
  timestamp?: string;
}

export interface TerminalProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof terminalVariants> {
  title?: string;
  lines?: TerminalLine[];
  typingSpeed?: number;
  showTimestamps?: boolean;
  animateTyping?: boolean;
  showCursor?: boolean;
  cursorChar?: string;
  prompt?: string;
  maxLines?: number;
  autoScroll?: boolean;
  static?: boolean;
  onLineComplete?: (line: TerminalLine, index: number) => void;
  onComplete?: () => void;
}

function Terminal({
  title = "Terminal",
  lines = [],
  typingSpeed = 30,
  showTimestamps = false,
  animateTyping = true,
  showCursor = true,
  cursorChar = "\u2588",
  prompt = "$",
  maxLines,
  autoScroll = true,
  static: isStatic = false,
  theme = "dark",
  size = "md",
  className,
  onLineComplete,
  onComplete,
  ref,
  ...props
}: TerminalProps & { ref?: React.Ref<HTMLDivElement> }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [displayedLines, setDisplayedLines] = React.useState<TerminalLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = React.useState(0);
  const [currentCharIndex, setCurrentCharIndex] = React.useState(0);
  const [isTyping, setIsTyping] = React.useState(false);
  const [typingComplete, setTypingComplete] = React.useState(false);

  const prefersReducedMotion = React.useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const effectiveAnimate = animateTyping && !prefersReducedMotion && !isStatic;

  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref)
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref]
  );

  React.useEffect(() => {
    if (isStatic || !effectiveAnimate) {
      const linesToShow = maxLines ? lines.slice(-maxLines) : lines;
      setDisplayedLines(linesToShow);
      setTypingComplete(true);
      return;
    }

    if (lines.length === 0) {
      setDisplayedLines([]);
      setTypingComplete(true);
      return;
    }

    setDisplayedLines([]);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
    setIsTyping(true);
    setTypingComplete(false);
  }, [lines, isStatic, effectiveAnimate, maxLines]);

  React.useEffect(() => {
    if (!effectiveAnimate || !isTyping || isStatic) return;

    if (currentLineIndex >= lines.length) {
      setIsTyping(false);
      setTypingComplete(true);
      onComplete?.();
      return;
    }

    const currentLine = lines[currentLineIndex];
    const content = currentLine.content;

    if (currentCharIndex >= content.length) {
      const linesToShow = maxLines
        ? [...displayedLines, currentLine].slice(-maxLines)
        : [...displayedLines, currentLine];
      setDisplayedLines(linesToShow);
      onLineComplete?.(currentLine, currentLineIndex);
      setCurrentLineIndex((prev) => prev + 1);
      setCurrentCharIndex(0);
      return;
    }

    const timeout = setTimeout(() => {
      setCurrentCharIndex((prev) => prev + 1);
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [
    effectiveAnimate,
    isTyping,
    currentLineIndex,
    currentCharIndex,
    lines,
    typingSpeed,
    displayedLines,
    maxLines,
    onLineComplete,
    onComplete,
    isStatic,
  ]);

  React.useEffect(() => {
    if (autoScroll && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedLines, currentCharIndex, autoScroll]);

  const getLineStyle = (type: TerminalLine["type"]) => {
    const baseClasses = "whitespace-pre-wrap break-all";
    switch (type) {
      case "input":
        return cn(baseClasses, theme === "dark" ? "text-[#4ec9b0]" : "text-[#008000]");
      case "output":
        return cn(baseClasses, theme === "dark" ? "text-[#d4d4d4]" : "text-[#1e1e1e]");
      case "error":
        return cn(baseClasses, theme === "dark" ? "text-[#f14c4c]" : "text-[#d32f2f]");
      case "info":
        return cn(baseClasses, theme === "dark" ? "text-[#3794ff]" : "text-[#1976d2]");
      default:
        return baseClasses;
    }
  };

  const getCurrentTypingContent = () => {
    if (!effectiveAnimate || isStatic || currentLineIndex >= lines.length) return null;
    const line = lines[currentLineIndex];
    return line.content.slice(0, currentCharIndex);
  };

  const renderLine = (line: TerminalLine, index: number, isTypingNow = false) => {
    const content = isTypingNow ? getCurrentTypingContent() : line.content;
    const showPrompt = line.type === "input";
    
    return (
      <div key={index} className="flex gap-2 leading-relaxed">
        {showTimestamps && line.timestamp && (
          <span className={cn(
            "shrink-0 opacity-50",
            theme === "dark" ? "text-[#6a9955]" : "text-[#666]"
          )}>
            [{line.timestamp}]
          </span>
        )}
        {showPrompt && (
          <span className={cn(
            "shrink-0 font-bold",
            theme === "dark" ? "text-[#4ec9b0]" : "text-[#008000]"
          )}>
            {prompt}
          </span>
        )}
        <span className={getLineStyle(line.type)}>
          {content}
          {isTypingNow && showCursor && (
            <span
              className="inline-block animate-cursor-blink ml-0.5"
              style={{ width: "0.6em" }}
              aria-hidden="true"
            >
              {cursorChar}
            </span>
          )}
        </span>
      </div>
    );
  };

  const visibleLines = maxLines && displayedLines.length > maxLines
    ? displayedLines.slice(-maxLines)
    : displayedLines;

  return (
    <div
      ref={setRefs}
      className={cn(terminalVariants({ theme, size }), className)}
      role="region"
      aria-label={title}
      aria-live="polite"
      aria-busy={isTyping}
      {...props}
    >
      <div className={terminalHeaderVariants({ theme, size })}>
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27ca40]" />
        </div>
        <span className={cn(
          "flex-1 text-center truncate",
          theme === "dark" ? "text-[#999]" : "text-[#666]"
        )}>
          {title}
        </span>
        <div className="w-[52px]" />
      </div>
      <div className={terminalContentVariants({ size })}>
        {visibleLines.map((line, index) => renderLine(line, index))}
        {effectiveAnimate && !isStatic && currentLineIndex < lines.length && isTyping && (
          renderLine(lines[currentLineIndex], displayedLines.length, true)
        )}
        {typingComplete && showCursor && !isStatic && lines.length > 0 && (
          <div className="flex gap-2 leading-relaxed">
            <span className={cn(
              "shrink-0 font-bold",
              theme === "dark" ? "text-[#4ec9b0]" : "text-[#008000]"
            )}>
              {prompt}
            </span>
            <span className="animate-cursor-blink" aria-hidden="true">
              {cursorChar}
            </span>
          </div>
        )}
        {(!lines || lines.length === 0) && showCursor && (
          <div className="flex gap-2 leading-relaxed">
            <span className={cn(
              "shrink-0 font-bold",
              theme === "dark" ? "text-[#4ec9b0]" : "text-[#008000]"
            )}>
              {prompt}
            </span>
            <span className="animate-cursor-blink" aria-hidden="true">
              {cursorChar}
            </span>
          </div>
        )}
      </div>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {typingComplete && lines.map((l) => l.content).join(". ")}
      </span>
    </div>
  );
}
Terminal.displayName = "Terminal";

export interface TerminalOutputProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof terminalVariants> {
  children: React.ReactNode;
  title?: string;
}

function TerminalOutput({
  children,
  title = "Output",
  theme = "dark",
  size = "md",
  className,
  ref,
  ...props
}: TerminalOutputProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn(terminalVariants({ theme, size }), className)}
      role="region"
      aria-label={title}
      {...props}
    >
      <div className={terminalHeaderVariants({ theme, size })}>
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27ca40]" />
        </div>
        <span className={cn(
          "flex-1 text-center truncate",
          theme === "dark" ? "text-[#999]" : "text-[#666]"
        )}>
          {title}
        </span>
        <div className="w-[52px]" />
      </div>
      <div className={terminalContentVariants({ size })}>
        {children}
      </div>
    </div>
  );
}
TerminalOutput.displayName = "TerminalOutput";

export interface TerminalCommandProps extends React.HTMLAttributes<HTMLSpanElement> {
  prompt?: string;
  children: React.ReactNode;
  theme?: "dark" | "light";
}

function TerminalCommand({
  prompt = "$",
  children,
  theme = "dark",
  className,
  ref,
  ...props
}: TerminalCommandProps & { ref?: React.Ref<HTMLSpanElement> }) {
  return (
    <span ref={ref} className={cn("flex gap-2", className)} {...props}>
      <span className={cn(
        "shrink-0 font-bold",
        theme === "dark" ? "text-[#4ec9b0]" : "text-[#00800]"
      )}>
        {prompt}
      </span>
      <span className={theme === "dark" ? "text-[#d4d4d4]" : "text-[#1e1e1e]"}>
        {children}
      </span>
    </span>
  );
}
TerminalCommand.displayName = "TerminalCommand";

export interface TerminalCursorProps extends React.HTMLAttributes<HTMLSpanElement> {
  char?: string;
  blink?: boolean;
}

function TerminalCursor({
  char = "\u2588",
  blink = true,
  className,
  ref,
  ...props
}: TerminalCursorProps & { ref?: React.Ref<HTMLSpanElement> }) {
  return (
    <span
      ref={ref}
      className={cn(
        blink && "animate-cursor-blink",
        "inline-block ml-0.5",
        className
      )}
      aria-hidden="true"
      style={{ width: "0.6em" }}
      {...props}
    >
      {char}
    </span>
  );
}
TerminalCursor.displayName = "TerminalCursor";

export { Terminal, TerminalOutput, TerminalCommand, TerminalCursor, terminalVariants };
