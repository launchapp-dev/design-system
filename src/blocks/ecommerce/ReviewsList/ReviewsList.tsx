import * as React from "react";
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/Avatar";
import { Badge } from "../../../components/Badge";
import { Separator } from "../../../components/Separator";
import { EmptyStateCard } from "../../data/EmptyStateCard";

export interface Review {
  id: string;
  author: string;
  avatarUrl?: string;
  rating: number;
  title?: string;
  content: string;
  date: string;
  verified?: boolean;
  helpful?: number;
  variant?: "product" | "service";
  tags?: string[];
}

export interface RatingDistribution {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

export interface ReviewsListProps extends React.HTMLAttributes<HTMLDivElement> {
  reviews: Review[];
  overallRating?: number;
  totalCount?: number;
  ratingDistribution?: RatingDistribution;
  showDistribution?: boolean;
  showHelpful?: boolean;
  showVerified?: boolean;
  showVariant?: boolean;
  onHelpful?: (review: Review) => void;
  onReport?: (review: Review) => void;
  emptyMessage?: string;
}

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          style={{ width: size, height: size }}
          className={cn(
            star <= Math.floor(rating)
              ? "fill-warning text-warning"
              : star - 0.5 <= rating
                ? "fill-warning/50 text-warning"
                : "fill-muted text-muted",
          )}
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  showHelpful,
  showVerified,
  showVariant,
  onHelpful,
  onReport,
}: {
  review: Review;
  showHelpful?: boolean;
  showVerified?: boolean;
  showVariant?: boolean;
  onHelpful?: (review: Review) => void;
  onReport?: (review: Review) => void;
}) {
  const [helpfulCount, setHelpfulCount] = React.useState(review.helpful ?? 0);
  const [voted, setVoted] = React.useState(false);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const handleHelpful = () => {
    if (!voted) {
      setHelpfulCount((c) => c + 1);
      setVoted(true);
      onHelpful?.(review);
    } else {
      setHelpfulCount((c) => c - 1);
      setVoted(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarImage src={review.avatarUrl} alt={review.author} />
          <AvatarFallback>{getInitials(review.author)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium">{review.author}</span>
            {showVerified && review.verified && (
              <Badge variant="secondary" className="text-xs py-0 px-1.5">
                <svg
                  className="mr-1 h-3 w-3 text-success"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.101 0 .202.004.303.012a11.954 11.954 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016A11.954 11.954 0 0010 3.944 11.954 11.954 0 002.166 4.999zM12 9a1 1 0 011 1 1 1 0 11-2 0 1 1 0 012 0zm-1-4a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Verified
              </Badge>
            )}
            {showVariant && review.variant && (
              <Badge variant="outline" className="text-xs py-0 px-1.5 capitalize">
                {review.variant}
              </Badge>
            )}
            <span className="text-xs text-muted-foreground ml-auto">{review.date}</span>
          </div>
          <div className="mt-1">
            <StarRating rating={review.rating} />
          </div>
          {review.title && <p className="mt-1 text-sm font-medium">{review.title}</p>}
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{review.content}</p>
          {review.tags && review.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {review.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs py-0">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          {showHelpful && (
            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                onClick={handleHelpful}
                className={cn(
                  "flex items-center gap-1.5 text-xs transition-colors",
                  voted ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill={voted ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                  <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
                Helpful ({helpfulCount})
              </button>
              <button
                type="button"
                onClick={() => onReport?.(review)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Report
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RatingDistributionBar({
  stars,
  count,
  total,
}: {
  stars: number;
  count: number;
  total: number;
}) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-8 shrink-0 text-muted-foreground text-xs">{stars} ★</span>
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-warning rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-8 shrink-0 text-muted-foreground text-xs text-right">{count}</span>
    </div>
  );
}

function ReviewsList(
  {
    reviews,
    overallRating,
    totalCount,
    ratingDistribution,
    showDistribution = false,
    showHelpful = true,
    showVerified = false,
    showVariant = false,
    onHelpful,
    onReport,
    emptyMessage = "No reviews yet",
    className,
    ...props
  }: ReviewsListProps,
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <div ref={ref} className={cn("space-y-4", className)} {...props}>
      {reviews.length === 0 ? (
        <EmptyStateCard
          title="No reviews"
          description={emptyMessage}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          }
        />
      ) : (
        <>
          {showDistribution && ratingDistribution && totalCount !== undefined && (
            <div className="space-y-2 p-4 rounded-lg border bg-muted/20">
              <div className="flex items-center gap-4 mb-3">
                {overallRating !== undefined && (
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold">{overallRating.toFixed(1)}</span>
                    <StarRating rating={overallRating} size={16} />
                    <span className="text-xs text-muted-foreground mt-0.5">
                      {totalCount} review{totalCount !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}
                <div className="flex-1 space-y-1.5">
                  {([5, 4, 3, 2, 1] as const).map((stars) => (
                    <RatingDistributionBar
                      key={stars}
                      stars={stars}
                      count={ratingDistribution[stars]}
                      total={totalCount}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {reviews.map((review, idx) => (
            <div key={review.id}>
              <ReviewCard
                review={review}
                showHelpful={showHelpful}
                showVerified={showVerified}
                showVariant={showVariant}
                onHelpful={onHelpful}
                onReport={onReport}
              />
              {idx < reviews.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

ReviewsList.displayName = "ReviewsList";

export { ReviewsList };
