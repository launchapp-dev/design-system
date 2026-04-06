import { describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusPage } from "./StatusPage";
import type { StatusService } from "./StatusPage";

const OPERATIONAL: StatusService = { id: "api", name: "API", status: "operational" };

describe("StatusPage", () => {
  it("renders default title", () => {
    render(<StatusPage services={[OPERATIONAL]} />);
    expect(screen.getByRole("heading", { name: "System Status" })).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<StatusPage services={[OPERATIONAL]} title="My Status Page" />);
    expect(screen.getByRole("heading", { name: "My Status Page" })).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<StatusPage services={[OPERATIONAL]} description="Status info" />);
    expect(screen.getByText("Status info")).toBeInTheDocument();
  });

  it("does not render description when omitted", () => {
    render(<StatusPage services={[OPERATIONAL]} />);
    expect(screen.queryByText("Status info")).toBeNull();
  });

  it("renders all service names", () => {
    const services: StatusService[] = [
      { id: "api", name: "API", status: "operational" },
      { id: "web", name: "Web App", status: "degraded" },
    ];
    render(<StatusPage services={services} />);
    expect(screen.getByText("API")).toBeInTheDocument();
    expect(screen.getByText("Web App")).toBeInTheDocument();
  });

  it("renders service description when provided", () => {
    const services: StatusService[] = [
      { id: "api", name: "API", description: "REST API", status: "operational" },
    ];
    render(<StatusPage services={services} />);
    expect(screen.getByText("REST API")).toBeInTheDocument();
  });

  describe("CVA status variants — service badges", () => {
    it.each([
      ["operational", "Operational"],
      ["degraded", "Degraded Performance"],
      ["partial_outage", "Partial Outage"],
      ["major_outage", "Major Outage"],
      ["maintenance", "Under Maintenance"],
    ] as const)("renders %s badge label", (status, label) => {
      render(<StatusPage services={[{ id: "svc", name: "Service", status }]} />);
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    });
  });

  describe("overall status calculation", () => {
    it("shows operational banner when all services are up", () => {
      render(<StatusPage services={[OPERATIONAL]} />);
      expect(screen.getByText(/Operational — All Systems/)).toBeInTheDocument();
    });

    it("shows major_outage banner when one service has major outage", () => {
      const services: StatusService[] = [
        { id: "api", name: "API", status: "operational" },
        { id: "db", name: "DB", status: "major_outage" },
      ];
      render(<StatusPage services={services} />);
      expect(screen.getByText(/Major Outage — All Systems/)).toBeInTheDocument();
    });

    it("major_outage takes priority over degraded", () => {
      const services: StatusService[] = [
        { id: "a", name: "A", status: "degraded" },
        { id: "b", name: "B", status: "major_outage" },
      ];
      render(<StatusPage services={services} />);
      expect(screen.getByText(/Major Outage — All Systems/)).toBeInTheDocument();
    });

    it("shows maintenance banner when service is under maintenance", () => {
      render(<StatusPage services={[{ id: "svc", name: "Svc", status: "maintenance" }]} />);
      expect(screen.getByText(/Under Maintenance — All Systems/)).toBeInTheDocument();
    });
  });

  describe("uptime history", () => {
    it("renders uptime bars when uptimeHistory is provided", () => {
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

    it("shows computed uptime percentage", () => {
      const services: StatusService[] = [
        {
          id: "api",
          name: "API",
          status: "operational",
          uptimeHistory: [
            { date: "2026-03-20", status: "operational" },
            { date: "2026-03-21", status: "operational" },
          ],
        },
      ];
      render(<StatusPage services={services} />);
      expect(screen.getByText("100% uptime")).toBeInTheDocument();
    });

    it("prefers uptimePercentage prop over computed value", () => {
      const services: StatusService[] = [
        {
          id: "api",
          name: "API",
          status: "operational",
          uptimeHistory: [{ date: "2026-03-20", status: "degraded" }],
          uptimePercentage: 99.9,
        },
      ];
      render(<StatusPage services={services} />);
      expect(screen.getByText("99.9% uptime")).toBeInTheDocument();
    });
  });

  it("shows lastUpdated text", () => {
    render(<StatusPage services={[OPERATIONAL]} lastUpdated="March 21, 2026" />);
    expect(screen.getByText(/March 21, 2026/)).toBeInTheDocument();
  });

  describe("className merging", () => {
    it("merges custom className with base classes", () => {
      const { container } = render(
        <StatusPage services={[OPERATIONAL]} className="custom-class" />
      );
      expect(container.firstChild).toHaveClass("custom-class");
      expect(container.firstChild).toHaveClass("space-y-6");
    });
  });

  describe("HTML attribute forwarding", () => {
    it("forwards data attributes to root div", () => {
      render(<StatusPage services={[OPERATIONAL]} data-testid="status-page" />);
      expect(screen.getByTestId("status-page")).toBeInTheDocument();
    });
  });

  describe("dark mode", () => {
    afterEach(() => {
      document.documentElement.classList.remove("dark");
    });

    it("renders all status variants in dark mode context", () => {
      document.documentElement.classList.add("dark");
      const services: StatusService[] = [
        { id: "a", name: "A", status: "major_outage" },
        { id: "b", name: "B", status: "maintenance" },
      ];
      render(<StatusPage services={services} data-testid="dark-status" />);
      expect(screen.getByTestId("dark-status")).toBeInTheDocument();
    });
  });
});
