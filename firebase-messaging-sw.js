// 🔥 EDUNEXUS BACKGROUND NOTIFICATION ENGINE 🔥
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');

// 🔑 TERI ASLI FIREBASE CONFIG
firebase.initializeApp({
    apiKey: "AIzaSyCNitBlQJg-m9sz0efnQ5k52Am5xIH-phk",
    authDomain: "edunexusai-82f4e.firebaseapp.com",
    projectId: "edunexusai-82f4e",
    storageBucket: "edunexusai-82f4e.firebasestorage.app",
    messagingSenderId: "12213943222",
    appId: "1:12213943222:web:5fa5eafcc152f997749f17"
});

const messaging = firebase.messaging();

// जब ऐप बंद होगा या बैकग्राउंड में होगा, तब ये लिसनर काम करेगा
messaging.onBackgroundMessage((payload) => {
  console.log('[EduNexus SW] Background Message Received: ', payload);
  // Yahan payload.notification ki jagah payload.data aayega!
    const notificationTitle = payload.data.title;
    const notificationOptions = {
      body: payload.data.body,
      icon: payload.data.icon, // tera EduNexus ka logo
      badge: 'https://i.ibb.co/Kz0LvSg9/logo.png',
      requireInteraction: true // jab tak click nahi karega, notification hatega nahi
    };
  
  self.registration.showNotification(notificationTitle, notificationOptions);
});