const CACHE_NAME = "habit-tracker-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "/",
        "/login",
        "/signup",
        "/dashboard",
      ]);
    })
  );
});


self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((res) => res)
      .catch(() => {
        return caches.match(event.request).then((cached) => {
          return cached || new Response("Offline");
        });
      })
  );
});