import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const inlineEditableVariants = cva(
  "w-full rounded transition-colors",
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

export interface InlineEditableProps
  extends VariantProps<typeof inlineEditableVariants> {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  multiline?: boolean;
  onEditStart?: () => void;
  onEditEnd?: (value: string) => void;
  "aria-label"?: string;
}

function InlineEditable({
  value,
  onChange,
  placeholder = "Click to edit…",
  disabled = false,
  className,
  inputClassName,
  size,
  multiline = false,
  onEditStart,
  onEditEnd,
  "aria-label": ariaLabel,
}: InlineEditableProps) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(value);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (editing) {
      setDraft(value);
      if (multiline) {
        textareaRef.current?.focus();
        textareaRef.current?.select();
      } else {
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    }
  }, [editing, value, multiline]);

  const handleStart = () => {
    if (disabled) return;
    setEditing(true);
    onEditStart?.();
  };

  const handleCommit = () => {
    setEditing(false);
    onChange(draft);
    onEditEnd?.(draft);
  };

  const handleCancel = () => {
    setEditing(false);
    setDraft(value);
    onEditEnd?.(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      handleCommit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
    }
  };

  const displayValue = value || placeholder;
  const isPlaceholder = !value;

  const sharedInputClass = cn(
    inlineEditableVariants({ size }),
    "bg-background border border-ring px-2 py-1 outline-none",
    "focus:ring-2 focus:ring-ring focus:ring-offset-1",
    inputClassName
  );

  if (editing) {
    if (multiline) {
      return (
        <textarea
          ref={textareaRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={handleCommit}
          onKeyDown={handleKeyDown}
          aria-label={ariaLabel}
          className={cn(sharedInputClass, "resize-none min-h-[80px]", className)}
          rows={3}
        />
      );
    }
    return (
      <input
        ref={inputRef}
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={handleCommit}
        onKeyDown={handleKeyDown}
        aria-label={ariaLabel}
        className={cn(sharedInputClass, className)}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={handleStart}
      disabled={disabled}
      aria-label={ariaLabel ?? `Edit: ${displayValue}`}
      className={cn(
        inlineEditableVariants({ size }),
        "text-left w-full px-2 py-1 rounded",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        "disabled:pointer-events-none disabled:opacity-50",
        isPlaceholder && "text-muted-foreground italic",
        className
      )}
    >
      {displayValue}
    </button>
  );
}

InlineEditable.displayName = "InlineEditable";

export type InlineEditableVariants = VariantProps<typeof inlineEditableVariants>;

export { InlineEditable };
