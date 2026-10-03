import re

def fix_close_modal():
    with open('js/chat.js', 'r', encoding='utf-8') as f:
        chat = f.read()

    # The line is: if (window.closeModal) window.closeModal('modal-manage-chat');
    # But it appears in TWO places in chat.js: btnUpdateChatTitle and btnAddPersonChat.
    # We only want to remove it from btnUpdateChatTitle.
    
    # We can split the string or use regex
    pattern = r"(customName:\s*newTitle\s*\}\);\s*)if\s*\(window\.closeModal\)\s*window\.closeModal\('modal-manage-chat'\);"
    replacement = r"\1document.getElementById('active-chat-title').textContent = newTitle;\n            alert('Nom du groupe mis à jour !');"
    
    chat = re.sub(pattern, replacement, chat)
    
    with open('js/chat.js', 'w', encoding='utf-8') as f:
        f.write(chat)
        
    print("Fixed close modal")

fix_close_modal()
