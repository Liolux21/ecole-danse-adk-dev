import re

with open('js/chat.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Add error handler to onSnapshot in switchChat
old_on_snapshot = """    unsubscribeMessages = onSnapshot(q, (snapshot) => {
        messagesContainer.innerHTML = '';
        if (snapshot.empty) {"""

new_on_snapshot = """    unsubscribeMessages = onSnapshot(q, (snapshot) => {
        messagesContainer.innerHTML = '';
        if (snapshot.empty) {
            messagesContainer.innerHTML = '<div style="text-align: center; color: var(--text-light); padding: 2rem;">Aucun message. Dites bonjour !</div>';
            return;
        }

        snapshot.forEach(docSnap => {
            const msg = docSnap.data();
            const currentUser = window.AUTH ? window.AUTH.currentUser : null;
            const isMe = currentUser && msg.senderId === currentUser.uid;

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
        messagesContainer.innerHTML = '<div style="text-align: center; color: #e74c3c; padding: 2rem;">Erreur de chargement des messages.</div>';
    });"""

js = re.sub(r'    unsubscribeMessages = onSnapshot\(q, \(snapshot\) => \{.*?(?=\n\n    const btnNewChat)', new_on_snapshot, js, flags=re.DOTALL)

with open('js/chat.js', 'w', encoding='utf-8') as f:
    f.write(js)
