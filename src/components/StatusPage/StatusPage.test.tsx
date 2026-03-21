import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { StatusPage } from "./StatusPage";
import type { StatusService } from "./StatusPage";

const SERVICES: StatusService[] = [
  { id: "api", name: "API", status: "operational" },
  { id: "web", name: "Web App", status: "degraded" },
];

describe("StatusPage", () => {
  it("renders the page title", () => {
    render(<StatusPage services={SERVICES} title="My Status Page" />);
    expect(screen.getByText("My Status Page")).toBeInTheDocument();
  });

  it("renders all service names", () => {
    render(<StatusPage services={SERVICES} />);
    expect(screen.getByText("API")).toBeInTheDocument();
    expect(screen.getByText("Web App")).toBeInTheDocument();
  });

  it("shows Operational badge for operational service", () => {
    render(<StatusPage services={[{ id: "api", name: "API", status: "operational" }]} />);
    expect(screen.getByText("Operational")).toBeInTheDocument();
  });

  it("shows Degraded Performance badge for degraded service", () => {
    render(<StatusPage services={[{ id: "api", name: "API", status: "degraded" }]} />);
    expect(screen.getByText("Degraded Performance")).toBeInTheDocument();
  });

  it("renders uptime history bars", () => {
    const services: StatusService[] = [
      {
        id: "api",
        name: "API",
        status: "operational",
        uptimeHistory: [
          { date: "2026-03-20", status: "operational" },
          { date: "2026-03-21", status: "degraded" },
        ],
      },
    ];
    const { container } = render(<StatusPage services={services} />);
    expect(container.querySelectorAll(".rounded-sm").length).toBeGreaterThan(0);
  });

  it("shows the lastUpdated text", () => {
    render(<StatusPage services={SERVICES} lastUpdated="March 21, 2026" />);
    expect(screen.getByText(/March 21, 2026/)).toBeInTheDocument();
  });

  it("renders overall status banner", () => {
    render(<StatusPage services={[{ id: "api", name: "API", status: "major_outage" }]} />);
    expect(screen.getByText(/Major Outage/)).toBeInTheDocument();
  });
});
