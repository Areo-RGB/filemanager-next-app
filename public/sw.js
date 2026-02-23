// Minimal Service Worker to enable PWA installation on Android without any caching.
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    // Claim clients so the service worker takes control immediately
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Pass all requests directly to the network without caching
    event.respondWith(fetch(event.request));
});
