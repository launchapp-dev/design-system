"use client";

import { Button } from "@launchapp/design-system/components/Button";
import { Card } from "@launchapp/design-system/components/Card";
import { Input } from "@launchapp/design-system/components/Input";
import React, { useState } from "react";

const features = [
  {
    title: "Built for Speed",
    description: "Lightning-fast performance with optimized components and smart caching strategies",
    icon: "⚡",
  },
  {
    title: "Fully Accessible",
    description: "WCAG 2.1 AA compliant with full keyboard navigation and screen reader support",
    icon: "♿",
  },
  {
    title: "Dark Mode Ready",
    description: "Beautiful dark mode support out of the box with theme customization",
    icon: "🌙",
  },
  {
    title: "TypeScript Native",
    description: "Full type safety and autocomplete for a better development experience",
    icon: "📘",
  },
  {
    title: "Responsive Design",
    description: "Mobile-first approach that works perfectly on all screen sizes",
    icon: "📱",
  },
  {
    title: "Easy Integration",
    description: "Drop-in components that integrate seamlessly with your existing projects",
    icon: "🔌",
  },
];

const testimonials = [
  {
    quote: "This design system saved us months of development time. The components are high quality and well-documented.",
    author: "Alex Johnson",
    role: "Lead Developer",
    company: "TechStart Inc",
  },
  {
    quote: "The accessibility features are incredible. We didn't have to compromise on design to meet compliance standards.",
    author: "Maria Garcia",
    role: "Product Designer",
    company: "InnovateCo",
  },
  {
    quote: "Great community and documentation. Every question we had was answered in the docs or by the community.",
    author: "James Chen",
    role: "Full Stack Engineer",
    company: "ScaleUp Labs",
  },
];

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for personal projects and learning",
    features: ["All components", "Community support", "MIT License"],
    cta: "Get Started",
  },
  {
    name: "Professional",
    price: "$99/mo",
    description: "For teams and professional projects",
    features: ["Everything in Starter", "Priority support", "Advanced themes", "Custom components"],
    cta: "Start Trial",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale deployments",
    features: ["Everything in Professional", "Dedicated support", "SLA guarantee", "Custom integrations"],
    cta: "Contact Sales",
  },
];

export default function LandingTemplate() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="font-bold text-lg">LaunchApp</div>
          <div className="hidden md:flex gap-8">
            <a href="#features" className="text-sm hover:text-primary transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-sm hover:text-primary transition-colors">
              Testimonials
            </a>
            <a href="#pricing" className="text-sm hover:text-primary transition-colors">
              Pricing
            </a>
          </div>
          <Button size="sm">Sign In</Button>
        </div>
      </nav>

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                Build Amazing Products <span className="text-primary">Faster</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                A comprehensive, production-ready design system built with React, TypeScript, and Tailwind CSS. Everything you need to create beautiful, accessible applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg">Get Started</Button>
                <Button variant="outline" size="lg">
                  View Documentation
                </Button>
              </div>
            </div>
            <div className="h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">Hero Image</p>
                <p className="text-sm text-muted-foreground mt-2">Interactive component showcase</p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build modern web applications, from accessible components to dark mode support.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} className="p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section id="testimonials" className="bg-muted/30 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight mb-4">Loved by Developers</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See what developers and designers think about our design system.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, idx) => (
                <Card key={idx} className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-500">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your needs. Always flexible to scale.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, idx) => (
              <Card
                key={idx}
                className={`p-8 flex flex-col ${plan.featured ? "ring-2 ring-primary lg:scale-105" : ""}`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold mb-2 text-primary">{plan.price}</p>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant={plan.featured ? "default" : "outline"} className="w-full">
                  {plan.cta}
                </Button>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-primary text-primary-foreground py-24">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Ready to Build?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of developers building with LaunchApp Design System.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-primary-foreground text-foreground"
              />
              <Button variant="secondary" type="submit">
                Subscribe
              </Button>
            </form>
            {subscribed && (
              <p className="text-sm mt-4 text-primary-foreground/80">Thanks for subscribing! Check your email.</p>
            )}
          </div>
        </section>

        <footer className="border-t bg-muted/30 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">Components</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Blocks</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Templates</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Resources</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Guides</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Community</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">GitHub</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2026 LaunchApp. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
