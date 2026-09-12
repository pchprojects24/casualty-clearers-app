const CACHE = 'cct-info-hub-v3';
const APP_SHELL = ['./', './index.html', './manifest.webmanifest', './app-icon.svg'];

// How long to wait for the network before falling back to the cached page.
// Long enough to pick up a new deployment, short enough that a weak or
// intermittent connection does not hold up the app.
const NAVIGATION_TIMEOUT = 3000;

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))),
  );
  self.clients.claim();
});

const store = (request, response) => {
  if (response.ok && new URL(request.url).origin === self.location.origin) {
    const copy = response.clone();
    caches.open(CACHE).then((cache) => cache.put(request, copy));
  }
  return response;
};

// The page itself is fetched from the network whenever the network answers in
// time, so a new deployment shows up on the next load rather than the one
// after it. The cached copy still serves offline, and still serves quickly
// when the connection is poor.
const navigationResponse = async (request) => {
  const cached = (await caches.match(request)) || (await caches.match('./index.html'));
  const network = fetch(request).then((response) => store(request, response));
  if (!cached) return network;
  return Promise.race([
    network.catch(() => cached),
    new Promise((resolve) => { setTimeout(() => resolve(cached), NAVIGATION_TIMEOUT); }),
  ]);
};

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  if (event.request.mode === 'navigate') {
    event.respondWith(navigationResponse(event.request));
    return;
  }

  // Build assets carry a content hash in their name, so a cached copy is
  // always the right one for the page that asked for it.
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fresh = fetch(event.request)
        .then((response) => store(event.request, response))
        .catch(() => cached);
      return cached || fresh;
    }),
  );
});
