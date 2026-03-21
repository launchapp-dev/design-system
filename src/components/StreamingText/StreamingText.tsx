import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const streamingTextVariants = cva("inline", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface StreamingTextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof streamingTextVariants> {
  text: string;
  isStreaming?: boolean;
  cursorChar?: string;
  cursorClassName?: string;
  speed?: number;
  onComplete?: () => void;
}

function StreamingText({
  text,
  isStreaming = false,
  cursorChar = "│",
  cursorClassName,
  size,
  speed = 30,
  onComplete,
  className,
  ...props
}: StreamingTextProps & { ref?: React.Ref<HTMLSpanElement> }) {
  const [displayedText, setDisplayedText] = React.useState("");
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (!isStreaming) {
      setDisplayedText(text);
      setCurrentIndex(text.length);
      return;
    }

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (currentIndex === text.length && text.length > 0) {
      onComplete?.();
    }
  }, [text, isStreaming, currentIndex, speed, onComplete]);

  React.useEffect(() => {
    if (isStreaming && text.length > displayedText.length) {
      setCurrentIndex(displayedText.length);
    }
  }, [text, isStreaming, displayedText.length]);

  return (
    <span
      className={cn(streamingTextVariants({ size }), className)}
      aria-live="polite"
      aria-busy={isStreaming}
      {...props}
    >
      {displayedText}
      {isStreaming && (
        <span
          className={cn(
            "animate-cursor-blink ml-0.5 inline-block font-mono",
            cursorClassName
          )}
          aria-hidden="true"
        >
          {cursorChar}
        </span>
      )}
      <style>{`
        @keyframes cursor-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-cursor-blink {
          animation: cursor-blink 1s step-end infinite;
        }
      `}</style>
    </span>
  );
}
StreamingText.displayName = "StreamingText";

export interface StreamingTextBlockProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof streamingTextVariants> {
  text: string;
  isStreaming?: boolean;
  cursorChar?: string;
  cursorClassName?: string;
  speed?: number;
  onComplete?: () => void;
  showLineNumbers?: boolean;
}

function StreamingTextBlock({
  text,
  isStreaming = false,
  cursorChar = "│",
  cursorClassName,
  size = "md",
  speed = 30,
  onComplete,
  showLineNumbers = false,
  className,
  ...props
}: StreamingTextBlockProps & { ref?: React.Ref<HTMLDivElement> }) {
  const [displayedText, setDisplayedText] = React.useState("");
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (!isStreaming) {
      setDisplayedText(text);
      setCurrentIndex(text.length);
      return;
    }

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (currentIndex === text.length && text.length > 0) {
      onComplete?.();
    }
  }, [text, isStreaming, currentIndex, speed, onComplete]);

  React.useEffect(() => {
    if (isStreaming && text.length > displayedText.length) {
      setCurrentIndex(displayedText.length);
    }
  }, [text, isStreaming, displayedText.length]);

  const lines = displayedText.split("\n");

  return (
    <div
      className={cn(
        streamingTextVariants({ size }),
        "whitespace-pre-wrap font-mono",
        className
      )}
      aria-live="polite"
      aria-busy={isStreaming}
      {...props}
    >
      {showLineNumbers ? (
        <div className="flex">
          <div
            className="select-none pr-4 text-right text-muted-foreground/50"
            aria-hidden="true"
          >
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <div className="flex-1">
            {lines.map((line, i) => (
              <div key={i}>
                {line}
                {i === lines.length - 1 && isStreaming && (
                  <span
                    className={cn(
                      "animate-cursor-blink ml-0.5 inline-block",
                      cursorClassName
                    )}
                    aria-hidden="true"
                  >
                    {cursorChar}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {displayedText}
          {isStreaming && (
            <span
              className={cn(
                "animate-cursor-blink ml-0.5 inline-block",
                cursorClassName
              )}
              aria-hidden="true"
            >
              {cursorChar}
            </span>
          )}
        </>
      )}
      <style>{`
        @keyframes cursor-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-cursor-blink {
          animation: cursor-blink 1s step-end infinite;
        }
      `}</style>
    </div>
  );
}
StreamingTextBlock.displayName = "StreamingTextBlock";

export { StreamingText, StreamingTextBlock, streamingTextVariants };
