import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Find the exact initTabs implementation and replace it
# It looks like:
# function initTabs(tabsContainerId, contentIds) { ... }

new_init_tabs = """function initTabs(tabsContainerId, contentIds) {
    const container = document.getElementById(tabsContainerId);
    if (!container) return;
    container.querySelectorAll('.dash-tab, .btn-tab').forEach((tab, i) => {
      tab.addEventListener('click', () => {
        container.querySelectorAll('.dash-tab, .btn-tab').forEach(t => t.classList.remove('active'));
        contentIds.forEach(id => { const el = document.getElementById(id); if (el) el.classList.remove('active'); });
        tab.classList.add('active');
        const targetId = contentIds[i];
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.classList.add('active');
          
          // --- MESSENGER INTEGRATION ---
          if (targetId.includes('messagerie')) {
            const messenger = document.getElementById('global-messenger-container');
            if (messenger) {
              targetEl.appendChild(messenger);
              messenger.style.display = 'flex';
              if (window.loadConversations) window.loadConversations();
            }
          }
        }
        if (typeof renderGalaTables === 'function') renderGalaTables();
      });
    });
  }"""

js = re.sub(r'function initTabs\(tabsContainerId, contentIds\) \{.*?(?=\n  // =============================================)', new_init_tabs + '\n', js, flags=re.DOTALL)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
