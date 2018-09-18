const version = '0.6.13'
const cacheName = `airhorner-${version}`

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([
        '/',
        '/index.html',
        '/index.html?homescreen=1',
        '/?homescreen=1',
        '/styles/main.css',
        '/scripts/main.min.js',
        '/sounds/airhorn.mp3'
      ])
        .then(() => self.skipWaiting())
      )
  )
})

self.addEventListener('activate', event => event.waitUntil(self.clients.claim()))

self.addEventListener('fetch', event => event.respondWith(
  caches.open(cacheName)
    .then(cache => cache.match(event.request, {ignoreSearch: true}))
    .then(response => response || fetch(event.request))))

