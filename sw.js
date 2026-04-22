// 【重要】サイトを更新したら、この数字（v3）を v4, v5 と増やしてください。
// これにより、ブラウザが新しいバージョンが出たと認識します。
const CACHE_NAME = 'arabaki_2026_cache-v3';

// サービスワーカーがインストールされた時の処理
self.addEventListener('install', event => {
    // 新しいバージョンが見つかったら、古いのが閉じるのを待たずにすぐ交代する設定
    event.waitUntil(self.skipWaiting());
});

// サービスワーカーが有効になった時の処理
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => {
                    // 現在のキャッシュ名（CACHE_NAME）以外の古いキャッシュを削除する
                    return name.startsWith('arabaki_2026_') && name !== CACHE_NAME;
                }).map(name => {
                    return caches.delete(name);
                })
            );
        }).then(() => {
            // ページを操作する権利をすぐに手に入れる
            return self.clients.claim();
        })
    );
});

// 画面からリクエスト（画像やHTMLをちょうだいという命令）が来た時の処理
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            // 1. まずはキャッシュにあるものをすぐに返す（これで爆速で表示される）
            const fetchPromise = fetch(event.request).then(networkResponse => {
                // 2. 同時に裏でネットワークに最新版を取りに行く
                if (networkResponse && networkResponse.status === 200) {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        // 3. 最新版をキャシュに保存しておく（次回の表示で最新になる）
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            }).catch(() => {
                // オフラインなどで取得できなかった場合は何もしない
            });

            // キャッシュがあればそれを返し、なければネットワークの結果を待つ
            return cachedResponse || fetchPromise;
        })
    );
});