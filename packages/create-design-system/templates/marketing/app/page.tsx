import { Button } from "@launchapp/design-system";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold">{{projectName}}</div>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm">
                Features
              </Button>
              <Button variant="ghost" size="sm">
                Pricing
              </Button>
              <Button variant="ghost" size="sm">
                About
              </Button>
              <Button variant="default" size="sm">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto">
        <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Welcome to {{projectName}}
            </h1>
            <p className="text-xl text-muted-foreground">
              Build amazing products with our modern design system. Everything you need to create beautiful, accessible interfaces.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg">Get Started Free</Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Features</h2>
            <p className="text-muted-foreground text-lg">Everything you need to build modern web applications</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Component Library", description: "60+ accessible, customizable components ready to use" },
              { title: "Dark Mode Ready", description: "Built-in support for light and dark themes out of the box" },
              { title: "Production Ready", description: "Enterprise-grade quality with TypeScript and full test coverage" },
              { title: "Fully Accessible", description: "WCAG 2.1 AA compliant with keyboard navigation" },
              { title: "Highly Customizable", description: "Extensive theme and component variants for your brand" },
              { title: "Open Source", description: "MIT licensed with active community support" },
            ].map((feature) => (
              <div key={feature.title} className="p-6 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pricing</h2>
            <p className="text-muted-foreground text-lg">Simple, transparent pricing for every size team</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: "Starter", price: "Free", features: ["Up to 3 projects", "Community support", "Basic components"] },
              { name: "Pro", price: "$29", features: ["Unlimited projects", "Priority support", "All components", "Custom themes"], highlighted: true },
              { name: "Enterprise", price: "Custom", features: ["White-label", "Dedicated support", "Custom training", "SLA"] },
            ].map((plan) => (
              <div key={plan.name} className={`p-8 rounded-lg border ${plan.highlighted ? "border-primary bg-primary/5" : "bg-card"}`}>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold mb-6">
                  {plan.price}
                  {plan.price !== "Custom" && <span className="text-lg text-muted-foreground">/mo</span>}
                </p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="text-sm text-muted-foreground">
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
                <Button variant={plan.highlighted ? "default" : "outline"} className="w-full">
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { author: "Sarah Chen", role: "Founder @ StartupCo", quote: "This design system saved us months of development time." },
              { author: "Alex Rodriguez", role: "Lead Designer @ TechCorp", quote: "The accessibility features are unmatched in the market." },
              { author: "Jamie Park", role: "CTO @ Scale Inc", quote: "Best design system integration I've worked with." },
            ].map((testimonial) => (
              <div key={testimonial.author} className="p-6 rounded-lg border bg-card">
                <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t">
          <div className="bg-primary/10 rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of teams building amazing products with {{projectName}}.
            </p>
            <Button size="lg">Start Building Today</Button>
          </div>
        </section>
      </div>

      <footer className="border-t bg-card mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">© 2024 {{projectName}}. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Terms</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
