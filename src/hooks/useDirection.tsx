import * as React from "react";

type Direction = "ltr" | "rtl";

interface DirectionContextValue {
  direction: Direction;
  setDirection: (direction: Direction) => void;
}

const DirectionContext = React.createContext<DirectionContextValue | undefined>(
  undefined
);

function useDirection(): Direction {
  const context = React.useContext(DirectionContext);
  const [direction, setDirection] = React.useState<Direction>("ltr");

  React.useEffect(() => {
    if (context) {
      return;
    }

    const updateDirection = () => {
      const dir = document.documentElement.getAttribute("dir");
      setDirection((dir as Direction) || "ltr");
    };

    updateDirection();

    const observer = new MutationObserver(updateDirection);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir"],
    });

    return () => observer.disconnect();
  }, [context]);

  if (context) {
    return context.direction;
  }

  return direction;
}

function useSetDirection(): (direction: Direction) => void {
  const context = React.useContext(DirectionContext);

  if (context) {
    return context.setDirection;
  }

  return React.useCallback((direction: Direction) => {
    document.documentElement.setAttribute("dir", direction);
  }, []);
}

interface DirectionProviderProps {
  children: React.ReactNode;
  defaultDirection?: Direction;
}

function DirectionProvider({
  children,
  defaultDirection = "ltr",
}: DirectionProviderProps) {
  const [direction, setDirection] = React.useState<Direction>(defaultDirection);

  React.useEffect(() => {
    document.documentElement.setAttribute("dir", direction);
  }, [direction]);

  const value = React.useMemo(
    () => ({ direction, setDirection }),
    [direction]
  );

  return (
    <DirectionContext.Provider value={value}>
      {children}
    </DirectionContext.Provider>
  );
}

export { useDirection, useSetDirection, DirectionProvider, type Direction };
