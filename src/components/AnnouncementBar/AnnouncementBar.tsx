import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const announcementBarVariants = cva("relative w-full px-4 py-2 text-center text-sm", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      info: "bg-blue-500 text-white",
      warning: "bg-amber-500 text-white",
      success: "bg-green-500 text-white",
      accent: "bg-accent text-accent-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface AnnouncementBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof announcementBarVariants> {
  dismissible?: boolean;
  onDismiss?: () => void;
  countdown?: {
    endDate: Date;
    onComplete?: () => void;
  };
  link?: {
    label: string;
    href: string;
    onClick?: () => void;
  };
}

const AnnouncementBar = React.forwardRef<HTMLDivElement, AnnouncementBarProps>(
  ({ className, variant, dismissible = false, onDismiss, countdown, link, children, ...props }, ref) => {
    const [dismissed, setDismissed] = React.useState(false);
    const [timeLeft, setTimeLeft] = React.useState<{
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    } | null>(null);

    React.useEffect(() => {
      if (!countdown?.endDate) return;

      const calculateTimeLeft = () => {
        const difference = countdown.endDate.getTime() - new Date().getTime();
        if (difference <= 0) {
          return null;
        }

        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      };

      const initialTimeLeft = calculateTimeLeft();
      setTimeLeft(initialTimeLeft);

      if (!initialTimeLeft) {
        countdown.onComplete?.();
        return;
      }

      const timer = setInterval(() => {
        const newTimeLeft = calculateTimeLeft();
        setTimeLeft(newTimeLeft);
        if (!newTimeLeft) {
          clearInterval(timer);
          countdown.onComplete?.();
        }
      }, 1000);

      return () => clearInterval(timer);
    }, [countdown]);

    const handleDismiss = () => {
      setDismissed(true);
      onDismiss?.();
    };

    if (dismissed) {
      return null;
    }

    const formatTimeUnit = (value: number) => value.toString().padStart(2, "0");

    return (
      <div
        ref={ref}
        className={cn(announcementBarVariants({ variant }), className)}
        role="banner"
        {...props}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-4">
          {timeLeft && (
            <div className="flex items-center gap-1.5" aria-label="Time remaining">
              {timeLeft.days > 0 && (
                <>
                  <span className="font-semibold">{timeLeft.days}</span>
                  <span className="opacity-70">d</span>
                </>
              )}
              <span className="font-semibold">{formatTimeUnit(timeLeft.hours)}</span>
              <span className="opacity-70">:</span>
              <span className="font-semibold">{formatTimeUnit(timeLeft.minutes)}</span>
              <span className="opacity-70">:</span>
              <span className="font-semibold">{formatTimeUnit(timeLeft.seconds)}</span>
            </div>
          )}
          {children}
          {link && (
            <a
              href={link.href}
              onClick={(e) => {
                if (link.onClick) {
                  e.preventDefault();
                  link.onClick();
                }
              }}
              className="shrink-0 underline underline-offset-2 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
            >
              {link.label}
            </a>
          )}
          {dismissible && (
            <button
              onClick={handleDismiss}
              className="shrink-0 rounded-full p-0.5 opacity-70 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
              aria-label="Dismiss announcement"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
);
AnnouncementBar.displayName = "AnnouncementBar";

export { AnnouncementBar, announcementBarVariants };
