import type * as React from "react";
import { cn } from "../../lib/utils";
import { buttonVariants } from "../Button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

function PaginationContent({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<"ul"> & {
  ref?: React.Ref<HTMLUListElement>;
}) {
  return (
    <ul
      ref={ref}
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}
PaginationContent.displayName = "PaginationContent";

function PaginationItem({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { ref?: React.Ref<HTMLLIElement> }) {
  return <li ref={ref} className={cn("", className)} {...props} />;
}
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
} & React.ComponentPropsWithoutRef<"a">;

const PaginationLink = ({
  className,
  isActive,
  disabled,
  href,
  onClick,
  ...props
}: PaginationLinkProps) => {
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e as React.MouseEvent<HTMLAnchorElement>);
  };

  const sharedClassName = cn(
    buttonVariants({
      variant: isActive ? "outline" : "ghost",
      size: "icon",
    }),
    "h-11 w-11 md:h-9 md:w-9 min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0",
    className,
  );

  if (!href) {
    return (
      <button
        type="button"
        aria-current={isActive ? "page" : undefined}
        aria-disabled={disabled ? true : undefined}
        disabled={disabled}
        className={sharedClassName}
        onClick={handleClick}
        {...(props as React.ComponentPropsWithoutRef<"button">)}
      />
    );
  }

  return (
    <a
      href={href}
      aria-current={isActive ? "page" : undefined}
      aria-disabled={disabled ? true : undefined}
      className={sharedClassName}
      onClick={handleClick}
      {...props}
    />
  );
};
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cn(
      "gap-1 pl-2.5 w-auto px-3 min-h-[44px] md:min-h-0",
      className,
    )}
    {...props}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
    <span className="hidden sm:inline">Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn(
      "gap-1 pr-2.5 w-auto px-3 min-h-[44px] md:min-h-0",
      className,
    )}
    {...props}
  >
    <span className="hidden sm:inline">Next</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden="true"
    className={cn(
      "flex h-11 w-11 items-center justify-center md:h-9 md:w-9 min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0",
      className,
    )}
    {...props}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
