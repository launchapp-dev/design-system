import * as React from "react";
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/Avatar";
import { Badge } from "../../../components/Badge";
import { Separator } from "../../../components/Separator";

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export interface PostDetailProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  title: string;
  content: React.ReactNode;
  author?: string;
  authorBio?: string;
  authorAvatarSrc?: string;
  authorAvatarFallback?: string;
  publishedAt?: string;
  readingTime?: string;
  category?: string;
  tags?: string[];
  tableOfContents?: TocItem[];
}

const PostDetail = React.forwardRef<HTMLDivElement, PostDetailProps>(
  (
    {
      className,
      title,
      content,
      author,
      authorBio,
      authorAvatarSrc,
      authorAvatarFallback,
      publishedAt,
      readingTime,
      category,
      tags = [],
      tableOfContents = [],
      ...props
    },
    ref,
  ) => {
    const [readingProgress, setReadingProgress] = React.useState(0);

    React.useEffect(() => {
      const handleScroll = () => {
        const doc = document.documentElement;
        const scrollTop = window.scrollY || doc.scrollTop;
        const scrollHeight = doc.scrollHeight - doc.clientHeight;
        setReadingProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <div
          className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
          role="progressbar"
          aria-label="Reading progress"
          aria-valuenow={Math.round(readingProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
        />

        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="flex flex-col lg:flex-row gap-12">
            <article className="flex-1 min-w-0">
              <header className="mb-8">
                {category && (
                  <Badge variant="secondary" className="mb-4">
                    {category}
                  </Badge>
                )}
                <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                  {title}
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  {author && <span>{author}</span>}
                  {publishedAt && (
                    <>
                      <span aria-hidden="true">·</span>
                      <time dateTime={publishedAt}>{publishedAt}</time>
                    </>
                  )}
                  {readingTime && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{readingTime}</span>
                    </>
                  )}
                </div>
              </header>

              <div className="prose prose-neutral dark:prose-invert max-w-none">{content}</div>

              {tags.length > 0 && (
                <div className="mt-10 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {author && (
                <>
                  <Separator className="my-10" />
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12 shrink-0">
                      {authorAvatarSrc && <AvatarImage src={authorAvatarSrc} alt={author} />}
                      <AvatarFallback>
                        {authorAvatarFallback ??
                          author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{author}</p>
                      {authorBio && (
                        <p className="mt-1 text-sm text-muted-foreground">{authorBio}</p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </article>

            {tableOfContents.length > 0 && (
              <aside className="w-full lg:w-64 shrink-0">
                <nav
                  className="sticky top-8 rounded-lg border border-border p-4"
                  aria-label="Table of contents"
                >
                  <p className="text-sm font-semibold text-foreground mb-3">On this page</p>
                  <ul className="space-y-2">
                    {tableOfContents.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className={cn(
                            "block text-sm text-muted-foreground hover:text-foreground transition-colors",
                            item.level === 2 && "pl-0",
                            item.level === 3 && "pl-3",
                            item.level === 4 && "pl-6",
                          )}
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>
            )}
          </div>
        </div>
      </div>
    );
  },
);

PostDetail.displayName = "PostDetail";

export { PostDetail };
