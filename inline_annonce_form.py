import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Replace the + button with the form in tab-admin-annonces
new_form = r'''          <div style="background:var(--dark-2); padding:1.5rem; border-radius:var(--radius); border:1px solid var(--border); margin-bottom:2rem;">
            <h4 style="margin-top:0; margin-bottom:1rem; color:var(--gold);">Rédiger une nouvelle annonce</h4>
            <form id="form-add-annonce" onsubmit="event.preventDefault(); submitAddAnnonce();">
              <div class="form-group">
                <label class="form-label">Destinataires</label>
                <select id="annonce-target" class="form-input" required>
                  <option value="all">Tous (Parents et Profs)</option>
                  <option value="parents">Tous les Parents</option>
                  <option value="profs">Tous les Professeurs</option>
                  <!-- Les cours seront insérés ici dynamiquement -->
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Titre de l'annonce</label>
                <input type="text" id="annonce-title" class="form-input" required>
              </div>
              <div class="form-group">
                <label class="form-label">Message</label>
                <textarea id="annonce-content" class="form-input" rows="4" required></textarea>
              </div>
              <div style="text-align: right; margin-top: 1rem;">
                <button type="submit" class="btn btn-primary">Publier l'annonce</button>
              </div>
            </form>
          </div>
'''
html = re.sub(r'<button class="btn btn-primary btn-sm" onclick="openAddAnnonceModal\(\)">\+ Nouvelle annonce</button>', new_form, html)

# 2. Remove the modal
html = re.sub(r'<!-- Modal: Ajouter une Annonce -->.*?<!-- Modal: Ajouter un élève -->', '<!-- Modal: Ajouter un élève -->', html, flags=re.DOTALL)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("portail.html updated")


with open('js/app.js', 'r', encoding='utf-8') as f:
    app = f.read()

# Remove openAddAnnonceModal
app = re.sub(r'window\.openAddAnnonceModal = function\(\) \{.*?\n\};\n\n', '', app, flags=re.DOTALL)

# Remove closeModal from submitAddAnnonce
app = app.replace("closeModal('modal-add-annonce');", "document.getElementById('form-add-annonce').reset();")

# Inject options populating into renderAdminAnnonces
populate_options = r'''
  // Populate form options if not already done
  const targetSelect = document.getElementById('annonce-target');
  if (targetSelect && targetSelect.options.length <= 3) {
    DATA.courses.forEach(c => {
      const opt = document.createElement('option');
      opt.value = "course_" + c.id;
      opt.textContent = `Cours: ${c.name || c.title} (${c.category || c.level || ''})`;
      targetSelect.appendChild(opt);
    });
  }
'''
app = re.sub(r'(function renderAdminAnnonces\(\) \{)', r'\1' + populate_options, app)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(app)
print("app.js updated")
