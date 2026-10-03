import re

with open('js/chat.js', 'r', encoding='utf-8') as f:
    js = f.read()

old_row = """            const row = document.createElement('div');
            row.className = `msg-row ${isMe ? 'me' : 'other'}`;
            row.innerHTML = `
                <div class="msg-bubble">
                    ${!isMe ? `<strong style="font-size:0.8rem; opacity:0.8;">${msg.senderName || 'Utilisateur'}</strong><br>` : ''}
                    ${msg.text || ''}
                    <div class="msg-meta">${timeString}</div>
                </div>
            `;
            messagesContainer.appendChild(row);"""

new_row = """            const row = document.createElement('div');
            row.className = `msg-row ${isMe ? 'me' : 'other'}`;
            row.style = `display: flex; width: 100%; margin-bottom: 5px; justify-content: ${isMe ? 'flex-end' : 'flex-start'};`;
            
            row.innerHTML = `
                <div class="msg-bubble" style="max-width: 75%; padding: 10px 15px; border-radius: 15px; text-align: left; position: relative; word-break: break-word; ${isMe ? 'background: #CAA9A9; color: #fff; border-bottom-right-radius: 2px;' : 'background: #fff; border: 1px solid rgba(202, 169, 169, 0.4); color: #4A3E3E; border-bottom-left-radius: 2px;'}">
                    ${!isMe ? `<strong style="font-size:0.8rem; opacity:0.8; display: block; margin-bottom: 3px;">${msg.senderName || 'Utilisateur'}</strong>` : ''}
                    <div style="line-height: 1.4;">${msg.text || ''}</div>
                    <div class="msg-meta" style="font-size: 0.7rem; text-align: right; margin-top: 5px; opacity: 0.8;">${timeString}</div>
                </div>
            `;
            messagesContainer.appendChild(row);"""

js = js.replace(old_row, new_row)

with open('js/chat.js', 'w', encoding='utf-8') as f:
    f.write(js)
