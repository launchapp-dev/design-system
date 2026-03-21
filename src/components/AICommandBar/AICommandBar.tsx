import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "../../lib/utils";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "../Command";

export interface AICommandItem {
  id: string;
  label: string;
  description?: string;
  onSelect?: () => void;
}

export interface AICommandBarProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  commands?: AICommandItem[];
  aiSuggestions?: AICommandItem[];
  placeholder?: string;
  aiPlaceholder?: string;
  onAIQuery?: (query: string) => void;
  className?: string;
}

function SparklesIcon({ className }: { className?: string }) {
  return (
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
      className={className}
      aria-hidden="true"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
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
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function AICommandBar({
  open = false,
  onOpenChange,
  commands = [],
  aiSuggestions = [],
  placeholder = "Search commands...",
  aiPlaceholder = "Ask AI anything...",
  onAIQuery,
  className,
}: AICommandBarProps) {
  const [aiMode, setAIMode] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleAIQuery = () => {
    const query = inputValue.trim();
    if (query) {
      onAIQuery?.(query);
      onOpenChange?.(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && aiMode && inputValue.trim()) {
      handleAIQuery();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div
        className="fixed inset-0 bg-black/80"
        onClick={() => onOpenChange?.(false)}
        aria-hidden="true"
      />
      <div
        className={cn("relative z-50 w-full max-w-lg px-4", className)}
        onKeyDown={handleKeyDown}
      >
        <Command className="rounded-lg border border-border shadow-lg">
          <div className="flex items-center border-b border-border px-3">
            {aiMode ? (
              <SparklesIcon className="mr-2 h-4 w-4 shrink-0 text-[hsl(var(--la-primary))]" />
            ) : (
              <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            )}
            <CommandPrimitive.Input
              onValueChange={setInputValue}
              placeholder={aiMode ? aiPlaceholder : placeholder}
              className="flex h-11 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setAIMode((m) => !m)}
              className={cn(
                "ml-2 shrink-0 rounded p-1 transition-colors hover:bg-[hsl(var(--la-accent))]",
                aiMode
                  ? "text-[hsl(var(--la-primary))]"
                  : "text-muted-foreground"
              )}
              aria-label={aiMode ? "Switch to command mode" : "Switch to AI mode"}
            >
              <SparklesIcon />
            </button>
          </div>
          <CommandList>
            <CommandEmpty>
              {aiMode ? (
                <button
                  type="button"
                  onClick={handleAIQuery}
                  className="flex w-full items-center justify-center gap-2 py-2 text-sm hover:text-[hsl(var(--la-primary))]"
                >
                  <SparklesIcon />
                  Ask AI: &ldquo;{inputValue}&rdquo;
                </button>
              ) : (
                "No commands found."
              )}
            </CommandEmpty>
            {aiMode && aiSuggestions.length > 0 && (
              <CommandGroup heading="AI Suggestions">
                {aiSuggestions.map((suggestion) => (
                  <CommandItem
                    key={suggestion.id}
                    onSelect={suggestion.onSelect}
                  >
                    <SparklesIcon className="text-[hsl(var(--la-primary))]" />
                    <span>{suggestion.label}</span>
                    {suggestion.description && (
                      <span className="ml-auto text-xs text-muted-foreground">
                        {suggestion.description}
                      </span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {!aiMode && commands.length > 0 && (
              <CommandGroup heading="Commands">
                {commands.map((command) => (
                  <CommandItem key={command.id} onSelect={command.onSelect}>
                    <span>{command.label}</span>
                    {command.description && (
                      <span className="ml-auto text-xs text-muted-foreground">
                        {command.description}
                      </span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {aiMode && inputValue.trim() && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem onSelect={handleAIQuery}>
                    <SparklesIcon className="text-[hsl(var(--la-primary))]" />
                    <span>Ask AI: &ldquo;{inputValue}&rdquo;</span>
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </div>
    </div>
  );
}

AICommandBar.displayName = "AICommandBar";

export { AICommandBar };
