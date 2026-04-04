import * as React from "react";
import { Badge } from "../../../components/Badge";
import { Button } from "../../../components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/Card";
import { cn } from "../../../lib/utils";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category?: string;
  author?: string;
  date?: string;
  readingTime?: string;
  image?: React.ReactNode;
  href?: string;
}

export interface PostListProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  posts?: BlogPost[];
  categories?: string[];
  selectedCategory?: string;
  onCategoryChange?: (category: string | undefined) => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const PostList = React.forwardRef<HTMLDivElement, PostListProps>(
  (
    {
      className,
      title = "Blog",
      subtitle,
      posts = [],
      categories = [],
      selectedCategory,
      onCategoryChange,
      currentPage = 1,
      totalPages = 1,
      onPageChange,
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <section className="px-4 py-12 md:py-16 max-w-6xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-3 text-lg text-muted-foreground">{subtitle}</p>
            )}
          </div>

          {categories.length > 0 && (
            <div
              className="flex flex-wrap gap-2 mb-8"
              role="group"
              aria-label="Filter by category"
            >
              <Button
                variant={selectedCategory === undefined ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange?.(undefined)}
              >
                All
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => onCategoryChange?.(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          )}

          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-muted-foreground">No posts found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden flex flex-col h-full"
                >
                  {post.image && (
                    <div className="aspect-video overflow-hidden bg-muted">
                      {post.image}
                    </div>
                  )}
                  <CardHeader className="flex-1">
                    {post.category && (
                      <Badge variant="secondary" className="w-fit mb-2 text-xs">
                        {post.category}
                      </Badge>
                    )}
                    <CardTitle className="text-lg leading-tight">
                      {post.href ? (
                        <a
                          href={post.href}
                          className="hover:text-primary transition-colors"
                        >
                          {post.title}
                        </a>
                      ) : (
                        post.title
                      )}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {post.author && <span>{post.author}</span>}
                      {post.author && post.date && (
                        <span aria-hidden="true">·</span>
                      )}
                      {post.date && <span>{post.date}</span>}
                      {post.readingTime && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{post.readingTime}</span>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav
              className="mt-10 flex items-center justify-center gap-2"
              aria-label="Pagination"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange?.(currentPage - 1)}
                disabled={currentPage <= 1}
                aria-label="Previous page"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange?.(currentPage + 1)}
                disabled={currentPage >= totalPages}
                aria-label="Next page"
              >
                Next
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>
            </nav>
          )}
        </section>
      </div>
    );
  },
);

PostList.displayName = "PostList";

export { PostList };
