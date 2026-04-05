import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";

const logoCloudVariants = cva("w-full", {
  variants: {
    variant: {
      simple: "flex flex-wrap items-center justify-center gap-8 px-4 py-10",
      marquee: "relative flex overflow-hidden px-4 py-10",
      grid: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-4 py-10",
      stacked: "flex flex-col items-center gap-8 px-4 py-10",
    },
  },
  defaultVariants: {
    variant: "simple",
  },
});

export interface LogoItem {
  name: string;
  src?: string;
  icon?: React.ReactNode;
  href?: string;
}

export interface LogoCloudProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof logoCloudVariants> {
  logos: LogoItem[];
  headline?: React.ReactNode;
  subheadline?: React.ReactNode;
  marqueeSpeed?: number;
  fadeEdges?: boolean;
}

function LogoCloud({
  className,
  variant,
  logos,
  headline,
  subheadline,
  marqueeSpeed = 30,
  fadeEdges = false,
  ref,
  ...props
}: LogoCloudProps & { ref?: React.Ref<HTMLElement> }) {
  const [isMarqueePaused, setIsMarqueePaused] = React.useState(false);

  if (variant === "marquee") {
    return (
      <section ref={ref} className={cn("w-full", className)} {...props}>
        {(headline || subheadline) && (
          <div className="mb-8 text-center space-y-3 px-4">
            {headline && (
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                {headline}
              </h2>
            )}
            {subheadline && (
              <p className="text-base text-muted-foreground">{subheadline}</p>
            )}
          </div>
        )}
        <div
          className="relative"
          onMouseEnter={() => setIsMarqueePaused(true)}
          onMouseLeave={() => setIsMarqueePaused(false)}
        >
          {fadeEdges && (
            <div
              className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"
              aria-hidden="true"
            />
          )}
          {fadeEdges && (
            <div
              className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"
              aria-hidden="true"
            />
          )}
          <div
            className={cn(
              "flex gap-16 w-max",
              !isMarqueePaused && "animate-marquee-left"
            )}
            style={
              {
                "--marquee-duration": `${marqueeSpeed}s`,
              } as React.CSSProperties
            }
          >
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="flex shrink-0 items-center justify-center opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                {logo.icon ? (
                  logo.icon
                ) : logo.src ? (
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-8 w-auto object-contain"
                  />
                ) : (
                  <span className="text-lg font-semibold text-foreground whitespace-nowrap">
                    {logo.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "grid") {
    return (
      <section ref={ref} className={cn("w-full", className)} {...props}>
        {(headline || subheadline) && (
          <div className="mb-8 text-center space-y-3 px-4">
            {headline && (
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                {headline}
              </h2>
            )}
            {subheadline && (
              <p className="text-base text-muted-foreground">{subheadline}</p>
            )}
          </div>
        )}
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {logos.map((logo, i) => (
              <div
                key={i}
                className="flex items-center justify-center p-4 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                {logo.href ? (
                  <a
                    href={logo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={logo.name}
                  >
                    {logo.icon ? (
                      logo.icon
                    ) : logo.src ? (
                      <img
                        src={logo.src}
                        alt={logo.name}
                        className="h-8 w-auto object-contain"
                      />
                    ) : (
                      <span className="text-base font-semibold text-foreground">
                        {logo.name}
                      </span>
                    )}
                  </a>
                ) : logo.icon ? (
                  logo.icon
                ) : logo.src ? (
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-8 w-auto object-contain"
                  />
                ) : (
                  <span className="text-base font-semibold text-foreground">
                    {logo.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "stacked") {
    return (
      <section ref={ref} className={cn("w-full", className)} {...props}>
        {(headline || subheadline) && (
          <div className="mb-8 text-center space-y-3 px-4">
            {headline && (
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                {headline}
              </h2>
            )}
            {subheadline && (
              <p className="text-base text-muted-foreground">{subheadline}</p>
            )}
          </div>
        )}
        <div className="flex flex-col items-center gap-4">
          {logos.map((logo, i) => (
            <div
              key={i}
              className="opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              {logo.icon ? (
                logo.icon
              ) : logo.src ? (
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-8 w-auto object-contain"
                />
              ) : (
                <span className="text-base font-semibold text-foreground">
                  {logo.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className={cn("w-full", className)} {...props}>
      {(headline || subheadline) && (
        <div className="mb-8 text-center space-y-3 px-4">
          {headline && (
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              {headline}
            </h2>
          )}
          {subheadline && (
            <p className="text-base text-muted-foreground">{subheadline}</p>
          )}
        </div>
      )}
      <div className="flex flex-wrap items-center justify-center gap-8">
        {logos.map((logo, i) => (
          <div
            key={i}
            className="opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          >
            {logo.href ? (
              <a
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={logo.name}
              >
                {logo.icon ? (
                  logo.icon
                ) : logo.src ? (
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-8 w-auto object-contain"
                  />
                ) : (
                  <span className="text-base font-semibold text-foreground whitespace-nowrap">
                    {logo.name}
                  </span>
                )}
              </a>
            ) : logo.icon ? (
              logo.icon
            ) : logo.src ? (
              <img
                src={logo.src}
                alt={logo.name}
                className="h-8 w-auto object-contain"
              />
            ) : (
              <span className="text-base font-semibold text-foreground whitespace-nowrap">
                {logo.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

LogoCloud.displayName = "LogoCloud";

export { LogoCloud, logoCloudVariants };
