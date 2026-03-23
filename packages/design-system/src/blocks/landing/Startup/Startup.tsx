import * as React from "react";
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/Avatar";

export interface SocialProofMetric {
  metric: string;
  label: string;
}

export interface StartupTestimonial {
  quote: string;
  author: string;
  role?: string;
  avatarSrc?: string;
  avatarFallback?: string;
}

export interface StartupProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: React.ReactNode;
  headline: React.ReactNode;
  subheadline?: React.ReactNode;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  socialProof?: SocialProofMetric[];
  logoBar?: React.ReactNode[];
  logoBarLabel?: string;
  testimonials?: StartupTestimonial[];
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaAction?: React.ReactNode;
}

const Startup = React.forwardRef<HTMLDivElement, StartupProps>(
  (
    {
      className,
      badge,
      headline,
      subheadline,
      primaryAction,
      secondaryAction,
      socialProof = [],
      logoBar = [],
      logoBarLabel = "Trusted by leading companies",
      testimonials = [],
      ctaTitle,
      ctaSubtitle,
      ctaAction,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <section className="flex flex-col items-center text-center px-4 py-16 md:py-24 lg:py-32">
          {badge && <div className="mb-6 animate-fade-in">{badge}</div>}
          <h1 className="text-5xl font-bold tracking-tight text-foreground lg:text-7xl max-w-4xl animate-fade-up">
            {headline}
          </h1>
          {subheadline && (
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl animate-fade-up">{subheadline}</p>
          )}
          {(primaryAction || secondaryAction) && (
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {primaryAction}
              {secondaryAction}
            </div>
          )}
        </section>

        {socialProof.length > 0 && (
          <section className="px-4 py-12 bg-muted/30">
            <div className="max-w-4xl mx-auto grid grid-cols-2 gap-8 sm:grid-cols-4">
              {socialProof.map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <span className="text-4xl font-bold text-foreground">{item.metric}</span>
                  <span className="text-sm text-muted-foreground mt-1">{item.label}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {logoBar.length > 0 && (
          <section className="px-4 py-12">
            <div className="max-w-5xl mx-auto">
              {logoBarLabel && (
                <p className="text-center text-sm text-muted-foreground mb-8">{logoBarLabel}</p>
              )}
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                {logoBar.map((logo, i) => (
                  <div key={i} className="opacity-60 hover:opacity-100 transition-opacity">
                    {logo}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {testimonials.length > 0 && (
          <section className="px-4 py-16 md:py-24 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-12">
                Loved by builders
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testimonial, i) => (
                  <div key={i} className="flex flex-col gap-4 p-6 rounded-xl border border-border bg-card">
                    <p className="text-muted-foreground leading-relaxed">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-3 mt-auto">
                      <Avatar className="h-9 w-9">
                        {testimonial.avatarSrc && (
                          <AvatarImage src={testimonial.avatarSrc} alt={testimonial.author} />
                        )}
                        <AvatarFallback>
                          {testimonial.avatarFallback ??
                            testimonial.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{testimonial.author}</p>
                        {testimonial.role && (
                          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {(ctaTitle || ctaAction) && (
          <section className="px-4 py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
              {ctaTitle && (
                <h2 className="text-4xl font-bold tracking-tight text-foreground">{ctaTitle}</h2>
              )}
              {ctaSubtitle && (
                <p className="mt-4 text-lg text-muted-foreground">{ctaSubtitle}</p>
              )}
              {ctaAction && <div className="mt-8">{ctaAction}</div>}
            </div>
          </section>
        )}
      </div>
    );
  }
);

Startup.displayName = "Startup";

export { Startup };
