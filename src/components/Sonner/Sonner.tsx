import * as React from "react";
import { Toaster as SonnerToaster } from "sonner";

type ToasterProps = React.ComponentProps<typeof SonnerToaster>;

function Toaster({ theme = "system", ref, ...props }: ToasterProps & { ref?: React.Ref<HTMLElement> }) {
  return (
    <SonnerToaster
      ref={ref}
      theme={theme}
      className="toaster group"
      visibleToasts={3}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
}
Toaster.displayName = "Toaster";

export { Toaster };
export type { ToasterProps };
