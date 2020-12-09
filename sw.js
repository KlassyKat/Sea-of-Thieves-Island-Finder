const STATIC_CACHE = 'site-static';
const ASSETS = [
    '/',
    // '/fonts',
    // '/imgs',
    './index.html',
    './app.js',
    './style.css',
    './checkbox.css'
]

//Install Service Worker
self.addEventListener('install', (evt) => {
    evt.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                cache.addAll(ASSETS);
            })
    )
});

//Activate Service Worker
self.addEventListener('activate', (evt) => {
    console.log('Service Worker Active');
})

//Fetch Events
self.addEventListener('fetch', (evt) => {
    evt.respondWith(
        caches.match(evt.request)
            .then(cacheRes => {
                return cacheRes || fetch(evt.request);
            })
    )
})