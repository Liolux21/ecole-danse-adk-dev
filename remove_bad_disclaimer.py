import re

with open('js/chat.js', 'r', encoding='utf-8') as f:
    js = f.read()

# The first injection starts around:
#         if (snapshot.empty) {
#             convListEl.innerHTML = ...
#             return;
#         }
#         const disclaimer = ...

bad_injection = """        const disclaimer = document.createElement('div');
        disclaimer.style = "text-align: center; color: var(--text-muted); font-size: 0.75rem; margin-bottom: 1.5rem;";
        disclaimer.innerHTML = "⚠️ Toutes les communications sont visibles par l'administration.";
        messagesContainer.appendChild(disclaimer);"""

# Replace the first occurrence only
js = js.replace(bad_injection, "", 1)

# In fact, we should also clear the innerHTML completely before adding the disclaimer in the SECOND occurrence, 
# because if we just append, the old messages are not cleared?
# Wait! In chat.js, does the second occurrence clear messages? Let's check the code:
#     unsubscribeMessages = onSnapshot(q, (snapshot) => {
#         messagesContainer.innerHTML = '';
#         if (snapshot.empty) { ... return; }
#         [INJECTION HERE]
#         snapshot.forEach...
# It DOES have messagesContainer.innerHTML = ''; just before the if statement!
# BUT if I appended disclaimer, it's fine.

with open('js/chat.js', 'w', encoding='utf-8') as f:
    f.write(js)
