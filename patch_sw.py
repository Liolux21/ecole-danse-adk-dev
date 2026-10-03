import re

with open('portail.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("navigator.serviceWorker.register('/firebase-messaging-sw.js')", "navigator.serviceWorker.register('./firebase-messaging-sw.js')")

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("SW Path fixed in portail.html")
