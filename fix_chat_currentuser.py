import re

with open('js/chat.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Fix the missing currentUser inside btnCreateChatConfirm event listener
old_check = "if (!title || !firstMsg || !currentUser || !target) return;"
new_check = "const currentUser = window.AUTH ? window.AUTH.currentUser : null;\n            if (!title || !firstMsg || !currentUser || !target) return;"
js = js.replace(old_check, new_check)

# Also fix inside sendMsg
# Search for sendMsg
js = js.replace('if (!text || !currentChatId || !window.AUTH || !window.AUTH.currentUser) return;', 'const currentUser = window.AUTH ? window.AUTH.currentUser : null;\n            if (!text || !currentChatId || !currentUser) return;')

with open('js/chat.js', 'w', encoding='utf-8') as f:
    f.write(js)
