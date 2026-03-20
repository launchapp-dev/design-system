import * as React from "react";
import { cn } from "../../../lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/Card";
import { Badge } from "../../../components/Badge";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Textarea } from "../../../components/Textarea";
import { Label } from "../../../components/Label";

export interface PortfolioProject {
  title: string;
  description: string;
  tags?: string[];
  image?: React.ReactNode;
  link?: string;
}

export interface PortfolioProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  title: string;
  bio?: React.ReactNode;
  avatar?: React.ReactNode;
  projects?: PortfolioProject[];
  contactTitle?: string;
  contactSubtitle?: string;
  onContactSubmit?: (data: { name: string; email: string; message: string }) => void;
}

const Portfolio = React.forwardRef<HTMLDivElement, PortfolioProps>(
  (
    {
      className,
      name,
      title,
      bio,
      avatar,
      projects = [],
      contactTitle = "Get in touch",
      contactSubtitle,
      onContactSubmit,
      ...props
    },
    ref
  ) => {
    const [formData, setFormData] = React.useState({ name: "", email: "", message: "" });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onContactSubmit?.(formData);
    };

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <section className="px-4 py-16 md:py-24 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            {avatar && (
              <div className="shrink-0">{avatar}</div>
            )}
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground">{name}</h1>
              <p className="text-xl text-muted-foreground mt-2">{title}</p>
              {bio && <div className="mt-4 text-muted-foreground leading-relaxed">{bio}</div>}
            </div>
          </div>
        </section>

        {projects.length > 0 && (
          <section className="px-4 py-16 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-10">Projects</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, i) => (
                  <Card key={i} className="overflow-hidden group">
                    {project.image && (
                      <div className="aspect-video overflow-hidden bg-muted">
                        {project.image}
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {project.tags.map((tag, j) => (
                            <Badge key={j} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center text-sm text-primary hover:underline"
                        >
                          View project
                          <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="px-4 py-16 md:py-24">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">{contactTitle}</h2>
              {contactSubtitle && (
                <p className="mt-4 text-muted-foreground">{contactSubtitle}</p>
              )}
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input
                    id="contact-name"
                    value={formData.name}
                    onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea
                  id="contact-message"
                  value={formData.message}
                  onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Send message</Button>
            </form>
          </div>
        </section>
      </div>
    );
  }
);

Portfolio.displayName = "Portfolio";

export { Portfolio };
