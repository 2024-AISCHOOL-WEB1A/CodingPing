var offlineUrl = 'offline.html';

this.addEventListener('install', e => {
    e.waitUntil(
        caches.open('sw-v1').then(cache => cache.addAll([
            offlineUrl
        ]))
    )
});

this.addEventListener('fetch', e => {
    if (e.request.mode === 'navigate' || (e.request.method === 'GET' && e.request.headers.get('accept').includes('text/html'))) {
        e.respondWith(fetch(e.request.url).catch(() => {
            return caches.match(offlineUrl)
        }))
    }
    return
});
