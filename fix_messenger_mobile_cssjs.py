import re

# 1. Update style.css
with open('css/style.css', 'a', encoding='utf-8') as f:
    mobile_css = """
/* Mobile Messenger */
@media (max-width: 768px) {
  #messenger-sidebar {
    width: 100% !important;
  }
  #messenger-chat-area {
    display: none !important;
  }
  
  #global-messenger-container.chat-active #messenger-sidebar {
    display: none !important;
  }
  #global-messenger-container.chat-active #messenger-chat-area {
    display: flex !important;
    width: 100% !important;
  }
  
  #btn-back-to-list {
    display: block !important;
  }
}
"""
    f.write(mobile_css)

# 2. Update chat.js
with open('js/chat.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Add class when a chat is selected
js = js.replace("document.getElementById('active-chat-title').textContent = chatTitle;", "document.getElementById('active-chat-title').textContent = chatTitle;\n    const messenger = document.getElementById('global-messenger-container');\n    if (messenger) messenger.classList.add('chat-active');")

# Add listener for back button in DOMContentLoaded
back_logic = """
    const btnBack = document.getElementById('btn-back-to-list');
    if (btnBack) {
        btnBack.addEventListener('click', () => {
            const messenger = document.getElementById('global-messenger-container');
            if (messenger) messenger.classList.remove('chat-active');
            currentChatId = null;
        });
    }
"""
js = js.replace('// Send Message Logic', back_logic + '\n    // Send Message Logic')

with open('js/chat.js', 'w', encoding='utf-8') as f:
    f.write(js)
