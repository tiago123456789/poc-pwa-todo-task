var CACHE_NAME = 'todo-app';

self.addEventListener('install', function (event) {
    
});

// Cache files
self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                return response;
            } else {
                return fetch(event.request)
                    .then(function (res) {
                        return caches.open(CACHE_NAME).then(function (cache) {
                            cache.put(event.request.url, res.clone());
                            return res;
                        });
                    })

            }
        })
    );
});

// Delete files cached when new service worker is installed
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys()
            .then(function (keyList) {
                return Promise.all(keyList.map(function (key) {
                    return caches.delete(key);

                }));
            })
    );
    return self.clients.claim();
});

setInterval(() => {
    var options = {
        body: 'Check if exist someone task open.',
        icon: '/logo192.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: '2'
        },
        actions: [
          {action: 'explore', title: 'Explore this new world',
            icon: 'images/checkmark.png'},
          {action: 'close', title: 'Close',
            icon: 'images/xmark.png'},
        ]
      };
        self.registration.showNotification('Task TODO', options)
}, 5000)