import os

with open('portail.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add CSS
css_marker = "/* MESSENGER APP */"
css_addition = "\n      @media (min-width: 769px) { #btn-photo { display: none !important; } }"
if css_marker in content and css_addition not in content:
    content = content.replace(css_marker, css_marker + css_addition)

# 2. Add button and input
btn_attach_html = '''<button id="btn-attach" title="Joindre un fichier" style="background:none;border:none;cursor:pointer;padding:0.2rem 0.4rem;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:var(--text-color);" onmouseenter="this.style.background='#f0f0f0'" onmouseleave="this.style.background='none'"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg></button>'''

new_btn_photo_html = '''<button id="btn-photo" title="Prendre/Choisir une photo" style="background:none;border:none;cursor:pointer;padding:0.2rem 0.4rem;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:var(--text-color);" onmouseenter="this.style.background='#f0f0f0'" onmouseleave="this.style.background='none'"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg></button>'''

if 'id="btn-photo"' not in content:
    content = content.replace(btn_attach_html, btn_attach_html + '\n          ' + new_btn_photo_html)

file_input_html = '''<input type="file" id="chat-file-input" accept="image/*,.pdf,.doc,.docx,.xls,.xlsx" style="display:none;">'''
photo_input_html = '''<input type="file" id="chat-photo-input" accept="image/*" style="display:none;">'''

if 'id="chat-photo-input"' not in content:
    content = content.replace(file_input_html, file_input_html + '\n        ' + photo_input_html)

# 3. Bump JS cache to v=47
import re
content = re.sub(r'js/chat\.js\?v=\d+', 'js/chat.js?v=47', content)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Restored features in portail.html safely.")
