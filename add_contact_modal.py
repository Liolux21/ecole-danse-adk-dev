import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

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

if 'id="modal-contact-inscription"' not in html:
    html = html.replace('<!-- Modal Mot de passe oublié', contact_modal + '\n  <!-- Modal Mot de passe oublié')

# Bump version to 24 to invalidate cache fully
html = re.sub(r'src="js/app.js\?v=\d+"', 'src="js/app.js?v=24"', html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
