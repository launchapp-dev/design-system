import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { VideoPlayer } from "./index";

const SAMPLE_VIDEO_URL =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const SAMPLE_POSTER_URL =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg";

const meta: Meta<typeof VideoPlayer> = {
  title: "Components/VideoPlayer",
  component: VideoPlayer,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "full"],
    },
    defaultVolume: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
    },
    autoHideDelay: {
      control: { type: "number" },
    },
    showControls: {
      control: "boolean",
    },
    showVolumeSlider: {
      control: "boolean",
    },
    showPlaybackSpeed: {
      control: "boolean",
    },
    defaultMuted: {
      control: "boolean",
    },
  },
  args: {
    size: "md",
    showControls: true,
    showVolumeSlider: true,
    showPlaybackSpeed: true,
    defaultVolume: 1,
    defaultMuted: false,
    autoHideControls: true,
    autoHideDelay: 3000,
  },
  parameters: {
    docs: {
      description: {
        component: `
## Accessibility Features

### ARIA & Media Attributes
- Video element properly configured with controls
- Captions/subtitles provided for video content
- Audio descriptions available for visual information
- Poster image has alt text

### Keyboard Navigation
- **Space/K**: Play/pause
- **F**: Fullscreen
- **M**: Mute/unmute
- **Arrow Right/Left**: Seek forward/backward
- **Up/Down**: Volume control
- **Tab**: Navigate controls

### Screen Reader Behavior
- Video purpose announced via title/label
- Play/pause status announced
- Current time and duration announced
- Volume level announced on changes
- Caption availability announced

### Visual Accessibility
- High contrast controls
- Large touch targets for mobile
- Captions/subtitles high contrast
- Focus indicators visible on all controls
- Fullscreen still shows controls and captions

### Caption & Audio Descriptions
- Multiple caption track support
- Audio descriptions track available
- Transcripts provided alongside player
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof VideoPlayer>;

export const Default: Story = {
  args: {
    src: SAMPLE_VIDEO_URL,
    poster: SAMPLE_POSTER_URL,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(["sm", "md", "lg", "full"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground capitalize">
            {size}
          </span>
          <VideoPlayer
            size={size}
            src={SAMPLE_VIDEO_URL}
            poster={SAMPLE_POSTER_URL}
          />
        </div>
      ))}
    </div>
  ),
};

export const WithoutPoster: Story = {
  args: {
    src: SAMPLE_VIDEO_URL,
    showControls: true,
  },
};

export const WithoutVolumeSlider: Story = {
  args: {
    src: SAMPLE_VIDEO_URL,
    poster: SAMPLE_POSTER_URL,
    showVolumeSlider: false,
  },
};

export const WithoutPlaybackSpeed: Story = {
  args: {
    src: SAMPLE_VIDEO_URL,
    poster: SAMPLE_POSTER_URL,
    showPlaybackSpeed: false,
  },
};

export const WithoutAutoHide: Story = {
  args: {
    src: SAMPLE_VIDEO_URL,
    poster: SAMPLE_POSTER_URL,
    autoHideControls: false,
  },
};

export const Muted: Story = {
  args: {
    src: SAMPLE_VIDEO_URL,
    poster: SAMPLE_POSTER_URL,
    defaultMuted: true,
  },
};

export const LowVolume: Story = {
  args: {
    src: SAMPLE_VIDEO_URL,
    poster: SAMPLE_POSTER_URL,
    defaultVolume: 0.2,
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: () => (
    <div className="dark p-8">
      <VideoPlayer
        size="md"
        src={SAMPLE_VIDEO_URL}
        poster={SAMPLE_POSTER_URL}
      />
    </div>
  ),
};

export const InteractiveControls: Story = {
  render: () => {
    const playerRef = React.useRef<{
      play: () => void;
      pause: () => void;
      togglePlay: () => void;
      seek: (time: number) => void;
      setVolume: (volume: number) => void;
      toggleMute: () => void;
      toggleFullscreen: () => void;
      setPlaybackRate: (rate: number) => void;
    } | null>(null);

    return (
      <div className="flex flex-col gap-8">
        <VideoPlayer
          ref={playerRef}
          size="md"
          src={SAMPLE_VIDEO_URL}
          poster={SAMPLE_POSTER_URL}
        />

        <div className="flex flex-wrap gap-4 items-center">
          <span className="text-sm font-medium text-foreground">
            External Controls:
          </span>
          <button
            onClick={() => playerRef.current?.togglePlay()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-[--la-radius] hover:opacity-90 transition-opacity"
          >
            Toggle Play/Pause
          </button>
          <button
            onClick={() => playerRef.current?.seek(30)}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-[--la-radius] hover:opacity-90 transition-opacity"
          >
            Seek to 0:30
          </button>
          <button
            onClick={() => playerRef.current?.setVolume(0.5)}
            className="px-4 py-2 bg-accent text-accent-foreground rounded-[--la-radius] hover:opacity-90 transition-opacity"
          >
            Set Volume 50%
          </button>
          <button
            onClick={() => playerRef.current?.toggleMute()}
            className="px-4 py-2 border border-input bg-background text-foreground rounded-[--la-radius] hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Toggle Mute
          </button>
          <button
            onClick={() => playerRef.current?.setPlaybackRate(1.5)}
            className="px-4 py-2 border border-input bg-background text-foreground rounded-[--la-radius] hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Set Speed 1.5x
          </button>
        </div>
      </div>
    );
  },
};

export const WithMultipleSources: Story = {
  render: () => (
    <VideoPlayer size="lg" poster={SAMPLE_POSTER_URL}>
      <track kind="captions" label="English" srcLang="en" default />
      <source src={SAMPLE_VIDEO_URL} type="video/mp4" />
      <p className="text-white">
        Your browser doesn't support HTML5 video.
        <a href={SAMPLE_VIDEO_URL} className="text-primary underline">
          Download the video
        </a>
      </p>
    </VideoPlayer>
  ),
};
