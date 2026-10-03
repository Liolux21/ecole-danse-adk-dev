import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Define the new modal content
new_modal_body = """          <form id="form-add-prof" onsubmit="event.preventDefault(); window.saveProf();">
            <input type="hidden" id="prof-id">
            <div style="display: flex; gap: 1rem;">
              <div class="form-group" style="flex: 1;">
                <label class="form-label">Prénom du professeur</label>
                <input type="text" id="prof-firstname" class="form-input" required>
              </div>
              <div class="form-group" style="flex: 1;">
                <label class="form-label">Nom du professeur</label>
                <input type="text" id="prof-lastname" class="form-input" required>
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label">Date de naissance</label>
              <input type="date" id="prof-dob" class="form-input" required>
            </div>

            <div class="form-group">
              <label class="form-label">Email (sert d'identifiant de connexion)</label>
              <input type="email" id="prof-email" class="form-input" required>
            </div>

            <div class="form-group">
              <label class="form-label">Téléphone</label>
              <input type="tel" id="prof-phone" class="form-input">
            </div>

            <div class="form-group" style="display: flex; align-items: center; gap: 0.5rem; margin-top: 1rem; margin-bottom: 1rem;">
              <input type="checkbox" id="prof-has-tutor" onchange="document.getElementById('prof-tutor-section').style.display = this.checked ? 'block' : 'none';" style="width: 18px; height: 18px; cursor: pointer;">
              <label for="prof-has-tutor" style="font-weight: 500; cursor: pointer;">Ce professeur a un tuteur (mineur)</label>
            </div>

            <div id="prof-tutor-section" style="display: none; background: rgba(0,0,0,0.03); padding: 1rem; border-radius: var(--radius); margin-bottom: 1rem;">
              <h5 style="margin-top: 0; margin-bottom: 0.8rem; color: var(--primary);">Informations du tuteur</h5>
              <div style="display: flex; gap: 1rem;">
                <div class="form-group" style="flex: 1;">
                  <label class="form-label">Prénom du tuteur</label>
                  <input type="text" id="prof-tutor-firstname" class="form-input">
                </div>
                <div class="form-group" style="flex: 1;">
                  <label class="form-label">Nom du tuteur</label>
                  <input type="text" id="prof-tutor-lastname" class="form-input">
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Email du tuteur</label>
                <input type="email" id="prof-tutor-email" class="form-input">
              </div>
              <div class="form-group">
                <label class="form-label">Téléphone du tuteur</label>
                <input type="tel" id="prof-tutor-phone" class="form-input">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Cours enseignés (en tant que professeur)</label>
              <div id="add-prof-taught-courses" style="max-height: 150px; overflow-y: auto; background: var(--bg-color); padding: 0.5rem; border-radius: var(--radius); border: 1px solid var(--border-color); margin-bottom: 1rem;">
                <!-- Checkboxes populated by JS -->
              </div>
            </div>
            <div style="text-align: right; margin-top: 1rem;">
              <button type="submit" class="btn btn-primary">Enregistrer</button>
            </div>
          </form>"""

# Find the form and replace it
# We search for <form id="form-add-prof" ...> up to </form>
pattern = r'<form id="form-add-prof".*?</form>'
html = re.sub(pattern, new_modal_body, html, flags=re.DOTALL)

# Bump cache
html = re.sub(r'src="js/app.js\?v=\d+"', 'src="js/app.js?v=32"', html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
