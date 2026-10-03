import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add to Admin tabs
html = html.replace(
    '<button class="dash-tab" data-tab="admin-annonces">📢 Annonces</button>',
    '<button class="dash-tab" data-tab="admin-annonces">📢 Annonces</button>\n            <button class="dash-tab" data-tab="messagerie">💬 Messagerie</button>'
)

# Add to Prof tabs
html = html.replace(
    '<button class="dash-tab" data-tab="prof-notifications">🔔 Notifications <span id="prof-notif-badge"',
    '<button class="dash-tab" data-tab="messagerie">💬 Messagerie</button>\n            <button class="dash-tab" data-tab="prof-notifications">🔔 Notifications <span id="prof-notif-badge"'
)

# Add to Parent tabs
html = html.replace(
    '<button class="dash-tab" data-tab="parent-notifications">🔔 Notifications <span id="parent-notif-badge"',
    '<button class="dash-tab" data-tab="messagerie">💬 Messagerie</button>\n            <button class="dash-tab" data-tab="parent-notifications">🔔 Notifications <span id="parent-notif-badge"'
)

# Also need to add the actual Messenger HTML. We'll add it right before the modals.
messenger_html = """
    <!-- Global Messenger App Template (Moved dynamically to active tab) -->
    <div id="global-messenger-container" style="display: none;">
      <div class="messenger-app">
        <aside class="sidebar-conversations">
          <div class="sidebar-header">
            <h3 style="margin:0; font-family:'Playfair Display', serif; color:var(--gold);">Messagerie</h3>
            <button id="btn-new-chat" class="btn btn-outline btn-sm" title="Nouvelle discussion">+</button>
          </div>
          
          <div class="sidebar-search">
            <input type="text" id="search-conv" class="form-input" placeholder="Rechercher un prof, un groupe...">
          </div>

          <div class="conversations-list" id="conversations-list">
            <!-- Populated by JS -->
          </div>
        </aside>

        <main class="chat-main" id="chat-main">
          <header class="chat-header">
            <div class="chat-header-info">
              <h4 id="active-chat-title" style="margin:0; font-family:'Playfair Display', serif; color:var(--gold);">Sélectionnez une conversation</h4>
              <span id="active-chat-subtitle" style="font-size:0.8rem; color:var(--text-light);"></span>
            </div>
          </header>

          <div class="chat-messages" id="chat-messages">
            <!-- Messages go here -->
          </div>

          <footer class="chat-input-area">
            <textarea id="msg-input" class="form-input" placeholder="Écrire un message..." rows="1" style="flex:1; resize:none;"></textarea>
            <button id="btn-send-msg" class="btn btn-primary">Envoyer</button>
          </footer>
        </main>
      </div>
    </div>
"""

# Let's add the messenger CSS to the <style> block
css_to_add = """
      /* MESSENGER APP */
      .messenger-app {
        display: flex; height: 75vh; min-height: 500px;
        background: var(--dark-2); border-radius: var(--radius);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        overflow: hidden; border: 1px solid var(--border);
        margin-top: 1rem;
      }
      .sidebar-conversations {
        width: 300px; border-right: 1px solid var(--border);
        display: flex; flex-direction: column; background: var(--dark);
      }
      .sidebar-header { padding: 16px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); }
      .sidebar-search { padding: 10px 16px; }
      .conversations-list { flex: 1; overflow-y: auto; }
      .conv-item {
        display: flex; align-items: center; gap: 12px; padding: 12px 16px;
        cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.05);
        transition: background 0.15s ease;
      }
      .conv-item:hover { background: rgba(255,255,255,0.05); }
      .conv-item.active { background: rgba(255,255,255,0.1); border-left: 3px solid var(--gold); }
      .conv-avatar {
        width: 40px; height: 40px; border-radius: 50%; background: #333;
        display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0;
      }
      .conv-info { flex: 1; min-width: 0; }
      .conv-top { display: flex; justify-content: space-between; margin-bottom: 4px; }
      .conv-name { font-weight: 600; font-size: 14px; color: var(--white); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .conv-time { font-size: 11px; color: var(--text-light); }
      .conv-preview { font-size: 13px; color: var(--text-light); margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      
      .chat-main { flex: 1; display: flex; flex-direction: column; background: var(--dark-2); }
      .chat-header { padding: 16px 20px; border-bottom: 1px solid var(--border); background: var(--dark); }
      .chat-messages {
        flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px;
      }
      .chat-input-area { padding: 14px 20px; border-top: 1px solid var(--border); display: flex; gap: 10px; align-items: center; background: var(--dark); }
      
      .msg-row { display: flex; gap: 8px; max-width: 80%; }
      .msg-row.me { align-self: flex-end; flex-direction: row-reverse; }
      .msg-bubble { padding: 10px 14px; border-radius: 18px; position: relative; font-size: 14px; line-height: 1.4; word-break: break-word; }
      .msg-row.me .msg-bubble { background: var(--primary); color: #fff; border-bottom-right-radius: 4px; }
      .msg-row.other .msg-bubble { background: #333; color: #fff; border-bottom-left-radius: 4px; }
      .msg-meta { font-size: 11px; opacity: 0.7; margin-top: 4px; text-align: right; }
"""

html = html.replace('</style>', css_to_add + '\n    </style>')
html = html.replace('<!-- Modal: Absence -->', messenger_html + '\n    <!-- Modal: Absence -->')

# Now add empty tab-content divs for messagerie in all 3 dashboards
html = html.replace(
    '<!-- Tab: Inscriptions -->',
    '<!-- Tab: Messagerie --><div class="tab-content" id="tab-admin-messagerie"></div>\n          <!-- Tab: Inscriptions -->'
)
html = html.replace(
    '<!-- Tab: Mon Planning -->',
    '<!-- Tab: Messagerie --><div class="tab-content" id="tab-prof-messagerie"></div>\n          <!-- Tab: Mon Planning -->'
)
html = html.replace(
    '<!-- Tab: Mon Enfant / Planning -->',
    '<!-- Tab: Messagerie --><div class="tab-content" id="tab-parent-messagerie"></div>\n          <!-- Tab: Mon Enfant / Planning -->'
)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
