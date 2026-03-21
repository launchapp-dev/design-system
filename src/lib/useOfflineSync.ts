import * as React from "react";
import {
  queueMutation,
  getPendingMutationsCount,
  processPendingMutations,
  type SyncResult,
} from "./sync";
import { useOffline } from "../components/OfflineProvider/OfflineProvider";

interface FetchEvent extends Event {
  request: Request;
  respondWith(response: Promise<Response> | Response): Promise<Response>;
  waitUntil(promise: Promise<void>): void;
}

interface UseOfflineSyncOptions {
  onSyncComplete?: (result: SyncResult) => void;
  onSyncError?: (error: Error) => void;
  autoSync?: boolean;
  syncInterval?: number;
}

interface UseOfflineSyncResult {
  pendingCount: number;
  isSyncing: boolean;
  lastSyncResult: SyncResult | null;
  sync: () => Promise<SyncResult>;
  queueOfflineMutation: <T>(mutation: {
    method: "POST" | "PUT" | "PATCH" | "DELETE";
    url: string;
    body?: T;
    headers?: Record<string, string>;
  }) => Promise<string>;
}

export function useOfflineSync(
  options: UseOfflineSyncOptions = {}
): UseOfflineSyncResult {
  const {
    onSyncComplete,
    onSyncError,
    autoSync = true,
    syncInterval = 30000,
  } = options;
  const { isOffline } = useOffline();
  const [pendingCount, setPendingCount] = React.useState(0);
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [lastSyncResult, setLastSyncResult] = React.useState<SyncResult | null>(null);
  const syncIntervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const updatePendingCount = React.useCallback(async () => {
    try {
      const count = await getPendingMutationsCount();
      setPendingCount(count);
    } catch {
      // Silently handle errors
    }
  }, []);

  const sync = React.useCallback(async (): Promise<SyncResult> => {
    if (isSyncing) {
      return lastSyncResult || { success: true, processed: 0, failed: 0, errors: [] };
    }

    setIsSyncing(true);
    try {
      const result = await processPendingMutations();
      setLastSyncResult(result);
      await updatePendingCount();
      onSyncComplete?.(result);
      return result;
    } catch (error) {
      const err = error instanceof Error ? error : new Error("Sync failed");
      setLastSyncResult({
        success: false,
        processed: 0,
        failed: 0,
        errors: [{ id: "unknown", error: err.message }],
      });
      onSyncError?.(err);
      throw error;
    } finally {
      setIsSyncing(false);
    }
  }, [isSyncing, lastSyncResult, onSyncComplete, onSyncError, updatePendingCount]);

  const queueOfflineMutation = React.useCallback(
    async <T,>(mutation: {
      method: "POST" | "PUT" | "PATCH" | "DELETE";
      url: string;
      body?: T;
      headers?: Record<string, string>;
    }): Promise<string> => {
      const id = await queueMutation<T>(mutation);
      await updatePendingCount();
      return id;
    },
    [updatePendingCount]
  );

  React.useEffect(() => {
    updatePendingCount();
  }, [updatePendingCount]);

  React.useEffect(() => {
    if (!isOffline && autoSync && pendingCount > 0) {
      sync();
    }
  }, [isOffline, autoSync, pendingCount, sync]);

  React.useEffect(() => {
    if (autoSync && syncInterval > 0) {
      syncIntervalRef.current = setInterval(() => {
        if (!isOffline && pendingCount > 0) {
          sync();
        }
      }, syncInterval);

      return () => {
        if (syncIntervalRef.current) {
          clearInterval(syncIntervalRef.current);
        }
      };
    }
  }, [autoSync, syncInterval, isOffline, pendingCount, sync]);

  return {
    pendingCount,
    isSyncing,
    lastSyncResult,
    sync,
    queueOfflineMutation,
  };
}

export type { UseOfflineSyncOptions, UseOfflineSyncResult };
