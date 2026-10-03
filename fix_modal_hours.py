import os

with open('portail.html', 'r', encoding='utf-8') as f:
    content = f.read()

target = """  <div class="vitrine-modal-overlay" id="modal-hours-detail">
    <div class="vitrine-modal">
      <button class="vitrine-modal-close" onclick="closeModal('modal-hours-detail')">&times;</button>
      <div class="vitrine-modal-content">
        <h4 class="vitrine-modal-title" id="hours-detail-title">Détail des prestations</h4>
        <div style="max-height: 300px; overflow-y: auto; margin-top: 1rem;" id="hours-detail-list">
        </div>
      </div>
    </div>
  </div>"""

# Fallback with potential encoding mismatches (like é -> )
target_safe = """  <div class="vitrine-modal-overlay" id="modal-hours-detail">
    <div class="vitrine-modal">
      <button class="vitrine-modal-close" onclick="closeModal('modal-hours-detail')">&times;</button>
      <div class="vitrine-modal-content">
        <h4 class="vitrine-modal-title" id="hours-detail-title">Dtail des prestations</h4>
        <div style="max-height: 300px; overflow-y: auto; margin-top: 1rem;" id="hours-detail-list">
        </div>
      </div>
    </div>
  </div>"""

replacement = """  <div class="vitrine-modal" id="modal-hours-detail">
    <div class="vitrine-modal-content">
      <div class="vitrine-modal-header">
        <h4 class="vitrine-modal-title" id="hours-detail-title">Détail des prestations</h4>
        <button class="vitrine-modal-close" onclick="closeModal('modal-hours-detail')">&times;</button>
      </div>
      <div style="max-height: 300px; overflow-y: auto; margin-top: 1rem;" id="hours-detail-list">
      </div>
    </div>
  </div>"""

if target in content:
    content = content.replace(target, replacement)
    print("Replaced exact target.")
elif target_safe in content:
    content = content.replace(target_safe, replacement)
    print("Replaced target_safe.")
else:
    # Manual extraction and replacement
    start_idx = content.find('<div class="vitrine-modal-overlay" id="modal-hours-detail">')
    if start_idx != -1:
        end_idx = content.find('  </div>\n  </div>', start_idx) + 16
        if end_idx > 16:
            content = content[:start_idx] + replacement + content[end_idx:]
            print("Replaced via index extraction.")
        else:
            print("Could not find end index.")
    else:
        print("Could not find start index.")

import re
content = re.sub(r'js/chat\.js\?v=\d+', 'js/chat.js?v=51', content)
content = re.sub(r'js/app\.js\?v=\d+', 'js/app.js?v=51', content)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(content)
