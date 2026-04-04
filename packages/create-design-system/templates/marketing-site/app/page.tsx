import { Button, Card } from "@launchapp/design-system";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">{{ projectName }}</h1>
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
            Welcome to {{ projectName }}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Build amazing products faster with the LaunchApp Design System.
            Everything you need to create beautiful, accessible interfaces.
          </p>
          <div className="flex gap-4 justify-center pt-8">
            <Button variant="default" size="lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="p-8 text-center space-y-4">
            <div className="text-4xl font-bold text-primary">40+</div>
            <h3 className="font-semibold text-lg">Components</h3>
            <p className="text-muted-foreground">
              Pre-built, accessible components ready to use in your projects.
            </p>
          </Card>

          <Card className="p-8 text-center space-y-4">
            <div className="text-4xl font-bold text-primary">100%</div>
            <h3 className="font-semibold text-lg">Type Safe</h3>
            <p className="text-muted-foreground">
              Built with TypeScript for maximum type safety and developer
              experience.
            </p>
          </Card>

          <Card className="p-8 text-center space-y-4">
            <div className="text-4xl font-bold text-primary">♿</div>
            <h3 className="font-semibold text-lg">Accessible</h3>
            <p className="text-muted-foreground">
              WCAG 2.1 compliant with full keyboard navigation support.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-card border-t py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl font-bold">
            Ready to build something amazing?
          </h2>
          <p className="text-lg text-muted-foreground">
            Start building with {{ projectName }} today and create beautiful
            interfaces.
          </p>
          <Button variant="default" size="lg">
            Start Building
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; 2024 {{ projectName }}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
