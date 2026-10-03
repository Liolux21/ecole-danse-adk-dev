import re

with open('js/chat.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Add deleteDoc to imports
js = js.replace("addDoc, doc, getDoc, updateDoc", "addDoc, doc, getDoc, updateDoc, deleteDoc")

# 2. Add canDelete and delete button
old_row = """            row.innerHTML = `
                <div class="msg-bubble" style="max-width: 75%; padding: 10px 15px; border-radius: 15px; text-align: left; position: relative; word-break: break-word; ${isMe ? 'background: #CAA9A9; color: #fff; border-bottom-right-radius: 2px;' : 'background: #fff; border: 1px solid rgba(202, 169, 169, 0.4); color: #4A3E3E; border-bottom-left-radius: 2px;'}">
                    ${!isMe ? `<strong style="font-size:0.8rem; opacity:0.8; display: block; margin-bottom: 3px;">${msg.senderName || 'Utilisateur'}</strong>` : ''}
                    <div style="line-height: 1.4;">${msg.text || ''}</div>
                    <div class="msg-meta" style="font-size: 0.7rem; text-align: right; margin-top: 5px; opacity: 0.8;">${timeString}</div>
                </div>
            `;
            messagesContainer.appendChild(row);"""

new_row = """            const canDelete = isMe || (currentUser && currentUser.role === 'admin');
            row.innerHTML = `
                <div class="msg-bubble" style="max-width: 75%; padding: 10px 15px; border-radius: 15px; text-align: left; position: relative; word-break: break-word; ${isMe ? 'background: #CAA9A9; color: #fff; border-bottom-right-radius: 2px;' : 'background: #fff; border: 1px solid rgba(202, 169, 169, 0.4); color: #4A3E3E; border-bottom-left-radius: 2px;'}">
                    ${!isMe ? `<strong style="font-size:0.8rem; opacity:0.8; display: block; margin-bottom: 3px;">${msg.senderName || 'Utilisateur'}</strong>` : ''}
                    <div style="line-height: 1.4;">${msg.text || ''}</div>
                    <div class="msg-meta" style="font-size: 0.7rem; display: flex; justify-content: flex-end; align-items: center; gap: 8px; margin-top: 5px; opacity: 0.8;">
                        ${timeString}
                        ${canDelete ? `<span class="delete-msg-btn" data-msg-id="${docSnap.id}" style="cursor: pointer; opacity: 0.7;" title="Supprimer ce message">🗑️</span>` : ''}
                    </div>
                </div>
            `;
            messagesContainer.appendChild(row);"""

js = js.replace(old_row, new_row)

# 3. Add Event Listener for delete buttons
event_listener = """
    // Delete Message Delegation
    const msgsContainer = document.getElementById('chat-messages');
    if (msgsContainer) {
        msgsContainer.addEventListener('click', async (e) => {
            const btn = e.target.closest('.delete-msg-btn');
            if (btn) {
                const msgId = btn.getAttribute('data-msg-id');
                if (msgId && currentChatId) {
                    if (confirm("Voulez-vous vraiment supprimer ce message ?")) {
                        try {
                            await deleteDoc(doc(db, 'conversations', currentChatId, 'messages', msgId));
                        } catch(err) {
                            console.error("Erreur de suppression: ", err);
                            alert("Erreur lors de la suppression.");
                        }
                    }
                }
            }
        });
    }
"""

# Append event listener to DOMContentLoaded
js = js.replace("document.addEventListener('DOMContentLoaded', () => {", "document.addEventListener('DOMContentLoaded', () => {\n" + event_listener)


with open('js/chat.js', 'w', encoding='utf-8') as f:
    f.write(js)
