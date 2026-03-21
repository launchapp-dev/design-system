import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const announcementBarVariants = cva(
  "w-full px-4 py-2 text-center text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        info: "bg-blue-600 text-white dark:bg-blue-700",
        warning: "bg-amber-500 text-white dark:bg-amber-600",
        success: "bg-green-600 text-white dark:bg-green-700",
        promotional: "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function useCountdown(targetDate: Date | null) {
  const [timeLeft, setTimeLeft] = React.useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  React.useEffect(() => {
    if (!targetDate) return;

    const calculate = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculate();
    const id = setInterval(calculate, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

export interface AnnouncementBarAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface AnnouncementBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof announcementBarVariants> {
  dismissible?: boolean;
  onDismiss?: () => void;
  countdownTarget?: Date;
  countdownLabel?: string;
  action?: AnnouncementBarAction;
}

function XIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function AnnouncementBar({
  className,
  variant,
  dismissible = false,
  onDismiss,
  countdownTarget,
  countdownLabel,
  action,
  children,
  ref,
  ...props
}: AnnouncementBarProps & { ref?: React.Ref<HTMLDivElement> }) {
  const [dismissed, setDismissed] = React.useState(false);
  const timeLeft = useCountdown(countdownTarget ?? null);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      ref={ref}
      role="banner"
      aria-label="Announcement"
      className={cn(
        announcementBarVariants({ variant }),
        "relative flex items-center justify-center gap-2",
        className
      )}
      {...props}
    >
      <span className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        {children}
        {timeLeft && (
          <span
            aria-label={`${countdownLabel ?? "Time remaining"}: ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds`}
          >
            <span aria-hidden="true" className="font-mono tabular-nums">
              {timeLeft.days > 0 && <>{pad(timeLeft.days)}d </>}
              {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
            </span>
          </span>
        )}
        {action &&
          (action.href ? (
            <a
              href={action.href}
              onClick={action.onClick}
              className="ml-1 rounded underline underline-offset-2 hover:no-underline focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-1"
            >
              {action.label}
            </a>
          ) : (
            <button
              onClick={action.onClick}
              className="ml-1 rounded underline underline-offset-2 hover:no-underline focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-1"
            >
              {action.label}
            </button>
          ))}
      </span>
      {dismissible && (
        <button
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded opacity-80 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-1"
        >
          <XIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
AnnouncementBar.displayName = "AnnouncementBar";

export { AnnouncementBar, announcementBarVariants };
