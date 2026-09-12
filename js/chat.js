import { db, storage, collection, addDoc, doc, getDocs, updateDoc, deleteDoc, onSnapshot, query, orderBy, where, or, serverTimestamp, storageRef, uploadBytes, getDownloadURL, arrayUnion, arrayRemove } from './firebase-config.js';

let currentChatId = null;
let unsubscribeMessages = null;
let showArchivedConversations = false;

// =============================================
// LOAD CONVERSATIONS — groupés par catégorie
// =============================================
window.loadConversations = function() {
    const currentUser = window.AUTH ? window.AUTH.currentUser : null;
    if (!currentUser) return;

    const convListEl = document.getElementById('conversations-list');
    
    let q;
    if (currentUser.role === 'admin') {
        q = query(collection(db, 'conversations'));
    } else {
        var myGroups = ['all'];
        if (currentUser.role === 'prof') {
            myGroups.push('all_profs');
            if (currentUser.courseIds) {
                currentUser.courseIds.forEach(cid => myGroups.push(`course_${cid}`));
            }
        } else if (currentUser.role === 'parent' || currentUser.role === 'student' || currentUser.role === 'élève') {
            myGroups.push('all_students');
            if (window.DATA && window.DATA.students) {
                const children = window.DATA.students.filter(s => (currentUser.childrenIds || []).includes(s.id) || s.id === currentUser.id);
                children.forEach(ch => {
                    if (ch.courseIds) {
                        ch.courseIds.forEach(cid => {
                            const tg = `course_${cid}`;
                            if (!myGroups.includes(tg)) myGroups.push(tg);
                        });
                    }
                });
            }
        }

        q = query(collection(db, 'conversations'));
    }

    onSnapshot(q, (snapshot) => {
        convListEl.innerHTML = '';
        if (snapshot.empty) {
            convListEl.innerHTML = '<div style="padding: 1rem; color: var(--text-light); text-align: center;">Aucune conversation</div>';
            return;
        }

        let allConvs = [];
        snapshot.forEach(docSnap => {
            const data = docSnap.data();
            
            // Client side filter
            if (currentUser.role !== 'admin') {
                if (!data.isGroup) {
                    if (!data.participants || !data.participants.includes(currentUser.email)) return;
                } else {
                    if (!myGroups.includes(data.targetGroup)) return;
                }
            }
            
            allConvs.push({ id: docSnap.id, data: data });
        });

        // Sort locally to avoid Firebase composite index requirements
        allConvs.sort((a, b) => {
            const tA = a.data.lastMessageAt && typeof a.data.lastMessageAt.toMillis === 'function' ? a.data.lastMessageAt.toMillis() : 0;
            const tB = b.data.lastMessageAt && typeof b.data.lastMessageAt.toMillis === 'function' ? b.data.lastMessageAt.toMillis() : 0;
            return tB - tA;
        });

        // Regrouper les conversations par catégorie
        const groups = {
            admin: { label: '🛡️ Administration ADK', convs: [] },
            cours: { label: '🎵 Canal Cours', convs: [] },
            onetoone: { label: '💬 Canal One to One', convs: [] },
        };

        let hasAnyConv = false;

        allConvs.forEach(convObj => {
            const conv = convObj.data;
            const convId = convObj.id;
            
            // Check archive status
            const isArchived = Array.isArray(conv.archivedBy) && conv.archivedBy.includes(currentUser.email);
            if (isArchived !== showArchivedConversations) return;

            hasAnyConv = true;
            const tg = conv.targetGroup || '';

            if (tg === 'admin' || tg === 'all' || tg === 'all_profs' || tg === 'all_students') {
                groups.admin.convs.push({ id: convId, data: conv });
            } else if (tg.startsWith('course_')) {
                groups.cours.convs.push({ id: convId, data: conv });
            } else {
                groups.onetoone.convs.push({ id: convId, data: conv });
            }
        });

        if (!hasAnyConv) {
            convListEl.innerHTML = `<div style="padding: 1rem; color: var(--text-light); text-align: center;">Aucune conversation ${showArchivedConversations ? 'archivée' : ''}</div>`;
            return;
        }

        // Rendre chaque groupe
        Object.values(groups).forEach(group => {
            if (group.convs.length === 0) return;

            // En-tête du groupe
            const header = document.createElement('div');
            header.style.cssText = 'padding: 0.5rem 1rem; font-size: 0.65rem; font-weight: 700; color: var(--gold); text-transform: uppercase; letter-spacing: 0.05em; background: #f0f0f0; border-top: 1px solid var(--border); padding: 4px 10px;';
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

                let displayTitle = conv.customName || 'Discussion';
                let displaySubtitle = '';
                let displayAvatar = conv.isGroup ? '👥' : '👤';
                let chatTitleParam = conv.customName || '';
                
                if (!conv.isGroup && Array.isArray(conv.participants)) {
                    const others = conv.participants.filter(p => p !== currentUser.email);
                    if (others.length > 0) {
                        let otherAvatar = null;
                        const otherNames = others.map(email => {
                            if (window.DATA) {
                                const prof = (window.DATA.users || []).find(u => (u.email || u.id) === email);
                                if (prof) {
                                    if (prof.avatarUrl) otherAvatar = prof.avatarUrl;
                                    else if (prof.avatar && (prof.avatar.startsWith('http') || prof.avatar.startsWith('assets/'))) otherAvatar = prof.avatar;
                                    return prof.name || `${prof.firstname || ''} ${prof.lastname || ''}`.trim() || email;
                                }
                                const student = (window.DATA.students || []).find(s => (s.contactEmail || s.parentId) === email);
                                if (student) {
                                    if (student.avatarUrl) otherAvatar = student.avatarUrl;
                                    else if (student.avatar && student.avatar.startsWith('http')) otherAvatar = student.avatar;
                                    return `${student.firstname || ''} ${student.lastname || ''}`.trim() || student.name || email;
                                }
                            }
                            return email;
                        });
                        
                        if (!conv.customName) {
                            displayTitle = otherNames.join(', ');
                        } else {
                            displaySubtitle = `<div style="font-size: 0.7rem; color: var(--primary); margin-top: -2px; margin-bottom: 0px;">${otherNames.join(', ')}</div>`;
                        }
                        
                        // If it's a multi-person chat without a custom avatar, maybe show a group icon
                        if (others.length > 1 && !conv.customName) {
                            displayAvatar = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#f5e6e6;color:var(--primary);border-radius:50%;font-weight:bold;font-size:1.2rem;">👥</div>`;
                        } else if (otherAvatar && others.length === 1) {
                            displayAvatar = `<img src="${otherAvatar}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
                        } else {
                            displayAvatar = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#f5e6e6;color:var(--primary);border-radius:50%;font-weight:bold;font-size:1.2rem;">${displayTitle.charAt(0).toUpperCase()}</div>`;
                        }
                        
                        chatTitleParam = displayTitle;
                    }
                } else if (conv.isGroup && conv.targetGroup) {
                    if (conv.targetGroup.startsWith('course_')) {
                        const courseId = conv.targetGroup.replace('course_', '');
                        if (window.DATA && window.DATA.courses) {
                            const course = window.DATA.courses.find(c => String(c.id) === String(courseId));
                            if (course) {
                                displayTitle = conv.customName || course.name;
                                
                                let profAvatar = course.avatar;
                                if (!profAvatar && course.prof && window.VITRINE_DATA && window.VITRINE_DATA.professeurs && window.VITRINE_DATA.professeurs[course.prof]) {
                                    profAvatar = window.VITRINE_DATA.professeurs[course.prof].avatar;
                                }
                                if (!profAvatar && course.prof && window.DATA && window.DATA.users) {
                                    const profUser = window.DATA.users.find(u => u.name === course.prof || u.email === course.prof);
                                    if (profUser) profAvatar = profUser.avatarUrl || profUser.avatar;
                                }
                                
                                if (profAvatar) {
                                    displayAvatar = `<img src="${profAvatar}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
                                } else {
                                    displayAvatar = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#f5e6e6;color:var(--primary);border-radius:50%;font-weight:bold;font-size:1.2rem;">🎵</div>`;
                                }
                                
                                chatTitleParam = displayTitle;
                            } else {
                                displayTitle = 'Cours inconnu';
                            }
                        } else {
                            displayTitle = 'Cours ' + courseId;
                        }
                    } else if (conv.targetGroup === 'admin') {
                        displayTitle = conv.customName || 'Anne De Keyser';
                        
                        let anneAvatar = null;
                        if (window.DATA && window.DATA.users) {
                            const anne = window.DATA.users.find(u => u.role === 'admin' || (u.name && u.name.includes('Anne')));
                            if (anne) anneAvatar = anne.avatarUrl || (anne.avatar && anne.avatar.startsWith('http') ? anne.avatar : null);
                        }
                        if (!anneAvatar && window.VITRINE_DATA && window.VITRINE_DATA.professeurs) {
                            if (window.VITRINE_DATA.professeurs['Anne']) anneAvatar = window.VITRINE_DATA.professeurs['Anne'].avatar;
                            else if (window.VITRINE_DATA.professeurs['Anne De Keyser']) anneAvatar = window.VITRINE_DATA.professeurs['Anne De Keyser'].avatar;
                        }
                        
                        if (anneAvatar) {
                            displayAvatar = `<img src="${anneAvatar}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
                        } else {
                            displayAvatar = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#f5e6e6;color:var(--primary);border-radius:50%;font-weight:bold;font-size:1.2rem;">A</div>`;
                        }
                        chatTitleParam = displayTitle;
                    } else if (conv.targetGroup === 'all') {
                        displayTitle = conv.customName || 'Tous (Élèves et Profs)';
                        displayAvatar = '📢';
                        chatTitleParam = displayTitle;
                    } else if (conv.targetGroup === 'all_students') {
                        displayTitle = conv.customName || 'Tous les élèves';
                        displayAvatar = '🎓';
                        chatTitleParam = displayTitle;
                    } else if (conv.targetGroup === 'all_profs') {
                        displayTitle = conv.customName || 'Tous les profs';
                        displayAvatar = '👩‍🏫';
                        chatTitleParam = displayTitle;
                    }
                }

                // If chatTitleParam is missing fallback
                if (!chatTitleParam) chatTitleParam = displayTitle;

                const item = document.createElement('div');
                item.className = `conv-item ${isActive}`;
                item.dataset.chatId = convId;
                
                const isAvatarString = typeof displayAvatar === 'string' && !displayAvatar.includes('<');
                
                item.innerHTML = `
                    <div class="conv-avatar" style="${isAvatarString ? '' : 'overflow: hidden; background: none; padding: 0; display: flex; align-items: center; justify-content: center; border: none;'}">
                        ${displayAvatar}
                    </div>
                    <div class="conv-info">
                        <div class="conv-top">
                            <span class="conv-name" style="font-size: 0.85rem; font-weight: 600;">${displayTitle}</span>
                            <span class="conv-time">${timeString}</span>
                        </div>
                        ${displaySubtitle}
                        <p class="conv-preview">${conv.lastMessage || '...'}</p>
                    </div>
                `;

                item.addEventListener('click', () => window.switchChat(convId, chatTitleParam, !conv.isGroup));

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
window.switchChat = function(chatId, chatTitle, isManageable = false) {
    if (currentChatId === chatId) return;
    currentChatId = chatId;

    document.getElementById('active-chat-title').textContent = chatTitle;
    
    const btnArchiveChat = document.getElementById('btn-archive-chat');
    if (btnArchiveChat) {
        btnArchiveChat.style.display = 'block';
        btnArchiveChat.innerHTML = showArchivedConversations ?         '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="9 21 9 10 3 10 3 21"></polyline><rect x="1" y="3" width="22" height="5"></rect><polyline points="15 15 18 12 21 15"></polyline><line x1="18" y1="21" x2="18" y2="12"></line></svg>' :         '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>';
        btnArchiveChat.title = showArchivedConversations ? 'Désarchiver' : 'Archiver';
    }
    
    const btnManageChat = document.getElementById('btn-manage-chat');
    if (btnManageChat) {
        btnManageChat.style.display = isManageable ? 'block' : 'none';
    }

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

    // ---- Voir les archives ----
    const btnToggleArchived = document.getElementById('btn-toggle-archived');
    if (btnToggleArchived) {
        btnToggleArchived.addEventListener('click', () => {
            showArchivedConversations = !showArchivedConversations;
            btnToggleArchived.innerHTML = showArchivedConversations ?         '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="margin-right:4px;"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> Retour aux discussions' :         '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="margin-right:4px;"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg> Voir les archives';
            window.loadConversations();
        });
    }

    // ---- Archiver la conversation ----
    const btnArchiveChat = document.getElementById('btn-archive-chat');
    if (btnArchiveChat) {
        btnArchiveChat.addEventListener('click', async () => {
            const currentUser = window.AUTH ? window.AUTH.currentUser : null;
            if (!currentChatId || !currentUser) return;
            try {
                // Toggle archive status
                if (showArchivedConversations) {
                    await updateDoc(doc(db, 'conversations', currentChatId), {
                        archivedBy: arrayRemove(currentUser.email)
                    });
                    alert("Conversation désarchivée");
                } else {
                    await updateDoc(doc(db, 'conversations', currentChatId), {
                        archivedBy: arrayUnion(currentUser.email)
                    });
                }
                
                // Return to list or clear chat view
                const messenger = document.getElementById('global-messenger-container');
                if (messenger) messenger.classList.remove('chat-active');
                currentChatId = null;
                document.getElementById('active-chat-title').textContent = "Sélectionnez une discussion";
                document.getElementById('chat-messages').innerHTML = '<div style="text-align: center; color: var(--text-light); margin-top: 2rem;">Veuillez sélectionner ou créer une discussion pour commencer.</div>';
                btnArchiveChat.style.display = 'none';
            } catch (err) {
                console.error("Erreur d'archivage", err);
                alert("Erreur lors de l'archivage.");
            }
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
                lastMessageAt: serverTimestamp(),
                archivedBy: []
            });
            msgInput.value = '';
            msgInput.style.height = 'auto'; // Reset height
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
        msgInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }

    // ---- Emoji picker ----
    const emojiBtn = document.getElementById('btn-emoji');
    const emojiPicker = document.getElementById('emoji-picker');
    if (emojiBtn && emojiPicker) {
        emojiBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = emojiPicker.style.display === 'flex';
            emojiPicker.style.display = isOpen ? 'none' : 'flex';
        });
        emojiPicker.addEventListener('click', (e) => {
            e.stopPropagation();
            const emoji = e.target.closest('.emoji-item');
            if (emoji && msgInput) {
                const pos = msgInput.selectionStart;
                const val = msgInput.value;
                msgInput.value = val.slice(0, pos) + emoji.textContent + val.slice(pos);
                msgInput.focus();
                msgInput.selectionStart = msgInput.selectionEnd = pos + emoji.textContent.length;
                emojiPicker.style.display = 'none';
            }
        });
        document.addEventListener('click', () => { emojiPicker.style.display = 'none'; });
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
                    lastMessageAt: serverTimestamp(),
                    archivedBy: []
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
                        const myCourses = window.DATA.courses.filter(c => user.realRole === 'admin' || (c.prof && c.prof.includes(user.name)));
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
            const msgInput2 = document.getElementById('new-chat-first-msg');
            const firstMsg = msgInput2.value.trim();
            const currentUser = window.AUTH ? window.AUTH.currentUser : null;
            if (!firstMsg || !currentUser) return;

            // Validate target
            let target, participants, isGroup;
            if (chatMode === 'oto') {
                if (!selectedOtoUser || !selectedOtoUser.email) {
                    alert("Veuillez sélectionner une personne dans la recherche.");
                    return;
                }
                target = `oto_${selectedOtoUser.email}`;
                participants = [currentUser.email, selectedOtoUser.email].sort();
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
                // Check if conversation already exists
                let existingConvId = null;
                if (isGroup) {
                    const qGroup = query(collection(db, 'conversations'), where('targetGroup', '==', target));
                    const snap = await getDocs(qGroup);
                    if (!snap.empty) {
                        existingConvId = snap.docs[0].id;
                    }
                } else {
                    // For OTO, we check participants
                    const qOto = query(collection(db, 'conversations'), where('isGroup', '==', false), where('participants', 'array-contains', currentUser.email));
                    const snap = await getDocs(qOto);
                    snap.forEach(d => {
                        const data = d.data();
                        if (data.participants && data.participants.length === participants.length) {
                            const sortedDataParticipants = [...data.participants].sort();
                            if (sortedDataParticipants.join(',') === participants.join(',')) {
                                existingConvId = d.id;
                            }
                        }
                    });
                }

                if (existingConvId) {
                    // Just add the message to the existing conversation
                    await updateDoc(doc(db, 'conversations', existingConvId), {
                        lastMessage: firstMsg,
                        lastMessageAt: serverTimestamp()
                    });
                    await addDoc(collection(db, 'conversations', existingConvId, 'messages'), {
                        text: firstMsg,
                        senderId: currentUser.email,
                        senderName: currentUser.name || currentUser.email,
                        timestamp: serverTimestamp()
                    });
                    
                    if (window.closeModal) window.closeModal('modal-new-chat');
                    msgInput2.value = '';
                    
                    // Open the chat
                    setTimeout(() => window.switchChat(existingConvId, ''), 300);
                } else {
                    // Create new conversation
                    const newConvRef = await addDoc(collection(db, 'conversations'), {
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
                    msgInput2.value = '';
                    
                    // Open the chat
                    setTimeout(() => window.switchChat(newConvRef.id, ''), 300);
                }
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

// =============================================
// MANAGE CHAT LOGIC (RENAME / ADD PERSON)
// =============================================

window.openManageChat = function() {
    if (!currentChatId) return;
    
    // Reset inputs
    document.getElementById('manage-chat-title').value = '';
    document.getElementById('manage-oto-search').value = '';
    document.getElementById('manage-oto-results').style.display = 'none';
    document.getElementById('manage-oto-selected').style.display = 'none';
    window.selectedManageOtoUser = null;
    
    getDoc(doc(db, 'conversations', currentChatId)).then(snap => {
        if (snap.exists()) {
            const data = snap.data();
            if (data.customName) {
                document.getElementById('manage-chat-title').value = data.customName;
            }
        }
    });

    if (window.openModal) window.openModal('modal-manage-chat');
};

const btnManageChat = document.getElementById('btn-manage-chat');
if (btnManageChat) {
    btnManageChat.addEventListener('click', window.openManageChat);
}

const btnUpdateChatTitle = document.getElementById('btn-update-chat-title');
if (btnUpdateChatTitle) {
    btnUpdateChatTitle.addEventListener('click', async () => {
        if (!currentChatId) return;
        const newTitle = document.getElementById('manage-chat-title').value.trim();
        
        btnUpdateChatTitle.disabled = true;
        btnUpdateChatTitle.textContent = 'Enregistrement...';
        try {
            await updateDoc(doc(db, 'conversations', currentChatId), {
                customName: newTitle
            });
            if (window.closeModal) window.closeModal('modal-manage-chat');
        } catch(e) {
            console.error(e);
            alert("Erreur lors de la modification");
        }
        btnUpdateChatTitle.disabled = false;
        btnUpdateChatTitle.textContent = 'Enregistrer le nom';
    });
}

const manageOtoSearch = document.getElementById('manage-oto-search');
if (manageOtoSearch) {
    manageOtoSearch.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        const resEl = document.getElementById('manage-oto-results');
        resEl.innerHTML = '';
        if (val.length < 2) {
            resEl.style.display = 'none';
            return;
        }
        
        let matches = [];
        if (window.DATA) {
            if (window.DATA.users) {
                window.DATA.users.forEach(u => {
                    const searchStr = `${u.name||''} ${u.firstname||''} ${u.lastname||''} ${u.email||''}`.toLowerCase();
                    if (searchStr.includes(val)) matches.push({...u, _type:'prof'});
                });
            }
            if (window.DATA.students) {
                window.DATA.students.forEach(s => {
                    const searchStr = `${s.name||''} ${s.firstname||''} ${s.lastname||''} ${s.contactEmail||''}`.toLowerCase();
                    if (searchStr.includes(val)) matches.push({...s, _type:'student'});
                });
            }
        }
        
        if (matches.length > 0) {
            resEl.style.display = 'block';
            matches.forEach(m => {
                const div = document.createElement('div');
                div.style.padding = '8px 12px';
                div.style.cursor = 'pointer';
                div.style.borderBottom = '1px solid #eee';
                
                const mName = m.name || `${m.firstname||''} ${m.lastname||''}`.trim();
                const mEmail = m.email || m.contactEmail || m.parentId;
                
                div.innerHTML = `<strong>${mName}</strong> <span style="font-size:0.8rem;color:#666;">(${m._type === 'prof' ? 'Prof/Admin' : 'Élève'})</span>`;
                
                div.addEventListener('click', () => {
                    window.selectedManageOtoUser = { name: mName, email: mEmail };
                    const sel = document.getElementById('manage-oto-selected');
                    sel.innerHTML = `Sélectionné : ${mName} (${mEmail})`;
                    sel.style.display = 'block';
                    resEl.style.display = 'none';
                    e.target.value = '';
                });
                resEl.appendChild(div);
            });
        } else {
            resEl.style.display = 'none';
        }
    });
}

const btnAddPersonChat = document.getElementById('btn-add-person-chat');
if (btnAddPersonChat) {
    btnAddPersonChat.addEventListener('click', async () => {
        if (!currentChatId || !window.selectedManageOtoUser || !window.selectedManageOtoUser.email) return;
        
        btnAddPersonChat.disabled = true;
        btnAddPersonChat.textContent = 'Ajout...';
        try {
            await updateDoc(doc(db, 'conversations', currentChatId), {
                participants: arrayUnion(window.selectedManageOtoUser.email)
            });
            
            const currentUser = window.AUTH ? window.AUTH.currentUser : null;
            await addDoc(collection(db, 'conversations', currentChatId, 'messages'), {
                text: `${currentUser ? (currentUser.name || currentUser.firstname) : 'Quelqu\'un'} a ajouté ${window.selectedManageOtoUser.name} à la discussion.`,
                senderId: 'system',
                senderName: 'Système',
                timestamp: serverTimestamp()
            });
            
            window.selectedManageOtoUser = null;
            document.getElementById('manage-oto-selected').style.display = 'none';
            alert('Personne ajoutée avec succès !');
            if (window.closeModal) window.closeModal('modal-manage-chat');
        } catch(e) {
            console.error(e);
            alert("Erreur lors de l'ajout");
        }
        btnAddPersonChat.disabled = false;
        btnAddPersonChat.textContent = 'Ajouter cette personne';
    });
}
