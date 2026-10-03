import re

with open('js/chat.js', 'r', encoding='utf-8') as f:
    js = f.read()

js = js.replace("document.getElementById('chat-input');", "document.getElementById('msg-input');")

with open('js/chat.js', 'w', encoding='utf-8') as f:
    f.write(js)
