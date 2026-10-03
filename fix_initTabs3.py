import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# We know the function looks something like this:
# function initTabs(tabsContainerId, contentIds) {
#   ...
#   if (target) target.classList.add('active');
#   ...
# }

new_code = """        if (target) {
          target.classList.add('active');
          const targetId = contentIds[i];
          if (targetId.includes('messagerie')) {
            const messenger = document.getElementById('global-messenger-container');
            if (messenger) {
              target.appendChild(messenger);
              messenger.style.display = 'flex';
              if (window.loadConversations) window.loadConversations();
            }
          }
        }"""

js = js.replace("if (target) target.classList.add('active');", new_code)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
