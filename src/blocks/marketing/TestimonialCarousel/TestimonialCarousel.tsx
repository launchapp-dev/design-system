import * as React from "react";
import { cn } from "../../../lib/utils";
import { Card, CardContent } from "../../../components/Card";
import { Avatar, AvatarImage, AvatarFallback } from "../../../components/Avatar";
import { Badge } from "../../../components/Badge";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company?: string;
  avatarSrc?: string;
  avatarFallback?: string;
  badge?: string;
}

export interface TestimonialCarouselProps extends React.HTMLAttributes<HTMLElement> {
  testimonials: Testimonial[];
  autoAdvanceInterval?: number;
  displayMode?: "carousel" | "grid";
  headline?: React.ReactNode;
  subheadline?: React.ReactNode;
}

function TestimonialCarousel({
  className,
  testimonials,
  autoAdvanceInterval = 5000,
  displayMode = "carousel",
  headline,
  subheadline,
  ref,
  ...props
}: TestimonialCarouselProps & { ref?: React.Ref<HTMLElement> }) {
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (displayMode === "grid" || testimonials.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, autoAdvanceInterval);
    return () => clearInterval(id);
  }, [testimonials.length, autoAdvanceInterval, displayMode]);

  const showDots = displayMode === "carousel" && testimonials.length > 1;

  if (displayMode === "grid") {
    return (
      <section ref={ref} className={cn("w-full px-4 py-16 md:py-24", className)} {...props}>
        {(headline || subheadline) && (
          <div className="mb-12 text-center space-y-3">
            {headline && (
              <h2 className="text-3xl font-bold tracking-tight text-foreground">{headline}</h2>
            )}
            {subheadline && <p className="text-lg text-muted-foreground">{subheadline}</p>}
          </div>
        )}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <Card key={i}>
              <CardContent className="px-6 py-6">
                <blockquote className="space-y-4">
                  <p className="text-sm leading-relaxed text-foreground">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <footer className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      {testimonial.avatarSrc && (
                        <AvatarImage src={testimonial.avatarSrc} alt={testimonial.name} />
                      )}
                      <AvatarFallback className="text-xs">
                        {testimonial.avatarFallback ?? testimonial.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {testimonial.role}
                        {testimonial.company ? `, ${testimonial.company}` : ""}
                      </p>
                    </div>
                    {testimonial.badge && (
                      <Badge variant="secondary" className="shrink-0">
                        {testimonial.badge}
                      </Badge>
                    )}
                  </footer>
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  const testimonial = testimonials[current];

  return (
    <section ref={ref} className={cn("w-full px-4 py-16 md:py-24", className)} {...props}>
      {(headline || subheadline) && (
        <div className="mb-12 text-center space-y-3">
          {headline && (
            <h2 className="text-3xl font-bold tracking-tight text-foreground">{headline}</h2>
          )}
          {subheadline && <p className="text-lg text-muted-foreground">{subheadline}</p>}
        </div>
      )}
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardContent className="px-8 pb-8 pt-8">
            <blockquote className="space-y-6">
              <p className="text-lg leading-relaxed text-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <footer className="flex items-center gap-4">
                <Avatar>
                  {testimonial.avatarSrc && (
                    <AvatarImage src={testimonial.avatarSrc} alt={testimonial.name} />
                  )}
                  <AvatarFallback>
                    {testimonial.avatarFallback ?? testimonial.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                    {testimonial.company ? `, ${testimonial.company}` : ""}
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
        {showDots && (
          <div
            className="mt-6 flex justify-center gap-2"
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
                    ? "w-6 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50",
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

TestimonialCarousel.displayName = "TestimonialCarousel";

export { TestimonialCarousel };
