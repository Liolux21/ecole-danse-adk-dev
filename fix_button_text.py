import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace Espace Prof (Appel) with Espace Prof
js = js.replace("🔄 Espace Prof (Appel)", "🔄 Espace Prof")

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
