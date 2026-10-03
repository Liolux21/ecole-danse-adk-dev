import re

def fix_manage_chat():
    with open('js/chat.js', 'r', encoding='utf-8') as f:
        chat = f.read()

    # 1. Remove closeModal from btnUpdateChatTitle
    old_rename = """                customName: newTitle
            });
            if (window.closeModal) window.closeModal('modal-manage-chat');
        } catch(e) {"""
    
    new_rename = """                customName: newTitle
            });
            document.getElementById('active-chat-title').textContent = newTitle;
            alert("Nom du groupe mis à jour !");
        } catch(e) {"""
        
    chat = chat.replace(old_rename, new_rename)
    
    # 2. Fix senderId in btnAddPersonChat
    old_add = """              await addDoc(collection(db, 'conversations', currentChatId, 'messages'), {
                  text: `${currentUser ? (currentUser.name || currentUser.firstname) : 'Quelqu\\'un'} a ajoutǸ ${window.selectedManageOtoUser.name}  la discussion.`,
                  senderId: 'system',
                  senderName: 'Systme',
                  timestamp: serverTimestamp()
              });"""
              
    new_add = """              await addDoc(collection(db, 'conversations', currentChatId, 'messages'), {
                  text: `${currentUser ? (currentUser.name || currentUser.firstname) : 'Quelqu\\'un'} a ajouté ${window.selectedManageOtoUser.name} à la discussion.`,
                  senderId: currentUser ? currentUser.email : 'system',
                  senderName: 'Système',
                  timestamp: serverTimestamp()
              });"""
              
    chat = chat.replace(old_add, new_add)
    
    # Let's also fix the encoding character issues I just introduced or fixed
    chat = chat.replace("a ajoutǸ", "a ajouté")
    chat = chat.replace(" la discussion", "à la discussion")
    chat = chat.replace("Systme", "Système")
    
    with open('js/chat.js', 'w', encoding='utf-8') as f:
        f.write(chat)
        
    print("Fixed manage chat")

fix_manage_chat()
