import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Contact Inscription Modal
if 'id="modal-contact-inscription"' not in html:
    contact_modal = """
    <!-- Modal: Contact Inscription -->
    <div class="vitrine-modal" id="modal-contact-inscription">
      <div class="vitrine-modal-content" style="max-width: 500px;">
        <div class="vitrine-modal-header">
          <h4 class="vitrine-modal-title">Contacter le parent</h4>
          <button class="vitrine-modal-close" onclick="closeModal('modal-contact-inscription')">&times;</button>
        </div>
        <div class="vitrine-modal-body">
          <form id="form-contact-inscription" onsubmit="event.preventDefault(); window.sendContactInscription();">
            <input type="hidden" id="contact-inscription-email">
            <input type="hidden" id="contact-inscription-name">
            <div class="form-group">
              <label class="form-label">Message</label>
              <textarea id="contact-inscription-message" class="form-input" rows="5" required placeholder="Tapez votre message ici..."></textarea>
            </div>
            <div style="text-align: right; margin-top: 1rem;">
              <button type="submit" class="btn btn-primary">Envoyer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
"""
    # Insert before the last modal
    html = html.replace('<!-- Modal Mot de passe oubli', contact_modal + '\n  <!-- Modal Mot de passe oubli')

# 2. Modify Add Student Modal
old_age = """<div class="form-group">
              <label class="form-label">Âge</label>
              <input type="number" id="add-student-age" class="form-input" required>
            </div>"""
old_age_alt = """<div class="form-group">
              <label class="form-label">'ge</label>
              <input type="number" id="add-student-age" class="form-input" required>
            </div>"""

new_dob_and_tutor = """
            <div class="form-group">
              <label class="form-label">Date de naissance</label>
              <input type="date" id="add-student-dob" class="form-input" required>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Prénom tuteur</label>
                <input type="text" id="add-student-tutor-firstname" class="form-input" required>
              </div>
              <div class="form-group">
                <label class="form-label">Nom tuteur</label>
                <input type="text" id="add-student-tutor-lastname" class="form-input" required>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Téléphone tuteur</label>
              <input type="tel" id="add-student-tutor-phone" class="form-input" required>
            </div>
"""

html = html.replace(old_age, new_dob_and_tutor).replace(old_age_alt, new_dob_and_tutor)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
