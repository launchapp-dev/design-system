import * as React from "react";
import { cn } from "../../lib/utils";
import { useReducedMotion } from "../../lib/animation";

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  tabKey: string;
}

const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  ({ className, children, tabKey, "aria-labelledby": ariaLabelledBy, ...props }, ref) => {
  return (
    <div ref={ref} role="tabpanel" aria-labelledby={ariaLabelledBy ?? `tab-${tabKey}`} className={cn(className)} {...props}>
      {children}
    </div>
  );
});
TabPanel.displayName = "TabPanel";

export interface TabContentCrossfadeProps extends React.HTMLAttributes<HTMLDivElement> {
  activeKey: string;
  duration?: number;
  children: React.ReactElement<TabPanelProps> | React.ReactElement<TabPanelProps>[];
}

const TabContentCrossfade = React.forwardRef<HTMLDivElement, TabContentCrossfadeProps>(
  ({ activeKey, duration = 200, children, className, ...props }, ref) => {
  const prefersReducedMotion = useReducedMotion();
  const [displayedKey, setDisplayedKey] = React.useState(activeKey);
  const [opacity, setOpacity] = React.useState(1);
  const pendingKey = React.useRef(activeKey);

  React.useEffect(() => {
    if (activeKey === displayedKey) return;
    pendingKey.current = activeKey;

    if (prefersReducedMotion) {
      setDisplayedKey(activeKey);
      return;
    }

    setOpacity(0);

    const fadeOut = setTimeout(() => {
      setDisplayedKey(pendingKey.current);
      setOpacity(1);
    }, duration);

    return () => clearTimeout(fadeOut);
  }, [activeKey, displayedKey, duration, prefersReducedMotion]);

  const panels = React.Children.toArray(children) as React.ReactElement<TabPanelProps>[];
  const activePanel = panels.find((panel) => panel.props.tabKey === displayedKey);

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      style={{
        opacity,
        transitionProperty: "opacity",
        transitionDuration: prefersReducedMotion ? "0ms" : `${duration}ms`,
        transitionTimingFunction: "ease-in-out",
      }}
      {...props}
    >
      {activePanel}
    </div>
  );
});
TabContentCrossfade.displayName = "TabContentCrossfade";

export { TabContentCrossfade, TabPanel };
