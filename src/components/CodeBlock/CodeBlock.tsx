import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const codeBlockVariants = cva(
  "relative overflow-hidden rounded-lg border border-border bg-muted/30",
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

const codeLineVariants = cva("flex", {
  variants: {
    diff: {
      none: "",
      add: "bg-emerald-500/10",
      remove: "bg-red-500/10",
    },
  },
  defaultVariants: {
    diff: "none",
  },
});

export interface CodeLine {
  content: string;
  diff?: "add" | "remove" | "none";
  highlight?: boolean;
}

export interface CodeBlockProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof codeBlockVariants> {
  code: string | CodeLine[];
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  highlightLines?: number[];
  scrollable?: boolean;
  maxLines?: number;
}

const CopyIcon = () => (
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
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const CheckIcon = () => (
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
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

function tokenizeCode(code: string, language: string): React.ReactNode[] {
  const keywords: Record<string, string[]> = {
    javascript: ["const", "let", "var", "function", "return", "if", "else", "for", "while", "class", "import", "export", "from", "async", "await", "try", "catch", "throw", "new", "this", "extends", "static", "get", "set", "default", "typeof", "instanceof"],
    typescript: ["const", "let", "var", "function", "return", "if", "else", "for", "while", "class", "import", "export", "from", "async", "await", "try", "catch", "throw", "new", "this", "extends", "static", "get", "set", "default", "typeof", "instanceof", "interface", "type", "enum", "implements", "private", "public", "protected", "readonly", "abstract", "namespace", "declare", "as", "is", "keyof", "infer", "never", "unknown"],
    jsx: ["const", "let", "var", "function", "return", "if", "else", "for", "while", "class", "import", "export", "from", "async", "await", "try", "catch", "throw", "new", "this", "extends", "static", "get", "set", "default", "typeof", "instanceof"],
    tsx: ["const", "let", "var", "function", "return", "if", "else", "for", "while", "class", "import", "export", "from", "async", "await", "try", "catch", "throw", "new", "this", "extends", "static", "get", "set", "default", "typeof", "instanceof", "interface", "type", "enum", "implements", "private", "public", "protected", "readonly", "abstract", "namespace", "declare", "as", "is", "keyof", "infer", "never", "unknown"],
    python: ["def", "class", "if", "elif", "else", "for", "while", "return", "import", "from", "as", "try", "except", "finally", "raise", "with", "lambda", "yield", "global", "nonlocal", "assert", "pass", "break", "continue", "True", "False", "None", "and", "or", "not", "in", "is"],
    css: ["@import", "@media", "@keyframes", "@font-face", "@supports", "@layer"],
    json: [],
    bash: ["if", "then", "else", "elif", "fi", "for", "do", "done", "while", "until", "case", "esac", "function", "return", "exit", "export", "source", "echo", "cd", "ls", "mkdir", "rm", "cp", "mv", "cat", "grep", "find", "chmod", "chown"],
    shell: ["if", "then", "else", "elif", "fi", "for", "do", "done", "while", "until", "case", "esac", "function", "return", "exit", "export", "source", "echo", "cd", "ls", "mkdir", "rm", "cp", "mv", "cat", "grep", "find", "chmod", "chown"],
  };

  const langKeywords = keywords[language.toLowerCase()] || [];
  const lines = code.split("\n");

  return lines.map((line, lineIndex) => {
    const tokens: React.ReactNode[] = [];
    let remaining = line;
    let tokenIndex = 0;

    while (remaining.length > 0) {
      let matched = false;

      const stringMatch = remaining.match(/^(["'`])(?:(?!\1)[^\\]|\\.)*\1?/);
      if (stringMatch) {
        tokens.push(
          <span key={`${lineIndex}-${tokenIndex}`} className="text-emerald-600 dark:text-emerald-400">
            {stringMatch[0]}
          </span>
        );
        remaining = remaining.slice(stringMatch[0].length);
        tokenIndex++;
        matched = true;
        continue;
      }

      const commentMatch = remaining.match(/^(\/\/.*|\/\*[\s\S]*?\*\/|#.*)/);
      if (commentMatch) {
        tokens.push(
          <span key={`${lineIndex}-${tokenIndex}`} className="text-muted-foreground italic">
            {commentMatch[0]}
          </span>
        );
        remaining = remaining.slice(commentMatch[0].length);
        tokenIndex++;
        matched = true;
        continue;
      }

      const numberMatch = remaining.match(/^-?\d+\.?\d*/);
      if (numberMatch) {
        tokens.push(
          <span key={`${lineIndex}-${tokenIndex}`} className="text-amber-600 dark:text-amber-400">
            {numberMatch[0]}
          </span>
        );
        remaining = remaining.slice(numberMatch[0].length);
        tokenIndex++;
        matched = true;
        continue;
      }

      const wordMatch = remaining.match(/^[a-zA-Z_$][a-zA-Z0-9_$]*/);
      if (wordMatch) {
        const word = wordMatch[0];
        if (langKeywords.includes(word)) {
          tokens.push(
            <span key={`${lineIndex}-${tokenIndex}`} className="text-violet-600 dark:text-violet-400 font-medium">
              {word}
            </span>
          );
        } else if (word === "true" || word === "false" || word === "null" || word === "undefined") {
          tokens.push(
            <span key={`${lineIndex}-${tokenIndex}`} className="text-orange-600 dark:text-orange-400">
              {word}
            </span>
          );
        } else {
          tokens.push(
            <span key={`${lineIndex}-${tokenIndex}`} className="text-foreground">
              {word}
            </span>
          );
        }
        remaining = remaining.slice(word.length);
        tokenIndex++;
        matched = true;
        continue;
      }

      const operatorMatch = remaining.match(/^(=>|===|!==|==|!=|<=|>=|&&|\|\||[+\-*/%=<>!&|^~])/);
      if (operatorMatch) {
        tokens.push(
          <span key={`${lineIndex}-${tokenIndex}`} className="text-pink-600 dark:text-pink-400">
            {operatorMatch[0]}
          </span>
        );
        remaining = remaining.slice(operatorMatch[0].length);
        tokenIndex++;
        matched = true;
        continue;
      }

      const punctuationMatch = remaining.match(/^[{}[\]();,.:?]/);
      if (punctuationMatch) {
        tokens.push(
          <span key={`${lineIndex}-${tokenIndex}`} className="text-foreground">
            {punctuationMatch[0]}
          </span>
        );
        remaining = remaining.slice(punctuationMatch[0].length);
        tokenIndex++;
        matched = true;
        continue;
      }

      const jsxMatch = remaining.match(/^(<\/?\/?)([a-zA-Z][a-zA-Z0-9]*)/);
      if (jsxMatch && (language === "jsx" || language === "tsx")) {
        tokens.push(
          <span key={`${lineIndex}-${tokenIndex}`} className="text-sky-600 dark:text-sky-400">
            {jsxMatch[1]}
          </span>,
          <span key={`${lineIndex}-${tokenIndex}-tag`} className="text-sky-600 dark:text-sky-400">
            {jsxMatch[2]}
          </span>
        );
        remaining = remaining.slice(jsxMatch[0].length);
        tokenIndex += 2;
        matched = true;
        continue;
      }

      if (!matched) {
        tokens.push(
          <span key={`${lineIndex}-${tokenIndex}`} className="text-foreground">
            {remaining[0]}
          </span>
        );
        remaining = remaining.slice(1);
        tokenIndex++;
      }
    }

    return (
      <React.Fragment key={lineIndex}>
        {tokens.length > 0 ? tokens : <span className="text-foreground">&nbsp;</span>}
      </React.Fragment>
    );
  });
}

function CodeBlock({
  code,
  language = "typescript",
  filename,
  showLineNumbers = true,
  showCopyButton = true,
  highlightLines = [],
  scrollable = true,
  maxLines,
  size,
  className,
  ref,
  ...props
}: CodeBlockProps & { ref?: React.Ref<HTMLDivElement> }) {
  const [copied, setCopied] = React.useState(false);

  const lines: CodeLine[] = Array.isArray(code)
    ? code
    : code.split("\n").map((content) => ({ content, diff: "none" as const }));

  const displayLines = maxLines ? lines.slice(0, maxLines) : lines;
  const plainCode = Array.isArray(code) ? code.map((l) => l.content).join("\n") : code;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(plainCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Failed to copy code");
    }
  };

  const lineNumberWidth = Math.max(String(lines.length).length * 0.6, 2);

  return (
    <div
      ref={ref}
      className={cn(codeBlockVariants({ size }), className)}
      {...props}
    >
      {(filename || showCopyButton) && (
        <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
          <div className="flex items-center gap-2">
            {filename && (
              <span className="text-xs font-medium text-muted-foreground">{filename}</span>
            )}
            {language && (
              <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                {language}
              </span>
            )}
          </div>
          {showCopyButton && (
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center justify-center rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={copied ? "Copied" : "Copy code"}
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
            </button>
          )}
        </div>
      )}
      <div
        className={cn(
          "p-4 font-mono",
          scrollable && "overflow-x-auto"
        )}
      >
        <pre className="table w-full border-separate border-spacing-0">
          <code className="table-row-group">
            {displayLines.map((line, index) => {
              const lineNumber = index + 1;
              const isHighlighted = highlightLines.includes(lineNumber);

              return (
                <div
                  key={index}
                  className={cn(
                    codeLineVariants({ diff: line.diff }),
                    "table-row",
                    isHighlighted && "bg-primary/10"
                  )}
                >
                  {showLineNumbers && (
                    <span
                      className="table-cell select-none pr-4 text-right text-muted-foreground/50"
                      style={{ width: `${lineNumberWidth}rem` }}
                      aria-hidden="true"
                    >
                      {line.diff === "add" && (
                        <span className="text-emerald-500 mr-1">+</span>
                      )}
                      {line.diff === "remove" && (
                        <span className="text-red-500 mr-1">-</span>
                      )}
                      {lineNumber}
                    </span>
                  )}
                  <span className="table-cell whitespace-pre">
                    {Array.isArray(code) ? line.content : tokenizeCode(line.content, language)[index]}
                  </span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>
    </div>
  );
}

CodeBlock.displayName = "CodeBlock";

export { CodeBlock, codeBlockVariants };
