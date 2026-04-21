// 【流用時の変更箇所】フェスごとにキャッシュ名（arabaki_2026_）を変更してください。
// script.js内の APP_CONFIG.storagePrefix と一致させると確実です。
const CACHE_NAME = 'arabaki_2026_cache-v3';

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) return response; 
            
            return fetch(event.request).then(fetchRes => {
                if (!fetchRes || fetchRes.status !== 200) {
                    return fetchRes;
                }
                const responseToCache = fetchRes.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseToCache);
                });
                return fetchRes;
            }).catch(() => {
                // オフライン時のフォールバック処理が必要な場合はここに記述
            });
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => {
                    // 【流用時の変更箇所】キャッシュをクリアするプレフィックスを変更してください
                    return name.startsWith('arabaki_2026_') && name !== CACHE_NAME;
                }).map(name => {
                    return caches.delete(name);
                })
            );
        })
    );
});