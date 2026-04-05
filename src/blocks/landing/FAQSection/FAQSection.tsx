import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";
import {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../../components/Accordion";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";

const faqSectionVariants = cva("w-full", {
  variants: {
    variant: {
      default: "px-4 py-16 md:py-24",
      minimal: "px-4 py-12 md:py-16",
      bordered: "px-4 py-16 md:py-24 border-y border-border",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

export interface FAQSectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof faqSectionVariants> {
  eyebrow?: React.ReactNode;
  headline?: React.ReactNode;
  subheadline?: React.ReactNode;
  items: FAQItem[];
  enableSearch?: boolean;
  searchPlaceholder?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  align?: "left" | "center";
  accordionType?: "single" | "multiple";
}

const maxWidthMap = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  "2xl": "max-w-7xl",
  full: "max-w-full",
};

const FAQSection = React.forwardRef<HTMLElement, FAQSectionProps>(
  (
    {
      className,
      variant = "default",
      eyebrow,
      headline,
      subheadline,
      items = [],
      enableSearch = false,
      searchPlaceholder = "Search questions...",
      maxWidth = "lg",
      align = "center",
      accordionType = "single",
      ...props
    },
    ref
  ) => {
    const containerClass = maxWidthMap[maxWidth];
    const isCenter = align === "center";
    const [search, setSearch] = React.useState("");

    const filteredItems = React.useMemo(() => {
      if (!search.trim()) return items;
      const q = search.toLowerCase();
      return items.filter(
        (item) =>
          item.question.toLowerCase().includes(q) ||
          (typeof item.answer === "string" && item.answer.toLowerCase().includes(q))
      );
    }, [items, search]);

    const renderHeader = () => {
      if (!eyebrow && !headline && !subheadline) return null;
      return (
        <div className={cn("mb-10", isCenter ? "text-center" : "text-left", "space-y-3")}>
          {eyebrow && (
            <div className={cn(!isCenter && "-ml-1")}>
              {typeof eyebrow === "string" ? (
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-secondary text-secondary-foreground">
                  {eyebrow}
                </span>
              ) : (
                eyebrow
              )}
            </div>
          )}
          {headline && (
            <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
              {headline}
            </h2>
          )}
          {subheadline && (
            <p className={cn("text-lg text-muted-foreground", isCenter && "max-w-2xl mx-auto")}>
              {subheadline}
            </p>
          )}
        </div>
      );
    };

    return (
      <section ref={ref} className={cn(faqSectionVariants({ variant }), className)} {...props}>
        <div className={cn(containerClass, "mx-auto", isCenter ? "text-center" : "text-left")}>
          {renderHeader()}

          {enableSearch && (
            <div className={cn("mb-8", isCenter && "max-w-md mx-auto")}>
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4"
                  fill="none"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                  <path d="m21 21-4.35-4.35" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
                </svg>
                <Input
                  placeholder={searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              {search.trim() && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {filteredItems.length === 0
                    ? "No results found"
                    : `${filteredItems.length} question${filteredItems.length === 1 ? "" : "s"} found`}
                </p>
              )}
            </div>
          )}

          <AccordionRoot
            type={accordionType === "multiple" ? "multiple" : "single"}
            className={cn(isCenter && "max-w-2xl mx-auto")}
          >
            {filteredItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-base">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </AccordionRoot>

          {enableSearch && search.trim() && filteredItems.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No questions match your search.</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearch("")}
                className="mt-2"
              >
                Clear search
              </Button>
            </div>
          )}
        </div>
      </section>
    );
  }
);

FAQSection.displayName = "FAQSection";

export { FAQSection, faqSectionVariants };