importScripts('/cache-polyfill.js')

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('airhorner')
      .then(cache => cache.addAll([
        '/',
        '/index.html',
        '/index.html?homescreen=1',
        '/?homescreen=1',
        '/styles/main.css',
        '/scripts/main.min.js',
        '/sounds/airhorn.mp3'
      ]))
  )
})

self.addEventListener('fetch', event => {
  console.log(event.request.url)

  event.respondWith(caches.match(event.request)
    .then(response => response || fetch(event.request)))
})

