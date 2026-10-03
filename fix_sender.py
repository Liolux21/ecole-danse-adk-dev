import re

def fix_sender():
    with open('js/chat.js', 'r', encoding='utf-8') as f:
        chat = f.read()

    chat = re.sub(r"senderId:\s*'system'", "senderId: currentUser.email", chat)
    
    with open('js/chat.js', 'w', encoding='utf-8') as f:
        f.write(chat)
        
    print("Fixed senderId")

fix_sender()
