import * as React from "react";
import {
  Group,
  Panel,
  Separator,
  type GroupProps,
  type PanelProps,
  type SeparatorProps,
  type GroupImperativeHandle,
  type PanelImperativeHandle,
} from "react-resizable-panels";
import { cn } from "@/lib/utils";

const ResizablePanelGroup = React.forwardRef<GroupImperativeHandle, GroupProps>(
  ({ className ...props }, ref) => {
  return (
    <Group
      className={cn(
        "flex h-full w-full data-[orientation=vertical]:flex-col",
        className
      )}
      groupRef={ref}
      {...props}
    />
  );
}
);
ResizablePanelGroup.displayName = "ResizablePanelGroup";

const ResizablePanel = React.forwardRef<PanelImperativeHandle, PanelProps>(
  ({ ...props }, ref) => {
  return <Panel panelRef={ref} {...props} />;
}
);
ResizablePanel.displayName = "ResizablePanel";

interface ResizableHandleProps extends SeparatorProps {
  withHandle?: boolean;
}

const ResizableHandle = React.forwardRef<HTMLDivElement, ResizableHandleProps>(
  ({ withHandle, className ...props }, ref) => {
  return (
    <Separator
      elementRef={ref}
      className={cn(
        "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full data-[orientation=vertical]:after:left-0 data-[orientation=vertical]:after:h-1 data-[orientation=vertical]:after:w-full data-[orientation=vertical]:after:-translate-y-1/2 data-[orientation=vertical]:after:translate-x-0",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border border-border bg-border">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1.5 1.5L1.5 6.5M3.5 1.5L3.5 6.5M5.5 1.5L5.5 6.5"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
    </Separator>
  );
}
);
ResizableHandle.displayName = "ResizableHandle";

export type ResizablePanelGroupProps = GroupProps & { ref?: React.Ref<GroupImperativeHandle> };
export type ResizablePanelProps = PanelProps & { ref?: React.Ref<PanelImperativeHandle> };
export type { ResizableHandleProps };

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
