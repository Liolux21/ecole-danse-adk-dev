// Script import pour les Service Workers (Firebase compat)
// Version alignée avec firebase-config.js pour éviter les conflits
importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js");

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

// Gestion des messages en arrière-plan (app fermée / en background)
// Note: sur iOS PWA, le SDK FCM N'affiche PAS automatiquement la notification
// même si payload.notification est présent — on doit toujours appeler showNotification.
// Pour éviter les doublons, on utilise un "tag" unique : le navigateur remplacera
// automatiquement une notification existante avec le même tag au lieu d'en créer une nouvelle.
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Message reçu en background:', payload);

  const notificationTitle = payload.notification?.title || payload.data?.title || 'Nouvelle annonce ADK';
  const notificationBody  = payload.notification?.body  || payload.data?.body  || payload.data?.content || '';

  // Tag unique basé sur le contenu — empêche les doublons si le push arrive deux fois
  const uniqueTag = payload.data?.annonceId
    || payload.data?.conversationId
    || (notificationTitle + '_' + Date.now());

  const notificationOptions = {
    body: notificationBody,
    icon: '/img/apple-touch-icon.png',
    badge: '/img/favicon.ico',
    tag: uniqueTag,
    renotify: false,
    data: payload.data || {}
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Gestion du clic sur la notification (ouvre l'app)
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
      for (const client of clientList) {
        if (client.url.includes('portail.html') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/portail.html');
      }
    })
  );
});
