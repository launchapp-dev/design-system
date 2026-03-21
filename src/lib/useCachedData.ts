import * as React from "react";
import { getCache, setCache, getCacheMetadata, type CacheEntry } from "./cache";
import { useOffline } from "../components/OfflineProvider/OfflineProvider";

interface UseCachedDataOptions<T> {
  key: string;
  fetcher: () => Promise<T>;
  ttl?: number;
  staleWhileRevalidate?: boolean;
  skip?: boolean;
}

interface UseCachedDataResult<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isStale: boolean;
  isOffline: boolean;
  cachedAt: number | null;
  refetch: () => Promise<void>;
}

export function useCachedData<T>({
  key,
  fetcher,
  ttl,
  staleWhileRevalidate = true,
  skip = false,
}: UseCachedDataOptions<T>): UseCachedDataResult<T> {
  const { isOffline } = useOffline();
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [cachedAt, setCachedAt] = React.useState<number | null>(null);
  const [isStale, setIsStale] = React.useState(false);

  const fetchData = React.useCallback(
    async (forceRefresh = false) => {
      if (skip) return;

      const metadata = await getCacheMetadata(key);

      if (!forceRefresh && metadata?.timestamp) {
        const isStaleThreshold = ttl
          ? Date.now() - metadata.timestamp > ttl
          : false;

        if (!isStaleThreshold) {
          const cachedData = await getCache<T>(key);
          if (cachedData !== null) {
            setData(cachedData);
            setCachedAt(metadata.timestamp);
            setIsStale(false);
            setError(null);

            if (staleWhileRevalidate && !isOffline) {
              setIsLoading(true);
              try {
                const freshData = await fetcher();
                await setCache(key, freshData, ttl);
                setData(freshData);
                setCachedAt(Date.now());
                setIsStale(false);
              } catch (err) {
                // Silently fail for background refresh
              } finally {
                setIsLoading(false);
              }
            }

            return;
          }
        }
      }

      if (isOffline) {
        const cachedData = await getCache<T>(key);
        if (cachedData !== null) {
          setData(cachedData);
          setCachedAt(metadata?.timestamp || null);
          setIsStale(true);
          setError(null);
          return;
        }
      }

      setIsLoading(true);
      setError(null);

      try {
        const freshData = await fetcher();
        await setCache(key, freshData, ttl);
        setData(freshData);
        setCachedAt(Date.now());
        setIsStale(false);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Fetch failed");
        setError(error);

        if (!data) {
          const cachedData = await getCache<T>(key);
          if (cachedData !== null) {
            setData(cachedData);
            setCachedAt(metadata?.timestamp || null);
            setIsStale(true);
          }
        }
      } finally {
        setIsLoading(false);
      }
    },
    [key, fetcher, ttl, staleWhileRevalidate, skip, isOffline, data]
  );

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = React.useCallback(async () => {
    await fetchData(true);
  }, [fetchData]);

  return {
    data,
    error,
    isLoading,
    isStale,
    isOffline,
    cachedAt,
    refetch,
  };
}

export type { UseCachedDataOptions, UseCachedDataResult };
