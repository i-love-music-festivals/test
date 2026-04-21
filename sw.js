// 【重要】フェスや年度を変える場合は、必ずこのキャッシュ名を変更してください。
// そうしないと、以前のフェスの古いデータがスマホに残り続けてしまいます。
const CACHE_NAME = 'arabaki_2026_cache-v3';

// 1. スマホ側からのデータ取得要求（fetch）を監視します
self.addEventListener('fetch', event => {
    event.respondWith(
        // まずはスマホ内に保存されているキャッシュ（過去のデータ）を探します
        caches.match(event.request).then(response => {
            // キャッシュがあれば、インターネットに繋がずそれを素早く返します
            if (response) return response; 
            
            // キャッシュがなければ、通常通りインターネットから取得します
            return fetch(event.request).then(fetchRes => {
                if (!fetchRes || fetchRes.status !== 200) {
                    return fetchRes;
                }
                // 取得したデータを、次回オフラインでも使えるようにキャッシュに保存します
                const responseToCache = fetchRes.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseToCache);
                });
                return fetchRes;
            }).catch(() => {
                // 電波がなく、キャッシュもない場合は何もしません（エラーページ等を見せたい場合はここに記述）
            });
        })
    );
});

// 2. 新しいService Workerが有効化された時の処理
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => {
                    // 古いバージョンのキャッシュ（arabaki_2026_cache-v1 など）を削除し、スマホの容量を空けます
                    return name.startsWith('arabaki_2026_') && name !== CACHE_NAME;
                }).map(name => {
                    return caches.delete(name);
                })
            );
        })
    );
});