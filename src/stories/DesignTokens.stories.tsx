import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta: Meta = {
  title: "Design System/Tokens",
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj;

const colorTokens = [
  {
    group: "Background",
    tokens: [
      { name: "--la-background", light: "0 0% 100%", dark: "240 10% 3.9%" },
      { name: "--la-foreground", light: "240 10% 3.9%", dark: "0 0% 98%" },
    ],
  },
  {
    group: "Card",
    tokens: [
      { name: "--la-card", light: "0 0% 100%", dark: "240 10% 3.9%" },
      { name: "--la-card-foreground", light: "240 10% 3.9%", dark: "0 0% 98%" },
    ],
  },
  {
    group: "Popover",
    tokens: [
      { name: "--la-popover", light: "0 0% 100%", dark: "240 10% 3.9%" },
      { name: "--la-popover-foreground", light: "240 10% 3.9%", dark: "0 0% 98%" },
    ],
  },
  {
    group: "Primary",
    tokens: [
      { name: "--la-primary", light: "262 83% 58%", dark: "263 70% 50%" },
      { name: "--la-primary-foreground", light: "0 0% 98%", dark: "0 0% 98%" },
    ],
  },
  {
    group: "Secondary",
    tokens: [
      { name: "--la-secondary", light: "240 4.8% 95.9%", dark: "240 3.7% 15.9%" },
      { name: "--la-secondary-foreground", light: "240 5.9% 10%", dark: "0 0% 98%" },
    ],
  },
  {
    group: "Muted",
    tokens: [
      { name: "--la-muted", light: "240 4.8% 95.9%", dark: "240 3.7% 15.9%" },
      { name: "--la-muted-foreground", light: "240 3.8% 46.1%", dark: "240 5% 64.9%" },
    ],
  },
  {
    group: "Accent",
    tokens: [
      { name: "--la-accent", light: "240 4.8% 95.9%", dark: "240 3.7% 15.9%" },
      { name: "--la-accent-foreground", light: "240 5.9% 10%", dark: "0 0% 98%" },
    ],
  },
  {
    group: "Destructive",
    tokens: [
      { name: "--la-destructive", light: "0 84.2% 60.2%", dark: "0 62.8% 30.6%" },
      { name: "--la-destructive-foreground", light: "0 0% 98%", dark: "0 0% 98%" },
    ],
  },
  {
    group: "Border / Input / Ring",
    tokens: [
      { name: "--la-border", light: "240 5.9% 90%", dark: "240 3.7% 15.9%" },
      { name: "--la-input", light: "240 5.9% 90%", dark: "240 3.7% 15.9%" },
      { name: "--la-ring", light: "262 83% 58%", dark: "263 70% 50%" },
    ],
  },
];

const chartTokens = [
  { name: "--la-chart-1", light: "262 83% 58%", dark: "263 70% 65%" },
  { name: "--la-chart-2", light: "200 80% 50%", dark: "200 75% 60%" },
  { name: "--la-chart-3", light: "150 60% 45%", dark: "150 55% 55%" },
  { name: "--la-chart-4", light: "30 90% 55%", dark: "30 85% 65%" },
  { name: "--la-chart-5", light: "350 80% 55%", dark: "350 75% 65%" },
];

function ColorSwatch({ hsl, label }: { hsl: string; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 8,
          background: `hsl(${hsl})`,
          border: "1px solid rgba(0,0,0,0.1)",
          flexShrink: 0,
        }}
      />
      <span
        style={{ fontSize: 10, color: "var(--la-muted-foreground, #888)", textAlign: "center" }}
      >
        {label}
      </span>
    </div>
  );
}

function TokenRow({ name, light, dark }: { name: string; light: string; dark: string }) {
  return (
    <tr style={{ borderBottom: "1px solid hsl(var(--la-border, 240 5.9% 90%))" }}>
      <td style={{ padding: "10px 12px", fontFamily: "monospace", fontSize: 13 }}>{name}</td>
      <td style={{ padding: "10px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <ColorSwatch hsl={light} label="Light" />
          <span style={{ fontSize: 12, fontFamily: "monospace", color: "hsl(240 3.8% 46.1%)" }}>
            {light}
          </span>
        </div>
      </td>
      <td style={{ padding: "10px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <ColorSwatch hsl={dark} label="Dark" />
          <span style={{ fontSize: 12, fontFamily: "monospace", color: "hsl(240 3.8% 46.1%)" }}>
            {dark}
          </span>
        </div>
      </td>
    </tr>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: 18,
        fontWeight: 600,
        margin: "32px 0 12px",
        paddingBottom: 8,
        borderBottom: "2px solid hsl(var(--la-border, 240 5.9% 90%))",
        color: "hsl(var(--la-foreground, 240 10% 3.9%))",
      }}
    >
      {children}
    </h2>
  );
}

function GroupHeading({ children }: { children: React.ReactNode }) {
  return (
    <tr>
      <td
        colSpan={3}
        style={{
          padding: "16px 12px 6px",
          fontSize: 12,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "hsl(var(--la-muted-foreground, 240 3.8% 46.1%))",
          background: "hsl(var(--la-muted, 240 4.8% 95.9%) / 0.4)",
        }}
      >
        {children}
      </td>
    </tr>
  );
}

function TokenTable() {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "auto" }}>
      <thead>
        <tr style={{ background: "hsl(var(--la-muted, 240 4.8% 95.9%))" }}>
          <th style={{ padding: "10px 12px", textAlign: "left", fontSize: 13, fontWeight: 600 }}>
            Token
          </th>
          <th style={{ padding: "10px 12px", textAlign: "left", fontSize: 13, fontWeight: 600 }}>
            Light
          </th>
          <th style={{ padding: "10px 12px", textAlign: "left", fontSize: 13, fontWeight: 600 }}>
            Dark
          </th>
        </tr>
      </thead>
      <tbody>
        {colorTokens.map((group) => (
          <React.Fragment key={group.group}>
            <GroupHeading>{group.group}</GroupHeading>
            {group.tokens.map((token) => (
              <TokenRow key={token.name} {...token} />
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export const ColorTokens: Story = {
  name: "Color Tokens",
  render: () => (
    <div style={{ maxWidth: 900, fontFamily: "var(--la-font-sans, Inter, sans-serif)" }}>
      <h1
        style={{
          fontSize: 28,
          fontWeight: 700,
          marginBottom: 4,
          color: "hsl(var(--la-foreground, 240 10% 3.9%))",
        }}
      >
        Design Tokens
      </h1>
      <p
        style={{
          fontSize: 14,
          color: "hsl(var(--la-muted-foreground, 240 3.8% 46.1%))",
          marginBottom: 24,
        }}
      >
        All CSS custom properties used in the design system. Values are HSL components consumed as{" "}
        <code style={{ fontFamily: "monospace", fontSize: 13 }}>hsl(var(--la-token))</code>.
      </p>
      <SectionHeading>Color Tokens</SectionHeading>
      <TokenTable />
    </div>
  ),
};

export const ChartTokens: Story = {
  name: "Chart Tokens",
  render: () => (
    <div style={{ maxWidth: 900, fontFamily: "var(--la-font-sans, Inter, sans-serif)" }}>
      <SectionHeading>Chart Color Tokens</SectionHeading>
      <p
        style={{
          fontSize: 14,
          color: "hsl(var(--la-muted-foreground, 240 3.8% 46.1%))",
          marginBottom: 16,
        }}
      >
        Semantic palette for data visualizations.
      </p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "hsl(var(--la-muted, 240 4.8% 95.9%))" }}>
            <th style={{ padding: "10px 12px", textAlign: "left", fontSize: 13, fontWeight: 600 }}>
              Token
            </th>
            <th style={{ padding: "10px 12px", textAlign: "left", fontSize: 13, fontWeight: 600 }}>
              Light
            </th>
            <th style={{ padding: "10px 12px", textAlign: "left", fontSize: 13, fontWeight: 600 }}>
              Dark
            </th>
          </tr>
        </thead>
        <tbody>
          {chartTokens.map((token) => (
            <TokenRow key={token.name} {...token} />
          ))}
        </tbody>
      </table>
    </div>
  ),
};

export const RadiusAndTypography: Story = {
  name: "Radius & Typography Tokens",
  render: () => (
    <div style={{ maxWidth: 900, fontFamily: "var(--la-font-sans, Inter, sans-serif)" }}>
      <SectionHeading>Radius Token</SectionHeading>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 32 }}>
        <thead>
          <tr style={{ background: "hsl(var(--la-muted, 240 4.8% 95.9%))" }}>
            <th style={{ padding: "10px 12px", textAlign: "left", fontSize: 13, fontWeight: 600 }}>
              Token
            </th>
            <th style={{ padding: "10px 12px", textAlign: "left", fontSize: 13, fontWeight: 600 }}>
              Value
            </th>
            <th style={{ padding: "10px 12px", textAlign: "left", fontSize: 13, fontWeight: 600 }}>
              Preview
            </th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: "1px solid hsl(var(--la-border, 240 5.9% 90%))" }}>
            <td style={{ padding: "10px 12px", fontFamily: "monospace", fontSize: 13 }}>
              --la-radius
            </td>
            <td style={{ padding: "10px 12px", fontFamily: "monospace", fontSize: 13 }}>0.5rem</td>
            <td style={{ padding: "10px 12px" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div
                  style={{
                    width: 48,
                    height: 32,
                    background: "hsl(var(--la-primary, 262 83% 58%))",
                    borderRadius: "calc(var(--la-radius, 0.5rem) - 2px)",
                  }}
                />
                <div
                  style={{
                    width: 48,
                    height: 32,
                    background: "hsl(var(--la-primary, 262 83% 58%))",
                    borderRadius: "var(--la-radius, 0.5rem)",
                  }}
                />
                <div
                  style={{
                    width: 48,
                    height: 32,
                    background: "hsl(var(--la-primary, 262 83% 58%))",
                    borderRadius: "calc(var(--la-radius, 0.5rem) + 2px)",
                  }}
                />
                <span style={{ fontSize: 11, color: "hsl(240 3.8% 46.1%)" }}>sm / md / lg</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <SectionHeading>Typography Tokens</SectionHeading>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "hsl(var(--la-muted, 240 4.8% 95.9%))" }}>
            <th style={{ padding: "10px 12px", textAlign: "left", fontSize: 13, fontWeight: 600 }}>
              Token
            </th>
            <th style={{ padding: "10px 12px", textAlign: "left", fontSize: 13, fontWeight: 600 }}>
              Value
            </th>
            <th style={{ padding: "10px 12px", textAlign: "left", fontSize: 13, fontWeight: 600 }}>
              Preview
            </th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: "--la-font-sans", value: '"Inter"' },
            { name: "--la-font-mono", value: '"JetBrains Mono"' },
          ].map(({ name, value }) => (
            <tr
              key={name}
              style={{ borderBottom: "1px solid hsl(var(--la-border, 240 5.9% 90%))" }}
            >
              <td style={{ padding: "10px 12px", fontFamily: "monospace", fontSize: 13 }}>
                {name}
              </td>
              <td style={{ padding: "10px 12px", fontFamily: "monospace", fontSize: 13 }}>
                {value}
              </td>
              <td style={{ padding: "10px 12px", fontFamily: value, fontSize: 14 }}>
                The quick brown fox jumps over the lazy dog
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};

export const CustomThemingExample: Story = {
  name: "Custom Theming Example",
  render: () => (
    <div style={{ maxWidth: 900, fontFamily: "var(--la-font-sans, Inter, sans-serif)" }}>
      <SectionHeading>Custom Theming</SectionHeading>
      <p
        style={{
          fontSize: 14,
          color: "hsl(var(--la-muted-foreground, 240 3.8% 46.1%))",
          marginBottom: 16,
        }}
      >
        Override tokens in your application&apos;s CSS to brand the design system without modifying
        any component code.
      </p>

      <pre
        style={{
          background: "hsl(240 10% 3.9%)",
          color: "hsl(0 0% 98%)",
          borderRadius: "var(--la-radius, 0.5rem)",
          padding: 24,
          fontSize: 13,
          lineHeight: 1.7,
          overflowX: "auto",
          marginBottom: 24,
        }}
      >
        {`/* globals.css – brand override example */
:root {
  /* Change primary to a blue brand color */
  --la-primary: 217 91% 60%;
  --la-primary-foreground: 0 0% 100%;

  /* Adjust border radius for a sharper look */
  --la-radius: 0.25rem;

  /* Custom accent */
  --la-accent: 217 91% 95%;
  --la-accent-foreground: 217 91% 20%;
}

.dark {
  --la-primary: 217 91% 70%;
  --la-primary-foreground: 0 0% 100%;
}`}
      </pre>

      <p
        style={{
          fontSize: 13,
          color: "hsl(var(--la-muted-foreground, 240 3.8% 46.1%))",
          marginBottom: 8,
        }}
      >
        Live preview with blue brand tokens applied:
      </p>

      <div
        style={
          {
            "--la-primary": "217 91% 60%",
            "--la-primary-foreground": "0 0% 100%",
            "--la-radius": "0.25rem",
            "--la-accent": "217 91% 95%",
            "--la-accent-foreground": "217 91% 20%",
            padding: 24,
            border: "1px solid hsl(var(--la-border, 240 5.9% 90%))",
            borderRadius: 8,
            display: "flex",
            gap: 12,
            alignItems: "center",
            flexWrap: "wrap",
          } as React.CSSProperties
        }
      >
        <button
          style={{
            padding: "8px 16px",
            background: "hsl(var(--la-primary, 262 83% 58%))",
            color: "hsl(var(--la-primary-foreground, 0 0% 98%))",
            border: "none",
            borderRadius: "var(--la-radius, 0.5rem)",
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          Primary Button
        </button>
        <button
          style={{
            padding: "8px 16px",
            background: "hsl(var(--la-accent, 240 4.8% 95.9%))",
            color: "hsl(var(--la-accent-foreground, 240 5.9% 10%))",
            border: "1px solid hsl(var(--la-border, 240 5.9% 90%))",
            borderRadius: "var(--la-radius, 0.5rem)",
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          Accent Button
        </button>
        <div style={{ display: "flex", gap: 8 }}>
          {["217 91% 60%", "217 91% 70%", "217 91% 80%", "217 91% 90%"].map((hsl) => (
            <div
              key={hsl}
              style={{
                width: 32,
                height: 32,
                borderRadius: "var(--la-radius, 0.5rem)",
                background: `hsl(${hsl})`,
                border: "1px solid rgba(0,0,0,0.1)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  ),
};

export const AllSwatches: Story = {
  name: "All Swatches",
  render: () => (
    <div style={{ maxWidth: 900, fontFamily: "var(--la-font-sans, Inter, sans-serif)" }}>
      <SectionHeading>All Color Swatches</SectionHeading>
      <p
        style={{
          fontSize: 14,
          color: "hsl(var(--la-muted-foreground, 240 3.8% 46.1%))",
          marginBottom: 24,
        }}
      >
        Visual overview of all tokens in both light and dark mode values.
      </p>
      {colorTokens.map((group) => (
        <div key={group.group} style={{ marginBottom: 24 }}>
          <h3
            style={{
              fontSize: 13,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "hsl(var(--la-muted-foreground, 240 3.8% 46.1%))",
              marginBottom: 10,
            }}
          >
            {group.group}
          </h3>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {group.tokens.map((token) => (
              <div key={token.name} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", gap: 8 }}>
                  <ColorSwatch hsl={token.light} label="Light" />
                  <ColorSwatch hsl={token.dark} label="Dark" />
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontFamily: "monospace",
                    color: "hsl(var(--la-foreground, 240 10% 3.9%))",
                  }}
                >
                  {token.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ marginBottom: 24 }}>
        <h3
          style={{
            fontSize: 13,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "hsl(var(--la-muted-foreground, 240 3.8% 46.1%))",
            marginBottom: 10,
          }}
        >
          Chart Colors
        </h3>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {chartTokens.map((token) => (
            <div key={token.name} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <ColorSwatch hsl={token.light} label="Light" />
                <ColorSwatch hsl={token.dark} label="Dark" />
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: "monospace",
                  color: "hsl(var(--la-foreground, 240 10% 3.9%))",
                }}
              >
                {token.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
