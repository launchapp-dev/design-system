import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const terminalVariants = cva(
  "overflow-hidden rounded-[--la-radius] font-mono text-sm",
  {
    variants: {
      variant: {
        default: "bg-zinc-900 text-zinc-100",
        light: "bg-zinc-100 text-zinc-900",
        green: "bg-black text-green-400",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface TerminalLine {
  content: string;
  type?: "input" | "output" | "error" | "success" | "warning" | "info";
  delay?: number;
}

export interface TerminalProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof terminalVariants> {
  lines?: TerminalLine[];
  typing?: boolean;
  typingSpeed?: number;
  prompt?: string;
  title?: string;
  showControls?: boolean;
  onTypingComplete?: () => void;
  onClear?: () => void;
}

function Terminal({
  className,
  variant,
  size,
  lines = [],
  typing = false,
  typingSpeed = 50,
  prompt = "$ ",
  title = "Terminal",
  showControls = true,
  onTypingComplete,
  onClear,
  ref,
  ...props
}: TerminalProps & { ref?: React.Ref<HTMLDivElement> }) {
  const [displayedLines, setDisplayedLines] = React.useState<TerminalLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = React.useState(0);
  const [currentCharIndex, setCurrentCharIndex] = React.useState(0);
  const [isTyping, setIsTyping] = React.useState(typing);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!typing || lines.length === 0) {
      setDisplayedLines(lines);
      return;
    }

    setIsTyping(true);
    setDisplayedLines([]);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
  }, [typing, lines]);

  React.useEffect(() => {
    if (!isTyping || lines.length === 0) return;

    if (currentLineIndex >= lines.length) {
      setIsTyping(false);
      onTypingComplete?.();
      return;
    }

    const currentLine = lines[currentLineIndex];
    const delay = currentLine.delay ?? typingSpeed;

    const timer = setTimeout(() => {
      if (currentCharIndex < currentLine.content.length) {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          if (!newLines[currentLineIndex]) {
            newLines[currentLineIndex] = { ...currentLine, content: "" };
          }
          newLines[currentLineIndex] = {
            ...newLines[currentLineIndex],
            content: currentLine.content.slice(0, currentCharIndex + 1),
          };
          return newLines;
        });
        setCurrentCharIndex((prev) => prev + 1);
      } else {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [isTyping, currentLineIndex, currentCharIndex, lines, typingSpeed, onTypingComplete]);

  React.useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [displayedLines]);

  const getLineStyle = (type?: TerminalLine["type"]): string => {
    switch (type) {
      case "error":
        return "text-red-400";
      case "success":
        return "text-green-400";
      case "warning":
        return "text-yellow-400";
      case "info":
        return "text-blue-400";
      case "input":
        return "text-cyan-400";
      default:
        return "text-zinc-100";
    }
  };

  const handleClear = () => {
    setDisplayedLines([]);
    onClear?.();
  };

  const windowControls = (
    <div className="flex items-center gap-2">
      <div className="h-3 w-3 rounded-full bg-red-500" />
      <div className="h-3 w-3 rounded-full bg-yellow-500" />
      <div className="h-3 w-3 rounded-full bg-green-500" />
    </div>
  );

  return (
    <div
      ref={ref}
      className={cn(terminalVariants({ variant, size }), className)}
      {...props}
    >
      {showControls && (
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          {windowControls}
          <span className="text-xs text-zinc-400">{title}</span>
          <button
            onClick={handleClear}
            className="rounded px-2 py-1 text-xs text-zinc-400 transition-colors hover:bg-white/10 hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))]"
            aria-label="Clear terminal"
          >
            Clear
          </button>
        </div>
      )}

      <div
        ref={contentRef}
        className="max-h-80 overflow-y-auto p-4"
      >
        {(typing ? displayedLines : lines).map((line, index) => (
          <div
            key={index}
            className={cn("whitespace-pre-wrap", getLineStyle(line.type))}
          >
            {line.type === "input" && (
              <span className="text-green-400">{prompt}</span>
            )}
            {line.content}
            {typing && index === currentLineIndex && isTyping && (
              <span className="animate-pulse">▌</span>
            )}
          </div>
        ))}
        {!typing && lines.length === 0 && (
          <div className="text-zinc-400">
            <span className="text-green-400">{prompt}</span>
            <span className="animate-pulse">▌</span>
          </div>
        )}
      </div>
    </div>
  );
}

Terminal.displayName = "Terminal";

export { Terminal, terminalVariants };
