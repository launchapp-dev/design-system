import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { useReducedMotion } from "../../lib/animation";

const streamingTextVariants = cva(
  "inline-block",
  {
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
  }
);

export interface StreamingTextProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof streamingTextVariants> {
  text: string;
  speed?: number;
  showCursor?: boolean;
  renderMarkdown?: boolean;
  chunkSize?: "character" | "word";
  onComplete?: () => void;
}

function parseMarkdownToTokens(text: string): Array<{ type: "text" | "code" | "bold" | "italic" | "codeBlock"; content: string }> {
  const tokens: Array<{ type: "text" | "code" | "bold" | "italic" | "codeBlock"; content: string }> = [];
  const regex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|```[\s\S]*?```)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: "text", content: text.slice(lastIndex, match.index) });
    }

    const matched = match[0];
    if (matched.startsWith("```")) {
      tokens.push({ type: "codeBlock", content: matched.slice(3, -3).trim() });
    } else if (matched.startsWith("`")) {
      tokens.push({ type: "code", content: matched.slice(1, -1) });
    } else if (matched.startsWith("**")) {
      tokens.push({ type: "bold", content: matched.slice(2, -2) });
    } else if (matched.startsWith("*")) {
      tokens.push({ type: "italic", content: matched.slice(1, -1) });
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push({ type: "text", content: text.slice(lastIndex) });
  }

  return tokens;
}

function renderMarkdown(text: string): React.ReactNode {
  const tokens = parseMarkdownToTokens(text);
  return tokens.map((token, index) => {
    switch (token.type) {
      case "code":
        return (
          <code key={index} className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono text-primary">
            {token.content}
          </code>
        );
      case "codeBlock":
        return (
          <pre key={index} className="p-3 my-2 rounded-lg bg-muted overflow-x-auto">
            <code className="text-sm font-mono text-primary">{token.content}</code>
          </pre>
        );
      case "bold":
        return <strong key={index} className="font-semibold">{token.content}</strong>;
      case "italic":
        return <em key={index} className="italic">{token.content}</em>;
      default:
        return <span key={index}>{token.content}</span>;
    }
  });
}

const StreamingText = React.forwardRef<HTMLDivElement, StreamingTextProps>(
  (
    {
      className,
      size,
      text,
      speed = 30,
      showCursor = true,
      renderMarkdown: shouldRenderMarkdown = false,
      chunkSize = "character",
      onComplete,
      ...props
    },
    ref
  ) => {
    const [displayedText, setDisplayedText] = React.useState("");
    const [isComplete, setIsComplete] = React.useState(false);
    const [isStreaming, setIsStreaming] = React.useState(false);
    const reducedMotion = useReducedMotion();
    const textRef = React.useRef(text);
    const speedRef = React.useRef(speed);
    const chunkSizeRef = React.useRef(chunkSize);
    const onCompleteRef = React.useRef(onComplete);
    const shouldRenderMarkdownRef = React.useRef(shouldRenderMarkdown);

    React.useEffect(() => {
      textRef.current = text;
      speedRef.current = speed;
      chunkSizeRef.current = chunkSize;
      onCompleteRef.current = onComplete;
      shouldRenderMarkdownRef.current = shouldRenderMarkdown;
    }, [text, speed, chunkSize, onComplete, shouldRenderMarkdown]);

    React.useEffect(() => {
      if (reducedMotion) {
        setDisplayedText(text);
        setIsComplete(true);
        setIsStreaming(false);
        return;
      }

      setDisplayedText("");
      setIsComplete(false);
      setIsStreaming(true);

      const words = text.split(/(\s+)/);
      let wordIndex = 0;
      let charIndex = 0;
      let currentWord = "";

      const interval = setInterval(() => {
        if (chunkSizeRef.current === "word") {
          if (wordIndex >= words.length) {
            clearInterval(interval);
            setIsStreaming(false);
            setIsComplete(true);
            onCompleteRef.current?.();
            return;
          }
          currentWord = words[wordIndex];
          setDisplayedText((prev) => prev + currentWord);
          wordIndex++;
        } else {
          const fullText = textRef.current;
          if (charIndex >= fullText.length) {
            clearInterval(interval);
            setIsStreaming(false);
            setIsComplete(true);
            onCompleteRef.current?.();
            return;
          }
          setDisplayedText(textRef.current.slice(0, charIndex + 1));
          charIndex++;
        }
      }, speedRef.current);

      return () => clearInterval(interval);
    }, [text, reducedMotion]);

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-atomic="false"
        className={cn(streamingTextVariants({ size }), className)}
        {...props}
      >
        <span aria-hidden="true">
          {shouldRenderMarkdown ? renderMarkdown(displayedText) : displayedText}
          {showCursor && (
            <span
              className={cn(
                "inline-block ml-0.5 border-r-2 border-current",
                isStreaming && !reducedMotion && "animate-cursor-blink",
                isComplete && !reducedMotion && "animate-cursor-blink-slow"
              )}
              aria-hidden="true"
            />
          )}
        </span>
        <span className="sr-only">{text}</span>
        <style>{`
          @keyframes cursor-blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          @keyframes cursor-blink-slow {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .animate-cursor-blink {
            animation: cursor-blink 0.8s step-end infinite;
          }
          .animate-cursor-blink-slow {
            animation: cursor-blink-slow 1.2s ease-in-out infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-cursor-blink,
            .animate-cursor-blink-slow {
              animation: none;
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  }
);

StreamingText.displayName = "StreamingText";

export { StreamingText, streamingTextVariants };
