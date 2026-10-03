import re

def update_chat_icons():
    with open('js/chat.js', 'r', encoding='utf-8') as f:
        chat = f.read()

    # 1. Update btnArchiveChat.innerHTML in window.switchChat
    # Note: Because of encoding in powershell vs python, I'll use regex to match safely
    
    # We look for: btnArchiveChat.innerHTML = showArchivedConversations ? '...' : '...';
    archive_pattern = r"btnArchiveChat\.innerHTML = showArchivedConversations \? '[^']*' : '[^']*';"
    archive_svg = """btnArchiveChat.innerHTML = showArchivedConversations ? 
        '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="9 21 9 10 3 10 3 21"></polyline><rect x="1" y="3" width="22" height="5"></rect><polyline points="15 15 18 12 21 15"></polyline><line x1="18" y1="21" x2="18" y2="12"></line></svg>' : 
        '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>';"""
    
    chat = re.sub(archive_pattern, archive_svg.replace('\n', ''), chat)

    # 2. Update btnToggleArchived.innerHTML
    toggle_pattern = r"btnToggleArchived\.innerHTML = showArchivedConversations \? '[^']*' : '[^']*';"
    toggle_svg = """btnToggleArchived.innerHTML = showArchivedConversations ? 
        '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="margin-right:4px;"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> Retour aux discussions' : 
        '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="margin-right:4px;"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg> Voir les archives';"""
    
    chat = re.sub(toggle_pattern, toggle_svg.replace('\n', ''), chat)
    
    with open('js/chat.js', 'w', encoding='utf-8') as f:
        f.write(chat)
        
    print("chat.js updated")

update_chat_icons()
