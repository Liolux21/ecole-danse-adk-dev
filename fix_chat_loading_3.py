import re

def rewrite_chat():
    with open('js/chat.js', 'r', encoding='utf-8') as f:
        chat = f.read()

    start_str = "window.loadConversations = function() {"
    end_str = "    // ---- Nouvelle conversation (open) ----"
    
    start_idx = chat.find(start_str)
    end_idx = chat.find(end_str)
    
    if start_idx == -1 or end_idx == -1:
        print("Could not find blocks")
        return
        
    # We step back to the end of the previous function
    end_idx = chat.rfind("};", 0, end_idx) + 2

    new_full = """window.loadConversations = function() {
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
}"""

    # Fix the missing null clear issue in openNewChatModal
    chat = chat.replace("document.getElementById('new-chat-title').value = '';", "")

    chat = chat[:start_idx] + new_full + "\n\n" + chat[end_idx:]
    
    with open('js/chat.js', 'w', encoding='utf-8') as f:
        f.write(chat)
    print("Success")

rewrite_chat()
