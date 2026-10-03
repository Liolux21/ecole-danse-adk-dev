import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

modal_html = """
  <!-- Modal Nouvelle Conversation -->
  <div class="vitrine-modal" id="modal-new-chat">
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
  </div>
"""

# Insert modal before the first modal
html = html.replace('<!-- Modal Tenue Gala -->', modal_html + '\n  <!-- Modal Tenue Gala -->')

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
