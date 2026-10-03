import re

with open('js/chat.js', 'r', encoding='utf-8') as f:
    js = f.read()

new_chat_logic = """
    // New Chat logic
    const btnNewChat = document.getElementById('btn-new-chat');
    if (btnNewChat) {
        btnNewChat.addEventListener('click', () => {
            if (window.openModal) window.openModal('modal-new-chat');
        });
    }

    const btnCreateChatConfirm = document.getElementById('btn-create-chat-confirm');
    if (btnCreateChatConfirm) {
        btnCreateChatConfirm.addEventListener('click', async () => {
            const titleInput = document.getElementById('new-chat-title');
            const title = titleInput.value.trim();
            const currentUser = window.AUTH ? window.AUTH.currentUser : null;
            if (!title || !currentUser) return;
            
            btnCreateChatConfirm.disabled = true;
            btnCreateChatConfirm.textContent = "Création...";
            
            try {
                const newConvRef = await addDoc(collection(db, 'conversations'), {
                    title: title,
                    participants: [currentUser.uid], // Admin can see it anyway if we query all
                    isGroup: false,
                    lastMessage: "Conversation créée",
                    lastMessageAt: serverTimestamp()
                });
                
                if (window.closeModal) window.closeModal('modal-new-chat');
                titleInput.value = '';
                
                // switch to this chat
                window.switchChat(newConvRef.id, title);
            } catch(e) {
                console.error("Error creating chat", e);
                alert("Erreur lors de la création.");
            }
            
            btnCreateChatConfirm.disabled = false;
            btnCreateChatConfirm.textContent = "Créer la discussion";
        });
    }
"""

js = js.replace('document.addEventListener(\'DOMContentLoaded\', () => {', 'document.addEventListener(\'DOMContentLoaded\', () => {\n' + new_chat_logic)

with open('js/chat.js', 'w', encoding='utf-8') as f:
    f.write(js)
