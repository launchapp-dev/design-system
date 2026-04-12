import * as React from "react";
import Link from "next/link";

interface SidebarSection {
  title: string;
  links: Array<{ href: string; label: string }>;
}

const sidebarSections: SidebarSection[] = [
  {
    title: "Getting Started",
    links: [
      { href: "/docs", label: "Introduction" },
      { href: "/docs/installation", label: "Installation" },
      { href: "/docs/theming", label: "Theming" },
      { href: "/docs/dark-mode", label: "Dark Mode" },
      { href: "/docs/framework-wrappers", label: "Framework Wrappers" },
    ],
  },
  {
    title: "Components",
    links: [
      { href: "/components/button", label: "Button" },
      { href: "/components/card", label: "Card" },
      { href: "/components/badge", label: "Badge" },
      { href: "/components/input", label: "Input" },
      { href: "/components/select", label: "Select" },
      { href: "/components/dialog", label: "Dialog" },
      { href: "/components/tabs", label: "Tabs" },
      { href: "/components/accordion", label: "Accordion" },
      { href: "/components/toast", label: "Toast" },
      { href: "/components/tooltip", label: "Tooltip" },
      { href: "/components/dropdown-menu", label: "Dropdown Menu" },
      { href: "/components/navigation-menu", label: "Navigation Menu" },
    ],
  },
  {
    title: "Data Display",
    links: [
      { href: "/components/table", label: "Table" },
      { href: "/components/data-table", label: "Data Table" },
      { href: "/components/calendar", label: "Calendar" },
      { href: "/components/chart", label: "Chart" },
      { href: "/components/kpi-card", label: "KPI Card" },
    ],
  },
  {
    title: "Layout",
    links: [
      { href: "/components/separator", label: "Separator" },
      { href: "/components/scroll-area", label: "Scroll Area" },
      { href: "/components/resizable", label: "Resizable" },
      { href: "/components/sheet", label: "Sheet" },
    ],
  },
];

export function DocsSidebar() {
  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col gap-6 border-r border-border px-4 py-6">
      {sidebarSections.map((section) => (
        <div key={section.title}>
          <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {section.title}
          </h3>
          <ul className="space-y-0.5">
            {section.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
