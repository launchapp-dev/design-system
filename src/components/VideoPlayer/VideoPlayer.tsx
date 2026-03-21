import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const videoPlayerVariants = cva(
  "relative overflow-hidden rounded-[--la-radius] bg-black",
  {
    variants: {
      size: {
        sm: "aspect-video max-w-md",
        md: "aspect-video max-w-2xl",
        lg: "aspect-video max-w-5xl",
        full: "w-full",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface VideoPlayerProps
  extends Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "children" | "onTimeUpdate">,
    VariantProps<typeof videoPlayerVariants> {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  showControls?: boolean;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
}

function VideoPlayer({
  className,
  size,
  src,
  poster,
  autoPlay = false,
  showControls = true,
  onTimeUpdate,
  ref,
  ...props
}: VideoPlayerProps & { ref?: React.Ref<HTMLVideoElement> }) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(1);
  const [isMuted, setIsMuted] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [showControlsOverlay, setShowControlsOverlay] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  const controlsTimeout = React.useRef<NodeJS.Timeout | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => videoRef.current as HTMLVideoElement);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      onTimeUpdate?.(videoRef.current.currentTime, videoRef.current.duration);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoading(false);
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (videoRef.current) {
      const newVolume = value[0];
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume || 0.5;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const handleFullscreen = async () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        await containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
    }
  };

  const handleMouseMove = () => {
    setShowControlsOverlay(true);
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }
    if (isPlaying) {
      controlsTimeout.current = setTimeout(() => {
        setShowControlsOverlay(false);
      }, 3000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case " ":
      case "k":
        e.preventDefault();
        handlePlayPause();
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.currentTime -= 10;
        }
        break;
      case "ArrowRight":
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.currentTime += 10;
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        handleVolumeChange([Math.min(volume + 0.1, 1)]);
        break;
      case "ArrowDown":
        e.preventDefault();
        handleVolumeChange([Math.max(volume - 0.1, 0)]);
        break;
      case "m":
        handleMuteToggle();
        break;
      case "f":
        handleFullscreen();
        break;
    }
  };

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(videoPlayerVariants({ size }), className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControlsOverlay(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="application"
      aria-label="Video player"
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="h-full w-full"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onWaiting={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        autoPlay={autoPlay}
        {...props}
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-white" />
        </div>
      )}

      {showControls && (
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300",
            showControlsOverlay ? "opacity-100" : "opacity-0"
          )}
        >
          <SliderPrimitive.Root
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="relative mb-3 flex w-full touch-none select-none items-center"
            aria-label="Video progress"
          >
            <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-white/30">
              <SliderPrimitive.Range className="absolute h-full bg-[hsl(var(--la-primary))]" />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb
              className="block h-3 w-3 rounded-full bg-white shadow ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))]"
              aria-label="Seek to position"
            />
          </SliderPrimitive.Root>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePlayPause}
                className="rounded p-1.5 text-white/80 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))]"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </button>

              <div className="group relative flex items-center">
                <button
                  onClick={handleMuteToggle}
                  className="rounded p-1.5 text-white/80 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))]"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted || volume === 0 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : volume < 0.5 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                  )}
                </button>
                <div className="invisible absolute bottom-full left-0 w-20 rounded bg-black/80 p-2 group-hover:visible">
                  <SliderPrimitive.Root
                    value={[isMuted ? 0 : volume]}
                    max={1}
                    step={0.01}
                    onValueChange={handleVolumeChange}
                    orientation="vertical"
                    className="flex h-16 w-full touch-none select-none items-center justify-center"
                    aria-label="Volume"
                  >
                    <SliderPrimitive.Track className="relative h-full w-1 grow overflow-hidden rounded-full bg-white/30">
                      <SliderPrimitive.Range className="absolute w-full bg-[hsl(var(--la-primary))]" />
                    </SliderPrimitive.Track>
                    <SliderPrimitive.Thumb
                      className="block h-3 w-3 rounded-full bg-white shadow"
                      aria-label="Volume level"
                    />
                  </SliderPrimitive.Root>
                </div>
              </div>

              <span className="text-xs text-white/80">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <button
              onClick={handleFullscreen}
              className="rounded p-1.5 text-white/80 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))]"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

VideoPlayer.displayName = "VideoPlayer";

export { VideoPlayer, videoPlayerVariants };
