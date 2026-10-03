import re

def fix_rendering():
    with open('js/chat.js', 'r', encoding='utf-8') as f:
        chat = f.read()

    # Block to replace
    start_str = "let displayTitle = conv.title || 'Discussion';"
    end_str = "item.addEventListener('click', () => window.switchChat(convId, chatTitleParam));"
    
    start_idx = chat.find(start_str)
    end_idx = chat.find(end_str)

    if start_idx == -1 or end_idx == -1:
        print("Could not find block to replace")
        return

    replacement = """let displayTitle = conv.customName || 'Discussion';
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

                item.addEventListener('click', () => window.switchChat(convId, chatTitleParam));"""
                
    chat = chat[:start_idx] + replacement + "\n" + chat[end_idx + len(end_str):]
    
    with open('js/chat.js', 'w', encoding='utf-8') as f:
        f.write(chat)
    print("Success")

fix_rendering()
