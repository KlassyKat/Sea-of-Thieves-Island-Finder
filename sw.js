const STATIC_CACHE = 'site-static';
const ASSETS = [
    '/',
    '/fonts',
    '/imgs',
    '/index.html',
    '/app.js',
    '/style.css',
    '/checkboc.css'
]

//Install Service Worker
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                cache.addAll(ASSETS);
            })
    )
});

//Activate Service Worker
self.addEventListener('activate', (e) => {
    console.log('Service Worker Active');
})

//Fetch Events
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
            .then(cacheRes => {
                return cacheRes || fetch(e.request);
            })
    )
})