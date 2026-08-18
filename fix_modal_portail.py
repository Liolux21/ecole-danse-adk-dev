import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_modal = re.search(r'<div class="vitrine-modal" id="modal-add-student">.*?</form>\s*</div>\s*</div>', html, re.DOTALL)

if old_modal:
    new_modal = '''<div class="vitrine-modal" id="modal-add-student">
    <div class="vitrine-modal-content" style="max-width: 550px;">
      <div class="vitrine-modal-header" style="padding-right: 2.5rem;">
        <h2 class="vitrine-modal-title">Ajouter un élève</h2>
        <button class="vitrine-modal-close" onclick="closeModal('modal-add-student')">&times;</button>
      </div>
      <div class="vitrine-modal-body">
        <form id="form-add-student" onsubmit="event.preventDefault(); submitAddStudent();">
          <input type="hidden" id="add-student-id">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label class="form-label">Prénom</label>
              <input type="text" id="add-student-firstname" class="form-input" required>
            </div>
            <div class="form-group">
              <label class="form-label">Nom</label>
              <input type="text" id="add-student-lastname" class="form-input" required>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Âge</label>
            <input type="number" id="add-student-age" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">Cours</label>
            <div id="add-student-courses" style="max-height: 150px; overflow-y: auto; padding: 1rem; border: 1px solid rgba(0,0,0,0.2); border-radius: 8px; background: #f9f9f9;">
              <!-- Dynamique checkboxes -->
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Email de contact (Parent)</label>
            <input type="email" id="add-student-email" class="form-input" required>
          </div>
          <div style="text-align: right; margin-top: 1.5rem;">
            <button type="submit" class="btn btn-primary" style="padding: 0.75rem 1.5rem;">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>'''
    
    html = html.replace(old_modal.group(0), new_modal)
    html = html.replace('?v=33', '?v=34')
    
    with open('portail.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print('Updated portail.html')
else:
    print('Regex failed to match modal')

with open('index.html', 'r', encoding='utf-8') as f:
    idx = f.read()
idx = idx.replace('?v=33', '?v=34')
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(idx)
