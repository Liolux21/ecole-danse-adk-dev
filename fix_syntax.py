import re
with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace(\"btn.textContent = 'Envoyer ma demande d\\\\'inscription';\", \"btn.textContent = \\\"Envoyer ma demande d'inscription\\\";\")
with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)
print('Fixed!')
