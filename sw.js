const CACHE_NAME = "liayo-v1";

self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // No interceptar la conexión con el servidor de productos.
  if (url.hostname.includes("workers.dev")) return;

  // No interceptar otros dominios ni peticiones que no sean GET.
  if (url.origin !== self.location.origin ||
      event.request.method !== "GET") return;
});
