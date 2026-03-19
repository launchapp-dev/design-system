import * as React from "react";
import { cn } from "../../../lib/utils";
import { Card, CardContent } from "../../../components/Card";
import { Avatar, AvatarImage, AvatarFallback } from "../../../components/Avatar";
import { Badge } from "../../../components/Badge";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatarSrc?: string;
  avatarFallback?: string;
  badge?: string;
}

export interface TestimonialCarouselProps extends React.HTMLAttributes<HTMLElement> {
  testimonials: Testimonial[];
  autoAdvanceInterval?: number;
  headline?: React.ReactNode;
  subheadline?: React.ReactNode;
}

const TestimonialCarousel = React.forwardRef<HTMLElement, TestimonialCarouselProps>(
  (
    {
      className,
      testimonials,
      autoAdvanceInterval = 5000,
      headline,
      subheadline,
      ...props
    },
    ref
  ) => {
    const [current, setCurrent] = React.useState(0);

    React.useEffect(() => {
      if (testimonials.length <= 1) return;
      const id = setInterval(() => {
        setCurrent((c) => (c + 1) % testimonials.length);
      }, autoAdvanceInterval);
      return () => clearInterval(id);
    }, [testimonials.length, autoAdvanceInterval]);

    const testimonial = testimonials[current];

    return (
      <section ref={ref} className={cn("w-full px-4 py-16 md:py-24", className)} {...props}>
        {(headline || subheadline) && (
          <div className="mb-12 text-center space-y-3">
            {headline && (
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                {headline}
              </h2>
            )}
            {subheadline && (
              <p className="text-lg text-muted-foreground">{subheadline}</p>
            )}
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
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
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
);

TestimonialCarousel.displayName = "TestimonialCarousel";

export { TestimonialCarousel };
