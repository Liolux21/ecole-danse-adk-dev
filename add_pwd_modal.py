import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

force_password_modal = """
  <!-- Modal Force Password Change -->
  <div class="vitrine-modal" id="modal-force-password" style="z-index: 9999; background: rgba(0,0,0,0.9);">
    <div class="vitrine-modal-content" style="max-width: 400px; padding: 2rem;">
      <h3 style="color: var(--gold); margin-top:0;">Bienvenue !</h3>
      <p style="color: var(--text-light); font-size: 0.9rem; margin-bottom: 1.5rem;">Pour des raisons de sécurité, veuillez personnaliser votre mot de passe pour votre première connexion.</p>
      
      <form id="form-force-password" onsubmit="event.preventDefault(); window.submitForcePassword();">
        <div class="form-group">
          <label class="form-label">Nouveau mot de passe</label>
          <input type="password" id="force-pwd-1" class="form-input" required minlength="6">
        </div>
        <div class="form-group">
          <label class="form-label">Confirmez le mot de passe</label>
          <input type="password" id="force-pwd-2" class="form-input" required minlength="6">
        </div>
        <div id="force-pwd-error" style="color: #e74c3c; font-size: 0.8rem; margin-bottom: 1rem; display: none;">Les mots de passe ne correspondent pas.</div>
        
        <button type="submit" class="btn btn-primary" style="width: 100%;" id="btn-force-pwd">Enregistrer et Continuer</button>
      </form>
    </div>
  </div>
"""

# Insert modal before <!-- Modal Tenue Gala -->
html = html.replace('<!-- Modal Tenue Gala -->', force_password_modal + '\n  <!-- Modal Tenue Gala -->')

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
