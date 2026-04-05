import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";
import { Card, CardContent } from "../../../components/Card";
import { Avatar, AvatarImage, AvatarFallback } from "../../../components/Avatar";
import { Badge } from "../../../components/Badge";

const testimonialsSectionVariants = cva("w-full", {
  variants: {
    variant: {
      default: "px-4 py-16 md:py-24",
      minimal: "px-4 py-12 md:py-16",
      rich: "px-4 py-16 md:py-24 bg-muted/30",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface TestimonialAuthor {
  name: string;
  role?: string;
  company?: string;
  avatarSrc?: string;
  avatarFallback?: string;
  logoSrc?: string;
  logoAlt?: string;
}

export interface TestimonialItem {
  quote: string;
  author: TestimonialAuthor;
  badge?: string;
}

export interface TestimonialsSectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof testimonialsSectionVariants> {
  testimonials: TestimonialItem[];
  displayMode?: "carousel" | "grid" | "masonry";
  autoAdvanceInterval?: number;
  eyebrow?: React.ReactNode;
  headline?: React.ReactNode;
  subheadline?: React.ReactNode;
  logos?: TestimonialItem["author"][];
  logosLabel?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  align?: "left" | "center";
}

const maxWidthMap = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  "2xl": "max-w-7xl",
  full: "max-w-full",
};

const gridColsMap = {
  carousel: "grid-cols-1",
  grid: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  masonry: "columns-1 sm:columns-2 lg:columns-3",
};

const TestimonialsSection = React.forwardRef<HTMLElement, TestimonialsSectionProps>(
  (
    {
      className,
      variant = "default",
      testimonials = [],
      displayMode = "grid",
      autoAdvanceInterval = 5000,
      eyebrow,
      headline,
      subheadline,
      logos,
      logosLabel,
      maxWidth = "xl",
      align = "center",
      ...props
    },
    ref
  ) => {
    const [current, setCurrent] = React.useState(0);
    const isCenter = align === "center";
    const containerClass = maxWidthMap[maxWidth];

    React.useEffect(() => {
      if (displayMode !== "carousel" || testimonials.length <= 1) return;
      const id = setInterval(() => {
        setCurrent((c) => (c + 1) % testimonials.length);
      }, autoAdvanceInterval);
      return () => clearInterval(id);
    }, [testimonials.length, autoAdvanceInterval, displayMode]);

    const renderHeader = () => {
      if (!eyebrow && !headline && !subheadline) return null;
      return (
        <div className={cn("mb-12", isCenter ? "text-center" : "text-left", "space-y-3")}>
          {eyebrow && (
            <div className={cn(!isCenter && "-ml-1")}>
              {typeof eyebrow === "string" ? (
                <Badge variant="secondary">{eyebrow}</Badge>
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

    const renderAuthor = (author: TestimonialItem["author"], showLogo = false) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9 shrink-0">
          {author.avatarSrc && (
            <AvatarImage src={author.avatarSrc} alt={author.name} />
          )}
          <AvatarFallback className="text-xs">
            {author.avatarFallback ?? author.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground truncate">{author.name}</p>
          <p className="text-xs text-muted-foreground truncate">
            {author.role}{author.company ? `, ${author.company}` : ""}
          </p>
        </div>
        {showLogo && author.logoSrc && (
          <img
            src={author.logoSrc}
            alt={author.logoAlt ?? author.company ?? ""}
            className="h-6 w-auto object-contain opacity-60 ml-auto"
          />
        )}
      </div>
    );

    const renderCard = (testimonial: TestimonialItem, index: number) => (
      <Card
        key={index}
        className={cn(
          "break-inside-avoid",
          displayMode === "masonry" && "mb-6"
        )}
      >
        <CardContent className="px-6 py-6">
          <blockquote className="space-y-4">
            <p className="text-sm leading-relaxed text-foreground">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <footer className="flex items-center gap-3">
              <Avatar className="h-9 w-9 shrink-0">
                {testimonial.author.avatarSrc && (
                  <AvatarImage src={testimonial.author.avatarSrc} alt={testimonial.author.name} />
                )}
                <AvatarFallback className="text-xs">
                  {testimonial.author.avatarFallback ?? testimonial.author.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground truncate">{testimonial.author.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {testimonial.author.role}{testimonial.author.company ? `, ${testimonial.author.company}` : ""}
                </p>
              </div>
              {testimonial.author.logoSrc && (
                <img
                  src={testimonial.author.logoSrc}
                  alt={testimonial.author.logoAlt ?? testimonial.author.company ?? ""}
                  className="h-6 w-auto object-contain opacity-60 shrink-0"
                />
              )}
            </footer>
          </blockquote>
          {testimonial.badge && (
            <div className="mt-3">
              <Badge variant="secondary" className="text-xs">
                {testimonial.badge}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    );

    if (displayMode === "carousel") {
      const testimonial = testimonials[current];
      const showDots = testimonials.length > 1;

      return (
        <section ref={ref} className={cn(testimonialsSectionVariants({ variant }), className)} {...props}>
          <div className={cn(containerClass, "mx-auto")}>
            {renderHeader()}
            <div className="mx-auto max-w-2xl">
              <Card>
                <CardContent className="px-8 pb-8 pt-8">
                  <blockquote className="space-y-6">
                    <p className="text-lg leading-relaxed text-foreground">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <footer>
                      {renderAuthor(testimonial.author)}
                    </footer>
                  </blockquote>
                </CardContent>
              </Card>
              {showDots && (
                <div
                  className="mt-6 flex items-center justify-center gap-2"
                  role="tablist"
                  aria-label="Testimonial navigation"
                >
                  <button
                    onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)}
                    className="sr-only"
                    aria-label="Previous testimonial"
                  >
                    ‹
                  </button>
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      role="tab"
                      aria-selected={i === current}
                      aria-label={`Go to testimonial ${i + 1}`}
                      onClick={() => setCurrent(i)}
                      className={cn(
                        "h-2 rounded-full transition-all",
                        i === current
                          ? "w-6 bg-primary"
                          : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      )}
                    />
                  ))}
                  <button
                    onClick={() => setCurrent((c) => (c + 1) % testimonials.length)}
                    className="sr-only"
                    aria-label="Next testimonial"
                  >
                    ›
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      );
    }

    return (
      <section ref={ref} className={cn(testimonialsSectionVariants({ variant }), className)} {...props}>
        <div className={cn(containerClass, "mx-auto")}>
          {renderHeader()}
          <div className={cn("grid gap-6", gridColsMap[displayMode])}>
            {testimonials.map((testimonial, i) => renderCard(testimonial, i))}
          </div>
        </div>
      </section>
    );
  }
);

TestimonialsSection.displayName = "TestimonialsSection";

export { TestimonialsSection, testimonialsSectionVariants };
export type { TestimonialsSectionProps, TestimonialItem, TestimonialAuthor };
