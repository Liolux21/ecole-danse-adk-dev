import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

js = js.replace("showToast('✅ Appel et heures sauvegardés !', 'success');, 'success');", "showToast('✅ Appel et heures sauvegardés !', 'success');")
# Also in case it was already mangled by PowerShell, I'll use regex just in case
js = re.sub(r"showToast\('✅ Appel et heures sauvegardés !', 'success'\);, 'success'\);", r"showToast('✅ Appel et heures sauvegardés !', 'success');", js)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
