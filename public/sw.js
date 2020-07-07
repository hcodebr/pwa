const CACHE_NAME = 'ferrari-cache';
const urlsToCache = [
  '/',
  '/assets/css/style.css',
  '/main.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open('v1')
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
 });
 
 self.addEventListener('fetch', event => {
   event.respondWith(
     caches.match(event.request).then(response => {
         return response || fetch(event.request);
     })
   );
 });