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
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Message reçu en background:', payload);

  // Si le backend envoie un bloc "notification", le SDK Firebase affiche automatiquement 
  // la notification. On sort immédiatement pour éviter de l'afficher en double.
  if (payload.notification) {
    return;
  }

  const notificationTitle = payload.data?.title || 'Nouvelle annonce ADK';
  const notificationOptions = {
    body: payload.data?.body || payload.data?.content || '',
    icon: '/img/apple-touch-icon.png',
    badge: '/img/favicon.ico',
    tag: payload.data?.annonceId || 'adk-notif',
    renotify: false,
    data: payload.data || {}
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Fallback : listener push natif pour les cas où FCM SDK ne traite pas le message
// (notamment certaines versions de Safari/iOS WebKit)
self.addEventListener('push', function (event) {
  // Si le SDK FCM a déjà traité le message, ne pas doubler
  if (!event.data) return;

  let data = {};
  try {
    data = event.data.json();
  } catch (e) {
    data = { notification: { title: 'ADK App', body: event.data.text() } };
  }

  // Si c'est un payload FCM standard avec notification, le SDK le gère déjà.
  // Ce fallback gère uniquement les payloads data-only.
  const hasNotificationField = data.notification?.title;
  if (hasNotificationField) return; // Le SDK FCM s'en charge

  const title = data.data?.title || data.notification?.title || 'Nouvelle annonce ADK';
  const options = {
    body: data.data?.body || data.notification?.body || '',
    icon: '/img/apple-touch-icon.png',
    badge: '/img/favicon.ico',
    tag: data.data?.annonceId || 'adk-notif',
    data: data.data || {}
  };

  event.waitUntil(self.registration.showNotification(title, options));
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
