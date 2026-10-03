import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Rename the admin modal and its fields
admin_modal_old = """    <!-- Modal: Gérer un cours -->
    <div class="vitrine-modal" id="modal-manage-course">
      <div class="vitrine-modal-content">
        <button class="vitrine-modal-close" onclick="closeModal('modal-manage-course')">&times;</button>
        <div class="vitrine-modal-header">
          <h2 class="vitrine-modal-title" id="manage-course-title">Nouveau cours</h2>
        </div>
        <div class="vitrine-modal-body">
          <form id="form-manage-course" onsubmit="event.preventDefault(); submitManageCourse();">
            <input type="hidden" id="manage-course-id">
            <div class="form-group">
              <label class="form-label">Nom du cours</label>
              <input type="text" id="manage-course-name" class="form-control" required>
            </div>
            <div class="form-group">
              <label class="form-label">Professeur</label>
              <select id="manage-course-prof" class="form-control" required>
                <!-- Dynamique -->
              </select>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Jour/Heure (ex: Lundi 17h30)</label>
                <input type="text" id="manage-course-schedule" class="form-control" required>
              </div>
              <div class="form-group">
                <label class="form-label">Âge (ex: 8 à 10 ans)</label>
                <input type="text" id="manage-course-age" class="form-control" required>
              </div>
            </div>
            <div class="vitrine-modal-footer">
              <button type="submit" class="btn btn-primary">Enregistrer</button>
            </div>
          </form>
        </div>
      </div>
    </div>"""

admin_modal_new = """    <!-- Modal: Gérer un cours -->
    <div class="vitrine-modal" id="modal-admin-course">
      <div class="vitrine-modal-content">
        <div class="vitrine-modal-header">
          <h4 class="vitrine-modal-title" id="admin-course-title">Nouveau cours</h4>
          <button class="vitrine-modal-close" onclick="closeModal('modal-admin-course')">&times;</button>
        </div>
        <div class="vitrine-modal-body">
          <form id="form-admin-course" onsubmit="event.preventDefault(); window.submitAdminCourse();">
            <input type="hidden" id="admin-course-id">
            <div class="form-group">
              <label class="form-label">Nom du cours</label>
              <input type="text" id="admin-course-name" class="form-input" required>
            </div>
            <div class="form-group">
              <label class="form-label">Professeur</label>
              <select id="admin-course-prof" class="form-input" required></select>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Horaire (ex: Lundi 17h30)</label>
                <input type="text" id="admin-course-schedule" class="form-input" required>
              </div>
              <div class="form-group">
                <label class="form-label">Âge (ex: 8 à 10 ans)</label>
                <input type="text" id="admin-course-age" class="form-input" required>
              </div>
            </div>
            <div class="form-actions" style="margin-top: 1rem; text-align: right;">
              <button type="submit" class="btn btn-primary">Enregistrer</button>
            </div>
          </form>
        </div>
      </div>
    </div>"""

if 'modal-admin-course' not in html:
    html = html.replace(admin_modal_old, admin_modal_new)

# Clean up the unused modal-add-course
unused_modal_regex = r'<!-- Modal Ajouter Cours -->.*?<div class="vitrine-modal" id="modal-add-course">.*?</form>\s*</div>\s*</div>\s*</div>'
html = re.sub(unused_modal_regex, '', html, flags=re.DOTALL)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
