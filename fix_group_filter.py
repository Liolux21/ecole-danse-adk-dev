import re

def fix_group_filter():
    with open('js/chat.js', 'r', encoding='utf-8') as f:
        chat = f.read()

    old_filter = """            if (currentUser.role !== 'admin') {
                if (!data.isGroup) {
                    if (!data.participants || !data.participants.includes(currentUser.email)) return;
                } else {
                    if (!myGroups.includes(data.targetGroup)) return;
                }
            }"""
            
    new_filter = """            if (currentUser.role !== 'admin') {
                if (!data.isGroup) {
                    if (!data.participants || !data.participants.includes(currentUser.email)) return;
                } else {
                    if (!myGroups.includes(data.targetGroup) && (!data.participants || !data.participants.includes(currentUser.email))) return;
                }
            }"""

    chat = chat.replace(old_filter, new_filter)
    
    with open('js/chat.js', 'w', encoding='utf-8') as f:
        f.write(chat)
        
    print("Fixed")

fix_group_filter()
