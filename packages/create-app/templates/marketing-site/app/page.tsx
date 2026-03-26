import { Button } from "@launchapp/design-system";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">{{projectName}}</h1>
            <nav className="hidden md:flex gap-8">
              <Link href="#features" className="text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link href="#pricing" className="text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link href="#testimonials" className="text-muted-foreground hover:text-foreground">
                Testimonials
              </Link>
            </nav>
            <Link href="#cta">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center space-y-6">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
            Build Your Success With {{projectName}}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A modern platform designed to help you achieve more. Fast, reliable, and built with cutting-edge technology.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="#cta">
              <Button size="lg">Start for Free</Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg">Learn More</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
          Powerful Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Lightning Fast",
              description: "Optimized for performance with instant load times",
            },
            {
              title: "Secure",
              description: "Enterprise-grade security and data protection",
            },
            {
              title: "Scalable",
              description: "Grows with your business from startup to enterprise",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow"
            >
              <h4 className="text-lg font-semibold mb-2 text-foreground">
                {feature.title}
              </h4>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
          Simple Pricing
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { plan: "Starter", price: "$29", features: ["Up to 100 users", "5GB storage", "Email support"] },
            { plan: "Pro", price: "$79", features: ["Unlimited users", "100GB storage", "Priority support"] },
            { plan: "Enterprise", price: "Custom", features: ["Custom features", "Unlimited storage", "24/7 support"] },
          ].map((tier, i) => (
            <div
              key={i}
              className="p-8 rounded-lg border border-border bg-card text-center"
            >
              <h4 className="text-xl font-semibold mb-2 text-foreground">
                {tier.plan}
              </h4>
              <p className="text-3xl font-bold mb-6 text-primary">
                {tier.price}
              </p>
              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, j) => (
                  <li key={j} className="text-muted-foreground">
                    ✓ {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full">Choose Plan</Button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="cta"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center"
      >
        <div className="p-12 rounded-lg bg-primary/5 border border-primary/20">
          <h3 className="text-3xl font-bold mb-4 text-foreground">
            Ready to Get Started?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Join thousands of users who are already building with {{projectName}}
          </p>
          <Button size="lg">Start Your Free Trial</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="font-semibold text-foreground mb-4">Product</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Features</Link></li>
                <li><Link href="#" className="hover:text-foreground">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-4">Company</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">About</Link></li>
                <li><Link href="#" className="hover:text-foreground">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-4">Legal</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Privacy</Link></li>
                <li><Link href="#" className="hover:text-foreground">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-4">Contact</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Support</Link></li>
                <li><Link href="#" className="hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 {{projectName}}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
