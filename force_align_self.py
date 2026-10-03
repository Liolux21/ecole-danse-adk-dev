import re

with open('js/chat.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Add align-self: stretch to row
old_style = "row.setAttribute('style', `display: flex; width: 100%; margin-bottom: 5px; justify-content: ${isMe ? 'flex-end' : 'flex-start'};`);"
new_style = "row.setAttribute('style', `display: flex; width: 100%; align-self: stretch; margin-bottom: 5px; justify-content: ${isMe ? 'flex-end' : 'flex-start'};`);"

js = js.replace(old_style, new_style)

with open('js/chat.js', 'w', encoding='utf-8') as f:
    f.write(js)
