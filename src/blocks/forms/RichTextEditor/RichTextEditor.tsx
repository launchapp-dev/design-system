import * as React from "react";
import { Button } from "@/components/Button";
import { TooltipRoot, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/Tooltip";
import { cn } from "@/lib/utils";

export interface RichTextEditorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  minHeight?: number;
  showWordCount?: boolean;
  label?: string;
  error?: string;
}

interface ToolbarButtonProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const ToolbarButton = ({ icon, label, active, disabled, onClick }: ToolbarButtonProps) => (
  <TooltipRoot>
    <TooltipTrigger asChild>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 w-8 p-0",
          active && "bg-accent text-accent-foreground",
          disabled && "opacity-40 cursor-not-allowed"
        )}
        disabled={disabled}
        onClick={onClick}
        aria-label={label}
        aria-pressed={active}
      >
        {icon}
      </Button>
    </TooltipTrigger>
    <TooltipContent side="bottom" className="text-xs">{label}</TooltipContent>
  </TooltipRoot>
);

const Separator = () => (
  <div className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
);

const BoldIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
  </svg>
);

const ItalicIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 4h4m-2 0v16m4 0h-4" transform="skewX(-10)" />
  </svg>
);

const UnderlineIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 4v8a6 6 0 0012 0V4M4 20h16" />
  </svg>
);

const StrikethroughIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M9 8c0-1.105.895-2 2-2h2a2 2 0 010 4H9m0 4c0-1.105.895-2 2-2h2a2 2 0 010 4H9" />
  </svg>
);

const H1Icon = () => (
  <span className="text-xs font-bold" aria-hidden="true">H1</span>
);

const H2Icon = () => (
  <span className="text-xs font-bold" aria-hidden="true">H2</span>
);

const H3Icon = () => (
  <span className="text-xs font-bold" aria-hidden="true">H3</span>
);

const BulletListIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

const OrderedListIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 01-1.12-1.122H1.99M4.117 14.01v3.75m0-3.75H2.99m1.125 3.75H2.99" />
  </svg>
);

const BlockquoteIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.894 1.378c-3.336 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
  </svg>
);

const CodeIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);

const LinkIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>
);

const UndoIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
  </svg>
);

const RedoIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
  </svg>
);

type FormatAction = "bold" | "italic" | "underline" | "strikeThrough" |
  "h1" | "h2" | "h3" | "bulletList" | "orderedList" |
  "blockquote" | "code" | "link" | "undo" | "redo";

const RichTextEditor = React.forwardRef<HTMLDivElement, RichTextEditorProps>(
  (
    {
      value,
      onChange,
      placeholder = "Start writing...",
      disabled = false,
      minHeight = 200,
      showWordCount = true,
      label,
      error,
      className,
      ...props
    },
    ref
  ) => {
    const editorRef = React.useRef<HTMLDivElement>(null);
    const [activeFormats, setActiveFormats] = React.useState<Set<string>>(new Set());

    const updateActiveFormats = () => {
      const formats = new Set<string>();
      if (document.queryCommandState("bold")) formats.add("bold");
      if (document.queryCommandState("italic")) formats.add("italic");
      if (document.queryCommandState("underline")) formats.add("underline");
      if (document.queryCommandState("strikeThrough")) formats.add("strikeThrough");
      setActiveFormats(formats);
    };

    const execCommand = (command: string, value?: string) => {
      document.execCommand(command, false, value);
      editorRef.current?.focus();
      updateActiveFormats();
      handleChange();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "b": e.preventDefault(); execCommand("bold"); break;
          case "i": e.preventDefault(); execCommand("italic"); break;
          case "u": e.preventDefault(); execCommand("underline"); break;
          case "z": e.preventDefault(); execCommand(e.shiftKey ? "redo" : "undo"); break;
        }
      }
    };

    const handleChange = () => {
      const html = editorRef.current?.innerHTML ?? "";
      onChange?.(html);
    };

    const handleFormat = (action: FormatAction) => {
      switch (action) {
        case "bold": execCommand("bold"); break;
        case "italic": execCommand("italic"); break;
        case "underline": execCommand("underline"); break;
        case "strikeThrough": execCommand("strikeThrough"); break;
        case "h1": execCommand("formatBlock", "<h1>"); break;
        case "h2": execCommand("formatBlock", "<h2>"); break;
        case "h3": execCommand("formatBlock", "<h3>"); break;
        case "bulletList": execCommand("insertUnorderedList"); break;
        case "orderedList": execCommand("insertOrderedList"); break;
        case "blockquote": execCommand("formatBlock", "<blockquote>"); break;
        case "code": execCommand("formatBlock", "<pre>"); break;
        case "link": {
          const url = window.prompt("Enter URL:");
          if (url) execCommand("createLink", url);
          break;
        }
        case "undo": execCommand("undo"); break;
        case "redo": execCommand("redo"); break;
      }
    };

    const wordCount = React.useMemo(() => {
      const text = editorRef.current?.innerText ?? "";
      return text.trim().split(/\s+/).filter(Boolean).length;
    }, []);

    const charCount = React.useMemo(() => {
      return editorRef.current?.innerText?.length ?? 0;
    }, []);

    return (
      <div className={cn("space-y-1", className)} {...props}>
        {label && (
          <label className="text-sm font-medium">{label}</label>
        )}

        <div
          className={cn(
            "rounded-lg border transition-colors focus-within:ring-1",
            error ? "border-destructive focus-within:ring-destructive" : "border-border focus-within:ring-primary",
            disabled && "opacity-50"
          )}
        >
          <TooltipProvider>
          <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-muted/30 px-1.5 py-1 rounded-t-lg">
            <ToolbarButton icon={<BoldIcon />} label="Bold (Ctrl+B)" active={activeFormats.has("bold")} disabled={disabled} onClick={() => handleFormat("bold")} />
            <ToolbarButton icon={<ItalicIcon />} label="Italic (Ctrl+I)" active={activeFormats.has("italic")} disabled={disabled} onClick={() => handleFormat("italic")} />
            <ToolbarButton icon={<UnderlineIcon />} label="Underline (Ctrl+U)" active={activeFormats.has("underline")} disabled={disabled} onClick={() => handleFormat("underline")} />
            <ToolbarButton icon={<StrikethroughIcon />} label="Strikethrough" active={activeFormats.has("strikeThrough")} disabled={disabled} onClick={() => handleFormat("strikeThrough")} />
            <Separator />
            <ToolbarButton icon={<H1Icon />} label="Heading 1" disabled={disabled} onClick={() => handleFormat("h1")} />
            <ToolbarButton icon={<H2Icon />} label="Heading 2" disabled={disabled} onClick={() => handleFormat("h2")} />
            <ToolbarButton icon={<H3Icon />} label="Heading 3" disabled={disabled} onClick={() => handleFormat("h3")} />
            <Separator />
            <ToolbarButton icon={<BulletListIcon />} label="Bullet List" disabled={disabled} onClick={() => handleFormat("bulletList")} />
            <ToolbarButton icon={<OrderedListIcon />} label="Numbered List" disabled={disabled} onClick={() => handleFormat("orderedList")} />
            <Separator />
            <ToolbarButton icon={<BlockquoteIcon />} label="Blockquote" disabled={disabled} onClick={() => handleFormat("blockquote")} />
            <ToolbarButton icon={<CodeIcon />} label="Code Block" disabled={disabled} onClick={() => handleFormat("code")} />
            <ToolbarButton icon={<LinkIcon />} label="Insert Link" disabled={disabled} onClick={() => handleFormat("link")} />
            <Separator />
            <ToolbarButton icon={<UndoIcon />} label="Undo (Ctrl+Z)" disabled={disabled} onClick={() => handleFormat("undo")} />
            <ToolbarButton icon={<RedoIcon />} label="Redo (Ctrl+Shift+Z)" disabled={disabled} onClick={() => handleFormat("redo")} />
          </div>
          </TooltipProvider>

          <div
            ref={(node) => {
              editorRef.current = node;
              if (typeof ref === "function") ref(node);
              else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
            }}
            contentEditable={!disabled}
            suppressContentEditableWarning
            role="textbox"
            aria-multiline="true"
            aria-label={label ?? "Rich text editor"}
            data-placeholder={placeholder}
            onFocus={updateActiveFormats}
            onBlur={() => {}}
            onKeyDown={handleKeyDown}
            onInput={handleChange}
            onKeyUp={updateActiveFormats}
            onMouseUp={updateActiveFormats}
            className={cn(
              "prose prose-sm dark:prose-invert max-w-none px-4 py-3 outline-none",
              "[&:empty:before]:text-muted-foreground [&:empty:before]:content-[attr(data-placeholder)] [&:empty:before]:pointer-events-none",
              "[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-4 [&_h1]:mb-2",
              "[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-3 [&_h2]:mb-1.5",
              "[&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-2 [&_h3]:mb-1",
              "[&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6",
              "[&_li]:mt-0.5",
              "[&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground",
              "[&_pre]:bg-muted [&_pre]:rounded [&_pre]:p-3 [&_pre]:text-sm [&_pre]:font-mono",
              "[&_a]:text-primary [&_a]:underline"
            )}
            style={{ minHeight }}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: RichTextEditor renders user-authored HTML content intentionally
            dangerouslySetInnerHTML={value ? { __html: value } : undefined}
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-destructive">{error}</p>
        )}

        {showWordCount && (
          <div className="flex justify-end gap-4 px-1">
            <span className="text-xs text-muted-foreground tabular-nums">
              {wordCount} word{wordCount !== 1 ? "s" : ""}
            </span>
            <span className="text-xs text-muted-foreground tabular-nums">
              {charCount} char{charCount !== 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>
    );
  }
);
RichTextEditor.displayName = "RichTextEditor";

export { RichTextEditor };
