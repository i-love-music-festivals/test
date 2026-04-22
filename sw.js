// 【流用時の変更箇所】フェスごとにキャッシュ名（プレフィックス + バージョン）を変更してください。
// 内容を更新した際は、ここの 'v4' を 'v5' のように変えると確実です。
const CACHE_NAME = 'arabaki_2026_cache-v4';

// インストール時に、古いService Workerを待たずにすぐ新しいものをアクティブにする
self.addEventListener('install', event => {
    self.skipWaiting();
});

// アクティブになったら、古いバージョンのキャッシュを削除する
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => {
                    return name.startsWith('arabaki_2026_') && name !== CACHE_NAME;
                }).map(name => {
                    return caches.delete(name);
                })
            );
        }).then(() => self.clients.claim()) // すぐに制御を開始する
    );
});

// fetchイベント：Stale-While-Revalidate（キャッシュを表示しつつ、裏で更新）
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            
            // ネットワークへ最新のデータを取得しに行く処理（非同期）
            const fetchPromise = fetch(event.request).then(networkResponse => {
                // 正常に取得できたら、裏側でこっそりキャッシュを上書きする
                if (networkResponse && networkResponse.status === 200) {
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, networkResponse.clone());
                    });
                }
                return networkResponse;
            }).catch(() => {
                // オフライン時はエラーを出さずに何もしない
            });

            // キャッシュがあれば「まずはキャッシュ」を返し、無ければ「ネットワーク通信の結果」を待つ
            // ユーザーには一瞬でキャッシュが表示され、裏側で次回用の最新データが保存されます。
            return cachedResponse || fetchPromise;
        })
    );
});