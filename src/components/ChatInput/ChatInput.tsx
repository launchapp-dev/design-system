import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const chatInputVariants = cva(
  "flex flex-col w-full rounded-lg border bg-background transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-input",
        filled: "border-transparent bg-muted",
        outline: "border-border",
      },
      size: {
        sm: "p-2",
        md: "p-3",
        lg: "p-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const chatInputTextareaVariants = cva(
  "flex-1 w-full bg-transparent text-foreground text-sm leading-relaxed placeholder:text-muted-foreground resize-none focus:outline-none",
  {
    variants: {
      size: {
        sm: "min-h-[24px] max-h-[120px] text-sm",
        md: "min-h-[24px] max-h-[200px] text-sm",
        lg: "min-h-[32px] max-h-[300px] text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const chatInputButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-7 w-7",
        md: "h-9 w-9",
        lg: "h-10 w-10",
      },
      variant: {
        ghost: "hover:bg-accent hover:text-accent-foreground",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
    },
  }
);

export interface ChatInputProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof chatInputVariants> {
  onSend?: (value: string) => void;
  onAttachment?: () => void;
  onVoice?: () => void;
  showCharacterCount?: boolean;
  maxLength?: number;
  sendButtonVariant?: "default" | "outline" | "ghost";
  disabled?: boolean;
}

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
  (
    {
      className,
      variant,
      size,
      onSend,
      onAttachment,
      onVoice,
      showCharacterCount = false,
      maxLength,
      sendButtonVariant = "default",
      disabled = false,
      value,
      defaultValue,
      onKeyDown,
      placeholder,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
    const [textareaHeight, setTextareaHeight] = React.useState("auto");
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    const controlledValue = value !== undefined ? value : internalValue;
    const characterCount = typeof controlledValue === "string" ? controlledValue.length : 0;
    const isOverLimit = maxLength !== undefined && characterCount > maxLength;
    const canSend = !disabled && characterCount > 0 && !isOverLimit;

    React.useImperativeHandle(ref, () => textareaRef.current!);

    const adjustHeight = React.useCallback(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        const newHeight = textarea.scrollHeight;
        setTextareaHeight(`${newHeight}px`);
      }
    }, []);

    React.useEffect(() => {
      adjustHeight();
    }, [controlledValue, adjustHeight]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      if (maxLength === undefined || newValue.length <= maxLength) {
        setInternalValue(newValue);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (canSend && onSend) {
          onSend(String(controlledValue));
          setInternalValue("");
          setTextareaHeight("auto");
          if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
          }
        }
      }

      if (e.key === "Escape") {
        (e.target as HTMLTextAreaElement).blur();
      }

      onKeyDown?.(e);
    };

    const handleSend = () => {
      if (canSend && onSend) {
        onSend(String(controlledValue));
        setInternalValue("");
        setTextareaHeight("auto");
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
          textareaRef.current.focus();
        }
      }
    };

    const handleAttachment = () => {
      onAttachment?.();
    };

    const handleVoice = () => {
      onVoice?.();
    };

    return (
      <div
        className={cn(chatInputVariants({ variant, size }), className)}
        role="form"
        aria-label="Chat input form"
      >
        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            className={cn(
              chatInputTextareaVariants({ size }),
              "scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-thumb-rounded"
            )}
            style={{ height: textareaHeight }}
            value={controlledValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder ?? "Type a message... (Enter to send, Shift+Enter for new line)"}
            disabled={disabled}
            aria-label="Chat message"
            aria-describedby={showCharacterCount ? "chat-input-character-count" : undefined}
            rows={1}
            {...props}
          />
        </div>

        <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
          <div className="flex items-center gap-1">
            {onAttachment && (
              <button
                type="button"
                className={cn(chatInputButtonVariants({ variant: "ghost", size }))}
                onClick={handleAttachment}
                disabled={disabled}
                aria-label="Attach file"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={size === "sm" ? 14 : size === "lg" ? 18 : 16}
                  height={size === "sm" ? 14 : size === "lg" ? 18 : 16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                </svg>
              </button>
            )}

            {onVoice && (
              <button
                type="button"
                className={cn(chatInputButtonVariants({ variant: "ghost", size }))}
                onClick={handleVoice}
                disabled={disabled}
                aria-label="Voice input"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={size === "sm" ? 14 : size === "lg" ? 18 : 16}
                  height={size === "sm" ? 14 : size === "lg" ? 18 : 16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" x2="12" y1="19" y2="22" />
                </svg>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {showCharacterCount && (
              <span
                id="chat-input-character-count"
                className={cn(
                  "text-xs tabular-nums",
                  isOverLimit ? "text-destructive" : "text-muted-foreground"
                )}
                aria-live="polite"
              >
                {maxLength ? `${characterCount}/${maxLength}` : characterCount}
              </span>
            )}

            <button
              type="button"
              className={cn(
                chatInputButtonVariants({
                  variant: sendButtonVariant === "default" ? "default" : sendButtonVariant,
                  size,
                }),
                !canSend && "opacity-50 cursor-not-allowed"
              )}
              onClick={handleSend}
              disabled={!canSend}
              aria-label="Send message"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size === "sm" ? 14 : size === "lg" ? 18 : 16}
                height={size === "sm" ? 14 : size === "lg" ? 18 : 16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }
);

ChatInput.displayName = "ChatInput";

export type ChatInputVariants = VariantProps<typeof chatInputVariants>;
export type ChatInputTextareaVariants = VariantProps<typeof chatInputTextareaVariants>;
export type ChatInputButtonVariants = VariantProps<typeof chatInputButtonVariants>;

export {
  ChatInput,
  chatInputVariants,
  chatInputButtonVariants,
};
