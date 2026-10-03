import re

def rewrite_chat():
    with open('js/chat.js', 'r', encoding='utf-8') as f:
        content = f.read()

    # The start of the block to replace
    start_str = "let participantNames = '';"
    
    # We find the click event listener which marks the end
    end_str = "item.addEventListener('click', () => window.switchChat(convId, chatTitleParam));"
    
    start_idx = content.find(start_str)
    end_idx = content.find(end_str)
    
    if start_idx == -1 or end_idx == -1:
        print("Could not find the block to replace!")
        return

    replacement = """let displayTitle = conv.title || 'Discussion';
                let displaySubtitle = '';
                let displayAvatar = conv.isGroup ? '👥' : '👤';
                let chatTitleParam = conv.title || 'Discussion';
                
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
                                    else if (window.VITRINE_DATA && window.VITRINE_DATA.professeurs && window.VITRINE_DATA.professeurs[prof.name] && window.VITRINE_DATA.professeurs[prof.name].avatar) {
                                        otherAvatar = window.VITRINE_DATA.professeurs[prof.name].avatar;
                                    }
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
                        
                        displayTitle = otherNames.join(', ');
                        displaySubtitle = `<div style="font-size: 0.75rem; color: var(--primary); margin-top: -2px; margin-bottom: 2px;">Sujet : ${conv.title || 'Discussion'}</div>`;
                        
                        if (otherAvatar) {
                            displayAvatar = `<img src="${otherAvatar}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
                        } else {
                            displayAvatar = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#f5e6e6;color:var(--primary);border-radius:50%;font-weight:bold;font-size:1.2rem;">${displayTitle.charAt(0).toUpperCase()}</div>`;
                        }
                        
                        chatTitleParam = `${conv.title || 'Discussion'} (avec ${displayTitle})`;
                    }
                } else if (conv.isGroup && conv.targetGroup) {
                    if (conv.targetGroup.startsWith('course_')) {
                        const courseId = conv.targetGroup.replace('course_', '');
                        if (window.DATA && window.DATA.courses) {
                            const course = window.DATA.courses.find(c => c.id === courseId);
                            if (course) {
                                displayTitle = course.name;
                                displaySubtitle = `<div style="font-size: 0.75rem; color: var(--primary); margin-top: -2px; margin-bottom: 2px;">Sujet : ${conv.title || 'Discussion'}</div>`;
                                
                                let profAvatar = null;
                                if (course.prof && window.VITRINE_DATA && window.VITRINE_DATA.professeurs && window.VITRINE_DATA.professeurs[course.prof]) {
                                    profAvatar = window.VITRINE_DATA.professeurs[course.prof].avatar;
                                }
                                if (profAvatar) {
                                    displayAvatar = `<img src="${profAvatar}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
                                } else {
                                    displayAvatar = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#f5e6e6;color:var(--primary);border-radius:50%;font-weight:bold;font-size:1.2rem;">🎵</div>`;
                                }
                                
                                chatTitleParam = `${conv.title || 'Discussion'} (${course.name})`;
                            }
                        }
                    } else if (conv.targetGroup === 'admin') {
                        displayTitle = 'Anne De Keyser';
                        displaySubtitle = `<div style="font-size: 0.75rem; color: var(--primary); margin-top: -2px; margin-bottom: 2px;">Sujet : ${conv.title || 'Discussion'}</div>`;
                        
                        let anneAvatar = null;
                        if (window.VITRINE_DATA && window.VITRINE_DATA.professeurs && window.VITRINE_DATA.professeurs['Anne']) {
                            anneAvatar = window.VITRINE_DATA.professeurs['Anne'].avatar;
                        } else if (window.VITRINE_DATA && window.VITRINE_DATA.professeurs && window.VITRINE_DATA.professeurs['Anne De Keyser']) {
                            anneAvatar = window.VITRINE_DATA.professeurs['Anne De Keyser'].avatar;
                        }
                        
                        if (anneAvatar) {
                            displayAvatar = `<img src="${anneAvatar}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
                        } else {
                            displayAvatar = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#f5e6e6;color:var(--primary);border-radius:50%;font-weight:bold;font-size:1.2rem;">A</div>`;
                        }
                        
                        chatTitleParam = `${conv.title || 'Discussion'} (avec Anne)`;
                    } else if (conv.targetGroup === 'all') {
                        displayTitle = 'Tous (Élèves et Profs)';
                        displaySubtitle = `<div style="font-size: 0.75rem; color: var(--primary); margin-top: -2px; margin-bottom: 2px;">Sujet : ${conv.title || 'Discussion'}</div>`;
                        displayAvatar = '📢';
                        chatTitleParam = `${conv.title || 'Discussion'} (Tous)`;
                    } else if (conv.targetGroup === 'all_students') {
                        displayTitle = 'Tous les élèves';
                        displaySubtitle = `<div style="font-size: 0.75rem; color: var(--primary); margin-top: -2px; margin-bottom: 2px;">Sujet : ${conv.title || 'Discussion'}</div>`;
                        displayAvatar = '🎓';
                        chatTitleParam = `${conv.title || 'Discussion'} (Tous les élèves)`;
                    } else if (conv.targetGroup === 'all_profs') {
                        displayTitle = 'Tous les profs';
                        displaySubtitle = `<div style="font-size: 0.75rem; color: var(--primary); margin-top: -2px; margin-bottom: 2px;">Sujet : ${conv.title || 'Discussion'}</div>`;
                        displayAvatar = '👩‍🏫';
                        chatTitleParam = `${conv.title || 'Discussion'} (Tous les profs)`;
                    }
                }

                const item = document.createElement('div');
                item.className = `conv-item ${isActive}`;
                item.dataset.chatId = convId;
                
                const isAvatarString = typeof displayAvatar === 'string' && !displayAvatar.includes('<');
                
                item.innerHTML = `
                    <div class="conv-avatar" style="${isAvatarString ? '' : 'overflow: hidden; background: none; padding: 0; display: flex; align-items: center; justify-content: center;'}">
                        ${displayAvatar}
                    </div>
                    <div class="conv-info">
                        <div class="conv-top">
                            <span class="conv-name" style="font-size: 0.95rem; font-weight: 600;">${displayTitle}</span>
                            <span class="conv-time">${timeString}</span>
                        </div>
                        ${displaySubtitle}
                        <p class="conv-preview">${conv.lastMessage || '...'}</p>
                    </div>
                `;

                item.addEventListener('click', () => window.switchChat(convId, chatTitleParam));"""

    new_content = content[:start_idx] + replacement + content[end_idx + len(end_str):]
    
    with open('js/chat.js', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Success")

rewrite_chat()
