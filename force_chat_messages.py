import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix chat-messages inline style
old_cm = '<div id="chat-messages" style="flex:1; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; gap: 0.8rem; background: #fbfbfb;">'
new_cm = '<div id="chat-messages" style="flex:1; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; align-items: stretch; width: 100%; gap: 0.8rem; background: #fbfbfb; box-sizing: border-box;">'
html = html.replace(old_cm, new_cm)

html = re.sub(r'src="js/chat.js\?v=\d+"', 'src="js/chat.js?v=20"', html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
