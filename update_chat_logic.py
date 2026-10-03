import re

with open('js/chat.js', 'r', encoding='utf-8') as f:
    js = f.read()

new_chat_logic = """
    // New Chat logic
    const btnNewChat = document.getElementById('btn-new-chat');
    if (btnNewChat) {
        btnNewChat.addEventListener('click', () => {
            // Populate select
            const select = document.getElementById('new-chat-target');
            if (select && window.AUTH && window.AUTH.currentUser) {
                const user = window.AUTH.currentUser;
                let options = '';
                if (user.role === 'admin') {
                    options += `<option value="all">Tous (Élèves et Profs)</option>`;
                    options += `<option value="all_students">Tous les élèves</option>`;
                    options += `<option value="all_profs">Tous les profs</option>`;
                    if (window.DATA && window.DATA.courses) {
                        options += `<optgroup label="Par Cours">`;
                        window.DATA.courses.forEach(c => {
                            options += `<option value="course_${c.id}">${c.name} (${c.prof})</option>`;
                        });
                        options += `</optgroup>`;
                    }
                } else if (user.role === 'prof') {
                    // Prof can message their courses or admin
                    options += `<option value="admin">Administration ADK</option>`;
                    if (window.DATA && window.DATA.courses) {
                        const myCourses = window.DATA.courses.filter(c => c.prof === user.name); // basic check
                        if (myCourses.length > 0) {
                            options += `<optgroup label="Mes Cours">`;
                            myCourses.forEach(c => {
                                options += `<option value="course_${c.id}">${c.name}</option>`;
                            });
                            options += `</optgroup>`;
                        }
                    }
                } else {
                    // Parent can message admin
                    options += `<option value="admin">Administration ADK</option>`;
                }
                select.innerHTML = options;
            }
            if (window.openModal) window.openModal('modal-new-chat');
        });
    }

    const btnCreateChatConfirm = document.getElementById('btn-create-chat-confirm');
    if (btnCreateChatConfirm) {
        btnCreateChatConfirm.addEventListener('click', async () => {
            const titleInput = document.getElementById('new-chat-title');
            const msgInput = document.getElementById('new-chat-first-msg');
            const targetSelect = document.getElementById('new-chat-target');
            
            const title = titleInput.value.trim();
            const firstMsg = msgInput.value.trim();
            const target = targetSelect.value;
            
            const currentUser = window.AUTH ? window.AUTH.currentUser : null;
            if (!title || !firstMsg || !currentUser || !target) return;
            
            btnCreateChatConfirm.disabled = true;
            btnCreateChatConfirm.textContent = "Création...";
            
            try {
                // Determine participants based on target
                let participants = [currentUser.uid];
                // For a real app we'd fetch the user UIDs. Since we use a demo system with local users, we store the "target group" string for filtering.
                
                const newConvRef = await addDoc(collection(db, 'conversations'), {
                    title: title,
                    targetGroup: target, // e.g. "all", "course_3"
                    participants: participants,
                    creatorId: currentUser.uid,
                    isGroup: true,
                    lastMessage: firstMsg,
                    lastMessageAt: serverTimestamp()
                });
                
                // Add the first message
                await addDoc(collection(db, 'conversations', newConvRef.id, 'messages'), {
                    text: firstMsg,
                    senderId: currentUser.uid,
                    senderName: currentUser.name || currentUser.email,
                    timestamp: serverTimestamp()
                });
                
                if (window.closeModal) window.closeModal('modal-new-chat');
                titleInput.value = '';
                msgInput.value = '';
                
                // switch to this chat
                window.switchChat(newConvRef.id, title);
            } catch(e) {
                console.error("Error creating chat", e);
                alert("Erreur lors de la création.");
            }
            
            btnCreateChatConfirm.disabled = false;
            btnCreateChatConfirm.textContent = "Envoyer le message";
        });
    }
"""

js = js.split('// New Chat logic')[0] + new_chat_logic + "\n});\n"

with open('js/chat.js', 'w', encoding='utf-8') as f:
    f.write(js)
