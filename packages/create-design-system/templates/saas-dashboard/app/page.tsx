import { Button, Card } from "@launchapp/design-system";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome to {{ projectName }}
          </h2>
          <p className="text-muted-foreground">
            Your SaaS application built with the LaunchApp Design System
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Total Users</h3>
            <p className="text-3xl font-bold">1,234</p>
            <p className="text-sm text-muted-foreground mt-2">
              +12% from last month
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-2">Revenue</h3>
            <p className="text-3xl font-bold">$12.5K</p>
            <p className="text-sm text-muted-foreground mt-2">
              +8% from last month
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-2">Engagement</h3>
            <p className="text-3xl font-bold">68%</p>
            <p className="text-sm text-muted-foreground mt-2">
              +5% from last month
            </p>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button variant="default">Get Started</Button>
          <Button variant="outline">View Documentation</Button>
        </div>
      </main>
    </div>
  );
}
