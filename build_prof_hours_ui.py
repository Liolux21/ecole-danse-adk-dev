import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

hours_section = """          <div class="appel-list" id="appel-list"></div>
          
          <!-- Prof Hours Validation -->
          <div id="prof-hours-section" style="background: rgba(156, 88, 88, 0.05); padding: 1rem; border-radius: var(--radius); margin-top: 1rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: space-between; border: 1px solid rgba(156, 88, 88, 0.2);">
            <div>
              <strong style="color: var(--primary);">Prestation du professeur</strong>
              <div style="font-size: 0.85rem; color: var(--text-muted);" id="prof-hours-status">Confirmez vos heures pour cette session</div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="number" id="prof-hours-input" step="0.25" min="0" class="form-input" style="width: 80px; text-align: center;">
              <span>heures</span>
            </div>
          </div>

          <div class="appel-save-row">"""

html = html.replace("""          <div class="appel-list" id="appel-list"></div>
          <div class="appel-save-row">""", hours_section)

# Bump cache
html = re.sub(r'src="js/app.js\?v=\d+"', 'src="js/app.js?v=33"', html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
