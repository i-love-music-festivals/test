// ★バージョン名を v3 に変更
const CACHE_NAME = 'arabaki_2026_cache-v3'; // script.jsのprefixと合わせる

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // キャッシュがあればそれを返す（オフライン時はここが動く）
            if (response) return response; 
            
            // キャッシュになければネットワークへリクエスト
            return fetch(event.request).then(fetchRes => {
                if (!fetchRes || fetchRes.status !== 200 || fetchRes.type !== 'basic') {
                    return fetchRes;
                }
                // 新しく取得したリソースも動的にキャッシュに追加しておく
                const responseToCache = fetchRes.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseToCache);
                });
                return fetchRes;
            }).catch(() => {
                // オフラインかつキャッシュにない場合のフォールバック（必要に応じて）
            });
        })
    );
});

self.addEventListener('activate', event => {
    // 古いバージョンのキャッシュを削除する処理
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => {
                    return name.startsWith('arabaki_2026_') && name !== CACHE_NAME;
                }).map(name => {
                    return caches.delete(name);
                })
            );
        })
    );
});