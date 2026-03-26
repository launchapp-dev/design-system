import { Button } from "@launchapp/design-system";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">{{projectName}}</h1>
            <div className="flex gap-4">
              <Link href="/login">
                <Button variant="outline">Sign Out</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-6 bg-card rounded-lg border border-border"
                >
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Metric {i}
                  </h3>
                  <p className="text-2xl font-bold mt-2 text-foreground">
                    {Math.floor(Math.random() * 1000)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              Getting Started
            </h2>
            <div className="bg-card p-6 rounded-lg border border-border">
              <p className="text-foreground mb-4">
                Welcome to your {{projectName}} dashboard! This is a complete SaaS
                application scaffold built with the LaunchApp design system.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>✓ Responsive design with Tailwind CSS</p>
                <p>✓ Pre-integrated LaunchApp design system components</p>
                <p>✓ Dark mode support</p>
                <p>✓ Authentication flow example</p>
                <p>✓ Production-ready structure</p>
              </div>
              <div className="mt-6">
                <Link
                  href="https://github.com/launchapp-dev/design-system"
                  target="_blank"
                >
                  <Button>View Documentation</Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
