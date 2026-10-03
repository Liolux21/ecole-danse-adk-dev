import re

def rewrite_chat():
    with open('js/chat.js', 'r', encoding='utf-8') as f:
        chat = f.read()

    # Fix the null error in openNewChatModal
    chat = chat.replace("document.getElementById('new-chat-title').value = '';", "")

    # Now fix the query for non-admins to use two separate onSnapshots to avoid 'or' index requirement
    
    start_str = "    let q;"
    end_str = "        let allConvs = [];"
    
    start_idx = chat.find(start_str)
    end_idx = chat.find(end_str)
    
    if start_idx == -1 or end_idx == -1:
        print("Could not find query block")
        return

    replacement = """    let myGroups = ['all'];
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

    let combinedMap = new Map();

    const renderCombined = () => {
        let allConvs = Array.from(combinedMap.values());
        
        // Filter groups for non-admins
        if (currentUser.role !== 'admin') {
            allConvs = allConvs.filter(c => {
                if (!c.isGroup) return true; // OTO always ok if it came from q1
                return myGroups.includes(c.targetGroup);
            });
        }

        allConvs.sort((a, b) => {
            const timeA = a.lastMessageAt ? a.lastMessageAt.toMillis() : 0;
            const timeB = b.lastMessageAt ? b.lastMessageAt.toMillis() : 0;
            return timeB - timeA;
        });
        
        convListEl.innerHTML = '';
        if (allConvs.length === 0) {
            convListEl.innerHTML = `<div style="padding: 1rem; color: var(--text-light); text-align: center;">Aucune conversation ${showArchivedConversations ? 'archivée' : ''}</div>`;
            return;
        }

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

        // Rendre chaque groupe
        Object.values(groups).forEach(group => {
            if (group.convs.length === 0) return;

            // En-tête du groupe
            const header = document.createElement('div');
            header.style.cssText = 'padding: 0.5rem 1rem; font-size: 0.65rem; font-weight: 700; color: var(--gold); text-transform: uppercase; letter-spacing: 0.05em; background: #f0f0f0; border-top: 1px solid var(--border); padding: 4px 10px;';
            header.textContent = group.label;
            convListEl.appendChild(header);

            group.convs.forEach(({ id: convId, data: conv }) => {
"""
    
    # We also need to remove the existing rendering block because we put it inside renderCombined()
    end_render_idx = chat.find("        // ---- Crer la conversation ----")
    if end_render_idx == -1:
        end_render_idx = chat.find("        // ---- Créer la conversation ----")
    if end_render_idx == -1:
        end_render_idx = chat.find("const btnCreateChatConfirm = document.getElementById('btn-create-chat-confirm');")
        if end_render_idx != -1:
            # step back to the end of loadConversations
            end_render_idx = chat.rfind("};", 0, end_render_idx) + 2

    if end_render_idx != -1:
        # Reconstruct the whole loadConversations block manually via replacing the chunk
        pass
    else:
        print("Cannot find end of render block")
        
    print("Wait, let's just do a simpler replacement.")

rewrite_chat()
