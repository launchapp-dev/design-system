import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { VideoPlayer } from "./index";

const meta: Meta<typeof VideoPlayer> = {
  title: "Components/VideoPlayer",
  component: VideoPlayer,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "full"],
    },
    autoPlay: { control: "boolean" },
    muted: { control: "boolean" },
    loop: { control: "boolean" },
    showControls: { control: "boolean" },
  },
  args: {
    size: "md",
    autoPlay: false,
    muted: false,
    loop: false,
    showControls: true,
  },
};

export default meta;
type Story = StoryObj<typeof VideoPlayer>;

const sampleVideo = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const samplePoster = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg";

export const Default: Story = {
  render: (args) => (
    <VideoPlayer
      {...args}
      src={sampleVideo}
      poster={samplePoster}
    />
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span style={{ fontSize: "12px", textTransform: "capitalize", fontWeight: "bold" }}>
            {size}
          </span>
          <VideoPlayer
            size={size}
            src={sampleVideo}
            poster={samplePoster}
          />
        </div>
      ))}
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <VideoPlayer
      size="full"
      src={sampleVideo}
      poster={samplePoster}
    />
  ),
};

export const AutoPlay: Story = {
  render: () => (
    <VideoPlayer
      src={sampleVideo}
      poster={samplePoster}
      autoPlay
      muted
    />
  ),
};

export const WithoutControls: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <p style={{ fontSize: "14px" }}>Video without custom controls (right-click for native controls)</p>
      <VideoPlayer
        src={sampleVideo}
        poster={samplePoster}
        showControls={false}
      />
    </div>
  ),
};

export const WithEventHandlers: Story = {
  render: () => {
    const [events, setEvents] = React.useState<string[]>([]);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);

    const addEvent = (event: string) => {
      setEvents((prev) => [...prev.slice(-4), event]);
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <VideoPlayer
          src={sampleVideo}
          poster={samplePoster}
          onTimeUpdate={(time, dur) => {
            setCurrentTime(time);
            setDuration(dur);
          }}
          onEnded={() => addEvent("Video ended")}
        />
        <div style={{ padding: "12px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
          <div style={{ marginBottom: "8px", fontSize: "14px" }}>
            <strong>Current time:</strong> {currentTime.toFixed(2)}s / {duration.toFixed(2)}s
          </div>
          <div style={{ fontSize: "14px" }}>
            <strong>Events:</strong>
            {events.length === 0 ? (
              <span style={{ marginLeft: "8px", color: "#999" }}>No events yet</span>
            ) : (
              <ul style={{ margin: "4px 0 0 20px", padding: 0 }}>
                {events.map((event, i) => (
                  <li key={i}>{event}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  },
};

export const KeyboardControls: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ fontSize: "14px" }}>
        <strong>Keyboard shortcuts:</strong>
        <ul style={{ margin: "8px 0 0 20px", padding: 0 }}>
          <li>Space/K - Play/Pause</li>
          <li>M - Mute/Unmute</li>
          <li>F - Fullscreen</li>
          <li>← - Rewind 10s</li>
          <li>→ - Forward 10s</li>
        </ul>
      </div>
      <VideoPlayer
        src={sampleVideo}
        poster={samplePoster}
      />
    </div>
  ),
};

export const Loop: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <p style={{ fontSize: "14px" }}>Video will loop continuously</p>
      <VideoPlayer
        src={sampleVideo}
        poster={samplePoster}
        loop
        muted
      />
    </div>
  ),
};
