const CACHE_NAME = 'edunexus-live-v2'; // 🔥 Naya update turant push karne ke liye v4

const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// 1. INSTANT INSTALL: Naya update aate hi turant install (No Waiting)
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 2. AUTO-CLEAN: Purane kachre aur caches ko turant delete maaro
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('🧹 KX Core: Old cache cleared ->', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. THE MAGIC (Network First with Bulletproof Safety)
self.addEventListener('fetch', (event) => {
  // 🔥 GET ke alawa kisi request ko mat chhedo (Firebase/AI API ekdam safe)
  if (event.request.method !== 'GET') {
    return;
  }

  // 🔥 Chrome extensions wagaira ke errors ko block karo
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // 🔥 ULTIMATE SAFETY FIX: Sirf successful data (200 OK) ko hi cache me dalo. Error pages cache mat karo!
        if (response && response.status === 200) {
          const resClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resClone));
        }
        return response;
      })
      .catch(() => {
        // Agar user offline (No Internet) hai, tabhi background memory se chalne do
        return caches.match(event.request);
      })
  );
});
