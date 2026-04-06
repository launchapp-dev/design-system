import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../Card";
import { Badge } from "../Badge";
import { Button } from "../Button";
import type { CommunityTheme } from "@/themes/community-themes";

export interface ThemeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  theme: CommunityTheme;
  onViewDetails?: (themeId: string) => void;
  onUseTheme?: (themeId: string) => void;
  isFeatured?: boolean;
}

const ThemeCard = React.forwardRef<HTMLDivElement, ThemeCardProps>(
  ({ theme, onViewDetails, onUseTheme, isFeatured, className, ...props }, ref) => {
    const previewColor = theme.previewColor || "262 83% 58%";

    return (
      <Card ref={ref} className={cn(isFeatured && "ring-2 ring-primary", className)} {...props}>
        <CardHeader className="pb-3">
          {isFeatured && (
            <Badge variant="default" className="mb-2 w-fit">
              Featured
            </Badge>
          )}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <CardTitle className="truncate">{theme.name}</CardTitle>
              <CardDescription className="text-xs mt-1">by {theme.author.name}</CardDescription>
            </div>
            <div
              className="h-12 w-12 rounded-md border border-border flex-shrink-0"
              style={{ backgroundColor: `hsl(${previewColor})` }}
              title={previewColor}
            />
          </div>
        </CardHeader>

        <CardContent className="pb-3">
          <p className="text-sm text-muted-foreground line-clamp-2">{theme.description}</p>

          {theme.keywords && theme.keywords.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {theme.keywords.slice(0, 3).map((keyword) => (
                <Badge key={keyword} variant="outline" className="text-xs">
                  {keyword}
                </Badge>
              ))}
              {theme.keywords.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{theme.keywords.length - 3}
                </Badge>
              )}
            </div>
          )}

          <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
            <span>v{theme.version}</span>
            <span className="font-mono">{theme.license}</span>
          </div>
        </CardContent>

        <CardFooter className="pt-0 gap-2">
          {onViewDetails && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onViewDetails(theme.id)}
            >
              View Details
            </Button>
          )}
          {onUseTheme && (
            <Button size="sm" className="flex-1" onClick={() => onUseTheme(theme.id)}>
              Use Theme
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  },
);

ThemeCard.displayName = "ThemeCard";

export { ThemeCard };
