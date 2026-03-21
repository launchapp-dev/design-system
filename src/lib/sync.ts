const QUEUE_NAME = "launchapp-design-system-sync-queue";
const DB_NAME = "launchapp-design-system-sync";
const DB_VERSION = 1;

interface QueuedMutation<T = unknown> {
  id: string;
  type: "mutation";
  method: "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  body?: T;
  headers?: Record<string, string>;
  timestamp: number;
  retries: number;
}

interface QueuedMutationsStore {
  "pending-mutations": QueuedMutation;
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);

    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(QUEUE_NAME)) {
        db.createObjectStore(QUEUE_NAME, { keyPath: "id" });
      }
    };
  });
}

async function getStore(
  mode: IDBTransactionMode
): Promise<{ store: IDBObjectStore; db: IDBDatabase }> {
  const db = await openDatabase();
  const transaction = db.transaction(QUEUE_NAME, mode);
  const store = transaction.objectStore(QUEUE_NAME);
  return { store, db };
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export async function queueMutation<T>({
  method,
  url,
  body,
  headers,
}: Omit<QueuedMutation<T>, "id" | "type" | "timestamp" | "retries">): Promise<string> {
  const { store, db } = await getStore("readwrite");

  const mutation: QueuedMutation<T> = {
    id: generateId(),
    type: "mutation",
    method,
    url,
    body,
    headers,
    timestamp: Date.now(),
    retries: 0,
  };

  return new Promise((resolve, reject) => {
    const request = store.put(mutation);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db.close();
      resolve(mutation.id);
    };
  });
}

export async function getPendingMutations(): Promise<QueuedMutation[]> {
  const { store, db } = await getStore("readonly");

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db.close();
      const mutations = (request.result as QueuedMutation[]).sort(
        (a, b) => a.timestamp - b.timestamp
      );
      resolve(mutations);
    };
  });
}

export async function removeMutation(id: string): Promise<void> {
  const { store, db } = await getStore("readwrite");

  return new Promise((resolve, reject) => {
    const request = store.delete(id);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db.close();
      resolve();
    };
  });
}

export async function incrementRetries(id: string): Promise<number> {
  const { store, db } = await getStore("readwrite");

  return new Promise((resolve, reject) => {
    const getRequest = store.get(id);
    getRequest.onerror = () => reject(getRequest.error);
    getRequest.onsuccess = () => {
      const mutation = getRequest.result as QueuedMutation;
      if (!mutation) {
        db.close();
        resolve(0);
        return;
      }

      mutation.retries += 1;
      const putRequest = store.put(mutation);
      putRequest.onerror = () => reject(putRequest.error);
      putRequest.onsuccess = () => {
        db.close();
        resolve(mutation.retries);
      };
    };
  });
}

export async function clearPendingMutations(): Promise<void> {
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

export async function getPendingMutationsCount(): Promise<number> {
  const { store, db } = await getStore("readonly");

  return new Promise((resolve, reject) => {
    const request = store.count();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db.close();
      resolve(request.result);
    };
  });
}

export interface SyncResult {
  success: boolean;
  processed: number;
  failed: number;
  errors: Array<{ id: string; error: string }>;
}

const MAX_RETRIES = 3;

export async function processPendingMutations(
  processor?: (mutation: QueuedMutation) => Promise<void>
): Promise<SyncResult> {
  const mutations = await getPendingMutations();
  const result: SyncResult = {
    success: true,
    processed: 0,
    failed: 0,
    errors: [],
  };

  for (const mutation of mutations) {
    try {
      if (processor) {
        await processor(mutation);
      } else {
        const response = await fetch(mutation.url, {
          method: mutation.method,
          headers: {
            "Content-Type": "application/json",
            ...mutation.headers,
          },
          body: mutation.body ? JSON.stringify(mutation.body) : undefined,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      }

      await removeMutation(mutation.id);
      result.processed++;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      if (mutation.retries < MAX_RETRIES) {
        await incrementRetries(mutation.id);
      } else {
        await removeMutation(mutation.id);
        result.failed++;
      }

      result.errors.push({ id: mutation.id, error: errorMessage });
    }
  }

  result.success = result.failed === 0;
  return result;
}

export type { QueuedMutation };
