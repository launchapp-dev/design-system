import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/Card";
import { Button } from "@/components/Button";
import { Textarea } from "@/components/Textarea";
import { ScrollArea } from "@/components/ScrollArea";
import { MessageBubbles } from "./MessageBubbles";
import { TypingIndicator } from "./TypingIndicator";
import { cn } from "@/lib/utils";
import type { BubbleMessage } from "./MessageBubbles";

export interface ChatInterfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  messages: BubbleMessage[];
  isTyping?: boolean;
  typingLabel?: string;
  onSend?: (message: string) => void;
  placeholder?: string;
  title?: string;
  maxHeight?: number | string;
}

const ChatInterface = React.forwardRef<HTMLDivElement, ChatInterfaceProps>(
  (
    {
      messages,
      isTyping = false,
      typingLabel = "Typing…",
      onSend,
      placeholder = "Type a message…",
      title = "Chat",
      maxHeight = 420,
      className,
      ...props
    },
    ref,
  ) => {
    const [draft, setDraft] = React.useState("");
    const scrollRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, []);

    const handleSend = () => {
      const trimmed = draft.trim();
      if (!trimmed) return;
      onSend?.(trimmed);
      setDraft("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    };

    return (
      <Card ref={ref} className={cn("flex flex-col", className)} {...props}>
        <CardHeader className="border-b pb-3">
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-0 p-0">
          <ScrollArea style={{ maxHeight }} className="flex-1">
            <div ref={scrollRef}>
              <MessageBubbles messages={messages} />
              {isTyping && (
                <div className="px-4 pb-3">
                  <TypingIndicator label={typingLabel} />
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="border-t p-3">
            <div className="flex items-end gap-2">
              <Textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                rows={1}
                className="min-h-[40px] flex-1 resize-none"
                aria-label="Message input"
              />
              <Button
                type="button"
                size="sm"
                onClick={handleSend}
                disabled={!draft.trim()}
                aria-label="Send message"
                className="h-10 w-10 shrink-0 p-0"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </Button>
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </CardContent>
      </Card>
    );
  },
);
ChatInterface.displayName = "ChatInterface";

export { ChatInterface };
export type { BubbleMessage as ChatMessage };
