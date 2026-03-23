import * as React from "react";
import {
  DialogRoot,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/Dialog";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  name?: string;
}

export interface ImageGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  onRemove?: (id: string) => void;
}

const ImageGallery = React.forwardRef<HTMLDivElement, ImageGalleryProps>(
  ({ images, columns = 3, onRemove, className, ...props }, ref) => {
    const [lightboxId, setLightboxId] = React.useState<string | null>(null);
    const lightboxImage = images.find((img) => img.id === lightboxId);

    const colClasses: Record<number, string> = {
      2: "grid-cols-2",
      3: "grid-cols-2 sm:grid-cols-3",
      4: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
    };

    return (
      <>
        <div
          ref={ref}
          className={cn("grid gap-3", colClasses[columns] ?? colClasses[3], className)}
          {...props}
        >
          {images.map((image) => (
            <div key={image.id} className="group relative aspect-square overflow-hidden rounded-lg border bg-muted">
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end justify-between gap-1 bg-gradient-to-t from-black/50 to-transparent p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => setLightboxId(image.id)}
                  className="rounded-md bg-white/20 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label={`Preview ${image.alt}`}
                >
                  {image.name ? (
                    <span className="max-w-[100px] truncate block">{image.name}</span>
                  ) : (
                    "Preview"
                  )}
                </button>
                {onRemove && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(image.id)}
                    aria-label={`Remove ${image.alt}`}
                    className="h-7 w-7 shrink-0 bg-white/20 p-0 text-white backdrop-blur-sm hover:bg-destructive hover:text-white"
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <DialogRoot open={lightboxId !== null} onOpenChange={(open) => !open && setLightboxId(null)}>
          <DialogContent className="max-w-3xl border-0 bg-black/90 p-2 shadow-2xl">
            <DialogTitle className="sr-only">
              {lightboxImage?.alt ?? "Image preview"}
            </DialogTitle>
            {lightboxImage && (
              <div className="relative flex flex-col items-center gap-2">
                <img
                  src={lightboxImage.src}
                  alt={lightboxImage.alt}
                  className="max-h-[80vh] w-auto rounded object-contain"
                />
                {lightboxImage.name && (
                  <p className="text-sm text-white/70">{lightboxImage.name}</p>
                )}
              </div>
            )}
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 h-8 w-8 rounded-full p-0 text-white hover:bg-white/20 hover:text-white"
                aria-label="Close preview"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </DialogClose>
          </DialogContent>
        </DialogRoot>
      </>
    );
  }
);
ImageGallery.displayName = "ImageGallery";

export { ImageGallery };
