const CACHE_NAME = 'nara-offline-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './icon-180.png',
    './icon-512.png'
];

// حفظ الموقع في جوالك أول ما تفتحه
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// لما تطفي النت، هذا الكود يفتح الموقع من ذاكرة الجوال
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        }).catch(() => {
            return caches.match('./index.html');
        })
    );
});
