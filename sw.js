const CACHE_NAME = 'nara-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './icon-180.png',
    './icon-512.png'
];

// حفظ الملفات عند تثبيت التطبيق
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// استدعاء الملفات المحفوظة عند انقطاع النت
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        }).catch(() => {
            return caches.match('./index.html');
        })
    );
});
