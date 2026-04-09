// Service Worker — Optimized caching for tattoo studio assets
// Cache-first: fonts, videos, static chunks
// Stale-while-revalidate: images (including optimized WebP)
// Network-first: HTML pages
const CACHE_NAME = "tattoo-studio-v3";
const STATIC_ASSETS = [
  "/videos/hero-ambient.webm",
  "/videos/hero-ambient.mp4",
  "/videos/studio.webm",
  "/videos/artist.webm",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Cache-first for fonts, videos, and static chunks (immutable)
  if (
    request.destination === "font" ||
    request.destination === "video" ||
    url.pathname.startsWith("/_next/static/") ||
    /\.(mp4|webm|woff2?|ttf|otf)$/.test(url.pathname)
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // Stale-while-revalidate for images — serve cached, update in background
  if (
    request.destination === "image" ||
    /\.(webp|avif|jpg|jpeg|png|svg|ico)$/.test(url.pathname)
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(request).then((cached) => {
          const fetchPromise = fetch(request).then((response) => {
            if (response.ok) {
              cache.put(request, response.clone());
            }
            return response;
          });
          return cached || fetchPromise;
        })
      )
    );
    return;
  }

  // Network-first for HTML pages
  if (request.destination === "document") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Default: network with cache fallback
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
