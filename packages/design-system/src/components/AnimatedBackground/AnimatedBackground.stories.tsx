import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Particles, Stars, MatrixRain, NoiseTexture, AnimatedGrid } from "./index";

const meta: Meta = {
  title: "Components/AnimatedBackground",
};

export default meta;

export const ParticlesStory: StoryObj = {
  name: "Particles",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Default particles</p>
        <div style={{ height: "200px", borderRadius: "8px", border: "1px solid hsl(var(--la-border))" }}>
          <Particles />
        </div>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Custom color (blue)</p>
        <div style={{ height: "200px", borderRadius: "8px", border: "1px solid hsl(var(--la-border))" }}>
          <Particles color="#3b82f6" count={30} size={3} maxSize={6} />
        </div>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Slow particles</p>
        <div style={{ height: "200px", borderRadius: "8px", border: "1px solid hsl(var(--la-border))" }}>
          <Particles speed={0.5} count={20} />
        </div>
      </div>
    </div>
  ),
};

export const StarsStory: StoryObj = {
  name: "Stars",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Default stars</p>
        <div style={{ height: "300px", borderRadius: "8px", overflow: "hidden" }}>
          <Stars />
        </div>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Many stars</p>
        <div style={{ height: "300px", borderRadius: "8px", overflow: "hidden" }}>
          <Stars count={200} minSize={1} maxSize={2} />
        </div>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Large stars</p>
        <div style={{ height: "300px", borderRadius: "8px", overflow: "hidden" }}>
          <Stars count={50} minSize={2} maxSize={5} />
        </div>
      </div>
    </div>
  ),
};

export const MatrixRainStory: StoryObj = {
  name: "MatrixRain",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Default Matrix rain</p>
        <div style={{ height: "300px", borderRadius: "8px", overflow: "hidden" }}>
          <MatrixRain />
        </div>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Custom characters</p>
        <div style={{ height: "300px", borderRadius: "8px", overflow: "hidden" }}>
          <MatrixRain characters="01アイウエオ" fontSize={16} />
        </div>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Few columns, slow</p>
        <div style={{ height: "300px", borderRadius: "8px", overflow: "hidden" }}>
          <MatrixRain columns={15} speed={200} />
        </div>
      </div>
    </div>
  ),
};

export const NoiseTextureStory: StoryObj = {
  name: "NoiseTexture",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Default noise</p>
        <div
          style={{
            height: "200px",
            borderRadius: "8px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <NoiseTexture opacity={0.3} />
        </div>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Low opacity</p>
        <div
          style={{
            height: "200px",
            borderRadius: "8px",
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <NoiseTexture opacity={0.15} />
        </div>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>High opacity</p>
        <div
          style={{
            height: "200px",
            borderRadius: "8px",
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <NoiseTexture opacity={0.6} />
        </div>
      </div>
    </div>
  ),
};

export const AnimatedGridStory: StoryObj = {
  name: "AnimatedGrid",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Default animated grid</p>
        <div
          style={{
            height: "300px",
            borderRadius: "8px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <AnimatedGrid />
        </div>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Large cells</p>
        <div
          style={{
            height: "300px",
            borderRadius: "8px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <AnimatedGrid cellSize={80} />
        </div>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Slow animation</p>
        <div
          style={{
            height: "300px",
            borderRadius: "8px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <AnimatedGrid animationSpeed={6} />
        </div>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Static grid</p>
        <div
          style={{
            height: "300px",
            borderRadius: "8px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <AnimatedGrid animated={false} />
        </div>
      </div>
    </div>
  ),
};

export const AllAnimatedBackgrounds: StoryObj = {
  name: "All Animated Backgrounds",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px", padding: "24px" }}>
      <section>
        <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}>
          Particles
        </h3>
        <div style={{ height: "200px", borderRadius: "8px", overflow: "hidden", border: "1px solid hsl(var(--la-border))" }}>
          <Particles count={40} />
        </div>
      </section>
      <section>
        <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}>
          Stars
        </h3>
        <div style={{ height: "200px", borderRadius: "8px", overflow: "hidden" }}>
          <Stars count={100} />
        </div>
      </section>
      <section>
        <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}>
          Matrix Rain
        </h3>
        <div style={{ height: "200px", borderRadius: "8px", overflow: "hidden" }}>
          <MatrixRain columns={20} speed={150} />
        </div>
      </section>
      <section>
        <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}>
          Noise Texture
        </h3>
        <div
          style={{
            height: "200px",
            borderRadius: "8px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <NoiseTexture opacity={0.3} />
        </div>
      </section>
      <section>
        <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}>
          Animated Grid
        </h3>
        <div style={{ height: "200px", borderRadius: "8px", overflow: "hidden" }}>
          <AnimatedGrid />
        </div>
      </section>
    </div>
  ),
};
