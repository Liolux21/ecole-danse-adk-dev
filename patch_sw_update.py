import re

with open('portail.html', 'r', encoding='utf-8') as f:
    content = f.read()

old_code = """navigator.serviceWorker.register('./firebase-messaging-sw.js')
          .then(function (registration) {
            console.log('[SW] Service Worker enregistré avec succès, scope:', registration.scope);
          })"""

new_code = """navigator.serviceWorker.register('./firebase-messaging-sw.js')
          .then(function (registration) {
            console.log('[SW] Service Worker enregistré avec succès, scope:', registration.scope);
            registration.update();
          })"""

content = content.replace(old_code, new_code)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated SW registration")
