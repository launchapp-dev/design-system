import { Button } from "@launchapp/design-system";

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="space-y-8 text-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to {{ projectName }}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Built with the LaunchApp Design System
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button variant="default">Get Started</Button>
          <Button variant="outline">Learn More</Button>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 text-card-foreground">
            <h3 className="font-semibold">Component Library</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Access 40+ pre-built components from the design system.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 text-card-foreground">
            <h3 className="font-semibold">Dark Mode Ready</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Built-in support for light and dark themes.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 text-card-foreground">
            <h3 className="font-semibold">Fully Accessible</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              WCAG 2.1 compliant components with keyboard navigation.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
