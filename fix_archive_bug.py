import re

def fix_archive_bug():
    with open('js/chat.js', 'r', encoding='utf-8') as f:
        chat = f.read()

    old_code = """                    // Just add the message to the existing conversation
                    await updateDoc(doc(db, 'conversations', existingConvId), {
                        lastMessage: firstMsg,
                        lastMessageAt: serverTimestamp()
                    });"""
                    
    new_code = """                    // Just add the message to the existing conversation
                    await updateDoc(doc(db, 'conversations', existingConvId), {
                        lastMessage: firstMsg,
                        lastMessageAt: serverTimestamp(),
                        archivedBy: []
                    });"""
                    
    chat = chat.replace(old_code, new_code)
    
    with open('js/chat.js', 'w', encoding='utf-8') as f:
        f.write(chat)
        
    print("Fixed")

fix_archive_bug()
