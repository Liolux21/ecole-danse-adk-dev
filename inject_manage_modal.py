import re

def inject_modal():
    with open('portail.html', 'r', encoding='utf-8') as f:
        html = f.read()

    new_modal = """
  <!-- Modal Gérer la Conversation -->
  <div class="vitrine-modal" id="modal-manage-chat">
    <div class="vitrine-modal-content" style="max-width: 500px;">
      <div class="vitrine-modal-header">
        <h4 class="vitrine-modal-title">Gérer le groupe</h4>
        <button class="vitrine-modal-close" onclick="closeModal('modal-manage-chat')">&times;</button>
      </div>
      <div class="vitrine-modal-body">
        
        <div class="form-group">
          <label class="form-label">Nom du groupe (optionnel)</label>
          <input type="text" id="manage-chat-title" class="form-input" placeholder="Ex: Chorégraphie 2026">
          <div style="text-align: right; margin-top: 0.5rem;">
            <button id="btn-update-chat-title" class="btn btn-primary btn-sm">Enregistrer le nom</button>
          </div>
        </div>
        
        <hr style="border:none; border-top:1px solid var(--border); margin: 1.5rem 0;">

        <div class="form-group">
          <label class="form-label">Ajouter une personne</label>
          <input type="text" id="manage-oto-search" class="form-input" placeholder="Tapez un nom pour ajouter...">
          <div id="manage-oto-results" style="margin-top:0.5rem; max-height:180px; overflow-y:auto; border:1px solid var(--border); border-radius:var(--radius); display:none;">
            <!-- Filled by JS -->
          </div>
          <div id="manage-oto-selected" style="margin-top:0.5rem; display:none; background:#f4f4f4; padding:0.5rem 1rem; border-radius:var(--radius); font-weight:600; font-size:0.9rem;"></div>
          
          <div style="text-align: right; margin-top: 0.5rem;">
            <button id="btn-add-person-chat" class="btn btn-primary btn-sm">Ajouter cette personne</button>
          </div>
        </div>

      </div>
    </div>
  </div>
"""

    target = "  <!-- Modal Nouvelle Conversation -->"
    if target in html:
        html = html.replace(target, new_modal + "\n" + target)
        with open('portail.html', 'w', encoding='utf-8') as f:
            f.write(html)
        print("Success")
    else:
        print("Target not found")

inject_modal()
