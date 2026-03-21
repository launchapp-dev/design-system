import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "../Avatar";

const testimonialCardVariants = cva(
  "relative rounded-lg border border-border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "p-6",
        compact: "p-4",
        featured: "p-8 ring-2 ring-primary/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const starRatingVariants = cva("flex gap-0.5", {
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
});

function StarIcon({ filled = true, half = false }: { filled?: boolean; half?: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : half ? "url(#half)" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.5}
      className="text-amber-500"
      aria-hidden="true"
    >
      {half && (
        <defs>
          <linearGradient id="half">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
      )}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
      />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-primary/20 h-8 w-8"
      aria-hidden="true"
    >
      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
    </svg>
  );
}

export interface TestimonialCardProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof testimonialCardVariants> {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatarSrc?: string;
  avatarFallback?: string;
  rating?: number;
  showQuoteIcon?: boolean;
}

function StarRating({
  rating,
  size = "md",
  className,
}: {
  rating: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<StarIcon key={i} filled />);
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push(<StarIcon key={i} half />);
    } else {
      stars.push(<StarIcon key={i} filled={false} />);
    }
  }

  return (
    <div
      className={cn(starRatingVariants({ size }), className)}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {stars}
    </div>
  );
}

function TestimonialCard({
  quote,
  author,
  role,
  company,
  avatarSrc,
  avatarFallback,
  rating,
  showQuoteIcon = true,
  variant,
  className,
  ref,
  ...props
}: TestimonialCardProps & { ref?: React.Ref<HTMLElement> }) {
  const fallbackText = avatarFallback ?? author.slice(0, 2).toUpperCase();

  return (
    <article
      ref={ref}
      className={cn(testimonialCardVariants({ variant }), className)}
      {...props}
    >
      {showQuoteIcon && (
        <div className="absolute top-4 right-4" aria-hidden="true">
          <QuoteIcon />
        </div>
      )}

      {rating !== undefined && (
        <StarRating rating={rating} size="md" className="mb-4" />
      )}

      <blockquote className="mb-4">
        <p className="text-foreground leading-relaxed">&ldquo;{quote}&rdquo;</p>
      </blockquote>

      <footer className="flex items-center gap-3">
        <Avatar size="sm">
          {avatarSrc && <AvatarImage src={avatarSrc} alt={author} />}
          <AvatarFallback>{fallbackText}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <cite className="text-sm font-semibold text-foreground not-italic">
            {author}
          </cite>
          {(role || company) && (
            <span className="text-xs text-muted-foreground">
              {role}
              {role && company && " at "}
              {company}
            </span>
          )}
        </div>
      </footer>
    </article>
  );
}

TestimonialCard.displayName = "TestimonialCard";

function TestimonialCardGrid({
  testimonials,
  columns = 3,
  className,
  ...props
}: {
  testimonials: TestimonialCardProps[];
  columns?: 2 | 3 | 4;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div
      className={cn("grid gap-6", gridCols[columns], className)}
      {...props}
    >
      {testimonials.map((testimonial, index) => (
        <TestimonialCard key={index} {...testimonial} />
      ))}
    </div>
  );
}

TestimonialCardGrid.displayName = "TestimonialCardGrid";

export {
  TestimonialCard,
  TestimonialCardGrid,
  StarRating,
  testimonialCardVariants,
  starRatingVariants,
};
