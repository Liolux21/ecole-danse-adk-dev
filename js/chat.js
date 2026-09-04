import { db, storage, collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot, query, orderBy, where, serverTimestamp, storageRef, uploadBytes, getDownloadURL } from './firebase-config.js';

let currentChatId = null;
let unsubscribeMessages = null;

// =============================================
// LOAD CONVERSATIONS — groupés par catégorie
// =============================================
window.loadConversations = function() {
    const currentUser = window.AUTH ? window.AUTH.currentUser : null;
    if (!currentUser) return;

    const convListEl = document.getElementById('conversations-list');
    
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

        // Regrouper les conversations par catégorie
        const groups = {
            admin: { label: '📌 Administration ADK', convs: [] },
            cours: { label: '🎓 Canal Cours', convs: [] },
            onetoone: { label: '💬 Canal One to One', convs: [] },
        };

        snapshot.forEach(docSnap => {
            const conv = docSnap.data();
            const convId = docSnap.id;
            const tg = conv.targetGroup || '';

            if (tg === 'admin' || tg === 'all' || tg === 'all_profs' || tg === 'all_students') {
                groups.admin.convs.push({ id: convId, data: conv });
            } else if (tg.startsWith('course_')) {
                groups.cours.convs.push({ id: convId, data: conv });
            } else {
                groups.onetoone.convs.push({ id: convId, data: conv });
            }
        });

        // Rendre chaque groupe
        Object.values(groups).forEach(group => {
            if (group.convs.length === 0) return;

            // En-tête du groupe
            const header = document.createElement('div');
            header.style.cssText = 'padding: 0.5rem 1rem; font-size: 0.72rem; font-weight: 700; color: var(--gold); text-transform: uppercase; letter-spacing: 0.05em; background: #f0f0f0; border-top: 1px solid var(--border); margin-top: 0.25rem;';
            header.textContent = group.label;
            convListEl.appendChild(header);

            group.convs.forEach(({ id: convId, data: conv }) => {
                const isActive = convId === currentChatId ? 'active' : '';

                let timeString = '';
                if (conv.lastMessageAt) {
                    const date = conv.lastMessageAt.toDate();
                    const today = new Date();
                    const isToday = date.toDateString() === today.toDateString();
                    if (isToday) {
                        timeString = date.toLocaleTimeString('fr-BE', { hour: '2-digit', minute: '2-digit' });
                    } else {
                        timeString = date.toLocaleDateString('fr-BE', { day: '2-digit', month: '2-digit' });
                    }
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
        });

    }, (error) => {
        console.error("Error loading conversations: ", error);
        convListEl.innerHTML = '<div style="padding: 1rem; color: #e74c3c; text-align: center;">Erreur de chargement</div>';
    });
};

// =============================================
// SWITCH CHAT — avec nom complet + date
// =============================================
window.switchChat = function(chatId, chatTitle) {
    if (currentChatId === chatId) return;
    currentChatId = chatId;

    document.getElementById('active-chat-title').textContent = chatTitle;
    const messenger = document.getElementById('global-messenger-container');
    if (messenger) messenger.classList.add('chat-active');

    document.querySelectorAll('.conv-item').forEach(el => {
        el.classList.toggle('active', el.dataset.chatId === chatId);
    });

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

        const disclaimer = document.createElement('div');
        disclaimer.style = "text-align: center; color: var(--text-muted); font-size: 0.75rem; margin-bottom: 1.5rem;";
        disclaimer.innerHTML = "⚠️ Toutes les communications sont visibles par l'administration.";
        messagesContainer.appendChild(disclaimer);

        let lastDateStr = '';

        snapshot.forEach(docSnap => {
            const msg = docSnap.data();
            const currentUser = window.AUTH ? window.AUTH.currentUser : null;
            const isMe = currentUser && msg.senderId === currentUser.email;

            let dateStr = '';
            let timeStr = '';
            if (msg.timestamp && typeof msg.timestamp.toDate === 'function') {
                const date = msg.timestamp.toDate();
                const today = new Date();
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);

                if (date.toDateString() === today.toDateString()) {
                    dateStr = "Aujourd'hui";
                } else if (date.toDateString() === yesterday.toDateString()) {
                    dateStr = "Hier";
                } else {
                    dateStr = date.toLocaleDateString('fr-BE', { weekday: 'long', day: 'numeric', month: 'long' });
                }
                timeStr = date.toLocaleTimeString('fr-BE', { hour: '2-digit', minute: '2-digit' });
            }

            // Séparateur de date si nouveau jour
            if (dateStr && dateStr !== lastDateStr) {
                lastDateStr = dateStr;
                const sep = document.createElement('div');
                sep.style.cssText = 'text-align: center; color: var(--text-muted); font-size: 0.72rem; margin: 1rem 0; display: flex; align-items: center; gap: 0.5rem;';
                sep.innerHTML = `<hr style="flex:1;border:none;border-top:1px solid var(--border);"><span style="white-space:nowrap;">${dateStr}</span><hr style="flex:1;border:none;border-top:1px solid var(--border);">`;
                messagesContainer.appendChild(sep);
            }

            const canDelete = isMe || (currentUser && currentUser.role === 'admin');
            const senderLabel = msg.senderName || msg.senderId || 'Utilisateur';

            const row = document.createElement('div');
            row.className = `msg-row ${isMe ? 'me' : 'other'}`;
            row.style.cssText = `display: flex; flex-direction: column; width: 100%; align-items: ${isMe ? 'flex-end' : 'flex-start'}; margin-bottom: 8px;`;

            // Construire le contenu du message (texte ou fichier)
            let msgContent = '';
            if (msg.fileUrl) {
                if (msg.fileType && msg.fileType.startsWith('image/')) {
                    msgContent = `<a href="${msg.fileUrl}" target="_blank"><img src="${msg.fileUrl}" style="max-width: 220px; max-height: 220px; border-radius: 8px; display: block; margin-top: 4px;" alt="image"></a>`;
                } else {
                    const fileName = msg.fileName || 'Fichier';
                    msgContent = `<a href="${msg.fileUrl}" target="_blank" style="display:inline-flex;align-items:center;gap:0.4rem;color:inherit;text-decoration:underline;">📎 ${fileName}</a>`;
                }
                if (msg.text) msgContent = `<div style="margin-bottom:4px;">${msg.text}</div>` + msgContent;
            } else {
                msgContent = `<div style="line-height: 1.4;">${msg.text || ''}</div>`;
            }

            row.innerHTML = `
                <div style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 2px; ${isMe ? 'text-align:right;' : ''}">
                    <strong style="color:var(--primary);">${senderLabel}</strong> · ${timeStr}
                </div>
                <div class="msg-bubble" style="max-width: 75%; padding: 10px 15px; border-radius: 15px; text-align: left; position: relative; word-break: break-word; ${isMe ? 'background: #CAA9A9; color: #fff; border-bottom-right-radius: 2px;' : 'background: #fff; border: 1px solid rgba(202,169,169,0.4); color: #4A3E3E; border-bottom-left-radius: 2px;'}">
                    ${msgContent}
                    ${canDelete ? `<span class="delete-msg-btn" data-msg-id="${docSnap.id}" style="display:block;text-align:right;font-size:0.65rem;cursor:pointer;opacity:0.5;margin-top:4px;" title="Supprimer">🗑️</span>` : ''}
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

// =============================================
// DOM READY — boutons, envoi, emoji, fichier
// =============================================
document.addEventListener('DOMContentLoaded', () => {

    // ---- Supprimer message ----
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

    // ---- Retour liste (mobile) ----
    const btnBack = document.getElementById('btn-back-to-list');
    if (btnBack) {
        btnBack.addEventListener('click', () => {
            const messenger = document.getElementById('global-messenger-container');
            if (messenger) messenger.classList.remove('chat-active');
            currentChatId = null;
        });
    }

    // ---- Envoi message ----
    const btnSendMsg = document.getElementById('btn-send-msg');
    const msgInput = document.getElementById('msg-input');

    async function sendTextMessage() {
        const text = msgInput.value.trim();
        const currentUser = window.AUTH ? window.AUTH.currentUser : null;
        if (!text || !currentChatId || !currentUser) return;
        btnSendMsg.disabled = true;
        try {
            await addDoc(collection(db, 'conversations', currentChatId, 'messages'), {
                text: text,
                senderId: currentUser.email,
                senderName: currentUser.name || currentUser.email,
                timestamp: serverTimestamp()
            });
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
    }

    if (btnSendMsg && msgInput) {
        btnSendMsg.addEventListener('click', sendTextMessage);
        msgInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendTextMessage(); }
        });
    }

    // ---- Emoji picker ----
    const emojiBtn = document.getElementById('btn-emoji');
    const emojiPicker = document.getElementById('emoji-picker');
    if (emojiBtn && emojiPicker) {
        emojiBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            emojiPicker.classList.toggle('open');
        });
        emojiPicker.addEventListener('click', (e) => {
            const emoji = e.target.closest('.emoji-item');
            if (emoji && msgInput) {
                const pos = msgInput.selectionStart;
                const val = msgInput.value;
                msgInput.value = val.slice(0, pos) + emoji.textContent + val.slice(pos);
                msgInput.focus();
                msgInput.selectionStart = msgInput.selectionEnd = pos + emoji.textContent.length;
            }
        });
        document.addEventListener('click', () => emojiPicker.classList.remove('open'));
    }

    // ---- Pièces jointes ----
    const btnAttach = document.getElementById('btn-attach');
    const fileInput = document.getElementById('chat-file-input');
    if (btnAttach && fileInput) {
        btnAttach.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', async () => {
            const file = fileInput.files[0];
            if (!file || !currentChatId) return;
            const currentUser = window.AUTH ? window.AUTH.currentUser : null;
            if (!currentUser) return;

            const MAX_SIZE = 10 * 1024 * 1024; // 10MB
            if (file.size > MAX_SIZE) {
                alert("Fichier trop volumineux (max 10 Mo).");
                fileInput.value = '';
                return;
            }

            btnAttach.disabled = true;
            btnAttach.textContent = '⏳';
            try {
                const path = `chat/${currentChatId}/${Date.now()}_${file.name}`;
                const ref = storageRef(storage, path);
                await uploadBytes(ref, file);
                const url = await getDownloadURL(ref);

                await addDoc(collection(db, 'conversations', currentChatId, 'messages'), {
                    text: '',
                    fileUrl: url,
                    fileName: file.name,
                    fileType: file.type,
                    senderId: currentUser.email,
                    senderName: currentUser.name || currentUser.email,
                    timestamp: serverTimestamp()
                });
                await updateDoc(doc(db, 'conversations', currentChatId), {
                    lastMessage: `📎 ${file.name}`,
                    lastMessageAt: serverTimestamp()
                });
            } catch(e) {
                console.error("Upload error:", e);
                alert("Erreur lors de l'envoi du fichier.");
            }
            btnAttach.disabled = false;
            btnAttach.textContent = '📎';
            fileInput.value = '';
        });
    }

    // ---- Mode switcher ----
    let chatMode = 'group'; // 'group' or 'oto'
    let selectedOtoUser = null; // { email, name, role }

    window.setChatType = function(mode) {
        chatMode = mode;
        selectedOtoUser = null;
        document.getElementById('oto-selected').style.display = 'none';
        document.getElementById('oto-results').style.display = 'none';
        document.getElementById('oto-search').value = '';

        document.getElementById('chat-mode-group').style.display = mode === 'group' ? '' : 'none';
        document.getElementById('chat-mode-oto').style.display = mode === 'oto' ? '' : 'none';

        document.getElementById('chat-type-group').className = `btn btn-sm ${mode === 'group' ? 'btn-primary' : 'btn-outline'}`;
        document.getElementById('chat-type-oto').className = `btn btn-sm ${mode === 'oto' ? 'btn-primary' : 'btn-outline'}`;
    };

    // ---- Nouvelle conversation (open) ----
    const btnNewChat = document.getElementById('btn-new-chat');
    if (btnNewChat) {
        btnNewChat.addEventListener('click', () => {
            // Reset state
            chatMode = 'group';
            selectedOtoUser = null;
            window.setChatType('group');
            document.getElementById('new-chat-title').value = '';
            document.getElementById('new-chat-first-msg').value = '';

            // Populate group select
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
                    options += `<option value="admin">Administration ADK</option>`;
                    if (window.DATA && window.DATA.courses) {
                        const myCourses = window.DATA.courses.filter(c => c.prof === user.name);
                        if (myCourses.length > 0) {
                            options += `<optgroup label="Mes Cours">`;
                            myCourses.forEach(c => {
                                options += `<option value="course_${c.id}">${c.name}</option>`;
                            });
                            options += `</optgroup>`;
                        }
                    }
                } else {
                    options += `<option value="admin">Administration ADK</option>`;
                }
                select.innerHTML = options;
            }

            if (window.openModal) window.openModal('modal-new-chat');
        });
    }

    // ---- OTO search ----
    const otoSearch = document.getElementById('oto-search');
    if (otoSearch) {
        otoSearch.addEventListener('input', () => {
            const term = otoSearch.value.trim().toLowerCase();
            const resultsEl = document.getElementById('oto-results');
            selectedOtoUser = null;
            document.getElementById('oto-selected').style.display = 'none';

            if (term.length < 2) { resultsEl.style.display = 'none'; return; }

            const currentUser = window.AUTH ? window.AUTH.currentUser : null;
            const myEmail = currentUser ? currentUser.email.toLowerCase() : '';

            // Build search pool: users (profs) + students
            let pool = [];
            if (window.DATA) {
                // Profs/Admins
                (window.DATA.users || []).forEach(u => {
                    if ((u.email || u.id || '').toLowerCase() === myEmail) return;
                    const name = u.name || `${u.firstname || ''} ${u.lastname || ''}`.trim();
                    if (name.toLowerCase().includes(term) || (u.email || '').toLowerCase().includes(term)) {
                        pool.push({ email: u.email || u.id, name, role: u.role || 'prof' });
                    }
                });
                // Students/Parents
                (window.DATA.students || []).forEach(s => {
                    const name = `${s.firstname || ''} ${s.lastname || ''}`.trim() || s.name || '';
                    const email = s.contactEmail || s.parentId || '';
                    if (email.toLowerCase() === myEmail) return;
                    if (name.toLowerCase().includes(term) || email.toLowerCase().includes(term)) {
                        pool.push({ email, name, role: 'élève', studentName: name });
                    }
                });
            }

            if (pool.length === 0) {
                resultsEl.innerHTML = '<div style="padding:0.75rem 1rem; color:var(--text-muted); font-size:0.9rem;">Aucun résultat.</div>';
                resultsEl.style.display = 'block';
                return;
            }

            resultsEl.innerHTML = pool.slice(0, 15).map((u, idx) => `
                <div class="oto-result-item" data-idx="${idx}" style="padding:0.6rem 1rem; cursor:pointer; border-bottom:1px solid var(--border); display:flex; align-items:center; gap:0.75rem;" 
                     onmouseenter="this.style.background='#f4f4f4'" onmouseleave="this.style.background='#fff'">
                    <span style="font-size:1.2rem;">${u.role === 'prof' ? '👩‍🏫' : u.role === 'admin' ? '🔑' : '🎓'}</span>
                    <div>
                        <div style="font-weight:600;">${u.name}</div>
                        <div style="font-size:0.75rem; color:var(--text-muted);">${u.role} · ${u.email || '—'}</div>
                    </div>
                </div>
            `).join('');

            // Store pool for selection
            resultsEl._pool = pool;
            resultsEl.style.display = 'block';

            resultsEl.querySelectorAll('.oto-result-item').forEach(el => {
                el.addEventListener('click', () => {
                    const idx = parseInt(el.dataset.idx);
                    selectedOtoUser = resultsEl._pool[idx];
                    resultsEl.style.display = 'none';
                    otoSearch.value = '';
                    const selEl = document.getElementById('oto-selected');
                    selEl.innerHTML = `✅ ${selectedOtoUser.name} <span style="font-size:0.8rem;color:var(--text-muted);">(${selectedOtoUser.role})</span> <button onclick="window.clearOtoUser()" style="background:none;border:none;cursor:pointer;color:#e74c3c;font-size:1rem;margin-left:0.5rem;">×</button>`;
                    selEl.style.display = 'block';
                });
            });
        });
    }

    window.clearOtoUser = function() {
        selectedOtoUser = null;
        document.getElementById('oto-selected').style.display = 'none';
        document.getElementById('oto-search').value = '';
        document.getElementById('oto-search').focus();
    };

    // ---- Créer la conversation ----
    const btnCreateChatConfirm = document.getElementById('btn-create-chat-confirm');
    if (btnCreateChatConfirm) {
        btnCreateChatConfirm.addEventListener('click', async () => {
            const titleInput = document.getElementById('new-chat-title');
            const msgInput2 = document.getElementById('new-chat-first-msg');

            const title = titleInput.value.trim();
            const firstMsg = msgInput2.value.trim();
            const currentUser = window.AUTH ? window.AUTH.currentUser : null;
            if (!title || !firstMsg || !currentUser) return;

            // Validate target
            let target, participants, isGroup;
            if (chatMode === 'oto') {
                if (!selectedOtoUser || !selectedOtoUser.email) {
                    alert("Veuillez sélectionner une personne dans la recherche.");
                    return;
                }
                target = `oto_${selectedOtoUser.email}`;
                participants = [currentUser.email, selectedOtoUser.email];
                isGroup = false;
            } else {
                const targetSelect = document.getElementById('new-chat-target');
                target = targetSelect.value;
                if (!target) return;
                participants = [currentUser.email];
                isGroup = true;
            }

            btnCreateChatConfirm.disabled = true;
            btnCreateChatConfirm.textContent = "Création...";

            try {
                const newConvRef = await addDoc(collection(db, 'conversations'), {
                    title: title,
                    targetGroup: target,
                    participants: participants,
                    creatorId: currentUser.email,
                    isGroup: isGroup,
                    lastMessage: firstMsg,
                    lastMessageAt: serverTimestamp()
                });

                await addDoc(collection(db, 'conversations', newConvRef.id, 'messages'), {
                    text: firstMsg,
                    senderId: currentUser.email,
                    senderName: currentUser.name || currentUser.email,
                    timestamp: serverTimestamp()
                });

                if (window.closeModal) window.closeModal('modal-new-chat');
                titleInput.value = '';
                msgInput2.value = '';
                selectedOtoUser = null;
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
