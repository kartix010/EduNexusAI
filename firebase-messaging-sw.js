// 🔥 EDUNEXUS BACKGROUND NOTIFICATION ENGINE 🔥
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

// 🚨 MANUAL OVERRIDE (Forcing the phone to ring)
messaging.onBackgroundMessage((payload) => {
    console.log('[EduNexus SW] Incoming Missile:', payload);
    const title = payload.data.title || "EduNexus Admin 🚨";
    const options = {
        body: payload.data.body || "System Alert!",
        icon: payload.data.icon || "https://i.ibb.co/Kz0LvSg9/logo.png",
        badge: "https://i.ibb.co/Kz0LvSg9/logo.png",
        vibrate: [200, 100, 200, 100, 200], // 🔥 Phone ko vibrate karega!
        requireInteraction: true
    };
    self.registration.showNotification(title, options);
});
