import re

with open('js/chat.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace row.style = ... with row.setAttribute('style', ...)
old_row_style = "row.style = `display: flex; width: 100%; margin-bottom: 5px; justify-content: ${isMe ? 'flex-end' : 'flex-start'};`;"
new_row_style = "row.setAttribute('style', `display: flex; width: 100%; margin-bottom: 5px; justify-content: ${isMe ? 'flex-end' : 'flex-start'};`);"

js = js.replace(old_row_style, new_row_style)

with open('js/chat.js', 'w', encoding='utf-8') as f:
    f.write(js)
