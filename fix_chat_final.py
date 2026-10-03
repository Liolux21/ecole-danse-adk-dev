import re

with open('js/chat.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Replace currentUser.uid with currentUser.email
js = js.replace('currentUser.uid', 'currentUser.email')

# 2. Add btnSend logic inside DOMContentLoaded
send_logic = """
    // Send Message Logic
    const btnSendMsg = document.getElementById('btn-send-msg');
    const msgInput = document.getElementById('chat-input');
    
    if (btnSendMsg && msgInput) {
        btnSendMsg.addEventListener('click', async () => {
            const text = msgInput.value.trim();
            const currentUser = window.AUTH ? window.AUTH.currentUser : null;
            
            if (!text || !currentChatId || !currentUser) return;
            
            btnSendMsg.disabled = true;
            try {
                // Add message
                await addDoc(collection(db, 'conversations', currentChatId, 'messages'), {
                    text: text,
                    senderId: currentUser.email,
                    senderName: currentUser.name || currentUser.email,
                    timestamp: serverTimestamp()
                });
                
                // Update conversation lastMessage and time
                await updateDoc(doc(db, 'conversations', currentChatId), {
                    lastMessage: text,
                    lastMessageAt: serverTimestamp()
                });
                
                msgInput.value = '';
            } catch (e) {
                console.error("Error sending message: ", e);
                alert("Erreur lors de l'envoi.");
            }
            btnSendMsg.disabled = false;
        });

        msgInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                btnSendMsg.click();
            }
        });
    }
"""

js = js.replace('// New Chat logic', send_logic + '\n\n    // New Chat logic')

with open('js/chat.js', 'w', encoding='utf-8') as f:
    f.write(js)
