import re

with open('js/chat.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace HTML rendering
old_html = """                const item = document.createElement('div');
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
                `;"""

new_html = """                const item = document.createElement('div');
                const isUnread = Array.isArray(conv.readBy) && !conv.readBy.includes(currentUser.email);
                
                item.className = `conv-item ${isActive} ${isUnread ? 'unread' : ''}`;
                item.dataset.chatId = convId;
                
                if (isUnread) {
                    item.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
                    item.style.borderLeft = '3px solid var(--gold)';
                } else {
                    item.style.borderLeft = '3px solid transparent';
                }
                
                const isAvatarString = typeof displayAvatar === 'string' && !displayAvatar.includes('<');
                
                item.innerHTML = `
                    <div class="conv-avatar" style="${isAvatarString ? '' : 'overflow: hidden; background: none; padding: 0; display: flex; align-items: center; justify-content: center; border: none;'}">
                        ${displayAvatar}
                    </div>
                    <div class="conv-info">
                        <div class="conv-top">
                            <span class="conv-name" style="font-size: 0.85rem; font-weight: ${isUnread ? '800' : '600'}; color: ${isUnread ? 'var(--gold)' : 'inherit'}">${displayTitle}</span>
                            <span class="conv-time" style="color: ${isUnread ? 'var(--gold)' : 'inherit'}">${timeString}</span>
                        </div>
                        ${displaySubtitle}
                        <p class="conv-preview" style="font-weight: ${isUnread ? '600' : '400'}; color: ${isUnread ? 'inherit' : 'var(--text-light)'}">${conv.lastMessage || '...'}</p>
                    </div>
                    ${isUnread ? '<div style="width:10px;height:10px;border-radius:50%;background:var(--gold);margin-left:auto;align-self:center;"></div>' : ''}
                `;"""

content = content.replace(old_html, new_html)

# Replace switchChat
old_switch = """window.switchChat = function(chatId, chatTitle, isManageable = false) {
    if (currentChatId === chatId) return;
    currentChatId = chatId;

    document.getElementById('active-chat-title').textContent = chatTitle;"""

new_switch = """window.switchChat = function(chatId, chatTitle, isManageable = false) {
    if (currentChatId === chatId) return;
    currentChatId = chatId;

    document.getElementById('active-chat-title').textContent = chatTitle;
    
    // Mark as read
    const currentUser = window.AUTH ? window.AUTH.currentUser : null;
    if (currentUser && currentUser.email) {
        import('./firebase-config.js').then(firebase => {
            firebase.updateDoc(firebase.doc(firebase.db, 'conversations', chatId), {
                readBy: firebase.arrayUnion(currentUser.email)
            }).catch(e => console.log('Read status update failed:', e));
        });
    }"""

content = content.replace(old_switch, new_switch)

with open('js/chat.js', 'w', encoding='utf-8') as f:
    f.write(content)
print('Patched chat UI rendering')
