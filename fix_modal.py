import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Fix the global-messenger-container visibility
html = html.replace('style="display:none; height: 75vh; background: #fff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid var(--border); overflow: hidden; display: flex; flex-direction: row; margin-top: 1rem;"', 'class="global-messenger-container" style="display:none; height: 75vh; background: #fff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid var(--border); overflow: hidden; flex-direction: row; margin-top: 1rem;"')

# 2. Update the new chat modal
old_modal = """<div class="vitrine-modal" id="modal-new-chat">
    <div class="vitrine-modal-content" style="max-width: 400px;">
      <div class="vitrine-modal-header">
        <h4 class="vitrine-modal-title">Nouvelle Discussion</h4>
        <button class="vitrine-modal-close" onclick="closeModal('modal-new-chat')">&times;</button>
      </div>
      <div class="vitrine-modal-body">
        <div class="form-group">
          <label class="form-label">Sujet / Nom du contact</label>
          <input type="text" id="new-chat-title" class="form-input" placeholder="Ex: Maman de Léo, ou Éveil...">
        </div>
        <div style="text-align: right; margin-top: 1.5rem;">
          <button id="btn-create-chat-confirm" class="btn btn-primary" style="width: 100%;">Créer la discussion</button>
        </div>
      </div>
    </div>
  </div>"""

new_modal = """<div class="vitrine-modal" id="modal-new-chat">
    <div class="vitrine-modal-content" style="max-width: 500px;">
      <div class="vitrine-modal-header">
        <h4 class="vitrine-modal-title">Nouvelle Discussion</h4>
        <button class="vitrine-modal-close" onclick="closeModal('modal-new-chat')">&times;</button>
      </div>
      <div class="vitrine-modal-body">
        
        <div class="form-group">
          <label class="form-label">Destinataires</label>
          <select id="new-chat-target" class="form-input" required>
            <!-- Filled by JS -->
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Sujet de la discussion</label>
          <input type="text" id="new-chat-title" class="form-input" placeholder="Ex: Informations Gala, Rappel cours..." required>
        </div>

        <div class="form-group">
          <label class="form-label">Premier message</label>
          <textarea id="new-chat-first-msg" class="form-input" rows="4" placeholder="Écrivez votre message ici..." required></textarea>
        </div>

        <div style="text-align: right; margin-top: 1.5rem;">
          <button id="btn-create-chat-confirm" class="btn btn-primary" style="width: 100%;">Envoyer le message</button>
        </div>
      </div>
    </div>
  </div>"""

html = html.replace(old_modal, new_modal)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
