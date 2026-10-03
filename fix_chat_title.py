import re

def fix_chat():
    with open('js/chat.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    target = """                let participantNames = '';
                if (!conv.isGroup && Array.isArray(conv.participants)) {
                    const others = conv.participants.filter(p => p !== currentUser.email);
                    if (others.length > 0) {
                        const otherNames = others.map(email => {
                            if (window.DATA) {
                                const prof = (window.DATA.users || []).find(u => (u.email || u.id) === email);
                                if (prof) return prof.name || `${prof.firstname || ''} ${prof.lastname || ''}`.trim() || email;
                                const student = (window.DATA.students || []).find(s => (s.contactEmail || s.parentId) === email);
                                if (student) return `${student.firstname || ''} ${student.lastname || ''}`.trim() || student.name || email;
                            }
                            return email;
                        });
                        participantNames = `<div style="font-size: 0.75rem; color: var(--primary); margin-top: -2px; margin-bottom: 2px;">👥 ${otherNames.join(', ')}</div>`;
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
                        ${participantNames}
                        <p class="conv-preview">${conv.lastMessage || '...'}</p>
                    </div>
                `;

                item.addEventListener('click', () => window.switchChat(convId, conv.title || 'Discussion'));"""
    
    replacement = """                let participantNames = '';
                let chatTitleParam = conv.title || 'Discussion';
                
                if (!conv.isGroup && Array.isArray(conv.participants)) {
                    const others = conv.participants.filter(p => p !== currentUser.email);
                    if (others.length > 0) {
                        const otherNames = others.map(email => {
                            if (window.DATA) {
                                const prof = (window.DATA.users || []).find(u => (u.email || u.id) === email);
                                if (prof) return prof.name || `${prof.firstname || ''} ${prof.lastname || ''}`.trim() || email;
                                const student = (window.DATA.students || []).find(s => (s.contactEmail || s.parentId) === email);
                                if (student) return `${student.firstname || ''} ${student.lastname || ''}`.trim() || student.name || email;
                            }
                            return email;
                        });
                        participantNames = `<div style="font-size: 0.75rem; color: var(--primary); margin-top: -2px; margin-bottom: 2px;">👥 ${otherNames.join(', ')}</div>`;
                        chatTitleParam += ` (avec ${otherNames.join(', ')})`;
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
                        ${participantNames}
                        <p class="conv-preview">${conv.lastMessage || '...'}</p>
                    </div>
                `;

                item.addEventListener('click', () => window.switchChat(convId, chatTitleParam));"""

    if target in content:
        content = content.replace(target, replacement)
        with open('js/chat.js', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Success")
    else:
        print("Target not found")

fix_chat()
