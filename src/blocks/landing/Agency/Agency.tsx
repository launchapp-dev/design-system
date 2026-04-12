import * as React from "react";
import { cn } from "../../../lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/Card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/Avatar";

export interface AgencyService {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

export interface AgencyTeamMember {
  name: string;
  role: string;
  avatarSrc?: string;
  avatarFallback?: string;
}

export interface AgencyCaseStudy {
  title: string;
  description: string;
  result?: string;
  image?: React.ReactNode;
  tags?: string[];
}

export interface AgencyProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: React.ReactNode;
  headline: React.ReactNode;
  subheadline?: React.ReactNode;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  servicesTitle?: string;
  servicesSubtitle?: string;
  services?: AgencyService[];
  teamTitle?: string;
  teamSubtitle?: string;
  team?: AgencyTeamMember[];
  caseStudiesTitle?: string;
  caseStudiesSubtitle?: string;
  caseStudies?: AgencyCaseStudy[];
}

const Agency = React.forwardRef<HTMLDivElement, AgencyProps>(
  (
    {
      className,
      badge,
      headline,
      subheadline,
      primaryAction,
      secondaryAction,
      servicesTitle = "Our services",
      servicesSubtitle,
      services = [],
      teamTitle = "Meet the team",
      teamSubtitle,
      team = [],
      caseStudiesTitle = "Case studies",
      caseStudiesSubtitle,
      caseStudies = [],
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <section className="flex flex-col items-center text-center px-4 py-16 md:py-24 lg:py-32">
          {badge && <div className="mb-6">{badge}</div>}
          <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-6xl max-w-4xl">
            {headline}
          </h1>
          {subheadline && (
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">{subheadline}</p>
          )}
          {(primaryAction || secondaryAction) && (
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {primaryAction}
              {secondaryAction}
            </div>
          )}
        </section>

        {services.length > 0 && (
          <section className="px-4 py-16 md:py-24 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  {servicesTitle}
                </h2>
                {servicesSubtitle && (
                  <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{servicesSubtitle}</p>
                )}
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-4 p-6 rounded-xl border border-border bg-card"
                  >
                    {service.icon && (
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        {service.icon}
                      </div>
                    )}
                    <h3 className="font-semibold text-lg text-foreground">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {caseStudies.length > 0 && (
          <section className="px-4 py-16 md:py-24">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  {caseStudiesTitle}
                </h2>
                {caseStudiesSubtitle && (
                  <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                    {caseStudiesSubtitle}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {caseStudies.map((study, i) => (
                  <Card key={i} className="overflow-hidden">
                    {study.image && (
                      <div className="aspect-video overflow-hidden bg-muted">{study.image}</div>
                    )}
                    <CardHeader>
                      <CardTitle>{study.title}</CardTitle>
                      <CardDescription>{study.description}</CardDescription>
                    </CardHeader>
                    {(study.result || study.tags) && (
                      <CardContent>
                        {study.result && (
                          <p className="text-sm font-medium text-primary">{study.result}</p>
                        )}
                        {study.tags && study.tags.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1">
                            {study.tags.map((tag, j) => (
                              <span
                                key={j}
                                className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {team.length > 0 && (
          <section className="px-4 py-16 md:py-24 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">{teamTitle}</h2>
                {teamSubtitle && (
                  <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{teamSubtitle}</p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                {team.map((member, i) => (
                  <div key={i} className="flex flex-col items-center text-center gap-3">
                    <Avatar className="h-20 w-20">
                      {member.avatarSrc && <AvatarImage src={member.avatarSrc} alt={member.name} />}
                      <AvatarFallback>
                        {member.avatarFallback ??
                          member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    );
  },
);

Agency.displayName = "Agency";

export { Agency };
