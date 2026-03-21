import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";

const chatInputVariants = cva(
  "flex flex-col gap-2 rounded-xl border bg-background p-2 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-sm",
        lg: "text-base",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  }
);

export interface ChatInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof chatInputVariants> {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  showAttachmentButton?: boolean;
  showVoiceButton?: boolean;
  showSendButton?: boolean;
  onAttachment?: () => void;
  onVoice?: () => void;
  onSend?: (value: string) => void;
  attachments?: AttachmentFile[];
  onRemoveAttachment?: (id: string) => void;
}

export interface AttachmentFile {
  id: string;
  name: string;
  size?: number;
  type?: string;
  preview?: string;
}

function ChatInput({
  value = "",
  onChange,
  placeholder = "Type a message...",
  disabled = false,
  maxLength,
  size = "md",
  showAttachmentButton = true,
  showVoiceButton = true,
  showSendButton = true,
  onAttachment,
  onVoice,
  onSend,
  attachments = [],
  onRemoveAttachment,
  className,
  ...props
}: ChatInputProps & { ref?: React.Ref<HTMLDivElement> }) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [internalValue, setInternalValue] = React.useState(value);
  const currentValue = onChange !== undefined ? value : internalValue;

  const adjustHeight = React.useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, []);

  React.useEffect(() => {
    adjustHeight();
  }, [currentValue, adjustHeight]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (currentValue.trim() && onSend) {
        onSend(currentValue);
        if (onChange) {
          onChange("");
        } else {
          setInternalValue("");
        }
      }
    }
  };

  const handleSend = () => {
    if (currentValue.trim() && onSend) {
      onSend(currentValue);
      if (onChange) {
        onChange("");
      } else {
        setInternalValue("");
      }
    }
  };

  return (
    <div
      className={cn(chatInputVariants({ size, disabled }), className)}
      aria-disabled={disabled}
      {...props}
    >
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 p-1">
          {attachments.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-1.5 rounded-md bg-muted px-2 py-1 text-xs"
            >
              {file.preview ? (
                <img
                  src={file.preview}
                  alt={file.name}
                  className="h-6 w-6 rounded object-cover"
                />
              ) : (
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
                  aria-hidden="true"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              )}
              <span className="max-w-[100px] truncate">{file.name}</span>
              {onRemoveAttachment && (
                <button
                  type="button"
                  onClick={() => onRemoveAttachment(file.id)}
                  className="ml-1 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-primary"
                  aria-label={`Remove ${file.name}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      <textarea
        ref={textareaRef}
        value={currentValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        rows={1}
        className={cn(
          "min-h-[40px] w-full resize-none bg-transparent px-2 py-2 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed",
          size === "sm" && "text-sm",
          size === "lg" && "text-base"
        )}
        aria-label="Message input"
      />
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          {showAttachmentButton && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={disabled}
              onClick={onAttachment}
              aria-label="Attach file"
              className="h-8 w-8"
            >
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
                <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
            </Button>
          )}
          {showVoiceButton && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={disabled}
              onClick={onVoice}
              aria-label="Voice input"
              className="h-8 w-8"
            >
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
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" x2="12" y1="19" y2="22" />
              </svg>
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {maxLength && (
            <span className="text-xs text-muted-foreground">
              {currentValue.length}/{maxLength}
            </span>
          )}
          {showSendButton && (
            <Button
              type="button"
              size="sm"
              disabled={disabled || !currentValue.trim()}
              onClick={handleSend}
              aria-label="Send message"
            >
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
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
ChatInput.displayName = "ChatInput";

export { ChatInput, chatInputVariants };
