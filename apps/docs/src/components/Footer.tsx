import Link from "next/link";

const footerLinks = [
  {
    title: "Docs",
    links: [
      { href: "/docs", label: "Introduction" },
      { href: "/docs/installation", label: "Installation" },
      { href: "/docs/theming", label: "Theming" },
      { href: "/components", label: "Components" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "https://github.com/launchapp/design-system", label: "GitHub" },
      { href: "/changelog", label: "Changelog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-foreground"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">
                LA
              </div>
              <span>LaunchApp UI</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              A production-ready React component library with full accessibility
              and dark mode support.
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {group.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} LaunchApp. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with LaunchApp Design System
          </p>
        </div>
      </div>
    </footer>
  );
}
