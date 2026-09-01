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
        q = query(collection(db, 'conversations'), where('participants', 'array-contains', currentUser.uid), orderBy('lastMessageAt', 'desc'));
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
            const isMe = msg.senderId === currentUser.uid;

            let timeString = '';
            if (msg.timestamp) {
                const date = msg.timestamp.toDate();
                timeString = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            }

            const row = document.createElement('div');
            row.className = `msg-row ${isMe ? 'me' : 'other'}`;
            row.innerHTML = `
                <div class="msg-bubble">
                    ${!isMe ? `<strong style="font-size:0.8rem; opacity:0.8;">${msg.senderName || 'Utilisateur'}</strong><br>` : ''}
                    ${msg.text}
                    <div class="msg-meta">${timeString}</div>
                </div>
            `;
            messagesContainer.appendChild(row);
        });
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const btnSend = document.getElementById('btn-send-msg');
    const msgInput = document.getElementById('msg-input');

    if (btnSend && msgInput) {
        const sendMsg = async () => {
            const text = msgInput.value.trim();
            if (!text || !currentChatId || !window.AUTH || !window.AUTH.currentUser) return;
            const currentUser = window.AUTH.currentUser;

            msgInput.value = '';

            try {
                await addDoc(collection(db, 'conversations', currentChatId, 'messages'), {
                    text: text,
                    senderId: currentUser.uid,
                    senderName: currentUser.name || currentUser.email,
                    timestamp: serverTimestamp()
                });

                await updateDoc(doc(db, 'conversations', currentChatId), {
                    lastMessage: text,
                    lastMessageAt: serverTimestamp()
                });
            } catch (error) {
                console.error("Error sending message: ", error);
                alert("Erreur lors de l'envoi du message.");
            }
        };

        btnSend.addEventListener('click', sendMsg);
        msgInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMsg();
            }
        });
    }
});
