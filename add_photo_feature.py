import re

def patch_portail():
    with open('portail.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Add photo button next to emoji button
    btn_attach_html = '''<button id="btn-attach" title="Joindre un fichier" style="background:none;border:none;cursor:pointer;padding:0.2rem 0.4rem;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:var(--text-color);" onmouseenter="this.style.background='#f0f0f0'" onmouseleave="this.style.background='none'"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg></button>'''
    
    new_btn_photo_html = '''<button id="btn-photo" title="Prendre/Choisir une photo" style="background:none;border:none;cursor:pointer;padding:0.2rem 0.4rem;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:var(--text-color);" onmouseenter="this.style.background='#f0f0f0'" onmouseleave="this.style.background='none'"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg></button>'''
    
    if 'id="btn-photo"' not in content:
        content = content.replace(btn_attach_html, btn_attach_html + '\n          ' + new_btn_photo_html)
    
    # Add photo input
    file_input_html = '''<input type="file" id="chat-file-input" accept="image/*,.pdf,.doc,.docx,.xls,.xlsx" style="display:none;">'''
    photo_input_html = '''<input type="file" id="chat-photo-input" accept="image/*" style="display:none;">'''
    
    if 'id="chat-photo-input"' not in content:
        content = content.replace(file_input_html, file_input_html + '\n        ' + photo_input_html)
        
    with open('portail.html', 'w', encoding='utf-8') as f:
        f.write(content)

def patch_chat():
    with open('js/chat.js', 'r', encoding='utf-8') as f:
        content = f.read()

    target_block = """    // ---- Pièces jointes ----
    const btnAttach = document.getElementById('btn-attach');
    const fileInput = document.getElementById('chat-file-input');
    if (btnAttach && fileInput) {
        btnAttach.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', async () => {
            const file = fileInput.files[0];
            if (!file || !currentChatId) return;
            const currentUser = window.AUTH ? window.AUTH.currentUser : null;
            if (!currentUser) return;

            const MAX_SIZE = 10 * 1024 * 1024; // 10MB
            if (file.size > MAX_SIZE) {
                alert("Fichier trop volumineux (max 10 Mo).");
                fileInput.value = '';
                return;
            }

            btnAttach.disabled = true;
            btnAttach.textContent = '⏳';
            try {
                const path = `chat/${currentChatId}/${Date.now()}_${file.name}`;
                const ref = storageRef(storage, path);
                await uploadBytes(ref, file);
                const url = await getDownloadURL(ref);

                await addDoc(collection(db, 'conversations', currentChatId, 'messages'), {
                    text: '',
                    fileUrl: url,
                    fileName: file.name,
                    fileType: file.type,
                    senderId: currentUser.email,
                    senderName: currentUser.name || currentUser.email,
                    timestamp: serverTimestamp()
                });
                await updateDoc(doc(db, 'conversations', currentChatId), {
                    lastMessage: `📎 ${file.name}`,
                    lastMessageAt: serverTimestamp(),
                    archivedBy: []
                });
            } catch(e) {
                console.error("Upload error:", e);
                alert("Erreur lors de l'envoi du fichier.");
            }
            btnAttach.disabled = false;
            btnAttach.textContent = '📎';
            fileInput.value = '';
        });
    }"""
    
    new_block = """    // ---- Helper: Upload File/Photo ----
    async function handleChatUpload(file, btnElement, originalIcon, inputElement) {
        if (!file || !currentChatId) return;
        const currentUser = window.AUTH ? window.AUTH.currentUser : null;
        if (!currentUser) return;

        const MAX_SIZE = 10 * 1024 * 1024; // 10MB
        if (file.size > MAX_SIZE) {
            alert("Fichier trop volumineux (max 10 Mo).");
            inputElement.value = '';
            return;
        }

        btnElement.disabled = true;
        const originalHtml = btnElement.innerHTML;
        btnElement.textContent = '⏳';
        try {
            const path = `chat/${currentChatId}/${Date.now()}_${file.name}`;
            const ref = storageRef(storage, path);
            await uploadBytes(ref, file);
            const url = await getDownloadURL(ref);

            await addDoc(collection(db, 'conversations', currentChatId, 'messages'), {
                text: '',
                fileUrl: url,
                fileName: file.name,
                fileType: file.type,
                senderId: currentUser.email,
                senderName: currentUser.name || currentUser.email,
                timestamp: serverTimestamp()
            });
            await updateDoc(doc(db, 'conversations', currentChatId), {
                lastMessage: `${originalIcon} ${file.name}`,
                lastMessageAt: serverTimestamp(),
                archivedBy: []
            });
        } catch(e) {
            console.error("Upload error:", e);
            alert("Erreur lors de l'envoi.");
        }
        btnElement.disabled = false;
        btnElement.innerHTML = originalHtml;
        inputElement.value = '';
    }

    // ---- Pièces jointes ----
    const btnAttach = document.getElementById('btn-attach');
    const fileInput = document.getElementById('chat-file-input');
    if (btnAttach && fileInput) {
        btnAttach.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', () => {
            handleChatUpload(fileInput.files[0], btnAttach, '📎', fileInput);
        });
    }

    // ---- Photos ----
    const btnPhoto = document.getElementById('btn-photo');
    const photoInput = document.getElementById('chat-photo-input');
    if (btnPhoto && photoInput) {
        btnPhoto.addEventListener('click', () => photoInput.click());
        photoInput.addEventListener('change', () => {
            handleChatUpload(photoInput.files[0], btnPhoto, '📷', photoInput);
        });
    }"""
    
    if "handleChatUpload" not in content:
        content = content.replace(target_block, new_block)
        with open('js/chat.js', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Patched js/chat.js")
    else:
        print("Already patched js/chat.js")

patch_portail()
patch_chat()
print("Done!")
