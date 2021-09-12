var CACHE_NAME = 'otimigas-app';

var urlsToCache = [
    '/',
    '/?',
    "/asset-manifest.json",
    "/static/**/*.js",
    "/static/js/vendors~main.chunk.js",
    '/static/js/bundle.js',
    '/static/js/main.chunk.js',
    '/static/js/1.chunk.js',
    '/static/js/0.chunk.js',
    '/favicon.ico',
    '/css?family=Open+Sans',
    '/icon?family=Material+Icons',
    "/manifest.json",
    "/logo192.png",
    "/logo512.png"
];

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    
    event.respondWith(

        caches.match(event.request)
            .then(function (response) {
                console.log(event)
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
            )
    );
});

