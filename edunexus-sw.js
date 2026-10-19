importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyCNitBlQJg-m9sz0efnQ5k52Am5xIH-phk",
    authDomain: "edunexusai-82f4e.firebaseapp.com",
    projectId: "edunexusai-82f4e",
    storageBucket: "edunexusai-82f4e.firebasestorage.app",
    messagingSenderId: "12213943222",
    appId: "1:12213943222:web:5fa5eafcc152f997749f17"
});

const messaging = firebase.messaging();
// 🚨 NO MANUAL CODE NEEDED! Firebase naya 'notification' payload khud handle karega.

// Revalidate the app document so installed windows do not reuse stale releases.
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const root = new URL(self.registration.scope);
  const isApp = url.origin === root.origin &&
    (url.pathname === root.pathname || url.pathname === root.pathname + 'index.html');
  if (event.request.method === 'GET' && event.request.mode === 'navigate' && isApp) {
    event.respondWith(fetch(event.request, { cache: 'no-cache' }));
  }
});
