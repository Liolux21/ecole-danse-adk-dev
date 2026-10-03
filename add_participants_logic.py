import re

def add_participants_logic():
    with open('js/chat.js', 'r', encoding='utf-8') as f:
        chat = f.read()

    # 1. Update window.openManageChat
    old_open = """    getDoc(doc(db, 'conversations', currentChatId)).then(snap => {
        if (snap.exists()) {
            const data = snap.data();
            if (data.customName) {
                document.getElementById('manage-chat-title').value = data.customName;
            }
        }
    });"""
    
    new_open = """    getDoc(doc(db, 'conversations', currentChatId)).then(snap => {
        if (snap.exists()) {
            const data = snap.data();
            if (data.customName) {
                document.getElementById('manage-chat-title').value = data.customName;
            }
            
            // Render participants
            const partContainer = document.getElementById('manage-chat-participants');
            if (partContainer) {
                partContainer.innerHTML = '';
                if (data.participants && Array.isArray(data.participants)) {
                    data.participants.forEach(email => {
                        const div = document.createElement('div');
                        div.style.display = 'flex';
                        div.style.justifyContent = 'space-between';
                        div.style.alignItems = 'center';
                        div.style.padding = '0.25rem 0';
                        div.style.borderBottom = '1px solid #eee';
                        
                        const nameSpan = document.createElement('span');
                        nameSpan.textContent = email;
                        // Optional: try to resolve name via window.DATA
                        if (window.DATA) {
                            let resolved = null;
                            if (window.DATA.users) resolved = window.DATA.users.find(u => u.email === email);
                            if (!resolved && window.DATA.students) resolved = window.DATA.students.find(s => s.contactEmail === email || s.parentId === email);
                            if (resolved) {
                                nameSpan.textContent = (resolved.name || (resolved.firstname + ' ' + resolved.lastname)).trim() + ` (${email})`;
                            }
                        }
                        
                        const removeBtn = document.createElement('button');
                        removeBtn.textContent = 'Retirer';
                        removeBtn.className = 'btn btn-outline btn-sm';
                        removeBtn.style.padding = '2px 6px';
                        removeBtn.style.fontSize = '0.8rem';
                        removeBtn.style.color = '#dc3545';
                        removeBtn.style.borderColor = '#dc3545';
                        
                        const currentUser = window.AUTH ? window.AUTH.currentUser : null;
                        if (currentUser && currentUser.email === email) {
                            removeBtn.style.display = 'none'; // Don't allow removing oneself easily here to prevent bugs
                        }
                        
                        removeBtn.onclick = async () => {
                            if (!confirm("Retirer cette personne ?")) return;
                            removeBtn.disabled = true;
                            removeBtn.textContent = '...';
                            try {
                                await updateDoc(doc(db, 'conversations', currentChatId), {
                                    participants: arrayRemove(email)
                                });
                                await addDoc(collection(db, 'conversations', currentChatId, 'messages'), {
                                    text: `${currentUser ? (currentUser.name || currentUser.firstname) : 'Quelqu\\'un'} a retiré ${email} de la discussion.`,
                                    senderId: currentUser ? currentUser.email : 'system',
                                    senderName: 'Système',
                                    timestamp: serverTimestamp()
                                });
                                div.remove();
                            } catch(e) {
                                console.error(e);
                                alert("Erreur lors du retrait.");
                                removeBtn.disabled = false;
                                removeBtn.textContent = 'Retirer';
                            }
                        };
                        
                        div.appendChild(nameSpan);
                        div.appendChild(removeBtn);
                        partContainer.appendChild(div);
                    });
                } else {
                    partContainer.innerHTML = '<span style="color:#666;font-size:0.9rem;">Aucun participant trouvé (groupe global).</span>';
                }
            }
        }
    });"""

    chat = chat.replace(old_open, new_open)
    
    with open('js/chat.js', 'w', encoding='utf-8') as f:
        f.write(chat)
        
    print("Fixed logic")

add_participants_logic()
