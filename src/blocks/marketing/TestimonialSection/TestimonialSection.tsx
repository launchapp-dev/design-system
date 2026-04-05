import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";
import { Card, CardContent } from "../../../components/Card";
import { Avatar, AvatarImage, AvatarFallback } from "../../../components/Avatar";
import { Badge } from "../../../components/Badge";

const testimonialSectionVariants = cva("w-full", {
  variants: {
    layout: {
      carousel: "px-4 py-16 md:py-24",
      grid: "px-4 py-16 md:py-24",
      marquee: "py-16 md:py-24 overflow-hidden",
      minimal: "px-4 py-16 md:py-24",
    },
  },
  defaultVariants: {
    layout: "carousel",
  },
});

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  company?: string;
  avatarSrc?: string;
  avatarFallback?: string;
  badge?: string;
  rating?: number;
}

export interface TestimonialSectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof testimonialSectionVariants> {
  testimonials: TestimonialItem[];
  headline?: React.ReactNode;
  subheadline?: React.ReactNode;
  eyebrow?: React.ReactNode;
  autoAdvanceInterval?: number;
  columns?: 2 | 3 | 4;
  showQuoteIcon?: boolean;
}

function TestimonialSection({
  className,
  layout,
  testimonials,
  headline,
  subheadline,
  eyebrow,
  autoAdvanceInterval = 6000,
  columns = 3,
  showQuoteIcon = true,
  ref,
  ...props
}: TestimonialSectionProps & { ref?: React.Ref<HTMLElement> }) {
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (layout !== "carousel") return;
    if (testimonials.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, autoAdvanceInterval);
    return () => clearInterval(id);
  }, [testimonials.length, autoAdvanceInterval, layout]);

  const renderEyebrow = () => {
    if (!eyebrow) return null;
    return typeof eyebrow === "string" ? (
      <Badge variant="secondary">{eyebrow}</Badge>
    ) : (
      eyebrow
    );
  };

  const renderHeader = () => {
    if (!headline && !subheadline && !eyebrow) return null;
    return (
      <div className="mb-12 text-center space-y-4 max-w-3xl mx-auto">
        {eyebrow && <div>{renderEyebrow()}</div>}
        {headline && (
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {headline}
          </h2>
        )}
        {subheadline && (
          <p className="text-lg text-muted-foreground">{subheadline}</p>
        )}
      </div>
    );
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={cn(
              "h-4 w-4",
              i < rating ? "text-amber-500 fill-amber-500" : "text-muted-foreground/30"
            )}
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const renderQuoteIcon = () => {
    if (!showQuoteIcon) return null;
    return (
      <svg
        className="h-8 w-8 text-primary/20 mb-4"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
    );
  };

  const renderTestimonialCard = (testimonial: TestimonialItem, index: number) => (
    <Card key={index} className="h-full">
      <CardContent className="pt-6 flex flex-col h-full">
        {renderQuoteIcon()}
        {typeof testimonial.rating === "number" && (
          <div className="mb-4">{renderStars(testimonial.rating)}</div>
        )}
        <blockquote className="flex-1">
          <p className="text-foreground leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
        </blockquote>
        <footer className="mt-6 pt-6 border-t border-border flex items-center gap-4">
          <Avatar>
            {testimonial.avatarSrc && (
              <AvatarImage src={testimonial.avatarSrc} alt={testimonial.name} />
            )}
            <AvatarFallback>
              {testimonial.avatarFallback ?? testimonial.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{testimonial.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {testimonial.role}
              {testimonial.company && ` @ ${testimonial.company}`}
            </p>
          </div>
          {testimonial.badge && (
            <Badge variant="secondary" className="shrink-0">
              {testimonial.badge}
            </Badge>
          )}
        </footer>
      </CardContent>
    </Card>
  );

  // Carousel layout
  if (layout === "carousel") {
    const testimonial = testimonials[current];
    if (!testimonial) return null;

    return (
      <section
        ref={ref}
        className={cn(testimonialSectionVariants({ layout }), className)}
        {...props}
      >
        {renderHeader()}
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardContent className="px-8 pb-8 pt-8">
              {showQuoteIcon && (
                <svg
                  className="h-10 w-10 text-primary/20 mb-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              )}
              {typeof testimonial.rating === "number" && (
                <div className="mb-6">{renderStars(testimonial.rating)}</div>
              )}
              <blockquote className="space-y-6">
                <p className="text-xl leading-relaxed text-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <footer className="flex items-center gap-4">
                  <Avatar size="lg">
                    {testimonial.avatarSrc && (
                      <AvatarImage src={testimonial.avatarSrc} alt={testimonial.name} />
                    )}
                    <AvatarFallback>
                      {testimonial.avatarFallback ?? testimonial.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                      {testimonial.company && ` @ ${testimonial.company}`}
                    </p>
                  </div>
                  {testimonial.badge && (
                    <Badge variant="secondary" className="ml-auto">
                      {testimonial.badge}
                    </Badge>
                  )}
                </footer>
              </blockquote>
            </CardContent>
          </Card>
          {testimonials.length > 1 && (
            <div
              className="mt-8 flex justify-center gap-2"
              role="tablist"
              aria-label="Testimonial navigation"
            >
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
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  // Grid layout
  if (layout === "grid") {
    const gridCols = {
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    };

    return (
      <section
        ref={ref}
        className={cn(testimonialSectionVariants({ layout }), className)}
        {...props}
      >
        <div className="max-w-7xl mx-auto">
          {renderHeader()}
          <div className={cn("grid gap-6", gridCols[columns])}>
            {testimonials.map((testimonial, i) => renderTestimonialCard(testimonial, i))}
          </div>
        </div>
      </section>
    );
  }

  // Marquee layout
  if (layout === "marquee") {
    const duplicated = [...testimonials, ...testimonials];

    return (
      <section
        ref={ref}
        className={cn(testimonialSectionVariants({ layout }), className)}
        {...props}
      >
        {renderHeader()}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="flex gap-6 animate-marquee-left whitespace-nowrap">
            {duplicated.map((testimonial, i) => (
              <div key={i} className="w-[400px] shrink-0 whitespace-normal">
                {renderTestimonialCard(testimonial, i)}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Minimal layout - single centered testimonial without card
  const testimonial = testimonials[0];
  if (!testimonial) return null;

  return (
    <section
      ref={ref}
      className={cn(testimonialSectionVariants({ layout }), className)}
      {...props}
    >
      {renderHeader()}
      <div className="max-w-3xl mx-auto text-center">
        {showQuoteIcon && (
          <svg
            className="h-12 w-12 text-primary/20 mx-auto mb-8"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        )}
        {typeof testimonial.rating === "number" && (
          <div className="mb-6 justify-center flex">{renderStars(testimonial.rating)}</div>
        )}
        <blockquote className="space-y-8">
          <p className="text-2xl md:text-3xl font-medium leading-relaxed text-foreground">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <footer className="flex flex-col items-center gap-4">
            <Avatar size="lg">
              {testimonial.avatarSrc && (
                <AvatarImage src={testimonial.avatarSrc} alt={testimonial.name} />
              )}
              <AvatarFallback>
                {testimonial.avatarFallback ?? testimonial.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="font-semibold text-foreground">{testimonial.name}</p>
              <p className="text-sm text-muted-foreground">
                {testimonial.role}
                {testimonial.company && ` @ ${testimonial.company}`}
              </p>
            </div>
            {testimonial.badge && <Badge variant="secondary">{testimonial.badge}</Badge>}
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

TestimonialSection.displayName = "TestimonialSection";

export { TestimonialSection, testimonialSectionVariants };
export default TestimonialSection;
