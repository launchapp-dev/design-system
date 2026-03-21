const CACHE_NAME = "launchapp-design-system-sw-v1";
const STATIC_CACHE_NAME = "launchapp-design-system-static-v1";
const DYNAMIC_CACHE_NAME = "launchapp-design-system-dynamic-v1";

interface ServiceWorkerFetchEvent {
  request: Request;
  respondWith(response: Promise<Response> | Response): Promise<Response>;
  waitUntil(promise: Promise<void>): void;
}

interface CacheStrategyOptions {
  cacheName?: string;
  maxAgeSeconds?: number;
  maxEntries?: number;
}

interface RouteConfig {
  pattern: RegExp | string;
  strategy: "cacheFirst" | "cacheOnly" | "networkFirst" | "networkOnly" | "staleWhileRevalidate";
  options?: CacheStrategyOptions;
}

const defaultRoutes: RouteConfig[] = [
  {
    pattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
    strategy: "cacheFirst",
    options: { maxAgeSeconds: 30 * 24 * 60 * 60, maxEntries: 100 },
  },
  {
    pattern: /\.(?:js|css)$/,
    strategy: "staleWhileRevalidate",
    options: { maxAgeSeconds: 7 * 24 * 60 * 60, maxEntries: 50 },
  },
  {
    pattern: /\.(?:woff|woff2|ttf|otf|eot)$/,
    strategy: "cacheFirst",
    options: { maxAgeSeconds: 365 * 24 * 60 * 60, maxEntries: 20 },
  },
  {
    pattern: /\/api\//,
    strategy: "networkFirst",
    options: { maxAgeSeconds: 5 * 60, maxEntries: 50 },
  },
];

function matchRoute(url: string): RouteConfig | null {
  for (const route of defaultRoutes) {
    if (typeof route.pattern === "string") {
      if (url.includes(route.pattern)) return route;
    } else if (route.pattern.test(url)) {
      return route;
    }
  }
  return null;
}

async function cacheFirst(
  request: Request,
  cacheName: string,
  options?: CacheStrategyOptions
): Promise<Response> {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  const networkResponse = await fetch(request);

  if (networkResponse.ok) {
    await cache.put(request, networkResponse.clone());
  }

  return networkResponse;
}

async function networkFirst(
  request: Request,
  cacheName: string,
  options?: CacheStrategyOptions
): Promise<Response> {
  const cache = await caches.open(cacheName);

  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch {
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    return new Response("Network error and no cache available", {
      status: 503,
      statusText: "Service Unavailable",
    });
  }
}

async function staleWhileRevalidate(
  request: Request,
  cacheName: string,
  options?: CacheStrategyOptions
): Promise<Response> {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request).then(async (networkResponse) => {
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });

  return cachedResponse || fetchPromise;
}

async function cacheOnly(request: Request, cacheName: string): Promise<Response> {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  return new Response("Cache miss", {
    status: 504,
    statusText: "Gateway Timeout",
  });
}

async function networkOnly(request: Request): Promise<Response> {
  return fetch(request);
}

export async function handleFetch(
  event: ServiceWorkerFetchEvent,
  routes?: RouteConfig[]
): Promise<Response> {
  const url = event.request.url;
  const routesToUse = routes || defaultRoutes;

  let matchedRoute: RouteConfig | null = null;
  for (const route of routesToUse) {
    if (typeof route.pattern === "string") {
      if (url.includes(route.pattern)) {
        matchedRoute = route;
        break;
      }
    } else if (route.pattern.test(url)) {
      matchedRoute = route;
      break;
    }
  }

  const strategy = matchedRoute?.strategy || "networkOnly";
  const cacheName = matchedRoute?.options?.cacheName || DYNAMIC_CACHE_NAME;

  switch (strategy) {
    case "cacheFirst":
      return cacheFirst(event.request, cacheName, matchedRoute?.options);
    case "cacheOnly":
      return cacheOnly(event.request, cacheName);
    case "networkFirst":
      return networkFirst(event.request, cacheName, matchedRoute?.options);
    case "staleWhileRevalidate":
      return staleWhileRevalidate(event.request, cacheName, matchedRoute?.options);
    case "networkOnly":
    default:
      return networkOnly(event.request);
  }
}

export async function precache(assets: string[]): Promise<void> {
  const cache = await caches.open(STATIC_CACHE_NAME);

  for (const asset of assets) {
    try {
      const response = await fetch(asset);
      if (response.ok) {
        await cache.put(asset, response);
      }
    } catch {
      // Skip failed precache items
    }
  }
}

export async function clearCaches(): Promise<void> {
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map((name) => caches.delete(name)));
}

export async function clearDynamicCache(): Promise<void> {
  await caches.delete(DYNAMIC_CACHE_NAME);
}

export { CACHE_NAME, STATIC_CACHE_NAME, DYNAMIC_CACHE_NAME };
export type { CacheStrategyOptions, RouteConfig, ServiceWorkerFetchEvent };
