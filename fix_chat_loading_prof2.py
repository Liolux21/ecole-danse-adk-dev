import re

def rewrite_chat_loading():
    with open('js/chat.js', 'r', encoding='utf-8') as f:
        chat = f.read()

    start_str = "    q = query(collection(db, 'conversations'));"
    
    # We replace from start_str up to the end of the empty check block
    end_str = """        let allConvs = [];
        snapshot.forEach(docSnap => {"""
        
    start_idx = chat.find(start_str)
    end_idx = chat.find(end_str) + len(end_str)
    
    if start_idx == -1 or end_idx == -1:
        print("Could not find blocks")
        return

    replacement = """    let qOto, qGroup;
    if (currentUser.role === 'admin') {
        qOto = query(collection(db, 'conversations'));
        qGroup = null;
    } else {
        qOto = query(collection(db, 'conversations'), where('participants', 'array-contains', currentUser.email));
        qGroup = query(collection(db, 'conversations'), where('isGroup', '==', true));
    }

    let combinedMap = new Map();
    let loadedOto = false;
    let loadedGroup = false;

    const renderCombined = () => {
        if (!loadedOto || (!loadedGroup && qGroup !== null)) return;
        
        convListEl.innerHTML = '';
        let allConvs = Array.from(combinedMap.values());
        
        if (allConvs.length === 0) {
            convListEl.innerHTML = '<div style="padding: 1rem; color: var(--text-light); text-align: center;">Aucune conversation</div>';
            return;
        }

        // Sort locally
        allConvs.sort((a, b) => {
            const tA = a.data.lastMessageAt && typeof a.data.lastMessageAt.toMillis === 'function' ? a.data.lastMessageAt.toMillis() : 0;
            const tB = b.data.lastMessageAt && typeof b.data.lastMessageAt.toMillis === 'function' ? b.data.lastMessageAt.toMillis() : 0;
            return tB - tA;
        });

        let groups = {
            admin: { label: '🛡️ Administration', convs: [] },
            cours: { label: '🎵 Mes Cours', convs: [] },
            onetoone: { label: '👤 Messages Privés', convs: [] }
        };

        let hasAnyConv = false;
        allConvs.forEach(convObj => {
            const convId = convObj.id;
            const conv = convObj.data;
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

        // Rendre chaque groupe
        Object.values(groups).forEach(group => {
            if (group.convs.length === 0) return;

            const header = document.createElement('div');
            header.style.cssText = 'padding: 0.5rem 1rem; font-size: 0.65rem; font-weight: 700; color: var(--gold); text-transform: uppercase; letter-spacing: 0.05em; background: #f0f0f0; border-top: 1px solid var(--border); padding: 4px 10px;';
            header.textContent = group.label;
            convListEl.appendChild(header);

            group.convs.forEach(({ id: convId, data: conv }) => {
"""

    # We need to replace the entire rendering block with the combined one.
    # It is much safer to do this with regex or careful string replacement.
    pass
