import re

with open('js/chat.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Inside onSnapshot, before rendering messages
injection = """
        const disclaimer = document.createElement('div');
        disclaimer.style = "text-align: center; color: var(--text-muted); font-size: 0.75rem; margin-bottom: 1.5rem;";
        disclaimer.innerHTML = "⚠️ Toutes les communications sont visibles par l'administration.";
        messagesContainer.appendChild(disclaimer);
"""

js = re.sub(r'(if \(snapshot\.empty\) \{.*?return;\n        \})', r'\1\n' + injection, js, flags=re.DOTALL)

with open('js/chat.js', 'w', encoding='utf-8') as f:
    f.write(js)
