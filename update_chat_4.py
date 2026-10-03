import re

def update_switch_chat():
    with open('js/chat.js', 'r', encoding='utf-8') as f:
        chat = f.read()

    # 1. Update loadConversations addEventListener
    chat = chat.replace("item.addEventListener('click', () => window.switchChat(convId, chatTitleParam));",
                        "item.addEventListener('click', () => window.switchChat(convId, chatTitleParam, !conv.isGroup));")

    # 2. Update switchChat
    start_switch = "window.switchChat = function(chatId, chatTitle) {"
    end_switch = "btnArchiveChat.title = showArchivedConversations ? 'Désarchiver' : 'Archiver';"
    
    # We just replace the function signature and add the manage chat button logic
    new_switch = """window.switchChat = function(chatId, chatTitle, isManageable = false) {
    if (currentChatId === chatId) return;
    currentChatId = chatId;

    document.getElementById('active-chat-title').textContent = chatTitle;
    
    const btnArchiveChat = document.getElementById('btn-archive-chat');
    if (btnArchiveChat) {
        btnArchiveChat.style.display = 'block';
        btnArchiveChat.innerHTML = showArchivedConversations ? '📂' : '🗃️';
        btnArchiveChat.title = showArchivedConversations ? 'Désarchiver' : 'Archiver';
    }
    
    const btnManageChat = document.getElementById('btn-manage-chat');
    if (btnManageChat) {
        btnManageChat.style.display = isManageable ? 'block' : 'none';
    }"""
    
    # We need to find the exact block since encoding might mess up the french characters in my template
    idx_start = chat.find("window.switchChat = function(chatId, chatTitle) {")
    idx_end = chat.find("        btnArchiveChat.title = showArchivedConversations", idx_start)
    if idx_start != -1 and idx_end != -1:
        # Find the end of that line
        idx_end = chat.find(";", idx_end) + 1
        chat = chat[:idx_start] + new_switch + chat[idx_end:]

    # 3. Add Manage Chat logic at the end of the file
    manage_logic = """

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
                text: `${currentUser ? (currentUser.name || currentUser.firstname) : 'Quelqu\\'un'} a ajouté ${window.selectedManageOtoUser.name} à la discussion.`,
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
"""

    chat += manage_logic

    with open('js/chat.js', 'w', encoding='utf-8') as f:
        f.write(chat)
    print("Success")

update_switch_chat()
