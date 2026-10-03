import re

with open('firebase-messaging-sw.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the onBackgroundMessage block
old_block = """messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Message re\u00e7u en background:', payload);

  const notificationTitle = payload.notification?.title || payload.data?.title || 'Nouvelle annonce ADK';
  const notificationOptions = {
    body: payload.notification?.body || payload.data?.body || payload.data?.content || '',
    icon: '/img/apple-touch-icon.png',
    badge: '/img/favicon.ico',
    tag: payload.data?.annonceId || 'adk-notif',   // \u01f8vite les doublons
    renotify: false,
    data: payload.data || {}
  };

  // event.waitUntil est g\u01f8r\u01f8 en interne par le SDK compat,
  // mais on enveloppe dans une promise explicite pour iOS/Safari
  return self.registration.showNotification(notificationTitle, notificationOptions);
});"""

new_block = """messaging.onBackgroundMessage((payload) => {
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
});"""

content = re.sub(r"messaging\.onBackgroundMessage\(\(payload\).*?\}\);\n", new_block + "\n", content, flags=re.DOTALL)

with open('firebase-messaging-sw.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated Service Worker")
