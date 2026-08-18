import re

with open('js/auth.js', 'r', encoding='utf-8') as f:
    auth_js = f.read()

# Add sendPasswordResetEmail to the imports
if 'sendPasswordResetEmail' not in auth_js:
    auth_js = auth_js.replace("import { auth, db, signInWithEmailAndPassword, signOut, onAuthStateChanged, doc, getDoc }",
                              "import { auth, db, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail, doc, getDoc }")

# Add resetPassword function
reset_func = '''
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch(e) {
      console.error("Reset password error:", e);
      return false;
    }
  },

  async logout() {'''

if 'resetPassword(' not in auth_js:
    auth_js = auth_js.replace("  async logout() {", reset_func)

with open('js/auth.js', 'w', encoding='utf-8') as f:
    f.write(auth_js)


with open('js/app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

# Add submitResetPassword function
app_reset_func = '''window.submitResetPassword = async function() {
  const email = document.getElementById('reset-password-email').value;
  const btn = document.querySelector('#form-reset-password button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Envoi...';
  btn.disabled = true;

  const success = await AUTH.resetPassword(email);
  if (success) {
    showToast('✉️ Email de réinitialisation envoyé ! Vérifiez vos spams.', 'success');
    closeModal('modal-reset-password');
    document.getElementById('form-reset-password').reset();
  } else {
    showToast('❌ Erreur : Cette adresse n\\'existe peut-être pas.', 'error');
  }

  btn.textContent = originalText;
  btn.disabled = false;
};

window.openAddStudentModal'''

if 'submitResetPassword' not in app_js:
    app_js = app_js.replace("window.openAddStudentModal", app_reset_func)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(app_js)


with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add link in login form
login_form_target = '''<div class="form-group">
              <label class="form-label" for="portal-password">Mot de passe</label>
              <input class="form-input" type="password" id="portal-password" placeholder="••••••••" required autocomplete="current-password">
            </div>'''
login_form_replacement = '''<div class="form-group" style="margin-bottom: 0.5rem;">
              <label class="form-label" for="portal-password">Mot de passe</label>
              <input class="form-input" type="password" id="portal-password" placeholder="••••••••" required autocomplete="current-password">
            </div>
            <div style="text-align: right; margin-bottom: 1.5rem;">
              <a href="#" onclick="event.preventDefault(); document.getElementById('modal-reset-password').classList.add('active');" style="color: var(--primary); font-size: 0.85rem; text-decoration: none;">Mot de passe oublié ?</a>
            </div>'''

if 'modal-reset-password' not in html:
    html = html.replace(login_form_target, login_form_replacement)
    
    # Add modal at the bottom
    modal_html = '''
  <!-- Modal Mot de passe oublié -->
  <div class="vitrine-modal" id="modal-reset-password">
    <div class="vitrine-modal-content" style="max-width: 400px;">
      <div class="vitrine-modal-header">
        <h4 class="vitrine-modal-title">Mot de passe oublié</h4>
        <button class="vitrine-modal-close" onclick="document.getElementById('modal-reset-password').classList.remove('active')">&times;</button>
      </div>
      <div class="vitrine-modal-body">
        <p style="margin-bottom: 1.5rem; font-size: 0.95rem; color: var(--text-muted);">
          Entrez l'adresse email associée à votre compte. Un lien de réinitialisation vous sera envoyé.
        </p>
        <form id="form-reset-password" onsubmit="event.preventDefault(); submitResetPassword();">
          <div class="form-group">
            <label class="form-label" for="reset-password-email">Adresse Email</label>
            <input type="email" id="reset-password-email" class="form-control" required placeholder="votre@email.com">
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%">Envoyer le lien</button>
        </form>
      </div>
    </div>
  </div>

  <script type="module" src="js/data.js?v=2"></script>'''
    html = html.replace('  <script type="module" src="js/data.js?v=2"></script>', modal_html)
    
    # Bump cache
    html = html.replace('?v=25', '?v=26')

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)

with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()
    index_html = index_html.replace('?v=25', '?v=26')
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index_html)

print("Done")
