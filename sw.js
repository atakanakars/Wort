// Ağ öncelikli önbellek: internet varsa her zaman en yeni dosyalar; yoksa (ya da çok yavaşsa) önbellekten çevrimdışı açılır.
const CACHE = 'wort-v3';
const ASSETS = ['./', './index.html', './app.js', './config.js', './styles.css', './words.json',
  './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const fromCache = () => cache.match(req, { ignoreSearch: true }).then((r) => r || (req.mode === 'navigate' ? cache.match('./index.html') : null));
    const net = fetch(req, { cache: 'no-cache' }).then((r) => { if (r && r.ok) cache.put(req, r.clone()); return r; });
    try {
      const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error('yavaş')), 4000));
      return await Promise.race([net, timeout]);
    } catch {
      const hit = await fromCache();
      if (hit) { net.catch(() => {}); return hit; }
      try { return await net; } catch { return new Response('Çevrimdışı ve önbellekte yok.', { status: 503 }); }
    }
  })());
});
