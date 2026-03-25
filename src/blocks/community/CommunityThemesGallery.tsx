import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/Card";
import { ThemeCard } from "../../components/ThemeCard";
import { Badge } from "../../components/Badge";
import {
  DialogRoot,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/Dialog";
import { ScrollArea } from "../../components/ScrollArea";
import { Separator } from "../../components/Separator";
import { listCommunityThemes, type CommunityTheme } from "../../themes/community-themes";

export interface CommunityThemesGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  themes?: CommunityTheme[];
  featuredThemeIds?: string[];
  onUseTheme?: (themeId: string) => void;
  columns?: 2 | 3 | 4;
}

const CommunityThemesGallery = React.forwardRef<HTMLDivElement, CommunityThemesGalleryProps>(
  ({ themes, featuredThemeIds = [], onUseTheme, columns = 3, className, ...props }, ref) => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedKeyword, setSelectedKeyword] = React.useState<string | null>(null);
    const [detailsTheme, setDetailsTheme] = React.useState<CommunityTheme | null>(null);

    const allThemes = themes || listCommunityThemes();
    const allKeywords = Array.from(
      new Set(allThemes.flatMap((t) => t.keywords || []))
    ).sort();

    const filteredThemes = allThemes.filter((theme) => {
      const matchesSearch =
        theme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        theme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        theme.author.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesKeyword = !selectedKeyword || (theme.keywords || []).includes(selectedKeyword);

      return matchesSearch && matchesKeyword;
    });

    const featuredThemes = filteredThemes.filter((t) => featuredThemeIds.includes(t.id));
    const otherThemes = filteredThemes.filter((t) => !featuredThemeIds.includes(t.id));

    const colClasses: Record<number, string> = {
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    };

    return (
      <>
        <div ref={ref} className={cn("space-y-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle>Community Themes Gallery</CardTitle>
              <CardDescription>
                Explore and use themes created by the LaunchApp community
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Input
                  placeholder="Search themes, authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedKeyword(null);
                  }}
                  disabled={!searchTerm && !selectedKeyword}
                >
                  Clear Filters
                </Button>
              </div>

              {allKeywords.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Filter by category</p>
                  <div className="flex flex-wrap gap-2">
                    {allKeywords.map((keyword) => (
                      <Badge
                        key={keyword}
                        variant={selectedKeyword === keyword ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() =>
                          setSelectedKeyword(selectedKeyword === keyword ? null : keyword)
                        }
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {featuredThemes.length > 0 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Featured Themes</h2>
                <p className="text-sm text-muted-foreground">Handpicked themes from our community</p>
              </div>
              <div className={cn("grid gap-4", colClasses[columns])}>
                {featuredThemes.map((theme) => (
                  <ThemeCard
                    key={theme.id}
                    theme={theme}
                    isFeatured
                    onViewDetails={() => setDetailsTheme(theme)}
                    onUseTheme={() => onUseTheme?.(theme.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {otherThemes.length > 0 && (
            <div className="space-y-4">
              {featuredThemes.length > 0 && (
                <Separator />
              )}
              <div>
                <h2 className="text-lg font-semibold">All Themes</h2>
                <p className="text-sm text-muted-foreground">
                  {filteredThemes.length} theme{filteredThemes.length !== 1 ? "s" : ""} available
                </p>
              </div>
              <div className={cn("grid gap-4", colClasses[columns])}>
                {otherThemes.map((theme) => (
                  <ThemeCard
                    key={theme.id}
                    theme={theme}
                    onViewDetails={() => setDetailsTheme(theme)}
                    onUseTheme={() => onUseTheme?.(theme.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {filteredThemes.length === 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <p className="text-muted-foreground">No themes found matching your criteria</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedKeyword(null);
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogRoot open={!!detailsTheme} onOpenChange={(open) => !open && setDetailsTheme(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh]">
            {detailsTheme && (
              <>
                <DialogHeader>
                  <DialogTitle>{detailsTheme.name}</DialogTitle>
                  <DialogDescription>
                    by {detailsTheme.author.name}
                  </DialogDescription>
                </DialogHeader>

                <ScrollArea className="pr-4 space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-sm mb-2">Description</h3>
                      <p className="text-sm text-muted-foreground">{detailsTheme.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Version</p>
                        <p className="text-sm font-mono">{detailsTheme.version}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">License</p>
                        <p className="text-sm font-mono">{detailsTheme.license}</p>
                      </div>
                    </div>

                    {detailsTheme.author.url && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">
                          Author Website
                        </p>
                        <a
                          href={detailsTheme.author.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline break-all"
                        >
                          {detailsTheme.author.url}
                        </a>
                      </div>
                    )}

                    {detailsTheme.repository && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">
                          Repository
                        </p>
                        <a
                          href={detailsTheme.repository}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline break-all"
                        >
                          {detailsTheme.repository}
                        </a>
                      </div>
                    )}

                    {detailsTheme.keywords && detailsTheme.keywords.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">
                          Keywords
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {detailsTheme.keywords.map((keyword) => (
                            <Badge key={keyword} variant="secondary" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <Separator />

                    <div>
                      <h3 className="font-semibold text-sm mb-3">Color Tokens</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-2">
                            Light Mode
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            {Object.entries(detailsTheme.tokens.light).map(([key, value]) => (
                              <div key={key} className="flex items-center gap-2">
                                <div
                                  className="h-6 w-6 rounded border border-border"
                                  style={{ backgroundColor: `hsl(${value})` }}
                                />
                                <span className="font-mono text-muted-foreground">{key}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-2">
                            Dark Mode
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            {Object.entries(detailsTheme.tokens.dark).map(([key, value]) => (
                              <div key={key} className="flex items-center gap-2">
                                <div
                                  className="h-6 w-6 rounded border border-border"
                                  style={{ backgroundColor: `hsl(${value})` }}
                                />
                                <span className="font-mono text-muted-foreground">{key}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>

                <div className="flex gap-2 justify-end pt-4 border-t">
                  <DialogClose asChild>
                    <Button variant="outline">Close</Button>
                  </DialogClose>
                  {onUseTheme && (
                    <Button
                      onClick={() => {
                        onUseTheme(detailsTheme.id);
                        setDetailsTheme(null);
                      }}
                    >
                      Use This Theme
                    </Button>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </DialogRoot>
      </>
    );
  }
);

CommunityThemesGallery.displayName = "CommunityThemesGallery";

export { CommunityThemesGallery };
