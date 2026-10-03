import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

chat_html = """
  <!-- GLOBAL MESSENGER CONTAINER -->
  <div id="global-messenger-container" style="display:none; height: 75vh; background: #fff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid var(--border); overflow: hidden; display: flex; flex-direction: row; margin-top: 1rem;">
    <!-- LEFT SIDEBAR -->
    <div style="width: 320px; background: #f8f9fa; border-right: 1px solid var(--border); display: flex; flex-direction: column;">
      <div style="padding: 1rem; border-bottom: 1px solid var(--border); background: #fff; display: flex; justify-content: space-between; align-items: center;">
        <h3 style="margin:0; font-size: 1.1rem; color: var(--gold);">Conversations</h3>
        <button id="btn-new-chat" class="btn btn-outline btn-sm" style="padding: 0.3rem 0.6rem; font-size: 1.1rem;">+</button>
      </div>
      <!-- List of conversations -->
      <div id="conversations-list" style="flex:1; overflow-y: auto; padding: 0.5rem 0;">
        <!-- Filled by chat.js -->
        <div style="text-align: center; color: var(--text-light); padding: 2rem;">Chargement...</div>
      </div>
    </div>
    
    <!-- RIGHT CHAT AREA -->
    <div style="flex: 1; display: flex; flex-direction: column; background: #ffffff;">
      <!-- Chat Header -->
      <div style="padding: 1rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between;">
        <h3 id="active-chat-title" style="margin:0; font-size: 1.1rem;">Sélectionnez une discussion</h3>
      </div>
      <!-- Messages -->
      <div id="chat-messages" style="flex:1; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; gap: 0.8rem; background: #fbfbfb;">
        <!-- Filled by chat.js -->
        <div style="text-align: center; color: var(--text-light); margin-top: 2rem;">Veuillez sélectionner ou créer une discussion pour commencer.</div>
      </div>
      <!-- Input Area -->
      <div style="padding: 1rem; border-top: 1px solid var(--border); background: #fff; display: flex; gap: 0.5rem;">
        <input type="text" id="msg-input" class="form-input" placeholder="Écrivez votre message..." style="flex: 1; border-radius: 20px;">
        <button id="btn-send-msg" class="btn btn-primary" style="border-radius: 20px; padding: 0.5rem 1.5rem;">Envoyer</button>
      </div>
    </div>
  </div>
"""

# Insert right before <script type="module" src="js/data.js
html = html.replace('<script type="module" src="js/data.js', chat_html + '\n  <script type="module" src="js/data.js')

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
