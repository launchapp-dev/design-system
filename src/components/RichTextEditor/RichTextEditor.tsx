import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Button } from "../Button";
import { Toggle } from "../Toggle";
import { Separator } from "../Separator";
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from "../Tooltip";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../DropdownMenu";

const richTextEditorVariants = cva(
  "rounded-md border bg-background overflow-hidden",
  {
    variants: {
      size: {
        sm: "",
        md: "",
        lg: "",
      },
      error: {
        true: "border-destructive",
        false: "border-input",
      },
    },
    defaultVariants: {
      size: "md",
      error: false,
    },
  }
);

export interface RichTextEditorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "value">,
    VariantProps<typeof richTextEditorVariants> {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  minHeight?: number;
  maxHeight?: number;
}

interface ToolbarButtonProps {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  tooltip: string;
  children: React.ReactNode;
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  tooltip,
  children,
}: ToolbarButtonProps) {
  return (
    <TooltipRoot>
      <TooltipTrigger asChild>
        <Toggle
          pressed={active}
          onPressedChange={onClick}
          disabled={disabled}
          size="sm"
          className="h-8 w-8 p-0"
        >
          {children}
        </Toggle>
      </TooltipTrigger>
      <TooltipContent side="bottom">{tooltip}</TooltipContent>
    </TooltipRoot>
  );
}

function RichTextEditor(
  {
    value,
    onChange,
    placeholder = "Start typing...",
    disabled = false,
    minHeight = 150,
    maxHeight = 400,
    size,
    error,
    className,
    ...props
  }: RichTextEditorProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = React.useState<Set<string>>(new Set());

  const updateActiveFormats = React.useCallback(() => {
    const formats = new Set<string>();
    if (document.queryCommandState("bold")) formats.add("bold");
    if (document.queryCommandState("italic")) formats.add("italic");
    if (document.queryCommandState("underline")) formats.add("underline");
    if (document.queryCommandState("strikeThrough")) formats.add("strikethrough");
    if (document.queryCommandState("insertUnorderedList")) formats.add("bulletList");
    if (document.queryCommandState("insertOrderedList")) formats.add("numberedList");
    setActiveFormats(formats);
  }, []);

  const execCommand = React.useCallback(
    (command: string, value?: string) => {
      if (disabled) return;
      document.execCommand(command, false, value);
      editorRef.current?.focus();
      updateActiveFormats();
      const html = editorRef.current?.innerHTML || "";
      onChange(html);
    },
    [disabled, onChange, updateActiveFormats]
  );

  const handleInput = React.useCallback(() => {
    const html = editorRef.current?.innerHTML || "";
    onChange(html);
    updateActiveFormats();
  }, [onChange, updateActiveFormats]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();
        if (e.shiftKey) {
          execCommand("outdent");
        } else {
          execCommand("indent");
        }
      }
    },
    [execCommand]
  );

  const insertLink = React.useCallback(() => {
    const url = prompt("Enter URL:");
    if (url) {
      execCommand("createLink", url);
    }
  }, [execCommand]);

  const insertCode = React.useCallback(() => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      const code = document.createElement("code");
      code.className = "bg-muted px-1 py-0.5 rounded text-sm font-mono";
      code.textContent = selectedText;
      range.deleteContents();
      range.insertNode(code);
      editorRef.current?.focus();
      const html = editorRef.current?.innerHTML || "";
      onChange(html);
    }
  }, [onChange]);

  const handleRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      (editorRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref]
  );

  return (
    <div ref={ref} className={cn(richTextEditorVariants({ size, error }), className)} {...props}>
      <TooltipProvider>
        <div className="flex flex-wrap items-center gap-0.5 border-b bg-muted/40 p-1">
          <ToolbarButton
            onClick={() => execCommand("bold")}
            active={activeFormats.has("bold")}
            disabled={disabled}
            tooltip="Bold (Ctrl+B)"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
            </svg>
          </ToolbarButton>

          <ToolbarButton
            onClick={() => execCommand("italic")}
            active={activeFormats.has("italic")}
            disabled={disabled}
            tooltip="Italic (Ctrl+I)"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 4h4m-2 0v16m0-16l-4 16m4 0h4" />
            </svg>
          </ToolbarButton>

          <ToolbarButton
            onClick={() => execCommand("underline")}
            active={activeFormats.has("underline")}
            disabled={disabled}
            tooltip="Underline (Ctrl+U)"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v7a5 5 0 0010 0V4M5 20h14" />
            </svg>
          </ToolbarButton>

          <ToolbarButton
            onClick={() => execCommand("strikeThrough")}
            active={activeFormats.has("strikethrough")}
            disabled={disabled}
            tooltip="Strikethrough"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.5 12h-15m11.667-4H6.5a3 3 0 100 6h8a3 3 0 110 6H5" />
            </svg>
          </ToolbarButton>

          <Separator orientation="vertical" className="mx-1 h-6" />

          <ToolbarButton onClick={insertLink} disabled={disabled} tooltip="Insert Link">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </ToolbarButton>

          <Separator orientation="vertical" className="mx-1 h-6" />

          <ToolbarButton
            onClick={() => execCommand("insertUnorderedList")}
            active={activeFormats.has("bulletList")}
            disabled={disabled}
            tooltip="Bullet List"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h.01M8 6h12M4 12h.01M8 12h12M4 18h.01M8 18h12" />
              <circle cx="4" cy="6" r="1" fill="currentColor" />
              <circle cx="4" cy="12" r="1" fill="currentColor" />
              <circle cx="4" cy="18" r="1" fill="currentColor" />
            </svg>
          </ToolbarButton>

          <ToolbarButton
            onClick={() => execCommand("insertOrderedList")}
            active={activeFormats.has("numberedList")}
            disabled={disabled}
            tooltip="Numbered List"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h.01M8 6h12M4 12h.01M8 12h12M4 18h.01M8 18h12" />
              <text x="3" y="7" fontSize="6" fill="currentColor">1</text>
              <text x="3" y="13" fontSize="6" fill="currentColor">2</text>
              <text x="3" y="19" fontSize="6" fill="currentColor">3</text>
            </svg>
          </ToolbarButton>

          <Separator orientation="vertical" className="mx-1 h-6" />

          <ToolbarButton onClick={insertCode} disabled={disabled} tooltip="Insert Code">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
            </svg>
          </ToolbarButton>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => execCommand("formatBlock", "<h1>")}>
                Heading 1
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => execCommand("formatBlock", "<h2>")}>
                Heading 2
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => execCommand("formatBlock", "<h3>")}>
                Heading 3
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => execCommand("formatBlock", "<p>")}>
                Paragraph
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => execCommand("formatBlock", "<blockquote>")}>
                Quote
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TooltipProvider>

      <div
        ref={handleRef}
        contentEditable={!disabled}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onKeyUp={updateActiveFormats}
        onMouseUp={updateActiveFormats}
        data-placeholder={placeholder}
        className={cn(
          "prose prose-sm dark:prose-invert max-w-none p-3 outline-none",
          "min-h-[var(--min-height)] max-h-[var(--max-height)] overflow-auto",
          "before:text-muted-foreground before:pointer-events-none",
          "[&:empty]:before:content-[attr(data-placeholder)]",
          disabled && "cursor-not-allowed opacity-50"
        )}
        style={
          {
            "--min-height": `${minHeight}px`,
            "--max-height": `${maxHeight}px`,
          } as React.CSSProperties
        }
        role="textbox"
        aria-multiline="true"
        aria-label="Rich text editor"
        aria-disabled={disabled}
        dangerouslySetInnerHTML={value ? { __html: value } : undefined}
      />
    </div>
  );
}

RichTextEditor.displayName = "RichTextEditor";

export { RichTextEditor, richTextEditorVariants };
