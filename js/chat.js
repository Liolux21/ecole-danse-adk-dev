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
    
    let myGroups = ['all'];
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

    let q = query(collection(db, 'conversations'));

    onSnapshot(q, (snapshot) => {
        convListEl.innerHTML = '';
        if (snapshot.empty) {
            convListEl.innerHTML = '<div style="padding: 1rem; color: var(--text-light); text-align: center;">Aucune conversation</div>';
            return;
        }

        let allConvs = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            
            if (currentUser.role !== 'admin') {
                if (!data.isGroup) {
                    if (!data.participants || !data.participants.includes(currentUser.email)) return;
                } else {
                    if (!myGroups.includes(data.targetGroup)) return;
                }
            }
            
            allConvs.push({ id: doc.id, ...data });
        });

        allConvs.sort((a, b) => {
            const timeA = a.lastMessageAt ? a.lastMessageAt.toMillis() : 0;
            const timeB = b.lastMessageAt ? b.lastMessageAt.toMillis() : 0;
            return timeB - timeA;
        });

        let groups = {
            admin: { label: '🛡️ Administration', convs: [] },
            cours: { label: '🎵 Mes Cours', convs: [] },
            onetoone: { label: '👤 Messages Privés', convs: [] }
        };

        let hasAnyConv = false;
        allConvs.forEach(conv => {
            const convId = conv.id;
            const isArchived = conv.archivedBy && conv.archivedBy.includes(currentUser.email);
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

        Object.values(groups).forEach(group => {
            if (group.convs.length === 0) return;

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
}



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
