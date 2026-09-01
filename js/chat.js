import { db, collection, addDoc, doc, getDoc, updateDoc, onSnapshot, query, orderBy, where, serverTimestamp } from './firebase-config.js';

let currentChatId = null;
let unsubscribeMessages = null;

// Ensure this is called when the user opens the Messagerie tab
window.loadConversations = function() {
    const currentUser = window.AUTH ? window.AUTH.currentUser : null; // Assuming currentUser is global from auth.js / app.js
    if (!currentUser) return;

    const convListEl = document.getElementById('conversations-list');
    
    // Listen to conversations where the current user is a participant
    // For now, we listen to all for Admin, or we'll filter by participant.
    // Assuming a 'conversations' collection with 'participants' array.
    let q;
    if (currentUser.role === 'admin') {
        q = query(collection(db, 'conversations'), orderBy('lastMessageAt', 'desc'));
    } else {
        q = query(collection(db, 'conversations'), where('participants', 'array-contains', currentUser.email), orderBy('lastMessageAt', 'desc'));
    }

    onSnapshot(q, (snapshot) => {
        convListEl.innerHTML = '';
        if (snapshot.empty) {
            convListEl.innerHTML = '<div style="padding: 1rem; color: var(--text-light); text-align: center;">Aucune conversation</div>';
            return;
        }

        snapshot.forEach(docSnap => {
            const conv = docSnap.data();
            const convId = docSnap.id;
            const isActive = convId === currentChatId ? 'active' : '';

            // Formatting date (e.g., 10:42 or 12/09)
            let timeString = '';
            if (conv.lastMessageAt) {
                const date = conv.lastMessageAt.toDate();
                timeString = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            }

            const item = document.createElement('div');
            item.className = `conv-item ${isActive}`;
            item.dataset.chatId = convId;
            item.innerHTML = `
                <div class="conv-avatar">${conv.isGroup ? '👥' : '👤'}</div>
                <div class="conv-info">
                    <div class="conv-top">
                        <span class="conv-name">${conv.title || 'Discussion'}</span>
                        <span class="conv-time">${timeString}</span>
                    </div>
                    <p class="conv-preview">${conv.lastMessage || '...'}</p>
                </div>
            `;

            item.addEventListener('click', () => window.switchChat(convId, conv.title || 'Discussion'));
            convListEl.appendChild(item);
        });
    }, (error) => {
        console.error("Error loading conversations: ", error);
        convListEl.innerHTML = '<div style="padding: 1rem; color: #e74c3c; text-align: center;">Erreur de chargement</div>';
    });
};

window.switchChat = function(chatId, chatTitle) {
    if (currentChatId === chatId) return;
    currentChatId = chatId;

    // Update header
    document.getElementById('active-chat-title').textContent = chatTitle;

    // Update active class in list
    document.querySelectorAll('.conv-item').forEach(el => {
        el.classList.toggle('active', el.dataset.chatId === chatId);
    });

    // Unsubscribe from previous messages
    if (unsubscribeMessages) unsubscribeMessages();

    const messagesContainer = document.getElementById('chat-messages');
    messagesContainer.innerHTML = '<div style="text-align: center; color: var(--text-light); padding: 2rem;">Chargement...</div>';

    const q = query(
        collection(db, 'conversations', chatId, 'messages'),
        orderBy('timestamp', 'asc')
    );

    unsubscribeMessages = onSnapshot(q, (snapshot) => {
        messagesContainer.innerHTML = '';
        if (snapshot.empty) {
            messagesContainer.innerHTML = '<div style="text-align: center; color: var(--text-light); padding: 2rem;">Aucun message. Dites bonjour !</div>';
            return;
        }

        snapshot.forEach(docSnap => {
            const msg = docSnap.data();
            const currentUser = window.AUTH ? window.AUTH.currentUser : null;
            const isMe = currentUser && msg.senderId === currentUser.email;

            let timeString = '';
            if (msg.timestamp && typeof msg.timestamp.toDate === 'function') {
                const date = msg.timestamp.toDate();
                timeString = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            }

            const row = document.createElement('div');
            row.className = `msg-row ${isMe ? 'me' : 'other'}`;
            row.innerHTML = `
                <div class="msg-bubble">
                    ${!isMe ? `<strong style="font-size:0.8rem; opacity:0.8;">${msg.senderName || 'Utilisateur'}</strong><br>` : ''}
                    ${msg.text || ''}
                    <div class="msg-meta">${timeString}</div>
                </div>
            `;
            messagesContainer.appendChild(row);
        });
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, (error) => {
        console.error("Error loading messages: ", error);
        messagesContainer.innerHTML = '<div style="text-align: center; color: #e74c3c; padding: 2rem;">Erreur : ' + error.message + '</div>';
    });
};

document.addEventListener('DOMContentLoaded', () => {

    
    
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
                    
                    // Parent can message profs of their courses
                    if (window.DATA && window.DATA.courses) {
                        const myCourseIds = user.courseIds || [];
                        const myCourses = window.DATA.courses.filter(c => myCourseIds.includes(c.id));
                        
                        // Extract unique prof names from those courses
                        const profNames = [...new Set(myCourses.map(c => c.prof))];
                        
                        if (profNames.length > 0) {
                            options += `<optgroup label="Professeurs de mes enfants">`;
                            profNames.forEach(prof => {
                                options += `<option value="prof_${prof}">Professeur : ${prof}</option>`;
                            });
                            options += `</optgroup>`;
                        }
                    }
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
                let participants = [currentUser.email];
                // For a real app we'd fetch the user UIDs. Since we use a demo system with local users, we store the "target group" string for filtering.
                
                const newConvRef = await addDoc(collection(db, 'conversations'), {
                    title: title,
                    targetGroup: target, // e.g. "all", "course_3"
                    participants: participants,
                    creatorId: currentUser.email,
                    isGroup: true,
                    lastMessage: firstMsg,
                    lastMessageAt: serverTimestamp()
                });
                
                // Add the first message
                await addDoc(collection(db, 'conversations', newConvRef.id, 'messages'), {
                    text: firstMsg,
                    senderId: currentUser.email,
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

});
