import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { PageTransition, RouteTransition, MorphTransition } from "./index";

const meta: Meta = {
  title: "Components/PageTransition",
};
export default meta;

export const FadeTransition: StoryObj = {
  name: "Fade Transition",
  render: () => {
    const [show, setShow] = React.useState(true);
    return (
      <div style={{ padding: 24 }}>
        <button
          onClick={() => setShow((s) => !s)}
          style={{
            padding: "8px 16px",
            background: "hsl(var(--la-primary))",
            color: "white",
            border: "none",
            borderRadius: "var(--la-radius)",
            cursor: "pointer",
            marginBottom: 16,
          }}
        >
          {show ? "Hide" : "Show"}
        </button>
        <PageTransition
          variant="fade"
          show={show}
          style={{
            padding: 32,
            background: "hsl(var(--la-card))",
            border: "1px solid hsl(var(--la-border))",
            borderRadius: "var(--la-radius)",
          }}
        >
          <p style={{ fontWeight: 600 }}>Fade Transition</p>
          <p style={{ fontSize: 14, opacity: 0.6, marginTop: 4 }}>Content fades in and out</p>
        </PageTransition>
      </div>
    );
  },
};

export const SlideTransition: StoryObj = {
  name: "Slide Transition",
  render: () => {
    const [show, setShow] = React.useState(true);
    return (
      <div style={{ padding: 24 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {(["up", "down", "left", "right"] as const).map((dir) => (
            <button
              key={dir}
              onClick={() => setShow((s) => !s)}
              style={{
                padding: "6px 12px",
                background: "hsl(var(--la-secondary))",
                border: "1px solid hsl(var(--la-border))",
                borderRadius: "var(--la-radius)",
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              {show ? "Hide" : `Show (${dir})`}
            </button>
          ))}
        </div>
        {(["up", "down", "left", "right"] as const).map((dir) => (
          <div key={dir} style={{ marginBottom: 16 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 500,
                marginBottom: 8,
                textTransform: "capitalize",
              }}
            >
              Direction: {dir}
            </p>
            <PageTransition
              variant="slide"
              direction={dir}
              show={show}
              style={{
                padding: 24,
                background: "hsl(var(--la-card))",
                border: "1px solid hsl(var(--la-border))",
                borderRadius: "var(--la-radius)",
              }}
            >
              <p style={{ fontWeight: 600 }}>Slide {dir}</p>
              <p style={{ fontSize: 14, opacity: 0.6 }}>Content slides from {dir}</p>
            </PageTransition>
          </div>
        ))}
      </div>
    );
  },
};

export const ScaleTransition: StoryObj = {
  name: "Scale Transition",
  render: () => {
    const [show, setShow] = React.useState(true);
    return (
      <div style={{ padding: 24 }}>
        <button
          onClick={() => setShow((s) => !s)}
          style={{
            padding: "8px 16px",
            background: "hsl(var(--la-primary))",
            color: "white",
            border: "none",
            borderRadius: "var(--la-radius)",
            cursor: "pointer",
            marginBottom: 16,
          }}
        >
          {show ? "Hide" : "Show"}
        </button>
        <PageTransition
          variant="scale"
          show={show}
          style={{
            padding: 32,
            background: "hsl(var(--la-card))",
            border: "1px solid hsl(var(--la-border))",
            borderRadius: "var(--la-radius)",
          }}
        >
          <p style={{ fontWeight: 600 }}>Scale Transition</p>
          <p style={{ fontSize: 14, opacity: 0.6, marginTop: 4 }}>Content scales in and out</p>
        </PageTransition>
      </div>
    );
  },
};

export const MorphTransitionStory: StoryObj = {
  name: "Morph Transition",
  render: () => {
    const [isActive, setIsActive] = React.useState(false);
    return (
      <div style={{ padding: 24 }}>
        <button
          onClick={() => setIsActive((s) => !s)}
          style={{
            padding: "8px 16px",
            background: "hsl(var(--la-primary))",
            color: "white",
            border: "none",
            borderRadius: "var(--la-radius)",
            cursor: "pointer",
            marginBottom: 16,
          }}
        >
          {isActive ? "Show Card 1" : "Show Card 2"}
        </button>
        <MorphTransition
          isActive={isActive}
          style={{
            padding: 32,
            background: isActive ? "hsl(var(--la-primary))" : "hsl(var(--la-card))",
            color: isActive
              ? "hsl(var(--la-primary-foreground))"
              : "hsl(var(--la-card-foreground))",
            border: "1px solid hsl(var(--la-border))",
            borderRadius: "var(--la-radius)",
          }}
        >
          <p style={{ fontWeight: 600 }}>{isActive ? "Card 2" : "Card 1"}</p>
          <p style={{ fontSize: 14, opacity: 0.8, marginTop: 4 }}>
            {isActive ? "Morphing to second content" : "Click to morph to other content"}
          </p>
        </MorphTransition>
      </div>
    );
  },
};

export const RouteTransitionStory: StoryObj = {
  name: "Route Transition",
  render: () => {
    const [route, setRoute] = React.useState("home");

    const routes = [
      {
        path: "home",
        element: (
          <div
            style={{
              padding: 24,
              background: "hsl(var(--la-card))",
              border: "1px solid hsl(var(--la-border))",
              borderRadius: "var(--la-radius)",
            }}
          >
            <p style={{ fontSize: 24, fontWeight: 700 }}>Home Page</p>
            <p style={{ fontSize: 14, opacity: 0.6, marginTop: 8 }}>Welcome to the app</p>
          </div>
        ),
      },
      {
        path: "about",
        element: (
          <div
            style={{
              padding: 24,
              background: "hsl(var(--la-card))",
              border: "1px solid hsl(var(--la-border))",
              borderRadius: "var(--la-radius)",
            }}
          >
            <p style={{ fontSize: 24, fontWeight: 700 }}>About Page</p>
            <p style={{ fontSize: 14, opacity: 0.6, marginTop: 8 }}>Learn more about us</p>
          </div>
        ),
      },
      {
        path: "contact",
        element: (
          <div
            style={{
              padding: 24,
              background: "hsl(var(--la-card))",
              border: "1px solid hsl(var(--la-border))",
              borderRadius: "var(--la-radius)",
            }}
          >
            <p style={{ fontSize: 24, fontWeight: 700 }}>Contact Page</p>
            <p style={{ fontSize: 14, opacity: 0.6, marginTop: 8 }}>Get in touch</p>
          </div>
        ),
      },
    ];

    return (
      <div style={{ padding: 24 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {routes.map((r) => (
            <button
              key={r.path}
              onClick={() => setRoute(r.path)}
              style={{
                padding: "6px 12px",
                background:
                  route === r.path ? "hsl(var(--la-primary))" : "hsl(var(--la-secondary))",
                color: route === r.path ? "white" : "inherit",
                border: "1px solid hsl(var(--la-border))",
                borderRadius: "var(--la-radius)",
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {r.path}
            </button>
          ))}
        </div>
        <RouteTransition activeRoute={route} routes={routes} variant="slide" direction="right" />
      </div>
    );
  },
};

export const AllTransitions: StoryObj = {
  name: "All Transitions",
  render: () => {
    const [activeTab, setActiveTab] = React.useState(0);
    const tabs = [
      {
        label: "Fade",
        component: (
          <PageTransition variant="fade" show>
            <div style={cardStyle}>
              <p style={{ fontWeight: 600 }}>Fade</p>
              <p style={{ fontSize: 12, opacity: 0.6 }}>Opacity transition</p>
            </div>
          </PageTransition>
        ),
      },
      {
        label: "Slide",
        component: (
          <PageTransition variant="slide" direction="up" show>
            <div style={cardStyle}>
              <p style={{ fontWeight: 600 }}>Slide</p>
              <p style={{ fontSize: 12, opacity: 0.6 }}>Movement transition</p>
            </div>
          </PageTransition>
        ),
      },
      {
        label: "Scale",
        component: (
          <PageTransition variant="scale" show>
            <div style={cardStyle}>
              <p style={{ fontWeight: 600 }}>Scale</p>
              <p style={{ fontSize: 12, opacity: 0.6 }}>Size transition</p>
            </div>
          </PageTransition>
        ),
      },
    ];

    return (
      <div style={{ padding: 24 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              style={{
                padding: "6px 12px",
                background: activeTab === i ? "hsl(var(--la-primary))" : "hsl(var(--la-secondary))",
                color: activeTab === i ? "white" : "inherit",
                border: "1px solid hsl(var(--la-border))",
                borderRadius: "var(--la-radius)",
                cursor: "pointer",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {tabs[activeTab].component}
      </div>
    );
  },
};

const cardStyle: React.CSSProperties = {
  padding: 32,
  background: "hsl(var(--la-card))",
  border: "1px solid hsl(var(--la-border))",
  borderRadius: "var(--la-radius)",
};

export const ReducedMotion: StoryObj = {
  name: "Reduced Motion",
  render: () => {
    const [show, setShow] = React.useState(true);
    return (
      <div style={{ padding: 24 }}>
        <p style={{ marginBottom: 16, fontSize: 14, opacity: 0.6 }}>
          Enable &quot;prefers-reduced-motion&quot; in your OS settings to see instant transitions.
        </p>
        <button
          onClick={() => setShow((s) => !s)}
          style={{
            padding: "8px 16px",
            background: "hsl(var(--la-primary))",
            color: "white",
            border: "none",
            borderRadius: "var(--la-radius)",
            cursor: "pointer",
            marginBottom: 16,
          }}
        >
          {show ? "Hide" : "Show"}
        </button>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <PageTransition variant="fade" show={show} style={{ ...cardStyle, flex: "1 1 200px" }}>
            <p style={{ fontWeight: 600 }}>Fade (instant)</p>
          </PageTransition>
          <PageTransition variant="slide" show={show} style={{ ...cardStyle, flex: "1 1 200px" }}>
            <p style={{ fontWeight: 600 }}>Slide (instant)</p>
          </PageTransition>
          <PageTransition variant="scale" show={show} style={{ ...cardStyle, flex: "1 1 200px" }}>
            <p style={{ fontWeight: 600 }}>Scale (instant)</p>
          </PageTransition>
        </div>
      </div>
    );
  },
};
