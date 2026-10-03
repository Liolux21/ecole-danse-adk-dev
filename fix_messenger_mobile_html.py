import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add ID to sidebar and chat area if they don't have one
old_sidebar = '<div style="width: 320px; background: #f8f9fa; border-right: 1px solid var(--border); display: flex; flex-direction: column;">'
new_sidebar = '<div id="messenger-sidebar" style="width: 320px; background: #f8f9fa; border-right: 1px solid var(--border); display: flex; flex-direction: column;">'
html = html.replace(old_sidebar, new_sidebar)

old_chat_area = '<div style="flex: 1; display: flex; flex-direction: column; background: #ffffff;">'
new_chat_area = '<div id="messenger-chat-area" style="flex: 1; display: flex; flex-direction: column; background: #ffffff;">'
html = html.replace(old_chat_area, new_chat_area)

# 2. Add back button to the right header
old_right_header_div = '<div style="display: flex; align-items: center; gap: 1rem;">\n          <h3 id="active-chat-title"'
new_right_header_div = '<div style="display: flex; align-items: center; gap: 1rem;">\n          <button id="btn-back-to-list" style="background: none; border: none; font-size: 1.5rem; color: #CAA9A9; cursor: pointer; display: none;">&larr;</button>\n          <h3 id="active-chat-title"'
html = html.replace(old_right_header_div, new_right_header_div)

# bump cache
html = re.sub(r'src="js/chat.js\?v=\d+"', 'src="js/chat.js?v=16"', html)
html = re.sub(r'href="css/style.css\?v=\d+"', 'href="css/style.css?v=202"', html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
