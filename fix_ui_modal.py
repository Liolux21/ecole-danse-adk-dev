import re

# 1. Update HTML layout for Add Student Modal
with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace Export button
html = html.replace(
    '<button class="btn btn-outline" style="margin-left: 10px;" onclick="window.exportStudentsExcel()">',
    '<button class="btn btn-primary" style="margin-left: 10px;" onclick="window.exportStudentsExcel()">'
)

# Re-order and rename Tutor Email
# Currently it looks like:
# <div class="form-group">
#   <label class="form-label">Date de naissance</label>
#   <input type="date" id="add-student-dob" class="form-input" required>
# </div>
# <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
#   <div class="form-group">
#     <label class="form-label">Prénom tuteur</label>
#     ...
#   </div>
# </div>
# <div class="form-group">
#   <label class="form-label">Téléphone tuteur</label>
#   <input type="tel" id="add-student-tutor-phone" class="form-input" required>
# </div>
# ... courses ...
# <div class="form-group">
#   <label class="form-label">Email de contact (Parent)</label>
#   <input type="email" id="add-student-email" class="form-input" required>
# </div>

# Let's extract the email block, then remove it, and insert it before telephone
email_regex = r'<div class="form-group">\s*<label class="form-label">Email de contact \(Parent\)</label>\s*<input type="email" id="add-student-email" class="form-input" required>\s*</div>'
match = re.search(email_regex, html)
if match:
    email_block = match.group(0)
    html = html.replace(email_block, '')
    
    # New email block
    new_email_block = """<div class="form-group">
              <label class="form-label">Email du tuteur</label>
              <input type="email" id="add-student-email" class="form-input" required>
            </div>"""
            
    # Insert before telephone
    tel_regex = r'<div class="form-group">\s*<label class="form-label">Téléphone tuteur</label>'
    html = re.sub(tel_regex, new_email_block + '\n            <div class="form-group">\n              <label class="form-label">Téléphone tuteur</label>', html)

# Bump version
html = re.sub(r'src="js/app.js\?v=\d+"', 'src="js/app.js?v=25"', html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
