import re

with open('js/chat.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace top-level const currentUser = ...
js = re.sub(r'const currentUser = window\.AUTH \? window\.AUTH\.currentUser : null;\n', '', js)

# In loadConversations
js = js.replace('const currentUser = window.currentUser;', 'const currentUser = window.AUTH ? window.AUTH.currentUser : null;')

# In switchChat -> isMe
js = js.replace('const isMe = msg.senderId === currentUser.uid;', 'const currentUser = window.AUTH ? window.AUTH.currentUser : null;\n            const isMe = currentUser && msg.senderId === currentUser.uid;')

with open('js/chat.js', 'w', encoding='utf-8') as f:
    f.write(js)
