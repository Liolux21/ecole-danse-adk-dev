import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

pattern = r'<form id="form-admin-course".*?</form>'

replacement = r'''<form id="form-admin-course" onsubmit="event.preventDefault(); submitAdminCourse();">
              <input type="hidden" id="admin-course-id">
              <div class="form-group">
                <label class="form-label">Nom du cours / événement</label>
                <input type="text" id="admin-course-name" class="form-input" required>
              </div>
              <div class="form-group">
                <label class="form-label">Type d'événement</label>
                <select id="admin-course-type" class="form-input" required onchange="toggleAdminCourseFields()">
                  <option value="regulier">Cours régulier</option>
                  <option value="pro">Cours Pro (Prioritaire)</option>
                  <option value="stage">Stage (Prioritaire)</option>
                  <option value="show">Show (Prioritaire)</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Professeur(s)</label>
                <div id="admin-course-profs" style="max-height: 150px; overflow-y: auto; padding: 1rem; border: 1px solid rgba(0,0,0,0.2); border-radius: var(--radius); background: #ffffff;">
                  <!-- Checkboxes dynamiques -->
                </div>
              </div>
              
              <!-- Section pour Cours Régulier -->
              <div id="admin-course-regular-section">
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                      <label class="form-label">Jour de la semaine</label>
                      <select id="admin-course-day" class="form-input">
                          <option value="Lundi">Lundi</option>
                          <option value="Mardi">Mardi</option>
                          <option value="Mercredi">Mercredi</option>
                          <option value="Jeudi">Jeudi</option>
                          <option value="Vendredi">Vendredi</option>
                          <option value="Samedi">Samedi</option>
                          <option value="Dimanche">Dimanche</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label class="form-label">Heure (ex: 17h30)</label>
                      <input type="time" id="admin-course-time" class="form-input">
                    </div>
                  </div>
              </div>

              <!-- Section pour Événement Ponctuel (Stage, Show, Pro) -->
              <div id="admin-course-event-section" style="display: none;">
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                      <label class="form-label">Date de début</label>
                      <input type="date" id="admin-course-start-date" class="form-input">
                    </div>
                    <div class="form-group">
                      <label class="form-label">Date de fin (optionnelle)</label>
                      <input type="date" id="admin-course-end-date" class="form-input">
                    </div>
                  </div>
              </div>

              <div class="form-group">
                <label class="form-label">Tranche d'âge</label>
                <input type="text" id="admin-course-age" class="form-input" required>
              </div>
              <button type="submit" class="btn btn-primary" style="width:100%">Sauvegarder</button>
            </form>'''

html = re.sub(pattern, replacement, html, flags=re.DOTALL)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
