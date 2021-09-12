
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').then(function (registration) {
        const data = {
          type: 'CACHE_URLS',
          payload: [
            window.location.href,
            ...performance.getEntriesByType('resource').map((r) => r.name)
          ]
        };
        registration.installing.postMessage(data);
      }).catch(function (err) { });
    });
  }
}

