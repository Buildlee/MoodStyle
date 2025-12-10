const CACHE_NAME = 'moodstyle-v1';
const ASSETS_TO_CACHE = [
    './index.html',
    './css/styles.css',
    './js/main.js',
    './js/utils/colorMapping.js',
    './js/data/mockData.js',
    './js/components/MoodWheel.js',
    './js/components/Lookbook.js',
    './js/components/Calendar.js',
    './manifest.json'
];

// Install Event: Cache Files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Fetch Event: Serve from Cache -> Network Fallback
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Activate Event: Cleanup Old Caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
});
