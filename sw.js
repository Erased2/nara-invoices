const CACHE_NAME = 'nara-v3';
const ASSETS = [
    './',
    './index.html',
    './icon-180.png',
    './icon-512.png'
];

// حفظ الموقع في الذاكرة
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

// تفعيل النسخة الجديدة وحذف القديمة
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
        )).then(() => self.clients.claim())
    );
});

// لما تطفي النت، يجلب الصفحة من الذاكرة
self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(() => caches.match('./index.html'))
        );
    } else {
        event.respondWith(
            caches.match(event.request).then(res => res || fetch(event.request))
        );
    }
});
