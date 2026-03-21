import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Input } from "../Input";
import { Button } from "../Button";

const inlineEditVariants = cva(
  "group inline-flex items-center gap-1 rounded px-1 py-0.5 transition-colors",
  {
    variants: {
      variant: {
        default: "hover:bg-accent/50",
        underline: "hover:underline decoration-dashed underline-offset-4",
        ghost: "",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

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
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof inlineEditVariants> {
  value: string;
  onChange: (value: string) => void;
  onCommit?: (value: string) => void;
  onCancel?: () => void;
  placeholder?: string;
  inputClassName?: string;
  editable?: boolean;
  editOnDoubleClick?: boolean;
  selectAllOnFocus?: boolean;
  maxLength?: number;
  multiline?: boolean;
}

function InlineEditable(
  {
    value,
    onChange,
    onCommit,
    onCancel,
    placeholder = "Click to edit",
    inputClassName,
    editable = true,
    editOnDoubleClick = false,
    selectAllOnFocus = true,
    maxLength,
    variant = "default",
    size = "md",
    className,
    multiline = false,
    ...props
  }: InlineEditableProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [localValue, setLocalValue] = React.useState(value);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleStartEdit = React.useCallback(() => {
    if (!editable) return;
    setIsEditing(true);
    setLocalValue(value);
  }, [editable, value]);

  const handleCommit = React.useCallback(() => {
    setIsEditing(false);
    onChange(localValue);
    onCommit?.(localValue);
  }, [localValue, onChange, onCommit]);

  const handleCancel = React.useCallback(() => {
    setIsEditing(false);
    setLocalValue(value);
    onCancel?.();
  }, [value, onCancel]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !multiline) {
        e.preventDefault();
        handleCommit();
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleCancel();
      }
    },
    [handleCommit, handleCancel, multiline]
  );

  const handleFocus = React.useCallback(() => {
    if (selectAllOnFocus) {
      inputRef.current?.select();
    }
  }, [selectAllOnFocus]);

  React.useEffect(() => {
    if (isEditing) {
      if (multiline) {
        textareaRef.current?.focus();
        textareaRef.current?.select();
      } else {
        inputRef.current?.focus();
      }
    }
  }, [isEditing, multiline]);

  if (!isEditing) {
    return (
      <div
        ref={ref}
        className={cn(inlineEditVariants({ variant, size }), className)}
        onClick={editOnDoubleClick ? undefined : handleStartEdit}
        onDoubleClick={editOnDoubleClick ? handleStartEdit : undefined}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleStartEdit();
          }
        }}
        role="button"
        tabIndex={editable ? 0 : undefined}
        aria-label={`Edit: ${value || placeholder}`}
        {...props}
      >
        <span className={cn(!value && "text-muted-foreground italic")}>
          {value || placeholder}
        </span>
        {editable && (
          <svg
            className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        )}
      </div>
    );
  }

  if (multiline) {
    return (
      <div className={cn("inline-flex flex-col gap-1 w-full", className)} ref={ref}>
        <textarea
          ref={textareaRef}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleCancel}
          maxLength={maxLength}
          className={cn(
            inlineEditableVariants({ size }),
            "bg-background border border-ring px-2 py-1 outline-none resize-none min-h-[80px]",
            "focus:ring-2 focus:ring-ring focus:ring-offset-1",
            inputClassName
          )}
          rows={3}
          aria-label="Edit value"
        />
        <div className="inline-flex gap-1 self-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleCommit}
          >
            Save
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("inline-flex items-center gap-1", className)} ref={ref}>
      <Input
        ref={inputRef}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleCancel}
        maxLength={maxLength}
        className={cn("h-auto py-0.5 px-1", size === "sm" && "text-sm", size === "lg" && "text-lg", inputClassName)}
        aria-label="Edit value"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        onMouseDown={(e) => e.preventDefault()}
        onClick={handleCommit}
        aria-label="Save"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        onMouseDown={(e) => e.preventDefault()}
        onClick={handleCancel}
        aria-label="Cancel"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </Button>
    </div>
  );
}

InlineEditable.displayName = "InlineEditable";

export { InlineEditable, inlineEditVariants };
