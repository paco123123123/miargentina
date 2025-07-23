
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('miarg-cache').then(function(cache) {
      return cache.addAll([
        '/index.html',
        '/scripts.js',
        '/styles.css',
        '/config_dni.html',
        '/dni.html',
        '/dni_details.html',
        '/error.html',
        '/misDocumentos.html',
        '/icon.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
