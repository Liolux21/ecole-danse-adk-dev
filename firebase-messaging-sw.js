// Script import pour les Service Workers (Firebase 9+ compat)
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyBPOPRg9AxDqojhkskOIRO-4AHxvLICP7Q",
  authDomain: "adk-vitrine.firebaseapp.com",
  projectId: "adk-vitrine",
  storageBucket: "adk-vitrine.firebasestorage.app",
  messagingSenderId: "907323574295",
  appId: "1:907323574295:web:4dd20633922364c5903452",
  measurementId: "G-E5KSD303HQ"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification?.title || 'Nouvelle annonce';
  const notificationOptions = {
    body: payload.notification?.body || payload.data?.content || '',
    icon: '/img/favicon.ico', // ou l'icone de l'école
    badge: '/img/favicon.ico',
    data: payload.data
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
