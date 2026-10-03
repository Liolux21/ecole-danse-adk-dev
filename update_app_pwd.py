import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Modify showPortalDashboard to check mustChangePassword
old_show = """function showPortalDashboard(user) {
    document.getElementById('portal-login-wrapper').style.display = 'none';
    document.querySelectorAll('.dashboard-panel').forEach(p => p.classList.remove('active'));"""

new_show = """function showPortalDashboard(user) {
    if (user.mustChangePassword) {
      document.getElementById('modal-force-password').classList.add('active');
    }
    document.getElementById('portal-login-wrapper').style.display = 'none';
    document.querySelectorAll('.dashboard-panel').forEach(p => p.classList.remove('active'));"""

js = js.replace(old_show, new_show)

# Add submitForcePassword logic
submit_logic = """
  window.submitForcePassword = async function() {
    const pwd1 = document.getElementById('force-pwd-1').value;
    const pwd2 = document.getElementById('force-pwd-2').value;
    const err = document.getElementById('force-pwd-error');
    const btn = document.getElementById('btn-force-pwd');
    
    if (pwd1 !== pwd2) {
      err.textContent = "Les mots de passe ne correspondent pas.";
      err.style.display = "block";
      return;
    }
    
    err.style.display = "none";
    btn.disabled = true;
    btn.textContent = "Enregistrement...";
    
    try {
      await AUTH.forceChangePassword(pwd1);
      document.getElementById('modal-force-password').classList.remove('active');
      showToast("Mot de passe mis à jour avec succès !", "success");
    } catch(e) {
      err.textContent = "Erreur lors du changement de mot de passe. Veuillez réessayer.";
      err.style.display = "block";
    }
    
    btn.disabled = false;
    btn.textContent = "Enregistrer et Continuer";
  };
"""

js = js.replace('window.submitResetPassword = async function() {', submit_logic + '\n  window.submitResetPassword = async function() {')
js = js.replace('window.submitResetPassword = submitResetPassword;', 'window.submitResetPassword = submitResetPassword;\n  window.submitForcePassword = submitForcePassword;')

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
