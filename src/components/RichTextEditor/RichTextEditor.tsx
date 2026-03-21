import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const richTextEditorVariants = cva(
  "rounded-md border bg-[hsl(var(--la-background))] text-[hsl(var(--la-foreground))] overflow-hidden",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      error: {
        true: "border-[hsl(var(--la-destructive))]",
        false: "border-[hsl(var(--la-input))]",
      },
    },
    defaultVariants: {
      size: "md",
      error: false,
    },
  }
);

const toolbarButtonVariants = cva(
  "inline-flex items-center justify-center rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-[hsl(var(--la-accent))] data-[state=on]:text-[hsl(var(--la-accent-foreground))]",
  {
    variants: {
      size: {
        sm: "h-7 w-7",
        md: "h-8 w-8",
        lg: "h-9 w-9",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface RichTextEditorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "value">,
    VariantProps<typeof richTextEditorVariants> {
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  disabled?: boolean;
  minHeight?: number;
  maxHeight?: number;
}

const TOOLBAR_ICONS = {
  bold: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
      <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
    </svg>
  ),
  italic: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" x2="10" y1="4" y2="4" />
      <line x1="14" x2="5" y1="20" y2="20" />
      <line x1="15" x2="9" y1="4" y2="20" />
    </svg>
  ),
  underline: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4v6a6 6 0 0 0 12 0V4" />
      <line x1="4" x2="20" y1="20" y2="20" />
    </svg>
  ),
  strikethrough: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4H9a3 3 0 0 0-2.83 4" />
      <path d="M14 12a4 4 0 0 1 0 8H6" />
      <line x1="4" x2="20" y1="12" y2="12" />
    </svg>
  ),
  link: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  code: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  codeBlock: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="m10 8-2 4 2 4" />
      <path d="m14 8 2 4-2 4" />
    </svg>
  ),
  bulletList: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  ),
  numberedList: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  ),
  quote: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  ),
  heading: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h8" />
      <path d="M4 18V6" />
      <path d="M12 18V6" />
      <path d="m17 12 3-2v8" />
    </svg>
  ),
};

function RichTextEditor({
  value = "",
  onChange,
  placeholder = "Start typing...",
  disabled,
  className,
  size,
  error,
  minHeight = 150,
  maxHeight,
  ref,
  ...props
}: RichTextEditorProps & { ref?: React.Ref<HTMLDivElement> }) {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const [linkUrl, setLinkUrl] = React.useState("");
  const [linkPopoverOpen, setLinkPopoverOpen] = React.useState(false);
  const isComposingRef = React.useRef(false);

  React.useImperativeHandle(ref, () => editorRef.current!);

  const executeCommand = React.useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  }, []);

  const handleBold = () => executeCommand("bold");
  const handleItalic = () => executeCommand("italic");
  const handleUnderline = () => executeCommand("underline");
  const handleStrikethrough = () => executeCommand("strikeThrough");
  const handleCode = () => executeCommand("formatBlock", "<pre>");
  const handleBulletList = () => executeCommand("insertUnorderedList");
  const handleNumberedList = () => executeCommand("insertOrderedList");
  const handleQuote = () => executeCommand("formatBlock", "<blockquote>");
  const handleHeading = () => executeCommand("formatBlock", "<h2>");

  const handleLink = () => {
    if (linkUrl) {
      executeCommand("createLink", linkUrl);
      setLinkUrl("");
      setLinkPopoverOpen(false);
    }
  };

  const handleUnlink = () => {
    executeCommand("unlink");
  };

  const handleInput = React.useCallback(() => {
    if (isComposingRef.current) return;
    if (editorRef.current) {
      onChange?.(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handleCompositionStart = () => {
    isComposingRef.current = true;
  };

  const handleCompositionEnd = () => {
    isComposingRef.current = false;
    handleInput();
  };

  React.useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      const selection = window.getSelection();
      const range = selection?.rangeCount ? selection.getRangeAt(0) : null;
      const wasFocused = document.activeElement === editorRef.current;
      
      editorRef.current.innerHTML = value;
      
      if (wasFocused && range && editorRef.current.contains(range.commonAncestorContainer)) {
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  }, [value]);

  return (
    <div className={cn(richTextEditorVariants({ size, error }), className)} {...props}>
      <div className="flex flex-wrap items-center gap-0.5 border-b border-[hsl(var(--la-border))] bg-[hsl(var(--la-muted))] px-2 py-1">
        <ToggleGroupPrimitive.Root
          type="multiple"
          className="flex items-center gap-0.5"
          aria-label="Text formatting"
        >
          <ToggleGroupPrimitive.Item
            value="bold"
            className={cn(
              toolbarButtonVariants({ size }),
              "text-[hsl(var(--la-muted-foreground))] hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-foreground))]"
            )}
            onClick={handleBold}
            aria-label="Bold"
            title="Bold (Ctrl+B)"
          >
            {TOOLBAR_ICONS.bold}
          </ToggleGroupPrimitive.Item>
          <ToggleGroupPrimitive.Item
            value="italic"
            className={cn(
              toolbarButtonVariants({ size }),
              "text-[hsl(var(--la-muted-foreground))] hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-foreground))]"
            )}
            onClick={handleItalic}
            aria-label="Italic"
            title="Italic (Ctrl+I)"
          >
            {TOOLBAR_ICONS.italic}
          </ToggleGroupPrimitive.Item>
          <ToggleGroupPrimitive.Item
            value="underline"
            className={cn(
              toolbarButtonVariants({ size }),
              "text-[hsl(var(--la-muted-foreground))] hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-foreground))]"
            )}
            onClick={handleUnderline}
            aria-label="Underline"
            title="Underline (Ctrl+U)"
          >
            {TOOLBAR_ICONS.underline}
          </ToggleGroupPrimitive.Item>
          <ToggleGroupPrimitive.Item
            value="strikethrough"
            className={cn(
              toolbarButtonVariants({ size }),
              "text-[hsl(var(--la-muted-foreground))] hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-foreground))]"
            )}
            onClick={handleStrikethrough}
            aria-label="Strikethrough"
            title="Strikethrough"
          >
            {TOOLBAR_ICONS.strikethrough}
          </ToggleGroupPrimitive.Item>
        </ToggleGroupPrimitive.Root>

        <div className="mx-1 h-5 w-px bg-[hsl(var(--la-border))]" />

        <PopoverPrimitive.Root open={linkPopoverOpen} onOpenChange={setLinkPopoverOpen}>
          <PopoverPrimitive.Trigger asChild>
            <button
              type="button"
              className={cn(
                toolbarButtonVariants({ size }),
                "text-[hsl(var(--la-muted-foreground))] hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-foreground))]"
              )}
              aria-label="Insert link"
              title="Insert link"
            >
              {TOOLBAR_ICONS.link}
            </button>
          </PopoverPrimitive.Trigger>
          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              className="z-50 flex items-center gap-2 rounded-md border border-[hsl(var(--la-border))] bg-[hsl(var(--la-popover))] p-2 text-[hsl(var(--la-popover-foreground))] shadow-md"
              sideOffset={5}
            >
              <input
                type="url"
                placeholder="https://..."
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLink()}
                className="h-8 w-48 rounded-md border border-[hsl(var(--la-input))] bg-[hsl(var(--la-background))] px-2 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))]"
              />
              <button
                type="button"
                onClick={handleLink}
                className="h-8 rounded-md bg-[hsl(var(--la-primary))] px-3 text-sm font-medium text-[hsl(var(--la-primary-foreground))] hover:opacity-90"
              >
                Add
              </button>
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
          <button
            type="button"
            onClick={handleUnlink}
            className={cn(
              toolbarButtonVariants({ size }),
              "text-[hsl(var(--la-muted-foreground))] hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-foreground))]"
            )}
            aria-label="Remove link"
            title="Remove link"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 17-2-2 2-2" />
              <path d="M11.5 7.5 9 10l2 2" />
              <path d="m15 7 2 2-2 2" />
            </svg>
          </button>
        </PopoverPrimitive.Root>

        <div className="mx-1 h-5 w-px bg-[hsl(var(--la-border))]" />

        <ToggleGroupPrimitive.Root
          type="multiple"
          className="flex items-center gap-0.5"
          aria-label="Block formatting"
        >
          <ToggleGroupPrimitive.Item
            value="heading"
            className={cn(
              toolbarButtonVariants({ size }),
              "text-[hsl(var(--la-muted-foreground))] hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-foreground))]"
            )}
            onClick={handleHeading}
            aria-label="Heading"
            title="Heading"
          >
            {TOOLBAR_ICONS.heading}
          </ToggleGroupPrimitive.Item>
          <ToggleGroupPrimitive.Item
            value="quote"
            className={cn(
              toolbarButtonVariants({ size }),
              "text-[hsl(var(--la-muted-foreground))] hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-foreground))]"
            )}
            onClick={handleQuote}
            aria-label="Quote"
            title="Quote"
          >
            {TOOLBAR_ICONS.quote}
          </ToggleGroupPrimitive.Item>
          <ToggleGroupPrimitive.Item
            value="code"
            className={cn(
              toolbarButtonVariants({ size }),
              "text-[hsl(var(--la-muted-foreground))] hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-foreground))]"
            )}
            onClick={handleCode}
            aria-label="Code block"
            title="Code block"
          >
            {TOOLBAR_ICONS.codeBlock}
          </ToggleGroupPrimitive.Item>
          <ToggleGroupPrimitive.Item
            value="bulletList"
            className={cn(
              toolbarButtonVariants({ size }),
              "text-[hsl(var(--la-muted-foreground))] hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-foreground))]"
            )}
            onClick={handleBulletList}
            aria-label="Bullet list"
            title="Bullet list"
          >
            {TOOLBAR_ICONS.bulletList}
          </ToggleGroupPrimitive.Item>
          <ToggleGroupPrimitive.Item
            value="numberedList"
            className={cn(
              toolbarButtonVariants({ size }),
              "text-[hsl(var(--la-muted-foreground))] hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-foreground))]"
            )}
            onClick={handleNumberedList}
            aria-label="Numbered list"
            title="Numbered list"
          >
            {TOOLBAR_ICONS.numberedList}
          </ToggleGroupPrimitive.Item>
        </ToggleGroupPrimitive.Root>
      </div>

      <div
        ref={editorRef}
        contentEditable={!disabled}
        onInput={handleInput}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        className={cn(
          "relative overflow-auto p-3 outline-none",
          "prose prose-sm max-w-none",
          "[&_:is(h1,h2,h3,h4,h5,h6)]:mb-2 [&_:is(h1,h2,h3,h4,h5,h6)]:mt-0 [&_:is(h1,h2,h3,h4,h5,h6)]:font-semibold [&_:is(h1,h2,h3,h4,h5,h6)]:text-[hsl(var(--la-foreground))]",
          "[&_:is(ul,ol)]:my-2 [&_:is(ul,ol)]:pl-6",
          "[&_:is(blockquote)]:my-2 [&_:is(blockquote)]:border-l-4 [&_:is(blockquote)]:border-[hsl(var(--la-border))] [&_:is(blockquote)]:pl-4 [&_:is(blockquote)]:italic [&_:is(blockquote)]:text-[hsl(var(--la-muted-foreground))]",
          "[&_pre]:my-2 [&_pre]:rounded-md [&_pre]:bg-[hsl(var(--la-muted))] [&_pre]:p-3 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:overflow-x-auto",
          "[&_code:not(pre_code)]:rounded [&_code:not(pre_code)]:bg-[hsl(var(--la-muted))] [&_code:not(pre_code)]:px-1 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:font-mono [&_code:not(pre_code)]:text-sm",
          "[&_a]:text-[hsl(var(--la-primary))] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:opacity-80",
          "empty:before:content-[attr(data-placeholder)] empty:before:text-[hsl(var(--la-muted-foreground))] empty:before:pointer-events-none",
          disabled && "cursor-not-allowed opacity-50"
        )}
        style={{ minHeight, maxHeight }}
        data-placeholder={placeholder}
        role="textbox"
        aria-multiline="true"
        aria-label="Rich text editor"
        aria-disabled={disabled}
        dangerouslySetInnerHTML={{ __html: value }}
        suppressContentEditableWarning
      />
    </div>
  );
}

RichTextEditor.displayName = "RichTextEditor";

export { RichTextEditor, richTextEditorVariants, toolbarButtonVariants };
