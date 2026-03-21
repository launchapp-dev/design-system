const DB_NAME = "launchapp-design-system-cache";
const DB_VERSION = 1;
const STORE_NAME = "api-cache";

interface CacheEntry<T = unknown> {
  key: string;
  data: T;
  timestamp: number;
  expiresAt: number | null;
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);

    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "key" });
      }
    };
  });
}

async function getStore(mode: IDBTransactionMode): Promise<{
  store: IDBObjectStore;
  db: IDBDatabase;
}> {
  const db = await openDatabase();
  const transaction = db.transaction(STORE_NAME, mode);
  const store = transaction.objectStore(STORE_NAME);
  return { store, db };
}

export async function setCache<T>(
  key: string,
  data: T,
  ttl?: number
): Promise<void> {
  const { store, db } = await getStore("readwrite");
  const now = Date.now();

  const entry: CacheEntry<T> = {
    key,
    data,
    timestamp: now,
    expiresAt: ttl ? now + ttl : null,
  };

  return new Promise((resolve, reject) => {
    const request = store.put(entry);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db.close();
      resolve();
    };
  });
}

export async function getCache<T>(key: string): Promise<T | null> {
  const { store, db } = await getStore("readonly");

  return new Promise((resolve, reject) => {
    const request = store.get(key);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db.close();
      const entry = request.result as CacheEntry<T> | undefined;

      if (!entry) {
        resolve(null);
        return;
      }

      if (entry.expiresAt && Date.now() > entry.expiresAt) {
        deleteCache(key);
        resolve(null);
        return;
      }

      resolve(entry.data);
    };
  });
}

export async function deleteCache(key: string): Promise<void> {
  const { store, db } = await getStore("readwrite");

  return new Promise((resolve, reject) => {
    const request = store.delete(key);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db.close();
      resolve();
    };
  });
}

export async function clearCache(): Promise<void> {
  const { store, db } = await getStore("readwrite");

  return new Promise((resolve, reject) => {
    const request = store.clear();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db.close();
      resolve();
    };
  });
}

export async function getCacheMetadata(
  key: string
): Promise<{ timestamp: number | null; expiresAt: number | null } | null> {
  const { store, db } = await getStore("readonly");

  return new Promise((resolve, reject) => {
    const request = store.get(key);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db.close();
      const entry = request.result as CacheEntry | undefined;
      if (!entry) {
        resolve(null);
        return;
      }
      resolve({
        timestamp: entry.timestamp,
        expiresAt: entry.expiresAt,
      });
    };
  });
}

export async function getAllCacheKeys(): Promise<string[]> {
  const { store, db } = await getStore("readonly");

  return new Promise((resolve, reject) => {
    const request = store.getAllKeys();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db.close();
      resolve(request.result as string[]);
    };
  });
}

export async function pruneExpiredCache(): Promise<number> {
  const { store, db } = await getStore("readwrite");
  const now = Date.now();
  let prunedCount = 0;

  return new Promise((resolve, reject) => {
    const request = store.openCursor();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const cursor = request.result;
      if (cursor) {
        const entry = cursor.value as CacheEntry;
        if (entry.expiresAt && now > entry.expiresAt) {
          cursor.delete();
          prunedCount++;
        }
        cursor.continue();
      } else {
        db.close();
        resolve(prunedCount);
      }
    };
  });
}

export type { CacheEntry };
