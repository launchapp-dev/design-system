'use client';

import * as React from 'react';
import { Button } from '@launchapp/design-system/components/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@launchapp/design-system/components/Card';
import { Badge } from '@launchapp/design-system/components/Badge';
import { Input } from '@launchapp/design-system/components/Input';

const FEATURES = [
  {
    id: '1',
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Built for performance with optimized rendering and minimal bundle size.',
  },
  {
    id: '2',
    icon: '🎨',
    title: 'Beautiful Design',
    description: 'Stunning UI components that follow modern design principles and best practices.',
  },
  {
    id: '3',
    icon: '♿',
    title: 'Accessible',
    description: 'Full WCAG 2.1 AA compliance with keyboard navigation and screen reader support.',
  },
  {
    id: '4',
    icon: '📱',
    title: 'Responsive',
    description: 'Perfect on every device with mobile-first design and adaptive layouts.',
  },
  {
    id: '5',
    icon: '🌙',
    title: 'Dark Mode',
    description: 'Built-in dark mode support with seamless theme switching capabilities.',
  },
  {
    id: '6',
    icon: '🔧',
    title: 'Customizable',
    description: 'Extensive design tokens and CSS custom properties for easy customization.',
  },
];

const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    description: 'Perfect for individuals and small projects',
    features: [
      'All core components',
      'Community support',
      'Basic documentation',
      'Update notifications',
    ],
    highlighted: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 79,
    description: 'For growing teams and production apps',
    features: [
      'Everything in Starter',
      'Premium components',
      'Priority support',
      'Advanced documentation',
      'Custom theming guide',
      'Team collaboration',
    ],
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: null,
    description: 'Custom solutions for large organizations',
    features: [
      'Everything in Professional',
      'Custom components',
      'Dedicated support',
      'SLA guarantee',
      'White-label options',
      'Compliance certifications',
    ],
    highlighted: false,
  },
];

const TESTIMONIALS = [
  {
    id: '1',
    author: 'Sarah Johnson',
    role: 'Product Designer',
    content: 'This design system has transformed how our team builds products. The components are incredibly well-designed and the documentation is outstanding.',
    avatar: '👩‍💼',
  },
  {
    id: '2',
    author: 'Mike Chen',
    role: 'Lead Developer',
    content: 'The developer experience is exceptional. Everything is type-safe, accessible, and just works. Highly recommend to any team.',
    avatar: '👨‍💻',
  },
  {
    id: '3',
    author: 'Emma Rodriguez',
    role: 'CEO',
    content: 'We reduced our time to market by 40% using this system. The ROI has been incredible.',
    avatar: '👩‍🔬',
  },
];

export default function LandingTemplate() {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold">LaunchApp</div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm hover:text-primary transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="#testimonials" className="text-sm hover:text-primary transition-colors">
              Testimonials
            </a>
          </div>
          <Button variant="default" size="sm">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent" />
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge variant="secondary" className="mx-auto">
            ✨ Now with Dark Mode Support
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            Build Amazing Products Faster
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A comprehensive design system with production-ready components, perfect documentation, and an incredible developer experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="w-full sm:w-auto">
              Get Started Free
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              View Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-24 bg-muted/30 border-y">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive features designed to accelerate your development workflow.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature) => (
              <Card key={feature.id} className="border-border/50 hover:border-border transition-colors">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-6 py-24">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose the perfect plan for your needs. Always flexible to scale.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PRICING_PLANS.map((plan) => (
              <Card
                key={plan.id}
                className={
                  plan.highlighted
                    ? 'border-primary shadow-lg scale-105 md:scale-100'
                    : 'border-border/50'
                }
              >
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    {plan.price !== null ? (
                      <>
                        <span className="text-4xl font-bold">${plan.price}</span>
                        <span className="text-muted-foreground">/month</span>
                      </>
                    ) : (
                      <span className="text-2xl font-semibold">Custom</span>
                    )}
                  </div>
                  <Button
                    className="w-full"
                    variant={plan.highlighted ? 'default' : 'outline'}
                  >
                    {plan.price === null ? 'Contact Sales' : 'Get Started'}
                  </Button>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-primary font-bold mt-0.5">✓</span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="px-6 py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Loved by Teams Worldwide
            </h2>
            <p className="text-lg text-muted-foreground">
              See what developers and designers are saying about our design system.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <Card key={testimonial.id} className="border-border/50">
                <CardContent className="pt-6">
                  <p className="text-sm leading-relaxed mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{testimonial.avatar}</div>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24">
        <div className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-12 text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to get started?
          </h2>
          <p className="text-lg text-muted-foreground">
            Join hundreds of teams building better products with our design system.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit" size="lg" className="sm:w-auto">
              {subscribed ? 'Subscribed! ✓' : 'Get Started'}
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Components</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">License</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 LaunchApp. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Twitter</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
