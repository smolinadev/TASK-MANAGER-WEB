const CACHE = 'taskmanager-v1';

const ARCHIVOS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  'img/logo-android-192px.png',
  'img/logo-512px.png'
];

// Instalar — guarda los archivos en caché
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(ARCHIVOS);
    })
  );
});

// Activar — limpia cachés viejos
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
});

// Fetch — sirve desde caché si no hay internet
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request);
    })
  );
});