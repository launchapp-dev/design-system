import * as React from "react";
import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const videoPlayerVariants = cva(
  "relative overflow-hidden rounded-[--la-radius] bg-black",
  {
    variants: {
      size: {
        sm: "max-w-md",
        md: "max-w-2xl",
        lg: "max-w-5xl",
        full: "w-full",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface VideoPlayerProps
  extends Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "controls" | "onTimeUpdate"> {
  src: string;
  poster?: string;
  size?: VariantProps<typeof videoPlayerVariants>["size"];
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  showControls?: boolean;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onEnded?: () => void;
}

const VideoPlayer = React.forwardRef<HTMLVideoElement, VideoPlayerProps>(
  (
    {
      className,
      src,
      poster,
      size = "md",
      autoPlay = false,
      muted = false,
      loop = false,
      showControls = true,
      onTimeUpdate,
      onEnded,
      ...props
    },
    ref
  ) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = React.useState(autoPlay);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [volume, setVolume] = React.useState(1);
    const [isMuted, setIsMuted] = React.useState(muted);
    const [isFullscreen, setIsFullscreen] = React.useState(false);
    const [showControlsOverlay, setShowControlsOverlay] = React.useState(true);
    const [playbackRate, setPlaybackRate] = React.useState(1);
    const controlsTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    React.useImperativeHandle(ref, () => videoRef.current!);

    const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const handleTimeUpdate = () => {
      if (videoRef.current) {
        const current = videoRef.current.currentTime;
        const total = videoRef.current.duration;
        setCurrentTime(current);
        onTimeUpdate?.(current, total);
      }
    };

    const handleLoadedMetadata = () => {
      if (videoRef.current) {
        setDuration(videoRef.current.duration);
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    const togglePlay = () => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
      }
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
      if (videoRef.current) {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        videoRef.current.currentTime = percent * duration;
      }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);
      if (videoRef.current) {
        videoRef.current.volume = newVolume;
      }
      if (newVolume > 0) {
        setIsMuted(false);
      }
    };

    const toggleMute = () => {
      if (videoRef.current) {
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
      }
    };

    const toggleFullscreen = async () => {
      if (!videoRef.current) return;

      try {
        if (!document.fullscreenElement) {
          await videoRef.current.parentElement?.requestFullscreen();
          setIsFullscreen(true);
        } else {
          await document.exitFullscreen();
          setIsFullscreen(false);
        }
      } catch (err) {
        console.error("Fullscreen error:", err);
      }
    };

    const handlePlaybackRateChange = () => {
      const rates = [0.5, 1, 1.5, 2];
      const currentIndex = rates.indexOf(playbackRate);
      const nextRate = rates[(currentIndex + 1) % rates.length];
      setPlaybackRate(nextRate);
      if (videoRef.current) {
        videoRef.current.playbackRate = nextRate;
      }
    };

    const handleMouseMove = () => {
      setShowControlsOverlay(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      if (isPlaying) {
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControlsOverlay(false);
        }, 3000);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === " " || e.key === "k") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "m") {
        toggleMute();
      } else if (e.key === "f") {
        toggleFullscreen();
      } else if (e.key === "ArrowLeft" && videoRef.current) {
        videoRef.current.currentTime -= 10;
      } else if (e.key === "ArrowRight" && videoRef.current) {
        videoRef.current.currentTime += 10;
      }
    };

    React.useEffect(() => {
      return () => {
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current);
        }
      };
    }, []);

    return (
      <div
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
          autoPlay={autoPlay}
          muted={isMuted}
          loop={loop}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          className="h-full w-full"
          {...props}
        />

        {showControls && (
          <div
            className={cn(
              "absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300",
              showControlsOverlay ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="p-4">
              <div
                className="mb-3 h-1 w-full cursor-pointer rounded-full bg-white/30"
                onClick={handleSeek}
                role="slider"
                aria-label="Video progress"
                aria-valuemin={0}
                aria-valuemax={duration}
                aria-valuenow={currentTime}
                tabIndex={0}
              >
                <div
                  className="h-full rounded-full bg-[hsl(var(--la-primary))]"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="rounded-md p-2 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <svg
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
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMute}
                      className="rounded-md p-2 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted || volume === 0 ? (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                          <line x1="23" y1="9" x2="17" y2="15" />
                          <line x1="17" y1="9" x2="23" y2="15" />
                        </svg>
                      ) : volume < 0.5 ? (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        </svg>
                      ) : (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                        </svg>
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                      aria-label="Volume"
                    />
                  </div>

                  <span className="text-sm font-medium text-white">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePlaybackRateChange}
                    className="rounded-md px-2 py-1 text-sm font-medium text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                    aria-label={`Playback rate: ${playbackRate}x`}
                  >
                    {playbackRate}x
                  </button>

                  <button
                    onClick={toggleFullscreen}
                    className="rounded-md p-2 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                    aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  >
                    {isFullscreen ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

VideoPlayer.displayName = "VideoPlayer";

export { VideoPlayer, videoPlayerVariants };
