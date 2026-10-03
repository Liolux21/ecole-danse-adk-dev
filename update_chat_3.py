import re

def rewrite_create():
    with open('js/chat.js', 'r', encoding='utf-8') as f:
        chat = f.read()

    start_str = "        btnCreateChatConfirm.addEventListener('click', async () => {"
    end_str = "                msgInput2.value = '';"
    
    start_idx = chat.find(start_str)
    end_idx = chat.find(end_str)
    
    if start_idx == -1 or end_idx == -1:
        print("Could not find block")
        return

    replacement = """        btnCreateChatConfirm.addEventListener('click', async () => {
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
                }"""

    chat = chat[:start_idx] + replacement + chat[end_idx + len(end_str):]
    with open('js/chat.js', 'w', encoding='utf-8') as f:
        f.write(chat)
    print("Success")

rewrite_create()
