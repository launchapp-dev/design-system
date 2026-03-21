import * as React from "react";

interface OfflineContextValue {
  isOffline: boolean;
  wasOffline: boolean;
  lastOfflineAt: number | null;
  lastOnlineAt: number | null;
}

const OfflineContext = React.createContext<OfflineContextValue | undefined>(undefined);

interface OfflineProviderProps {
  children: React.ReactNode;
  defaultOnline?: boolean;
}

function OfflineProvider({ children, defaultOnline }: OfflineProviderProps): React.JSX.Element {
  const [isOffline, setIsOffline] = React.useState(
    defaultOnline !== undefined ? !defaultOnline : typeof navigator !== "undefined" ? !navigator.onLine : false
  );
  const [wasOffline, setWasOffline] = React.useState(false);
  const [lastOfflineAt, setLastOfflineAt] = React.useState<number | null>(null);
  const [lastOnlineAt, setLastOnlineAt] = React.useState<number | null>(
    typeof navigator !== "undefined" && navigator.onLine ? Date.now() : null
  );

  React.useEffect(() => {
    function handleOnline() {
      setIsOffline(false);
      setLastOnlineAt(Date.now());
    }

    function handleOffline() {
      setIsOffline(true);
      setWasOffline(true);
      setLastOfflineAt(Date.now());
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const value = React.useMemo(
    () => ({
      isOffline,
      wasOffline,
      lastOfflineAt,
      lastOnlineAt,
    }),
    [isOffline, wasOffline, lastOfflineAt, lastOnlineAt]
  );

  return (
    <OfflineContext.Provider value={value}>
      {children}
    </OfflineContext.Provider>
  );
}

function useOffline(): OfflineContextValue {
  const context = React.useContext(OfflineContext);
  if (context === undefined) {
    return {
      isOffline: typeof navigator !== "undefined" ? !navigator.onLine : false,
      wasOffline: false,
      lastOfflineAt: null,
      lastOnlineAt: typeof navigator !== "undefined" && navigator.onLine ? Date.now() : null,
    };
  }
  return context;
}

export { OfflineProvider, useOffline };
export type { OfflineContextValue, OfflineProviderProps };
