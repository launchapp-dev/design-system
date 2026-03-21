import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "../Avatar";

const testimonialCardVariants = cva(
  "rounded-[--la-radius] p-6",
  {
    variants: {
      variant: {
        default: "bg-[hsl(var(--la-card))] border border-[hsl(var(--la-border))]",
        elevated: "bg-[hsl(var(--la-card))] shadow-lg",
        bordered: "border-2 border-[hsl(var(--la-border))]",
        gradient: "bg-gradient-to-br from-[hsl(var(--la-primary)/0.1)] to-[hsl(var(--la-secondary)/0.1)]",
      },
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface TestimonialCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof testimonialCardVariants> {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatarSrc?: string;
  avatarFallback?: string;
  rating?: number;
  maxRating?: number;
}

function TestimonialCard({
  className,
  variant,
  size,
  quote,
  author,
  role,
  company,
  avatarSrc,
  avatarFallback,
  rating,
  maxRating = 5,
  ref,
  ...props
}: TestimonialCardProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn(testimonialCardVariants({ variant, size }), className)}
      {...props}
    >
      {rating !== undefined && (
        <div className="mb-4 flex gap-1" aria-label={`Rating: ${rating} out of ${maxRating} stars`}>
          {Array.from({ length: maxRating }).map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              width={size === "sm" ? 16 : size === "lg" ? 24 : 20}
              height={size === "sm" ? 16 : size === "lg" ? 24 : 20}
              viewBox="0 0 24 24"
              fill={index < rating ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(
                "transition-colors",
                index < rating
                  ? "text-yellow-500"
                  : "text-[hsl(var(--la-muted-foreground))]"
              )}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>
      )}

      <blockquote className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size === "sm" ? 24 : size === "lg" ? 48 : 32}
          height={size === "sm" ? 24 : size === "lg" ? 48 : 32}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="absolute -left-2 -top-2 text-[hsl(var(--la-primary)/0.1)]"
          aria-hidden="true"
        >
          <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.004zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.768-.695-1.327-.825-.55-.13-1.07-.14-1.54-.03-.16-.94.09-1.95.75-3.02.66-1.06 1.514-1.86 2.557-2.4L18.49 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1-.345 2.04-.217 3.1.165 1.4.615 2.52 1.35 3.35.732.833 1.646 1.25 2.742 1.25.967 0 1.768-.29 2.402-.876.627-.576.942-1.365.942-2.368v.01z" />
        </svg>
        <p
          className={cn(
            "relative z-10 text-[hsl(var(--la-foreground))]",
            size === "sm" && "text-sm",
            size === "lg" && "text-lg leading-relaxed",
            size === "md" && "leading-relaxed"
          )}
        >
          {quote}
        </p>
      </blockquote>

      <div className="mt-6 flex items-center gap-4">
        {(avatarSrc || avatarFallback) && (
          <Avatar size={size === "sm" ? "sm" : size === "lg" ? "lg" : "md"}>
            {avatarSrc && <AvatarImage src={avatarSrc} alt={author} />}
            <AvatarFallback>
              {avatarFallback ?? author.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
        <div className="flex flex-col">
          <span
            className={cn(
              "font-semibold text-[hsl(var(--la-foreground))]",
              size === "sm" && "text-sm",
              size === "lg" && "text-lg"
            )}
          >
            {author}
          </span>
          {(role || company) && (
            <span
              className={cn(
                "text-[hsl(var(--la-muted-foreground))]",
                size === "sm" && "text-xs",
                size === "lg" && "text-base"
              )}
            >
              {role}
              {role && company && " at "}
              {company}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

TestimonialCard.displayName = "TestimonialCard";

function TestimonialCardGrid({
  children,
  className,
  columns = 3,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  columns?: 1 | 2 | 3 | 4;
  ref?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={ref}
      className={cn(
        "grid gap-6",
        columns === 1 && "grid-cols-1",
        columns === 2 && "grid-cols-1 md:grid-cols-2",
        columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

TestimonialCardGrid.displayName = "TestimonialCardGrid";

export { TestimonialCard, TestimonialCardGrid, testimonialCardVariants };
