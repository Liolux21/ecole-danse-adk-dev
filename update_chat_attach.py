import re

with open('js/chat.js', 'r', encoding='utf-8') as f:
    content = f.read()

target_block = """    // ---- Pièces jointes ----
    const btnAttach = document.getElementById('btn-attach');
    const fileInput = document.getElementById('chat-file-input');
    if (btnAttach && fileInput) {
        btnAttach.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', () => {
            handleChatUpload(fileInput.files[0], btnAttach, '📎', fileInput);
        });
    }"""

new_block = """    // ---- Pièces jointes ----
    const btnAttach = document.getElementById('btn-attach');
    const fileInput = document.getElementById('chat-file-input');
    if (btnAttach && fileInput) {
        btnAttach.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                // Sur mobile, le trombone est restreint aux documents pour éviter l'invite de l'appareil photo
                fileInput.accept = ".pdf,.doc,.docx,.xls,.xlsx,.txt";
            } else {
                // Sur PC, le trombone accepte tout car on masque le bouton photo
                fileInput.accept = "image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt";
            }
            fileInput.click();
        });
        fileInput.addEventListener('change', () => {
            handleChatUpload(fileInput.files[0], btnAttach, '📎', fileInput);
        });
    }"""

if target_block in content:
    content = content.replace(target_block, new_block)
    with open('js/chat.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Patched js/chat.js successfully")
else:
    print("Could not find the target block in js/chat.js")
