import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Slider } from "../Slider";

const videoPlayerVariants = cva(
  "relative group rounded-[--la-radius] overflow-hidden bg-black focus-within:ring-2 focus-within:ring-[hsl(var(--la-ring))] focus-within:ring-offset-2 focus-within:ring-offset-background",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-2xl",
        lg: "max-w-4xl",
        full: "w-full",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const videoPlayerOverlayVariants = cva(
  "absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200",
  {
    variants: {
      isPlaying: {
        true: "opacity-0 group-hover:opacity-100",
        false: "opacity-100",
      },
    },
    defaultVariants: {
      isPlaying: false,
    },
  }
);

export interface VideoPlayerProps
  extends Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "children">,
    VariantProps<typeof videoPlayerVariants> {
  poster?: string;
  showControls?: boolean;
  autoHideControls?: boolean;
  autoHideDelay?: number;
  showVolumeSlider?: boolean;
  showPlaybackSpeed?: boolean;
  defaultVolume?: number;
  defaultMuted?: boolean;
  className?: string;
}

interface VideoPlayerRef {
  container: HTMLDivElement | null;
  video: HTMLVideoElement | null;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleFullscreen: () => void;
  setPlaybackRate: (rate: number) => void;
}

const PLAYBACK_SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function VideoPlayerInner(
  {
    className,
    size,
    poster,
    src,
    showControls = true,
    autoHideControls = true,
    autoHideDelay = 3000,
    showVolumeSlider = true,
    showPlaybackSpeed = true,
    defaultVolume = 1,
    defaultMuted = false,
    onPlay,
    onPause,
    onVolumeChange,
    onTimeUpdate,
    onLoadedMetadata,
    ...props
  }: VideoPlayerProps,
  ref: React.Ref<VideoPlayerRef>
) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(defaultVolume);
  const [muted, setMuted] = React.useState(defaultMuted);
  const [playbackRate, setPlaybackRateState] = React.useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = React.useState(false);
  const [buffered, setBuffered] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [showControlsState, setShowControlsState] = React.useState(true);

  React.useImperativeHandle(ref, () => ({
    container: containerRef.current,
    video: videoRef.current,
    play: () => videoRef.current?.play(),
    pause: () => videoRef.current?.pause(),
    togglePlay: () => {
      if (videoRef.current?.paused) {
        videoRef.current?.play();
      } else {
        videoRef.current?.pause();
      }
    },
    seek: (time: number) => {
      if (videoRef.current) {
        videoRef.current.currentTime = time;
      }
    },
    setVolume: (vol: number) => {
      if (videoRef.current) {
        videoRef.current.volume = vol;
        setVolume(vol);
        if (vol > 0 && muted) {
          setMuted(false);
          videoRef.current.muted = false;
        }
      }
    },
    toggleMute: () => {
      if (videoRef.current) {
        videoRef.current.muted = !videoRef.current.muted;
        setMuted(videoRef.current.muted);
      }
    },
    toggleFullscreen: () => {
      if (!document.fullscreenElement && containerRef.current) {
        containerRef.current.requestFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    },
    setPlaybackRate: (rate: number) => {
      if (videoRef.current) {
        videoRef.current.playbackRate = rate;
        setPlaybackRateState(rate);
      }
    },
  }));

  const resetControlsTimeout = React.useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    setShowControlsState(true);
    if (autoHideControls && isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControlsState(false);
      }, autoHideDelay);
    }
  }, [autoHideControls, autoHideDelay, isPlaying]);

  const handlePlay = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setIsPlaying(true);
    onPlay?.(e);
    resetControlsTimeout();
  };

  const handlePause = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setIsPlaying(false);
    setShowControlsState(true);
    onPause?.(e);
  };

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      onTimeUpdate?.(e);
    }
  };

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoading(false);
      onLoadedMetadata?.(e);
    }
  };

  const handleProgress = () => {
    if (videoRef.current && videoRef.current.buffered.length > 0) {
      const bufferedEnd = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
      setBuffered((bufferedEnd / videoRef.current.duration) * 100);
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      if (newVolume > 0 && muted) {
        setMuted(false);
        videoRef.current.muted = false;
      }
    }
    onVolumeChange?.(newVolume as any);
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  const handleFullscreenToggle = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const handlePlaybackRateChange = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRateState(rate);
    }
    setShowSpeedMenu(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case " ":
      case "k":
        e.preventDefault();
        if (videoRef.current?.paused) {
          videoRef.current.play();
        } else {
          videoRef.current?.pause();
        }
        resetControlsTimeout();
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
        }
        break;
      case "ArrowRight":
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 5);
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.volume = Math.min(1, volume + 0.1);
          setVolume(videoRef.current.volume);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.volume = Math.max(0, volume - 0.1);
          setVolume(videoRef.current.volume);
        }
        break;
      case "m":
        e.preventDefault();
        handleMuteToggle();
        break;
      case "f":
        e.preventDefault();
        handleFullscreenToggle();
        break;
    }
  };

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setShowControlsState(true);
    };

    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  React.useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className={cn(videoPlayerVariants({ size }), className)}
      onMouseMove={resetControlsTimeout}
      onMouseLeave={() => isPlaying && autoHideControls && setShowControlsState(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="application"
      aria-label="Video player"
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        poster={poster}
        src={src}
        onPlay={handlePlay}
        onPause={handlePause}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onProgress={handleProgress}
        playsInline
        {...props}
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {!isPlaying && !isLoading && (
        <div className={videoPlayerOverlayVariants({ isPlaying: false })}>
          <button
            onClick={() => videoRef.current?.play()}
            className="flex items-center justify-center w-20 h-20 rounded-full bg-white/90 hover:bg-white transition-colors min-h-[44px] min-w-[44px]"
            aria-label="Play video"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="black"
              stroke="none"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </button>
        </div>
      )}

      {isPlaying && !showControlsState && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => videoRef.current?.pause()}
            className="flex items-center justify-center w-16 h-16 rounded-full bg-black/50 hover:bg-black/70 transition-colors min-h-[44px] min-w-[44px]"
            aria-label="Pause video"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              stroke="none"
            >
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          </button>
        </div>
      )}

      {showControls && showControlsState && (
        <div className="absolute bottom-0 start-0 end-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
          <div className="mb-2">
            <div className="relative h-1 bg-white/30 rounded-full cursor-pointer group/progress">
              <div
                className="absolute inset-y-0 start-0 bg-white/50 rounded-full"
                style={{ width: `${buffered}%` }}
              />
              <div
                className="absolute inset-y-0 start-0 bg-primary rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
              <Slider
                className="absolute inset-0 opacity-0"
                min={0}
                max={duration || 100}
                step={0.1}
                value={[currentTime]}
                onValueChange={handleSeek}
                aria-label="Video progress"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => videoRef.current?.paused ? videoRef.current?.play() : videoRef.current?.pause()}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px]"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="none">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="none">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </button>

              {showVolumeSlider && (
                <div className="flex items-center gap-1 group/volume">
                  <button
                    onClick={handleMuteToggle}
                    className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px]"
                    aria-label={muted ? "Unmute" : "Mute"}
                  >
                    {muted || volume === 0 ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                      </svg>
                    ) : volume < 0.5 ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                      </svg>
                    )}
                  </button>
                  <div className="w-0 group-hover/volume:w-20 overflow-hidden transition-all duration-200">
                    <Slider
                      className="w-20"
                      min={0}
                      max={1}
                      step={0.01}
                      value={[muted ? 0 : volume]}
                      onValueChange={handleVolumeChange}
                      aria-label="Volume"
                    />
                  </div>
                </div>
              )}

              <span className="text-sm text-white font-medium tabular-nums">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {showPlaybackSpeed && (
                <div className="relative">
                  <button
                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                    className="flex items-center justify-center px-2 py-1 rounded hover:bg-white/20 transition-colors text-sm text-white font-medium min-h-[44px]"
                    aria-label="Playback speed"
                    aria-expanded={showSpeedMenu}
                    aria-haspopup="listbox"
                  >
                    {playbackRate}x
                  </button>
                  {showSpeedMenu && (
                    <div
                      className="absolute bottom-full end-0 mb-2 py-1 bg-black/90 rounded-[--la-radius] shadow-lg min-w-[80px]"
                      role="listbox"
                      aria-label="Select playback speed"
                    >
                      {PLAYBACK_SPEEDS.map((speed) => (
                        <button
                          key={speed}
                          onClick={() => handlePlaybackRateChange(speed)}
                          className={cn(
                            "w-full px-4 py-1 text-sm text-start hover:bg-white/20 transition-colors min-h-[36px]",
                            playbackRate === speed ? "text-primary font-medium" : "text-white"
                          )}
                          role="option"
                          aria-selected={playbackRate === speed}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={handleFullscreenToggle}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px]"
                aria-label="Toggle fullscreen"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                  <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                  <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                  <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const VideoPlayer = React.forwardRef(VideoPlayerInner) as React.ForwardRefExoticComponent<
  VideoPlayerProps & React.RefAttributes<VideoPlayerRef>
>;

VideoPlayer.displayName = "VideoPlayer";

export { VideoPlayer, videoPlayerVariants, videoPlayerOverlayVariants };
