import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const codeBlockVariants = cva(
  "relative overflow-hidden rounded-[--la-radius] font-mono text-sm",
  {
    variants: {
      variant: {
        default: "bg-[hsl(var(--la-muted))]",
        dark: "bg-zinc-900 text-zinc-100",
        light: "bg-zinc-100 text-zinc-900",
      },
    },
    defaultVariants: {
      variant: "dark",
    },
  }
);

export interface CodeBlockProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof codeBlockVariants> {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  showLanguage?: boolean;
  highlightLines?: number[];
  diffLines?: { added: number[]; removed: number[] };
  filename?: string;
  onCopy?: () => void;
}

function CodeBlock({
  className,
  variant,
  code,
  language,
  showLineNumbers = true,
  showCopyButton = true,
  showLanguage = true,
  highlightLines = [],
  diffLines,
  filename,
  onCopy,
  ref,
  ...props
}: CodeBlockProps & { ref?: React.Ref<HTMLDivElement> }) {
  const [copied, setCopied] = React.useState(false);

  const lines = code.split("\n");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 2000);
  };

  const getLineStyle = (lineNumber: number): string => {
    if (diffLines?.removed.includes(lineNumber)) {
      return "bg-red-500/20 text-red-300";
    }
    if (diffLines?.added.includes(lineNumber)) {
      return "bg-green-500/20 text-green-300";
    }
    if (highlightLines.includes(lineNumber)) {
      return "bg-yellow-500/20";
    }
    return "";
  };

  const getLinePrefix = (lineNumber: number): string => {
    if (diffLines?.removed.includes(lineNumber)) {
      return "-";
    }
    if (diffLines?.added.includes(lineNumber)) {
      return "+";
    }
    return " ";
  };

  return (
    <div
      ref={ref}
      className={cn(codeBlockVariants({ variant }), className)}
      {...props}
    >
      {(showLanguage || filename || showCopyButton) && (
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
          <div className="flex items-center gap-2">
            {filename && (
              <span className="text-xs text-zinc-400">{filename}</span>
            )}
            {showLanguage && language && !filename && (
              <span className="text-xs uppercase text-zinc-400">{language}</span>
            )}
          </div>
          {showCopyButton && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded px-2 py-1 text-xs text-zinc-400 transition-colors hover:bg-white/10 hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))]"
              aria-label={copied ? "Copied" : "Copy code"}
            >
              {copied ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          )}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody>
            {lines.map((line, index) => {
              const lineNumber = index + 1;
              return (
                <tr
                  key={lineNumber}
                  className={cn(getLineStyle(lineNumber))}
                >
                  {showLineNumbers && (
                    <td className="select-none border-r border-white/10 px-4 py-0.5 text-right text-xs text-zinc-500">
                      {lineNumber}
                    </td>
                  )}
                  {diffLines && (
                    <td className="select-none px-2 py-0.5 text-center text-xs">
                      {getLinePrefix(lineNumber)}
                    </td>
                  )}
                  <td className="whitespace-pre px-4 py-0.5">
                    <code>{line || " "}</code>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

CodeBlock.displayName = "CodeBlock";

function CodeInline({
  className,
  children,
  ref,
  ...props
}: React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }) {
  return (
    <code
      ref={ref}
      className={cn(
        "rounded bg-[hsl(var(--la-muted))] px-1.5 py-0.5 font-mono text-sm text-[hsl(var(--la-foreground))]",
        className
      )}
      {...props}
    >
      {children}
    </code>
  );
}

CodeInline.displayName = "CodeInline";

export { CodeBlock, CodeInline, codeBlockVariants };
