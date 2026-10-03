import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

pattern = r'<!-- Modal: Gérer un cours -->.*?<div class="vitrine-modal" id="modal-manage-course">.*?<form id="form-manage-course" onsubmit="event\.preventDefault\(\); submitManageCourse\(\);">.*?</form>\s*</div>\s*</div>\s*</div>'

replacement = r'''<!-- Modal: Gérer un cours (Admin) -->
    <div class="vitrine-modal" id="modal-admin-course">
      <div class="vitrine-modal-content">
        <button class="vitrine-modal-close" onclick="closeModal('modal-admin-course')">×</button>
        <div class="vitrine-modal-header">
          <h2 class="vitrine-modal-title" id="admin-course-title">Nouveau cours</h2>
        </div>
        <div class="vitrine-modal-body">
          <form id="form-admin-course" onsubmit="event.preventDefault(); submitAdminCourse();">
            <input type="hidden" id="admin-course-id">
            <div class="form-group">
              <label class="form-label">Nom du cours</label>
              <input type="text" id="admin-course-name" class="form-control" required>
            </div>
            <div class="form-group">
              <label class="form-label">Professeur</label>
              <select id="admin-course-prof" class="form-control" required>
                <!-- Dynamique -->
              </select>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Jour/Heure (ex: Lundi 17h30)</label>
                <input type="text" id="admin-course-schedule" class="form-control" required>
              </div>
              <div class="form-group">
                <label class="form-label">Tranche d'âge</label>
                <input type="text" id="admin-course-age" class="form-control" required>
              </div>
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%">Sauvegarder</button>
          </form>
        </div>
      </div>
    </div>'''

html = re.sub(pattern, replacement, html, flags=re.DOTALL)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
